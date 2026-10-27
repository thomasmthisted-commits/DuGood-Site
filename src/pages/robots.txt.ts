import type { APIRoute } from 'astro';
import { rascunho } from '../config';

// Enquanto for rascunho, nada é indexado. Depois, buscadores e agentes de IA são bem-vindos.
const agentes = ['Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'];

export const GET: APIRoute = ({ site }) =>
  new Response(
    rascunho
      ? 'User-agent: *\nDisallow: /\n'
      : `${agentes.map((a) => `User-agent: ${a}`).join('\n')}\nAllow: /\nDisallow: /api/\n\nUser-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${new URL('/sitemap-index.xml', site)}\n# Resumo para agentes de IA: ${new URL('/llms.txt', site)}\n`,
    { headers: { 'content-type': 'text/plain; charset=utf-8' } },
  );
