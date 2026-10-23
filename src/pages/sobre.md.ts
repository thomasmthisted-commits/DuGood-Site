import type { APIRoute } from 'astro';
import { markdown } from '../conteudo/sobre';
import { respostaMarkdown } from '../lib/markdown';

// Versão Markdown da página, para agentes de IA (também servida com Accept: text/markdown)
export const GET: APIRoute = ({ site }) => respostaMarkdown(markdown(site));
