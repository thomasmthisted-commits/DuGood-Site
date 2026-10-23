import type { Aba, Item, ItemIcone, Pagina, Secao } from './tipos';
import { cabecalho, juntar, lista, numerada, perguntas, secao } from '../lib/markdown';

export const pagina: Pagina = {
  rota: '/eventos',
  nome: 'Eventos sociais',
  titulo: 'Eventos sociais na DuGood: inscrição que vira doação',
  descricao:
    'Organize corridas, torneios e jantares beneficentes: a inscrição é uma doação para a ONG escolhida, com ingresso por QR Code e check-in pelo celular.',
  resumo:
    'Na DuGood, organizadores criam eventos sociais (corridas, torneios, jantares e festas beneficentes) em que cada inscrição é uma doação para a ONG escolhida, que recebe 100% do valor. O participante recebe o ingresso com QR Code por e-mail, e a entrada é validada pelo celular. Também dá para fazer competição de arrecadação entre times.',
  servico: {
    nome: 'Eventos sociais com inscrição por doação',
    tipo: 'Gestão de inscrições e ingressos para eventos beneficentes',
    publico: 'Organizadores de eventos, coletivos, times e empresas',
    descricao:
      'Criação de eventos beneficentes em favor de uma ONG da plataforma, com inscrição por doação, ingresso por QR Code, check-in pelo celular e doação por times.',
  },
  perguntas: [
    {
      p: 'Quanto custa organizar um evento na DuGood?',
      r: 'A DuGood não cobra comissão sobre as inscrições, diferente de muitas plataformas de ingressos. Em cada pagamento incidem só as tarifas do meio de pagamento (cartão ou Pix), e o evento pode deixar que o participante cubra essas tarifas.',
    },
    {
      p: 'Quem recebe o dinheiro das inscrições?',
      r: 'A ONG escolhida pelo organizador, que recebe 100% das doações. O evento só vai ao ar depois que a ONG aceita; se ela recusar, o organizador pode convidar outra.',
    },
    {
      p: 'Preciso ser uma ONG para organizar um evento?',
      r: 'Não. Pessoas, coletivos, times e empresas podem organizar eventos em favor de uma ONG da plataforma. A própria ONG também pode criar eventos pelo painel dela.',
    },
    {
      p: 'Como funciona o ingresso?',
      r: 'Cada inscrição gera um ingresso com QR Code, enviado no e-mail de confirmação. Na entrada, o organizador, a ONG ou um lojista parceiro escaneia o ingresso pelo celular.',
    },
    {
      p: 'Dá para fazer uma competição entre times?',
      r: 'Dá. Com a doação por times, o participante escolhe o time na inscrição, e a arrecadação e os ingressos validados saem separados por time.',
    },
    {
      p: 'Como eu começo?',
      r: 'Preencha o formulário desta página. A DuGood cria o seu acesso de organizador e ajuda a montar o primeiro evento e a escolher a ONG, se vocês ainda não tiverem uma.',
    },
  ],
};

export const heroi = {
  rotulo: 'Eventos sociais',
  titulo: 'Seu evento, 100% a favor de uma causa.',
  lead: 'Corridas, torneios, jantares e festas beneficentes: o organizador cria o evento na DuGood, escolhe a ONG que recebe as doações e cuida das inscrições e da entrada, com ingresso por QR Code. Sem a comissão por inscrição cobrada por outras plataformas.',
};

export const passos: Secao & { itens: Item[] } = {
  rotulo: 'Como funciona',
  titulo: 'A inscrição é a doação.',
  lead: 'Quem se inscreve doa para a ONG e recebe o ingresso por e-mail. Sem planilha de pagamentos e sem lista no papel na porta.',
  itens: [
    { titulo: 'Crie o evento', texto: 'Data, horário, local, prazo de inscrição, meta e doação mínima, com fotos e descrição.' },
    { titulo: 'Escolha a ONG', texto: 'Ela recebe 100% das doações. O evento vai ao ar assim que a ONG aceitar; se recusar, dá para convidar outra.' },
    { titulo: 'Inscrições abertas', texto: 'Cada inscrição é uma doação e gera um ingresso com QR Code no e-mail de confirmação.' },
    { titulo: 'Check-in na entrada', texto: 'O celular lê o ingresso e confirma a presença, com o histórico de todas as validações.' },
  ],
};

