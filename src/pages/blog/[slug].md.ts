import type { APIRoute } from 'astro';
import { posts, type Post } from '../../lib/blog';
import { markdownDoPost } from '../../conteudo/blog';
import { respostaMarkdown } from '../../lib/markdown';

export async function getStaticPaths() {
  return (await posts()).map((post) => ({ params: { slug: post.id }, props: { post } }));
}

// Versão Markdown do artigo, para agentes de IA (também servida com Accept: text/markdown)
export const GET: APIRoute = ({ props, site }) => respostaMarkdown(markdownDoPost((props as { post: Post }).post, site));
