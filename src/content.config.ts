import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categoriasBlog, niveisBlog } from './config';

const chaves = <T extends object>(o: T) => Object.keys(o) as [Extract<keyof T, string>, ...Extract<keyof T, string>[]];

// Artigos do blog: src/content/blog/<slug>.md (o nome do arquivo é o endereço: /blog/<slug>)
const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    titulo: z.string().max(90),
    /** meta description: até ~160 caracteres */
    descricao: z.string().max(170),
    /** Resumo factual de 2 a 3 frases: abre o artigo, o .md e o llms.txt */
    resumo: z.string(),
    categoria: z.enum(chaves(categoriasBlog)),
    nivel: z.enum(chaves(niveisBlog)),
    /** Para quem é a chamada de contato no fim do artigo */
    publico: z.enum(['empresa', 'ong', 'organizador']),
    /** Interesse já marcado no formulário de contato (ids em config.ts) */
    interesse: z.string().optional(),
    publicado: z.coerce.date(),
    atualizado: z.coerce.date().optional(),
    destaque: z.boolean().default(false),
    /** Fontes consultadas, sempre oficiais ou de referência */
    fontes: z.array(z.object({ titulo: z.string(), url: z.url() })).min(1),
    perguntas: z.array(z.object({ p: z.string(), r: z.string() })).default([]),
  }),
});

export const collections = { blog };
