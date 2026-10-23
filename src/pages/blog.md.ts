import type { APIRoute } from 'astro';
import { markdown } from '../conteudo/blog';
import { respostaMarkdown } from '../lib/markdown';

// Versão Markdown do índice do blog
export const GET: APIRoute = async ({ site }) => respostaMarkdown(await markdown(site));
