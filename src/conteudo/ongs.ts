import type { Aba, Item, ItemIcone, Pagina, Secao } from './tipos';
import { politica, pontos } from './comum';
import { cabecalho, juntar, lista, numerada, perguntas, secao } from '../lib/markdown';

export const pagina: Pagina = {
  rota: '/ongs',
  nome: 'Para ONGs',
  titulo: 'DuGood para ONGs: doações, eventos e recibos',
  descricao:
    'Taxa zero da DuGood para ONGs: causas, doações mensais e eventos sem taxa, com CRM de captação, gestão de doadores e gestão financeira grátis.',
  resumo:
    'A DuGood é taxa zero para ONGs: não cobra taxa sobre as doações às causas, sobre as doações mensais nem sobre as inscrições de eventos, e oferece de graça o CRM de captação, a gestão de doadores e a gestão financeira. Só incidem as tarifas do meio de pagamento (Stripe), que o doador pode cobrir. A ONG ganha uma página no app, eventos com ingresso por QR Code e recibos de incentivo fiscal, e a DuGood leva projetos incentivados até as empresas.',
  servico: {
    nome: 'Plataforma de captação de doações para ONGs',
    tipo: 'Captação de doações, eventos beneficentes e recibos de incentivo fiscal',
    publico: 'Organizações sem fins lucrativos (ONGs)',
    descricao:
      'Página da ONG no app, doações pontuais e recorrentes, eventos com ingresso por QR Code, recibos de incentivo fiscal com assinatura digital, painel de doadores e captação de projetos incentivados com empresas.',
  },
  perguntas: [
    {
      p: 'A DuGood cobra alguma taxa da ONG?',
      r: 'Não sobre as causas, as doações mensais e os eventos: a DuGood é taxa zero, e as ferramentas do painel são gratuitas. Em cada pagamento incidem apenas as tarifas do meio de pagamento (cartão ou Pix), cobradas pelo Stripe, e a ONG pode deixar que o doador cubra essas tarifas. Nos projetos incentivados, a remuneração da DuGood é combinada com a ONG em contrato.',
    },
    {
      p: 'Quem pode entrar na DuGood?',
      r: 'Organizações sem fins lucrativos com CNPJ e documentação em dia. Antes de aprovar, a DuGood faz uma verificação cadastral e documental da organização.',
    },
    {
      p: 'O dinheiro passa pela DuGood?',
      r: 'Como regra, não. A doação é creditada direto na conta que a ONG mantém no provedor de pagamento (Stripe), conectada uma única vez pelo painel.',
    },
    {
      p: 'Já temos doadores. Perdemos esse histórico?',
      r: 'Não. Dá para importar o histórico por planilha, e ele entra na lista de doadores, nos filtros e nas análises junto com as doações feitas pelo app.',
    },
    {
      p: 'Como funcionam as doações para projetos incentivados?',
      r: 'A ONG cadastra a causa com a lei e o número do projeto aprovado. Essas doações têm valor mínimo de R$ 1.000, pedem os dados fiscais de quem doa e geram recibo assinado digitalmente pela plataforma.',
    },
    {
      p: 'Dá para receber doações mensais?',
      r: 'Sim. O doador escolhe doar todo mês no cartão e pode cancelar quando quiser. No painel, a ONG vê a previsão mensal das doações recorrentes.',
    },
  ],
};

export const heroi = {
  rotulo: 'DuGood para ONGs · Taxa zero',
  titulo: 'Taxa zero para a sua ONG captar mais.',
  lead: 'A DuGood não cobra taxa sobre as doações às suas causas, as doações mensais e os eventos. E o CRM de captação, a gestão de doadores e a gestão financeira são grátis.',
};

