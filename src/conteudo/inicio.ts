import type { Item, Pagina } from './tipos';
import { pontos, propositoMarkdown } from './comum';
import { dugood, fundadores } from '../config';
import { cabecalho, juntar, lista, perguntas, secao } from '../lib/markdown';
import { pagina as empresas } from './empresas';
import { pagina as ongs } from './ongs';
import { pagina as eventos } from './eventos';

export const pagina: Pagina = {
  rota: '/',
  nome: 'Início',
  titulo: 'DuGood para empresas, ONGs e eventos sociais',
  descricao:
    'A DuGood conecta doadores, ONGs e marcas: doação incentivada e benefícios para empresas, captação para ONGs e eventos sociais com inscrição por doação.',
  resumo: `${dugood.descricao} Este site apresenta a DuGood para empresas, ONGs e organizadores de eventos sociais; quem quer doar usa o app em ${dugood.app}.`,
  perguntas: [
    { p: 'O que é a DuGood?', r: dugood.descricao },
    {
      p: 'A DuGood é uma ONG?',
      r: 'Não. A DuGood é uma plataforma de tecnologia para doações. As doações vão para as ONGs: como regra, caem direto na conta da organização no provedor de pagamento, e a DuGood não recebe nem guarda os valores.',
    },
    {
      p: 'Como funciona para quem doa?',
      r: `No app (${dugood.app}), a pessoa escolhe uma ONG, causa ou evento e doa com cartão ou Pix, uma vez ou todo mês. ${pontos}`,
    },
    {
      p: 'Quem fundou a DuGood?',
      r: `${fundadores.map((f) => f.nome).join(', ').replace(/, ([^,]*)$/, ' e $1')}. A ideia surgiu em 2023, na organização do Ecoswim, uma competição beneficente de natação da Poli-USP.`,
    },
    {
      p: 'Como falar com a DuGood?',
      r: `Pelo formulário da página de empresas, de ONGs ou de eventos sociais, ou pelo e-mail ${dugood.email}.`,
    },
  ],
};

export const heroi = {
  rotulo: 'A Rede do Bem',
  titulo: 'Fazer o bem, parte do dia a dia.',
  lead: 'A DuGood é uma plataforma de doações onde doadores, ONGs e marcas se conectam. Quem doa acumula pontos e desbloqueia benefícios; as ONGs recebem doações direcionadas, com transparência; e as empresas apoiam causas com impacto real.',
};

export const filme = {
  rotulo: 'Em 2 minutos',
  titulo: 'Conheça a DuGood.',
  /** Arquivo em public/ (MP4 com faststart, até 25 MB por causa do limite do Cloudflare) */
  arquivo: '/filme/dugood.mp4',
  /** Duração no formato ISO 8601, para o JSON-LD */
  duracao: 'PT2M4S',
  publicado: '2026-10-29',
  descricao:
    'Filme institucional da DuGood: quem somos e os fundadores, missão, visão e valores e as três frentes de atuação (ONGs, marcas e Lei de Incentivo ao Esporte), com o painel gratuito para ONGs, os eventos em que a inscrição vira doação, os benefícios das marcas para quem doa e a curadoria dos projetos incentivados.',
};

export const publicos = [
  { pagina: empresas, botao: 'Sou empresa', rotulo: 'Para empresas', titulo: 'Doação incentivada e benefícios', texto: 'Apoiador da plataforma, com benefícios para quem doa, ou doação incentivada com curadoria e segurança. Sem custo para a empresa.' },
  { pagina: ongs, botao: 'Sou uma ONG', rotulo: 'Para ONGs', titulo: 'Doações, eventos e recibos', texto: 'Taxa zero da DuGood, com CRM de captação, gestão de doadores e gestão financeira grátis.' },
  { pagina: eventos, botao: 'Organizo eventos', rotulo: 'Para organizadores', titulo: 'Eventos sociais', texto: 'Todos podem contribuir: de eventos pequenos a eventos de 20 mil pessoas, a inscrição vira doação, sem comissão da DuGood.' },
];

export const rede: { titulo: string; rotulo: string; itens: Item[] } = {
  rotulo: 'Como a rede funciona',
  titulo: 'Cada doação movimenta as três pontas.',
  itens: [
    { titulo: 'Doadores', texto: 'doam para causas específicas, acumulam pontos e desbloqueiam benefícios reais.' },
    { titulo: 'ONGs', texto: 'recebem doações direcionadas, com transparência e mais previsibilidade de receita.' },
    { titulo: 'Marcas', texto: 'apoiam causas com impacto, fortalecem a agenda ESG e se conectam com um público consciente.' },
  ],
};

export const proposito = {
  rotulo: 'Quem somos',
  titulo: 'Simples, confiável e ainda mais recompensador.',
};

export const contato = {
  titulo: 'Seja parte da Rede do Bem.',
  lead: 'Conte quem você é e o que tem em mente: a equipe da DuGood responde pelo e-mail ou WhatsApp que você informar.',
};

export const markdown = (site: URL | undefined) =>
  juntar(
    cabecalho(pagina, site),
    secao(`Filme: ${filme.titulo}`, `${filme.descricao} Vídeo (2 min): ${new URL(filme.arquivo, site).href}`),
    secao(
      'Para quem',
      lista(publicos.map((p) => `[${p.rotulo}](${new URL(`${p.pagina.rota}.md`, site).href}): ${p.pagina.resumo}`)),
    ),
    secao(rede.titulo, lista(rede.itens)),
    secao('Missão, visão e valores', propositoMarkdown()),
    secao('Fundadores', lista(fundadores.map((f) => `**${f.nome}**: ${f.bio} (${f.linkedin})`)), `História completa: ${new URL('/sobre.md', site).href}`),
    perguntas(pagina.perguntas),
  );
