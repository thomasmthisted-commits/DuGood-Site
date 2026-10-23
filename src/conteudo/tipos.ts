import type { NomeIcone } from '../lib/icones';

// Conteúdo das páginas: a mesma fonte gera o HTML (src/pages/*.astro), a versão Markdown
// (src/pages/*.md.ts), o llms-full.txt e os dados estruturados.

export interface Item {
  titulo: string;
  texto: string;
}

export interface ItemIcone extends Item {
  icone: NomeIcone;
  href?: string;
}

export interface Pergunta {
  p: string;
  r: string;
}

export interface Aba {
  /** Nome da aba como aparece no app */
  aba: string;
  texto: string;
  /** Arquivo em src/assets/prints/ (sem extensão) */
  print: string;
  /** O que precisa aparecer no print, para quem for tirar */
  pendente: string;
}

export interface Secao {
  rotulo: string;
  titulo: string;
  lead?: string;
}

export interface Pagina {
  rota: string;
  /** <title> e og:title (até ~60 caracteres) */
  titulo: string;
  /** meta description (até ~160 caracteres) */
  descricao: string;
  /** Nome curto, usado nas migalhas e no llms.txt */
  nome: string;
  /** Resumo factual de 2 a 3 frases: abre a versão Markdown e o llms.txt */
  resumo: string;
  perguntas: Pergunta[];
  /** Serviço descrito na página (schema.org Service) */
  servico?: { nome: string; tipo: string; publico: string; descricao: string };
  /** Páginas intermediárias nas migalhas, entre o Início e esta (ex.: o Blog) */
  migalhas?: { nome: string; rota: string }[];
  /** Tipo schema.org da página (padrão WebPage; ex.: CollectionPage no índice do blog) */
  tipo?: string;
}
