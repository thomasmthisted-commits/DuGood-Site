// Monta as versões Markdown das páginas (rota + .md), lidas por agentes de IA e pelo llms-full.txt.
import type { Item, Pergunta, Pagina } from '../conteudo/tipos';
import { dugood } from '../config';

export const secao = (titulo: string, ...partes: (string | undefined | false)[]) =>
  [`## ${titulo.replace(/\.$/, '')}`, ...partes.filter(Boolean)].join('\n\n');

export const lista = (itens: (Item | string)[]) =>
  itens.map((i) => (typeof i === 'string' ? `- ${i}` : `- **${i.titulo}** ${i.texto}`)).join('\n');

export const numerada = (itens: Item[]) => itens.map((i, n) => `${n + 1}. **${i.titulo}:** ${i.texto}`).join('\n');

export const perguntas = (ps: Pergunta[]) => secao('Perguntas frequentes', ps.map((q) => `### ${q.p}\n\n${q.r}`).join('\n\n'));

/** Cabeçalho comum: título, resumo, endereço da página e contato */
export const cabecalho = (p: Pagina, site: URL | undefined) =>
  [
    `# ${p.titulo}`,
    `> ${p.resumo}`,
    `Página: ${new URL(p.rota, site).href} · Contato: ${dugood.email}`,
  ].join('\n\n');

export const juntar = (...blocos: (string | undefined | false)[]) => blocos.filter(Boolean).join('\n\n') + '\n';

/** Resposta HTTP de um endpoint .md */
export const respostaMarkdown = (texto: string) =>
  new Response(texto, { headers: { 'content-type': 'text/markdown; charset=utf-8' } });
