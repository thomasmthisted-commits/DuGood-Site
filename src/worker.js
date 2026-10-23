// Worker do site: serve os arquivos estáticos (dist/), recebe o formulário de contato,
// consulta CNPJ para o preenchimento prévio e entrega Markdown a quem pede.
//
// POST /api/contato → valida e repassa ao Base44 (BASE44_CONTATO_URL), que grava o contato na
// entidade SiteLead e avisa os admins. O token SITE_LEAD_TOKEN (segredo nos dois lados) impede
// que a função do Base44 seja usada por fora do site.
//
// GET /api/cnpj/<14 dígitos> → nome, razão social, cidade e regime tributário na base pública
// (BrasilAPI, dados da Receita Federal), guardados em cache por um dia.
//
// Páginas: quem pede Accept: text/markdown (agentes de IA) recebe a versão .md; as respostas HTML
// levam o cabeçalho Link apontando para ela.

import { cnpjValido } from './scripts/cnpj.ts';

const PUBLICOS = new Set(['empresa', 'ong', 'organizador']);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Campos aceitos e o tamanho máximo de cada um
const CAMPOS = {
  publico: 20,
  nome: 120,
  organizacao: 160,
  email: 160,
  telefone: 30,
  cnpj: 20,
  razao_social: 160,
  cargo: 80,
  regime: 40,
  area: 40,
  cidade: 80,
  data_evento: 60,
  ong_beneficiada: 160,
  mensagem: 3000,
  pagina: 200,
  utm: 300,
};

/** @param {Request} request */
async function lerFormulario(request) {
  if ((request.headers.get('content-type') ?? '').includes('application/json')) return request.json();
  const fd = await request.formData();
  return { ...Object.fromEntries(fd), interesses: fd.getAll('interesses') };
}

/** @param {Request} request */
function responder(request, status, corpo) {
  const querJson = (request.headers.get('accept') ?? '').includes('application/json');
  if (querJson) return Response.json(corpo, { status });
  if (status < 400) return Response.redirect(new URL('/obrigado', request.url).href, 303);
  return new Response(`${corpo.erro}\n\nVolte e tente de novo, ou escreva para comercial@dugood.com.br.`, {
    status,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}

/** @param {Request} request @param {Record<string, any>} env */
async function contato(request, env) {
  if (request.method !== 'POST') return new Response('Método não permitido', { status: 405, headers: { allow: 'POST' } });

  let bruto;
  try {
    bruto = await lerFormulario(request);
  } catch {
    return responder(request, 400, { erro: 'Não conseguimos ler o formulário.' });
  }

  // Robôs: campo isca preenchido ou envio rápido demais. Responde como sucesso e descarta.
  const enviadoEm = Number(bruto.t);
  if (bruto.site || (enviadoEm && Date.now() - enviadoEm < 3000)) return responder(request, 200, { ok: true });

  const dados = {};
  for (const [campo, max] of Object.entries(CAMPOS)) {
    const valor = String(bruto[campo] ?? '').trim();
    if (valor) dados[campo] = valor.slice(0, max);
  }
  const interesses = Array.isArray(bruto.interesses) ? bruto.interesses : bruto.interesses ? [bruto.interesses] : [];
  dados.interesses = interesses.map((i) => String(i).slice(0, 80)).slice(0, 10);

  if (!PUBLICOS.has(dados.publico)) return responder(request, 400, { erro: 'Formulário inválido.' });
  if (!dados.nome || !dados.organizacao || !dados.telefone) return responder(request, 400, { erro: 'Preencha os campos obrigatórios.' });
  if (!EMAIL.test(dados.email ?? '')) return responder(request, 400, { erro: 'Confira o e-mail.' });
  if (bruto.aceite !== 'sim') return responder(request, 400, { erro: 'Precisamos da sua autorização para entrar em contato.' });

  if (!env.BASE44_CONTATO_URL || !env.SITE_LEAD_TOKEN) {
    console.error('Formulário sem configuração: BASE44_CONTATO_URL ou SITE_LEAD_TOKEN ausente');
    return responder(request, 503, { erro: 'O formulário ainda não está configurado.' });
  }

  const r = await fetch(env.BASE44_CONTATO_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-site-token': env.SITE_LEAD_TOKEN },
    body: JSON.stringify({ ...dados, pais: request.cf?.country ?? null }),
  }).catch((e) => {
    console.error('Base44 fora do ar', e);
    return null;
  });

  if (!r?.ok) {
    console.error('Base44 recusou o contato', r?.status, await r?.text().catch(() => ''));
    return responder(request, 502, { erro: 'Não foi possível enviar agora.' });
  }
  return responder(request, 200, { ok: true });
}

const PALAVRAS_MINUSCULAS = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'a', 'o', 'em', 'para']);
const titulo = (texto = '') =>
  texto
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((p, i) => (i > 0 && PALAVRAS_MINUSCULAS.has(p) ? p : p[0].toUpperCase() + p.slice(1)))
    .join(' ');