/** Taxa zero e ferramentas gratuitas */
export const taxaZero: Secao & { itens: ItemIcone[]; nota: string } = {
  rotulo: 'Taxa zero',
  titulo: 'O que é doado fica com a causa.',
  lead: 'Sem mensalidade, sem taxa sobre as doações e sem pagar pelas ferramentas. A ONG usa tudo de graça.',
  itens: [
    { icone: 'coracao', titulo: 'Doações sem taxa da DuGood', texto: 'A DuGood não fica com nenhuma parte das doações às suas causas, pontuais ou mensais.' },
    { icone: 'usuarios', titulo: 'CRM de captação e de doadores', texto: 'Doadores com contato, histórico e anotações, filtros, análise do público, doações recorrentes, sorteios e importação do histórico.' },
    { icone: 'grafico', titulo: 'Gestão financeira', texto: 'Arrecadação por causa, relatórios, previsão das doações mensais, recibos e acesso aos saldos e repasses da conta de recebimento.' },
    { icone: 'calendario', titulo: 'Eventos sem comissão', texto: 'Inscrições e ingressos com QR Code sem a comissão sobre cada inscrição cobrada por muitas plataformas de ingressos.' },
  ],
  nota: 'Em cada pagamento incidem só as tarifas do meio de pagamento (cartão ou Pix), cobradas pelo Stripe, e a ONG pode deixar que o doador cubra essas tarifas. Nos projetos incentivados, a remuneração da DuGood é combinada com a ONG em contrato.',
};

export const noApp: Secao = {
  rotulo: 'Sua ONG dentro do app',
  titulo: 'O doador encontra, conhece e doa em poucos toques.',
  lead: 'Em Explorar, os doadores chegam à página da ONG, veem o trabalho, as causas abertas e os eventos, e doam com cartão ou Pix, uma vez ou todo mês.',
};

export const voltam: Secao & { itens: ItemIcone[] } = {
  rotulo: 'Por que os doadores voltam',
  titulo: 'Doar vira hábito, e a ONG ganha previsibilidade.',
  lead: `${pontos} É um motivo a mais para voltar, e para doar todo mês.`,
  itens: [
    { icone: 'estrela', titulo: 'Pontos e níveis', texto: 'Bronze, Prata, Ouro e Platina: quem doa vê o próprio progresso.' },
    { icone: 'presente', titulo: 'Benefícios reais', texto: 'Descontos em marcas parceiras, desbloqueados pelas doações.' },
    { icone: 'repetir', titulo: 'Doação mensal', texto: 'Recorrência no cartão, com a previsão de receita no painel.' },
    { icone: 'usuarios', titulo: 'Comunidade', texto: 'Rankings e times que transformam a doação em movimento.' },
  ],
};

export const painel: Secao & { abas: Aba[] } = {
  rotulo: 'Painel da ONG',
  titulo: 'Da primeira causa ao recibo, tudo em um painel.',
  lead: 'Um tutorial guiado mostra cada aba no primeiro acesso, e a equipe da DuGood acompanha a ONG na entrada.',
  abas: [
    {
      aba: 'Suas causas',
      texto: 'Crie causas com meta, prazo e doação mínima, pré-visualize como o doador vê e envie atualizações a quem doou.',
      print: 'ong-painel-causas',
      pendente: 'Painel da ONG, aba "Suas Causas", com cards de causas ativas e em aprovação',
    },
    {
      aba: 'Perfil',
      texto: 'Logo, descrição, endereço, contatos e galeria de fotos e vídeos: exatamente o que o doador vê na página da ONG.',
      print: 'ong-painel-perfil',
      pendente: 'Painel da ONG, aba "Perfil", com os números do topo (total arrecadado, causas ativas)',
    },
    {
      aba: 'Eventos',
      texto: 'Eventos com data, local e prazo de inscrição. Cada doação gera um ingresso com QR Code, validado na entrada.',
      print: 'ong-painel-eventos',
      pendente: 'Painel da ONG, aba "Eventos": lista de inscritos e o scanner de ingressos',
    },
    {
      aba: 'Incentivos fiscais',
      texto: 'Projetos com dedução de IR, dados fiscais da ONG e o andamento de cada recibo, com assinatura digital.',
      print: 'ong-painel-fiscal',
      pendente: 'Painel da ONG, aba "Incentivos Fiscais": projetos e pipeline de recibos',
    },
    {
      aba: 'Doadores',
      texto: 'Quem apoia a ONG, quanto e quando, doações mensais previstas, composição do público e sorteios entre doadores.',
      print: 'ong-painel-doadores',
      pendente: 'Painel da ONG, aba "Doadores" (use uma ONG de teste ou borre nomes e contatos)',
    },
    {
      aba: 'Documentos',
      texto: 'Termos assinados digitalmente e documentos institucionais em um só lugar.',
      print: 'ong-painel-documentos',
      pendente: 'Painel da ONG, aba "Documentos", com os termos assinados',
    },
  ],
};