export const recursos: ItemIcone[] = [
  { icone: 'coracao', titulo: 'Sem comissão da DuGood', texto: 'A DuGood não cobra comissão sobre as inscrições. Incidem só as tarifas do meio de pagamento, que o participante pode cobrir.' },
  { icone: 'times', titulo: 'Times', texto: 'Doação por time: o participante escolhe o seu na inscrição, e a competição também é de arrecadação.' },
  { icone: 'qr', titulo: 'Quem valida', texto: 'O ingresso pode ser escaneado pelo organizador, pela ONG ou por um lojista parceiro que recebe o evento.' },
  { icone: 'megafone', titulo: 'Vitrine no app', texto: 'O evento aparece em Eventos Beneficentes, para os doadores da DuGood, e tem link próprio para divulgar.' },
];

export const historia: Secao = {
  rotulo: 'De onde viemos',
  titulo: 'A DuGood nasceu num evento beneficente.',
  lead: 'A ideia surgiu na organização do Ecoswim, uma competição beneficente de natação da Poli-USP. Engajar as pessoas e deixar claro para onde ia cada doação era difícil. Os eventos da DuGood resolvem justamente isso.',
};

export const painel: Secao & { abas: Aba[] } = {
  rotulo: 'Painel do organizador',
  titulo: 'O evento inteiro na palma da mão.',
  abas: [
    {
      aba: 'Meus eventos',
      texto: 'Crie o evento, escolha a ONG que recebe as doações e acompanhe a arrecadação e os times.',
      print: 'organizador-eventos',
      pendente: 'Painel do organizador, aba "Meus Eventos", com um evento aprovado e outro aguardando a ONG',
    },
    {
      aba: 'Novo evento',
      texto: 'Data, horário, local, prazo de inscrição, meta, doação mínima, fotos e a mensagem do e-mail de confirmação.',
      print: 'organizador-novo-evento',
      pendente: 'Formulário de criação de evento no painel do organizador',
    },
    {
      aba: 'Inscritos',
      texto: 'A lista de inscritos de cada evento, separada por time quando houver times.',
      print: 'organizador-inscritos',
      pendente: 'Painel do organizador, aba "Inscritos" (use um evento de teste ou borre nomes)',
    },
    {
      aba: 'Escanear ingressos',
      texto: 'Na entrada, o celular lê o QR Code do ingresso e confirma a presença com um toque.',
      print: 'organizador-scanner',
      pendente: 'Painel do organizador: scanner de ingressos com uma validação confirmada',
    },
  ],
};

export const outros: ItemIcone[] = [
  { icone: 'folha', titulo: 'É uma ONG?', texto: 'A ONG cria eventos direto no próprio painel, ou aceita os eventos que organizadores propõem em favor dela.', href: '/ongs' },
  { icone: 'estrela', titulo: 'É uma empresa?', texto: 'Patrocine um evento social ou receba o evento no seu espaço, validando os ingressos como lojista parceiro.', href: '/empresas' },
];

export const contato = {
  titulo: 'Vamos tirar o seu evento do papel.',
  lead: 'Conte o que vocês estão planejando. Ajudamos a montar o evento na plataforma e a encontrar a ONG certa, se ainda não tiverem uma.',
  formulario: 'Quero organizar um evento',
};

export const markdown = (site: URL | undefined) =>
  juntar(
    cabecalho(pagina, site),
    secao(passos.titulo, passos.lead, numerada(passos.itens)),
    secao('Recursos', lista(recursos.map((i) => ({ titulo: `${i.titulo}:`, texto: i.texto })))),
    secao(painel.titulo, lista(painel.abas.map((a) => ({ titulo: `${a.aba}:`, texto: a.texto })))),
    secao(historia.titulo, historia.lead),
    perguntas(pagina.perguntas),
    secao('Contato', `${contato.lead} Formulário em ${new URL('/eventos#contato', site).href}.`),
  );
