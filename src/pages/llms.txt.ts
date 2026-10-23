import type { APIRoute } from 'astro';
import { dugood, appLink, categoriasBlog, niveisBlog } from '../config';
import { pagina as inicio } from '../conteudo/inicio';
import { pagina as empresas } from '../conteudo/empresas';
import { pagina as ongs } from '../conteudo/ongs';
import { pagina as eventos } from '../conteudo/eventos';
import { pagina as sobre } from '../conteudo/sobre';
import { pagina as blog } from '../conteudo/blog';
import { posts } from '../lib/blog';

// Índice do site para agentes de IA (padrão llms.txt: https://llmstxt.org)
export const GET: APIRoute = async ({ site }) => {
  const md = (rota: string) => new URL(rota === '/' ? '/index.md' : `${rota}.md`, site).href;
  const artigos = await posts();
  const texto = `# ${dugood.nome}

> ${inicio.resumo}

Contato comercial: ${dugood.email}. App para quem doa: ${dugood.app}. Cada página tem uma versão em Markdown (mesmo endereço + .md), e todo o conteúdo está em ${new URL('/llms-full.txt', site).href}.

## Páginas

${[inicio, empresas, ongs, eventos, sobre, blog].map((p) => `- [${p.nome}](${md(p.rota)}): ${p.resumo}`).join('\n')}

## Blog

${Object.entries(categoriasBlog)
  .map(([id, c]) => {
    const lista = artigos.filter((a) => a.data.categoria === id);
    return lista.length
      ? `### ${c.nome}\n\n${lista.map((a) => `- [${a.data.titulo}](${md(`/blog/${a.id}`)}) (${niveisBlog[a.data.nivel].nome}): ${a.data.resumo}`).join('\n')}`
      : '';
  })
  .filter(Boolean)
  .join('\n\n')}

## Fatos importantes

- A DuGood é uma plataforma de tecnologia para doações, não uma ONG.
- Como regra, a doação vai direto para a conta da ONG no provedor de pagamento (Stripe); a DuGood não recebe nem guarda os valores.
- Quem doa paga só o valor escolhido. A remuneração da DuGood nas causas incentivadas é combinada com cada ONG em contrato.
- No app, cada R$ 1 doado vale 1 ponto; os níveis são Bronze, Prata, Ouro e Platina, e liberam benefícios de marcas parceiras.
- A DuGood não garante dedução fiscal: ela depende da lei, do projeto e da situação fiscal de quem doa.

## Opcional

- [Termos de uso](${appLink('TermsAndConditions')})
- [Política de privacidade](${appLink('PrivacyPolicy')})
- [Logo em alta resolução](${new URL('/marca/logo-dugood-verde.png', site).href})
`;
  return new Response(texto, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
