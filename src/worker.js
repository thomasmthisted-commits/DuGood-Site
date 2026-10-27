// Worker do site: serve os arquivos estáticos (dist/), recebe o formulário de contato,
// consulta CNPJ para o preenchimento prévio e entrega Markdown a quem pede.
//
// POST /api/contato → valida e repassa ao Base44 (BASE44_CONTATO_URL), que grava o contato na
// entidade SiteLead e avisa os admins. O token SITE_LEAD_TOKEN (segredo nos dois lados) impede
// que a função do Base44 seja usada por fora do site.
//
// GET /api/cnpj/<14 dígitos> → nome, razão social, cidade, regime tributário e atividade na base
// pública (BrasilAPI, dados da Receita Federal), guardados em cache por um dia.
//
// POST /api/diagnostico → diagnóstico rápido da página de empresas (src/conteudo/diagnostico.ts):
// perfil, público, áreas de projeto e QUANTAS causas e projetos têm fit, sem nomes. As contagens
// vêm da função siteDiagnostico do Base44 (BASE44_DIAGNOSTICO_URL, com o mesmo SITE_LEAD_TOKEN);
// sem ela, só das causas ativas do app (BASE44_CAUSAS_URL, públicas).
//
// Páginas: quem pede Accept: text/markdown (agentes de IA) recebe a versão .md; as respostas HTML
// levam o cabeçalho Link apontando para ela.

import { cnpjValido } from './scripts/cnpj.ts';
import { areas, classificar, contem, normalizar, unir } from './conteudo/diagnostico.ts';

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

/**
 * Dados públicos de um CNPJ (BrasilAPI), guardados em cache por um dia.
 * @param {string} digitos @param {ExecutionContext} ctx
 * @returns {Promise<{ status: number, dados?: Record<string, string>, erro?: string }>}
 */
async function dadosCnpj(digitos, ctx) {
  if (!cnpjValido(digitos)) return { status: 400, erro: 'CNPJ inválido' };

  const chave = new Request(`https://cache.dugood-site/cnpj/v3/${digitos}`);
  const guardado = await caches.default.match(chave);
  if (guardado) return { status: 200, dados: await guardado.json() };

  const r = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${digitos}`, { headers: { accept: 'application/json' } }).catch(() => null);
  if (r?.status === 404) return { status: 404, erro: 'CNPJ não encontrado' };
  if (!r?.ok) return { status: 502, erro: 'Base de CNPJ indisponível' };

  const d = await r.json();
  const ultimoRegime = [...(d.regime_tributario ?? [])].sort((a, b) => b.ano - a.ano)[0]?.forma_de_tributacao;
  const dados = {
    razao_social: d.razao_social ?? '',
    nome: d.nome_fantasia ? nomeFantasia(d.nome_fantasia) : titulo(d.razao_social),
    cidade: d.municipio ? `${titulo(d.municipio)}/${d.uf}` : '',
    regime: d.opcao_pelo_simples ? 'Simples Nacional' : (REGIMES[ultimoRegime] ?? ''),
    situacao: titulo(d.descricao_situacao_cadastral),
    // Atividade principal (CNAE): ajuda o diagnóstico a entender o setor
    atividade: d.cnae_fiscal_descricao ?? '',
  };
  ctx.waitUntil(caches.default.put(chave, Response.json(dados, { headers: { 'cache-control': 'public, max-age=86400' } })));
  return { status: 200, dados };
}

/** @param {string} digitos @param {ExecutionContext} ctx */
async function consultarCnpj(digitos, ctx) {
  const { status, dados, erro } = await dadosCnpj(digitos, ctx);
  return Response.json(dados ?? { erro }, { status, headers: status === 200 ? { 'cache-control': 'public, max-age=86400' } : {} });
}

const LIMITE_SITE = 300_000;

/** Título, descrição e títulos de seção do site da empresa, para o diagnóstico. @param {string} endereco */
async function lerSite(endereco) {
  let url;
  try {
    url = new URL(/^https?:\/\//i.test(endereco) ? endereco : `https://${endereco}`);
  } catch {
    return '';
  }
  if (!/^https?:$/.test(url.protocol) || !url.hostname.includes('.')) return '';
  const r = await fetch(url, {
    headers: { accept: 'text/html', 'user-agent': 'DuGoodSite/1.0 (diagnostico)' },
    redirect: 'follow',
    signal: AbortSignal.timeout(5000),
  }).catch(() => null);
  if (!r?.ok || !(r.headers.get('content-type') ?? '').includes('text/html')) return '';
  const html = (await r.text()).slice(0, LIMITE_SITE);
  const meta = (nome) => html.match(new RegExp(`<meta[^>]+(?:name|property)=["']${nome}["'][^>]*content=["']([^"']*)`, 'i'))?.[1] ?? '';
  const titulos = [...html.matchAll(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/gi)].slice(0, 12).map((m) => m[1]);
  return [html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1], meta('description'), meta('og:description'), meta('keywords'), ...titulos]
    .join(' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .slice(0, 4000);
}

/**
 * Quantas causas e projetos têm fit: pela função siteDiagnostico do Base44 (causas do app e a
 * carteira de projetos incentivados) ou, sem ela, só pelas causas ativas, que são públicas.
 * Guarda a resposta por uma hora.
 * @param {{ areas: string[], causas: string[], palavras: string[] }} pedido
 * @param {Record<string, any>} env @param {ExecutionContext} ctx
 */
