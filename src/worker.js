// Worker do site: serve os arquivos estáticos (dist/) e recebe o formulário de contato.
//
// POST /api/contato → valida e repassa ao Base44 (BASE44_CONTATO_URL), que grava o contato na
// entidade SiteLead e avisa os admins. O token SITE_LEAD_TOKEN (segredo nos dois lados) impede
// que a função do Base44 seja usada por fora do site.

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

export default {
  /** @param {Request} request @param {Record<string, any>} env */
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contato') return contato(request, env);

    // Domínio próprio de uma página: a raiz abre direto nela (INICIO_POR_DOMINIO no wrangler.jsonc)
    const inicio = env.INICIO_POR_DOMINIO?.[url.hostname];
    if (inicio && url.pathname === '/') return env.ASSETS.fetch(new Request(new URL(inicio, url), request));

    return env.ASSETS.fetch(request);
  },
};
