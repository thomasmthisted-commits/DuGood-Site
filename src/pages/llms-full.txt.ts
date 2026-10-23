import type { APIRoute } from 'astro';
import { markdown as inicio } from '../conteudo/inicio';
import { markdown as empresas } from '../conteudo/empresas';
import { markdown as ongs } from '../conteudo/ongs';
import { markdown as eventos } from '../conteudo/eventos';

// Todo o conteúdo do site num arquivo só, para agentes de IA
export const GET: APIRoute = ({ site }) =>
  new Response([inicio, empresas, ongs, eventos].map((md) => md(site)).join('\n---\n\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
