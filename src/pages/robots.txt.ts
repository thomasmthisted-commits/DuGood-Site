import type { APIRoute } from 'astro';
import { rascunho } from '../config';

// Enquanto for rascunho, nada é indexado
export const GET: APIRoute = ({ site }) =>
  new Response(
    rascunho
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site)}\n`,
    { headers: { 'content-type': 'text/plain; charset=utf-8' } },
  );