// Nome fantasia curto de uma palavra costuma ser sigla (AACC, SESC): fica em maiúsculas
const nomeFantasia = (texto = '') => (/^[A-Z0-9]{2,5}$/.test(texto.trim()) ? texto.trim() : titulo(texto));

const REGIMES = { 'LUCRO REAL': 'Lucro real', 'LUCRO PRESUMIDO': 'Lucro presumido' };

/** @param {string} digitos @param {ExecutionContext} ctx */
async function consultarCnpj(digitos, ctx) {
  if (!cnpjValido(digitos)) return Response.json({ erro: 'CNPJ inválido' }, { status: 400 });

  const chave = new Request(`https://cache.dugood-site/cnpj/v2/${digitos}`);
  const guardado = await caches.default.match(chave);
  if (guardado) return guardado;

  const r = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${digitos}`, { headers: { accept: 'application/json' } }).catch(() => null);
  if (r?.status === 404) return Response.json({ erro: 'CNPJ não encontrado' }, { status: 404 });
  if (!r?.ok) return Response.json({ erro: 'Base de CNPJ indisponível' }, { status: 502 });

  const d = await r.json();
  const ultimoRegime = [...(d.regime_tributario ?? [])].sort((a, b) => b.ano - a.ano)[0]?.forma_de_tributacao;
  const dados = {
    razao_social: d.razao_social ?? '',
    nome: d.nome_fantasia ? nomeFantasia(d.nome_fantasia) : titulo(d.razao_social),
    cidade: d.municipio ? `${titulo(d.municipio)}/${d.uf}` : '',
    regime: d.opcao_pelo_simples ? 'Simples Nacional' : (REGIMES[ultimoRegime] ?? ''),
    situacao: titulo(d.descricao_situacao_cadastral),
  };
  const resposta = Response.json(dados, { headers: { 'cache-control': 'public, max-age=86400' } });
  ctx.waitUntil(caches.default.put(chave, resposta.clone()));
  return resposta;
}

/** Endereço da versão Markdown de uma página, ou null para arquivos (com extensão) */
const enderecoMarkdown = (pathname) => {
  if (pathname === '/' || pathname === '/index') return '/index.md';
  return /\.[a-z0-9]+$/i.test(pathname) ? null : `${pathname.replace(/\/$/, '')}.md`;
};

export default {
  /** @param {Request} request @param {Record<string, any>} env @param {ExecutionContext} ctx */
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contato') return contato(request, env);
    const cnpj = url.pathname.match(/^\/api\/cnpj\/(\d{14})$/);
    if (cnpj && request.method === 'GET') return consultarCnpj(cnpj[1], ctx);
    if (url.pathname.startsWith('/api/')) return new Response('Não encontrado', { status: 404 });

    // Domínio próprio de uma página: a raiz abre direto nela (INICIO_POR_DOMINIO no wrangler.jsonc)
    const inicio = env.INICIO_POR_DOMINIO?.[url.hostname];
    const pathname = inicio && url.pathname === '/' ? inicio : url.pathname;
    const md = enderecoMarkdown(pathname);

    // Agentes que preferem Markdown recebem a versão .md da mesma página
    const accept = request.headers.get('accept') ?? '';
    if (md && accept.includes('text/markdown') && !accept.startsWith('text/html')) {
      const r = await env.ASSETS.fetch(new Request(new URL(md, url), request));
      if (r.ok) {
        const resposta = new Response(r.body, r);
        resposta.headers.set('content-type', 'text/markdown; charset=utf-8');
        resposta.headers.set('vary', 'Accept');
        return resposta;
      }
    }

    const r = await env.ASSETS.fetch(pathname === url.pathname ? request : new Request(new URL(pathname, url), request));
    if (!md || !(r.headers.get('content-type') ?? '').includes('text/html') || !r.ok) return r;
    const resposta = new Response(r.body, r);
    resposta.headers.set('link', `<${md}>; rel="alternate"; type="text/markdown"`);
    resposta.headers.append('vary', 'Accept');
    return resposta;
  },
};
