import type { APIRoute } from 'astro';
import { dugood, appLink, leisIncentivo } from '../config';

// Índice do site para agentes de IA (padrão llms.txt)
export const GET: APIRoute = ({ site }) => {
  const url = (p: string) => new URL(p, site).href;
  const texto = `# ${dugood.nome}

> ${dugood.descricao}

Contato comercial: ${dugood.email}. App para doadores: ${dugood.app}.

## Páginas

- [Para empresas](${url('/empresas')}): doação incentivada (empresas do lucro real direcionam parte do IRPJ a projetos aprovados: ${leisIncentivo.map((l) => l.nome).join(', ')}), benefícios para doadores como lojista parceiro, patrocínio de eventos e integração por API.
- [Para ONGs](${url('/ongs')}): página da ONG no app, doações pontuais e mensais (cartão e Pix), eventos com ingresso por QR Code, recibos de incentivo fiscal com assinatura digital, painel de doadores e captação de projetos incentivados com empresas.
- [Eventos sociais](${url('/eventos')}): organizadores criam eventos em que a inscrição é uma doação para a ONG escolhida (100% para ela), com times, ingresso por QR Code e check-in pelo celular.

## Regras importantes

- Como regra, a doação vai direto para a conta da ONG no provedor de pagamento (Stripe); a DuGood não recebe nem guarda os valores.
- Quem doa paga só o valor escolhido. A remuneração da DuGood nas causas incentivadas é combinada com cada ONG em contrato.
- A DuGood não garante dedução fiscal: depende da lei, do projeto e da situação fiscal de quem doa.
- Termos de uso: ${appLink('TermsAndConditions')}. Privacidade: ${appLink('PrivacyPolicy')}.
`;
  return new Response(texto, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
