// Dados estruturados schema.org (JSON-LD). Nada de texto escondido na página: o que os
// buscadores e agentes de IA precisam saber vai aqui, nas versões .md e no llms.txt.
import type { Pagina } from '../conteudo/tipos';
import { dugood, fundadores, instagramLink } from '../config';
import { filme as dadosFilme } from '../conteudo/inicio';
import { getImage } from 'astro:assets';
import capa from '../assets/filme-capa.jpg';

const id = (site: URL | undefined, ancora: string) => new URL(`/#${ancora}`, site).href;

export function organizacao(site: URL | undefined) {
  return {
    '@type': 'Organization',
    '@id': id(site, 'organizacao'),
    name: dugood.nome,
    description: dugood.descricao,
    slogan: dugood.slogan,
    url: new URL('/', site).href,
    logo: { '@type': 'ImageObject', url: new URL('/logo.png', site).href },
    email: dugood.email,
    founder: fundadores.map((f) => ({ '@type': 'Person', name: f.nome, description: f.bio, sameAs: [f.linkedin] })),
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', email: dugood.email, availableLanguage: ['pt-BR', 'en'] }],
    sameAs: [dugood.app, instagramLink],
    knowsAbout: ['Doação incentivada', 'Leis de incentivo fiscal', 'Captação de recursos para ONGs', 'Eventos beneficentes', 'ESG'],
  };
}

/** extras: nós a mais no grafo (ex.: o BlogPosting de um artigo) */
export function grafo(pagina: Pagina, site: URL | undefined, imagem: string, atualizado: string, extras: object[] = []) {
  const url = new URL(pagina.rota, site).href;
  const nos: object[] = [
    organizacao(site),
    {
      '@type': 'WebSite',
      '@id': id(site, 'site'),
      name: `${dugood.nome} para empresas, ONGs e eventos`,
      url: new URL('/', site).href,
      inLanguage: 'pt-BR',
      publisher: { '@id': id(site, 'organizacao') },
    },
    {
      '@type': pagina.tipo ?? 'WebPage',
      '@id': `${url}#pagina`,
      url,
      name: pagina.titulo,
      description: pagina.descricao,
      abstract: pagina.resumo,
      inLanguage: 'pt-BR',
      isPartOf: { '@id': id(site, 'site') },
      about: { '@id': id(site, 'organizacao') },
      primaryImageOfPage: { '@type': 'ImageObject', url: imagem },
      dateModified: atualizado,
      ...(pagina.rota !== '/' && { breadcrumb: { '@id': `${url}#migalhas` } }),
      ...(pagina.servico && { mainEntity: { '@id': `${url}#servico` } }),
    },
  ];

  if (pagina.rota !== '/') {
    nos.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#migalhas`,
      itemListElement: [
        ...[{ nome: 'Início', rota: '/' }, ...(pagina.migalhas ?? []), { nome: pagina.nome, rota: pagina.rota }].map((m, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: m.nome,
          item: new URL(m.rota, site).href,
        })),
      ],
    });
  }

  if (pagina.servico) {
    nos.push({
      '@type': 'Service',
      '@id': `${url}#servico`,
      name: pagina.servico.nome,
      serviceType: pagina.servico.tipo,
      description: pagina.servico.descricao,
      provider: { '@id': id(site, 'organizacao') },
      audience: { '@type': 'Audience', audienceType: pagina.servico.publico },
      areaServed: { '@type': 'Country', name: 'Brasil' },
      availableChannel: { '@type': 'ServiceChannel', serviceUrl: `${url}#contato`, availableLanguage: 'pt-BR' },
    });
  }

  if (pagina.perguntas.length) {
    nos.push({
      '@type': 'FAQPage',
      '@id': `${url}#perguntas`,
      mainEntity: pagina.perguntas.map((q) => ({ '@type': 'Question', name: q.p, acceptedAnswer: { '@type': 'Answer', text: q.r } })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': [...nos, ...extras] };
}

/** VideoObject do filme institucional (página inicial) */
export async function filme(site: URL | undefined) {
  const imagem = await getImage({ src: capa, width: 1280, format: 'webp' });
  return {
    '@type': 'VideoObject',
    '@id': id(site, 'filme'),
    name: `${dadosFilme.titulo.replace(/\.$/, '')} em 2 minutos`,
    description: dadosFilme.descricao,
    thumbnailUrl: new URL(imagem.src, site).href,
    contentUrl: new URL(dadosFilme.arquivo, site).href,
    uploadDate: dadosFilme.publicado,
    duration: dadosFilme.duracao,
    inLanguage: 'pt-BR',
    publisher: { '@id': id(site, 'organizacao') },
  };
}