export const incentivados: Secao & { itens: Item[]; destaque: Item } = {
  rotulo: 'Projetos incentivados',
  titulo: 'Tem projeto aprovado em lei de incentivo? A DuGood ajuda a captar.',
  itens: [
    { titulo: 'Causa incentivada no app.', texto: 'Cadastre o projeto com a lei (Rouanet, Esporte, FIA, Idoso, PRONON e outras) e o número de aprovação.' },
    { titulo: 'Recibos sem planilha.', texto: 'A plataforma reúne os dados fiscais de quem doa e gera os recibos para a ONG assinar digitalmente.' },
    { titulo: 'Empresas apoiadoras.', texto: 'Para projetos da Lei de Incentivo ao Esporte, a DuGood prospecta empresas do lucro real a partir de dados públicos oficiais e conduz a abordagem.' },
    { titulo: 'Remuneração em contrato.', texto: 'Nas causas incentivadas, o que a DuGood recebe é combinado com a ONG em contrato próprio.' },
  ],
  destaque: {
    titulo: 'Para a empresa, é imposto que vira impacto.',
    texto: 'Empresas do lucro real podem destinar parte do IRPJ a projetos aprovados. Para muitas delas, o que falta é conhecer um bom projeto. A DuGood faz essa ponte.',
  },
};

export const passos: Secao & { itens: Item[] } = {
  rotulo: 'Como entrar',
  titulo: 'Quatro passos até a primeira doação.',
  itens: [
    { titulo: 'Conversa', texto: 'Preencha o formulário. Entendemos a ONG, as causas e o que vocês querem captar.' },
    { titulo: 'Cadastro e verificação', texto: 'A ONG completa o perfil e envia os documentos institucionais para a verificação.' },
    { titulo: 'Termos e recebimento', texto: 'Assinatura digital do termo de captação e conexão da conta de recebimento, uma única vez.' },
    { titulo: 'Primeira causa no ar', texto: 'A ONG cria a causa, a DuGood aprova e ela aparece no app para os doadores.' },
  ],
};

export const secaoPolitica: Secao & { itens: Item[] } = {
  rotulo: 'Nossa política',
  titulo: 'A ONG continua dona da relação com quem doa.',
  lead: 'Regras claras, nos Termos de Uso da DuGood.',
  itens: [
    politica.recebimento,
    { titulo: 'Taxa zero.', texto: 'A DuGood não cobra taxa sobre as doações às causas, as doações mensais e os eventos, e as ferramentas do painel são gratuitas.' },
    politica.autonomia,
    politica.dados,
  ],
};

export const contato = {
  titulo: 'Leve sua ONG para a DuGood.',
  lead: 'Conte um pouco sobre a organização. A equipe da DuGood entra em contato para apresentar a plataforma e os próximos passos.',
  itens: [
    { titulo: 'Apresentação', texto: 'da plataforma e do painel.' },
    { titulo: 'Apoio', texto: 'no cadastro e na primeira causa.' },
    { titulo: 'Captação incentivada,', texto: 'se a ONG tiver projeto aprovado.' },
  ],
  formulario: 'Quero conhecer a DuGood',
};

export const markdown = (site: URL | undefined) =>
  juntar(
    cabecalho(pagina, site),
    secao(taxaZero.titulo, taxaZero.lead, lista(taxaZero.itens.map((i) => ({ titulo: `${i.titulo}:`, texto: i.texto }))), taxaZero.nota),
    secao(noApp.titulo, noApp.lead),
    secao(voltam.titulo, voltam.lead, lista(voltam.itens.map((i) => ({ titulo: `${i.titulo}:`, texto: i.texto })))),
    secao(painel.titulo, painel.lead, lista(painel.abas.map((a) => ({ titulo: `${a.aba}:`, texto: a.texto })))),
    secao(incentivados.titulo, lista(incentivados.itens), incentivados.destaque.texto),
    secao(passos.titulo, numerada(passos.itens)),
    secao(secaoPolitica.titulo, lista(secaoPolitica.itens)),
    perguntas(pagina.perguntas),
    secao('Contato', `${contato.lead} Formulário em ${new URL('/ongs#contato', site).href}.`),
  );
