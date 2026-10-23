import type { APIRoute } from 'astro';
import { markdown as inicio } from '../conteudo/inicio';
import { markdown as empresas } from '../conteudo/empresas';
import { markdown as ongs } from '../conteudo/ongs';
import { markdown as eventos } from '../conteudo/eventos';
import { markdown as sobre } from '../conteudo/sobre';
import { markdownDoPost } from '../conteudo/blog';
import { posts } from '../lib/blog';

// Todo o conteúdo do site num arquivo só, para agentes de IA: páginas e artigos do blog
export const GET: APIRoute = async ({ site }) => {
  const paginas = [inicio, empresas, ongs, eventos, sobre].map((md) => md(site));
  const artigos = (await posts()).map((p) => markdownDoPost(p, site));
  return new Response([...paginas, ...artigos].join('\n---\n\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
