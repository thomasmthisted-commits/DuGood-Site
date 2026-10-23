import type { Pagina } from './tipos';
import { categoriasBlog, niveisBlog, dugood, type CategoriaBlog } from '../config';
import { cabecalho, juntar, perguntas, secao } from '../lib/markdown';
import { dataLonga, porNivel, posts, type Post } from '../lib/blog';

export const pagina: Pagina = {
  rota: '/blog',
  nome: 'Blog',
  tipo: 'CollectionPage',
  titulo: 'Blog DuGood: incentivo fiscal, ESG e impacto social',
  descricao:
    'Artigos do básico ao avançado sobre doação incentivada, leis de incentivo, sustentabilidade, ESG, certificações, ISOs e boas práticas sociais para empresas e ONGs.',
  resumo:
    'O blog da DuGood reúne artigos práticos sobre leis de incentivo fiscal, sustentabilidade e ESG, certificações e normas ISO, boas práticas sociais e captação para ONGs. Cada tema tem uma trilha que vai de um guia rápido a um guia completo, sempre com as fontes oficiais.',
  perguntas: [],
};

export const heroi = {
  rotulo: 'Blog DuGood',
  titulo: 'Do primeiro passo ao guia completo.',
  lead: 'Leis de incentivo, sustentabilidade, certificações e boas práticas sociais explicadas sem complicação, com as fontes oficiais. Cada tema tem uma trilha: comece pelo básico e vá até o guia completo.',
};

/** Página de uma categoria: /blog/categoria/<id> */
export const paginaCategoria = (categoria: CategoriaBlog): Pagina => ({
  rota: `/blog/categoria/${categoria}`,
  nome: categoriasBlog[categoria].nome,
  tipo: 'CollectionPage',
  titulo: `${categoriasBlog[categoria].nome}: artigos do blog DuGood`,
  descricao: categoriasBlog[categoria].descricao,
  resumo: categoriasBlog[categoria].descricao,
  perguntas: [],
  migalhas: [{ nome: 'Blog', rota: '/blog' }],
});

/** Página de um artigo: /blog/<slug> */
export const paginaPost = (post: Post): Pagina => ({
  rota: `/blog/${post.id}`,
  nome: post.data.titulo,
  titulo: post.data.titulo,
  descricao: post.data.descricao,
  resumo: post.data.resumo,
  perguntas: post.data.perguntas,
  migalhas: [
    { nome: 'Blog', rota: '/blog' },
    { nome: categoriasBlog[post.data.categoria].nome, rota: `/blog/categoria/${post.data.categoria}` },
  ],
});

const linhaDoPost = (p: Post, site: URL | undefined) =>
  `- [${p.data.titulo}](${new URL(`/blog/${p.id}.md`, site).href}) (${niveisBlog[p.data.nivel].nome}): ${p.data.resumo}`;

/** Versão Markdown do índice do blog, com os artigos de cada categoria do básico ao avançado */
export async function markdown(site: URL | undefined) {
  const todos = await posts();
  return juntar(
    cabecalho(pagina, site),
    ...Object.entries(categoriasBlog).map(([id, c]) => {
      const daCategoria = todos.filter((p) => p.data.categoria === id).sort(porNivel);
      return daCategoria.length ? secao(c.nome, c.descricao, daCategoria.map((p) => linhaDoPost(p, site)).join('\n')) : undefined;
    }),
  );
}

/** Versão Markdown de um artigo: o próprio texto, com cabeçalho, perguntas e fontes */
export function markdownDoPost(post: Post, site: URL | undefined) {
  const d = post.data;
  return juntar(
    `# ${d.titulo}`,
    `> ${d.resumo}`,
    [
      `Artigo: ${new URL(`/blog/${post.id}`, site).href}`,
      `Tema: ${categoriasBlog[d.categoria].nome} · Nível: ${niveisBlog[d.nivel].nome}`,
      `Publicado em ${dataLonga(d.publicado)}${d.atualizado ? ` · atualizado em ${dataLonga(d.atualizado)}` : ''} · ${dugood.nome} (${dugood.email})`,
    ].join('\n'),
    (post.body ?? '').trim(),
    d.perguntas.length > 0 && perguntas(d.perguntas),
    secao('Fontes', d.fontes.map((f) => `- [${f.titulo}](${f.url})`).join('\n')),
  );
}
