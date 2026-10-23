import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { categoriasBlog, niveisBlog, type CategoriaBlog } from '../config';

export type Post = CollectionEntry<'blog'>;

const ordemNivel = { basico: 0, intermediario: 1, avancado: 2 };

/** Do mais simples ao mais completo; no mesmo nível, os destaques primeiro */
export const porNivel = (a: Post, b: Post) =>
  ordemNivel[a.data.nivel] - ordemNivel[b.data.nivel] || Number(b.data.destaque) - Number(a.data.destaque);

/** Artigos do mais recente para o mais antigo; no mesmo dia, do mais simples ao mais completo. */
export async function posts(): Promise<Post[]> {
  return (await getCollection('blog')).sort(
    (a, b) => b.data.publicado.getTime() - a.data.publicado.getTime() || ordemNivel[a.data.nivel] - ordemNivel[b.data.nivel],
  );
}

export async function postsDaCategoria(categoria: CategoriaBlog) {
  return (await posts()).filter((p) => p.data.categoria === categoria);
}

/** Minutos de leitura, a ~200 palavras por minuto. */
export function leitura(post: Post) {
  const palavras = (post.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palavras / 200));
}

export const dataLonga = (d: Date) => d.toLocaleDateString('pt-BR', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' });

export const nomeCategoria = (c: CategoriaBlog) => categoriasBlog[c].nome;
export const nomeNivel = (n: Post['data']['nivel']) => niveisBlog[n].nome;

/** Relacionados: mesma categoria primeiro (do mais simples ao mais completo), depois os mais recentes. */
export async function relacionados(post: Post, n = 3) {
  const outros = (await posts()).filter((p) => p.id !== post.id);
  const mesma = outros
    .filter((p) => p.data.categoria === post.data.categoria)
    .sort(porNivel);
  return [...mesma, ...outros.filter((p) => !mesma.includes(p))].slice(0, n);
}


// Mascote de cada artigo (campo `mascote` do frontmatter); sem ele, o do tema
const mascotes = import.meta.glob<{ default: ImageMetadata }>('../assets/mascotes/*.png', { eager: true });
const mascotePorTema: Record<CategoriaBlog, string> = {
  'incentivo-fiscal': 'presente',
  'para-ongs': 'coracao',
  sustentabilidade: 'joinha',
  'impacto-social': 'abraco',
  certificacoes: 'trofeu',
};
export const mascoteDo = (post: Post) =>
  (mascotes[`../assets/mascotes/${post.data.mascote}.png`] ?? mascotes[`../assets/mascotes/${mascotePorTema[post.data.categoria]}.png`]).default;