async function contarFit(pedido, env, ctx) {
  const chave = new Request(`https://cache.dugood-site/fit/v1/${encodeURIComponent(JSON.stringify(pedido)).slice(0, 1500)}`);
  const guardado = await caches.default.match(chave);
  if (guardado) return guardado.json();

  let contagem = null;
  if (env.BASE44_DIAGNOSTICO_URL && env.SITE_LEAD_TOKEN) {
    const r = await fetch(env.BASE44_DIAGNOSTICO_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-site-token': env.SITE_LEAD_TOKEN },
      body: JSON.stringify(pedido),
      signal: AbortSignal.timeout(8000),
    }).catch(() => null);
    if (r?.ok) contagem = await r.json().catch(() => null);
  }
  if (!contagem && env.BASE44_CAUSAS_URL) {
    const r = await fetch(`${env.BASE44_CAUSAS_URL}?q=${encodeURIComponent('{"status":"active"}')}&limit=1000`, {
      signal: AbortSignal.timeout(8000),
    }).catch(() => null);
    const ativas = r?.ok ? await r.json().catch(() => []) : [];
    const categorias = new Set(pedido.causas);
    contagem = {
      causas: (Array.isArray(ativas) ? ativas : []).filter((c) => !c.is_sample && categorias.has(c.category)).length,
      incentivados: 0,
      com_marca: 0,
    };
  }
  contagem ??= { causas: 0, incentivados: 0, com_marca: 0 };
  ctx.waitUntil(caches.default.put(chave, Response.json(contagem, { headers: { 'cache-control': 'public, max-age=3600' } })));
  return contagem;
}

/** POST /api/diagnostico → perfil, público, áreas e quantas causas e projetos têm fit */
async function diagnostico(request, env, ctx) {
  if (request.method !== 'POST') return new Response('Método não permitido', { status: 405, headers: { allow: 'POST' } });
  const d = await request.json().catch(() => ({}));
  const corta = (v, n) => String(v ?? '').trim().slice(0, n);
  const setor = corta(d.setor, 40);
  const descricao = corta(d.descricao, 600);
  const site = corta(d.site, 200);
  const digitos = corta(d.cnpj, 20).replace(/\D/g, '');
  if (!setor && !descricao && !site && !digitos) return Response.json({ erro: 'Conte um pouco sobre a empresa.' }, { status: 400 });

  const [textoSite, cnpj] = await Promise.all([
    site ? lerSite(site).catch(() => '') : '',
    digitos.length === 14 ? dadosCnpj(digitos, ctx).catch(() => ({})) : {},
  ]);
  const empresa = cnpj.dados ?? null;
  const texto = [descricao, textoSite, empresa?.atividade, empresa?.nome].filter(Boolean).join(' ');
  const encontrados = classificar(setor, texto);
  const areasFit = unir(encontrados.map((p) => p.areas));
  const causasFit = unir(encontrados.map((p) => p.causas));
  const t = normalizar(texto);
  const palavras = unir(encontrados.map((p) => p.palavras)).filter((w) => contem(t, w)).map((w) => w.trim());

  const contagem = await contarFit({ areas: areasFit, causas: causasFit, palavras }, env, ctx);
  return Response.json({
    perfis: encontrados.map((p) => ({ nome: p.nome, publico: p.publico })),
    areas: areasFit.map((a) => ({ id: a, ...areas[a] })),
    causas: Number(contagem.causas) || 0,
    incentivados: Number(contagem.incentivados) || 0,
    com_marca: Number(contagem.com_marca) || 0,
    empresa: empresa ? { nome: empresa.nome, regime: empresa.regime, atividade: empresa.atividade } : null,
    leu_site: Boolean(textoSite),
  });
}

/** Endereço da versão Markdown de uma página, ou null para arquivos (com extensão) */
const enderecoMarkdown = (pathname) => {
  if (pathname === '/' || pathname === '/index') return '/index.md';
  return /\.[a-z0-9]+$/i.test(pathname) ? null : `${pathname.replace(/\/$/, '')}.md`;
};

/** O endereço de preview (workers.dev) fica fora do Google, para não concorrer com o domínio */
const semIndiceNoPreview = (r, url) => {
  if (!url.hostname.endsWith('.workers.dev')) return r;
  const resposta = new Response(r.body, r);
  resposta.headers.set('x-robots-tag', 'noindex');
  return resposta;
};

export default {
  /** @param {Request} request @param {Record<string, any>} env @param {ExecutionContext} ctx */
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // Um endereço só para o Google: www vira o domínio sem www
    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.href, 301);
    }
    // Quem procura o sitemap no endereço mais comum recebe o índice gerado pelo Astro
    if (url.pathname === '/sitemap.xml') return env.ASSETS.fetch(new Request(new URL('/sitemap-index.xml', url), request));
    if (url.pathname === '/api/contato') return contato(request, env);
    if (url.pathname === '/api/diagnostico') return diagnostico(request, env, ctx);
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
    // Arquivos do build têm o hash no nome: o navegador pode guardar por um ano
    if (url.pathname.startsWith('/_astro/') && r.ok) {
      const resposta = new Response(r.body, r);
      resposta.headers.set('cache-control', 'public, max-age=31536000, immutable');
      return resposta;
    }
    if (!md || !(r.headers.get('content-type') ?? '').includes('text/html') || !r.ok) return semIndiceNoPreview(r, url);
    const resposta = new Response(r.body, r);
    resposta.headers.set('link', `<${md}>; rel="alternate"; type="text/markdown"`);
    resposta.headers.append('vary', 'Accept');
    return semIndiceNoPreview(resposta, url);
  },
};
