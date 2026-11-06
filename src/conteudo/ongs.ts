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
    'A DuGood é taxa zero para ONGs: não cobra taxa sobre as doações às causas, sobre as doações mensais nem sobre as inscrições de eventos, e reúne num só painel, de graça, tudo o que a ONG precisa: CRM de captação, gestão de doadores, eventos, recibos de incentivo fiscal e gestão financeira, com o relatório mensal de captação gerado automaticamente. Só incidem as tarifas do meio de pagamento (Stripe), que o doador pode cobrir. A ONG ganha uma página no app, eventos com ingresso por QR Code e recibos de incentivo fiscal, e a DuGood leva projetos incentivados até as empresas.',
  servico: {
    nome: 'Plataforma de captação de doações para ONGs',
    tipo: 'Captação de doações, eventos beneficentes e recibos de incentivo fiscal',
    publico: 'Organizações sem fins lucrativos (ONGs)',
    descricao:
      'Página da ONG no app, doações pontuais e recorrentes, eventos com ingresso por QR Code, recibos de incentivo fiscal com assinatura digital, painel de doadores, extrato financeiro, relatório mensal de captação automático e captação de projetos incentivados com empresas.',
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
      p: 'A DuGood gera relatórios para a prestação de contas?',
      r: 'Sim. Todo mês encerrado tem o relatório de captação salvo automaticamente, desde a entrada da ONG, e o PDF sai com um clique no painel: quanto a ONG captou, de onde veio o dinheiro, o valor líquido recebido, a evolução mês a mês, os eventos e as causas. O extrato mostra cada doação, tarifa e repasse da conta de recebimento. É um resumo gerencial, que não substitui os demonstrativos contábeis.',
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
  lead: 'A DuGood não cobra taxa sobre as doações às suas causas, as doações mensais e os eventos. E todas as ferramentas que a ONG precisa ficam num só painel, de graça.',
};

/** Taxa zero e ferramentas gratuitas */
export const taxaZero: Secao & { itens: ItemIcone[]; nota: string } = {
  rotulo: 'Taxa zero',
  titulo: 'Todas as ferramentas da ONG em um só lugar. E de graça.',
  lead: 'Captação, doadores, eventos, incentivos fiscais e financeiro no mesmo painel. Sem mensalidade, sem taxa sobre as doações e sem pagar pelas ferramentas.',
  itens: [
    { icone: 'coracao', titulo: 'Doações sem taxa da DuGood', texto: 'A DuGood não fica com nenhuma parte das doações às suas causas, pontuais ou mensais.' },
    { icone: 'usuarios', titulo: 'CRM de captação e de doadores', texto: 'Doadores com contato, histórico e anotações, filtros, análise do público, doações recorrentes, sorteios e importação do histórico.' },
    { icone: 'grafico', titulo: 'Gestão financeira', texto: 'Extrato com cada doação, tarifa e repasse, relatório mensal de captação gerado automaticamente e previsão das doações mensais.' },
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
  lead: 'O menu segue o dia a dia da ONG: captação, eventos, incentivos fiscais, doadores, instituição e financeiro. Cada tela tem um tutorial curto, e a equipe da DuGood acompanha a ONG na entrada.',
  abas: [
    {
      aba: 'Visão geral',
      texto: 'Total arrecadado, doações, doadores e doadores mensais, a arrecadação mês a mês e as pendências do dia a dia logo na entrada.',
      print: 'ong-painel-geral',
      pendente: 'Painel da ONG, tela "Visão geral", com os números, as pendências e o gráfico por mês',
    },
    {
      aba: 'Suas causas',
      texto: 'Cada causa tem a sua página: arrecadado e meta, doações com busca e exportação, atualizações para quem doou e link com QR Code para divulgar.',
      print: 'ong-painel-causas',
      pendente: 'Painel da ONG, página de uma causa com arrecadado, doações e doadores',
    },
    {
      aba: 'Eventos',
      texto: 'Inscritos, times, check-ins e ingressos a validar de cada evento, com o scanner de QR Code na entrada. Eventos propostos por organizadores chegam para a ONG aprovar.',
      print: 'ong-painel-eventos',
      pendente: 'Painel da ONG, página de um evento com inscritos e check-ins',
    },
    {
      aba: 'Doadores',
      texto: 'Quem apoia a ONG, quanto e quando, com contato, filtros, análise do público e importação do histórico por planilha.',
      print: 'ong-painel-doadores',
      pendente: 'Painel da ONG, tela "Doadores" (use uma ONG de teste ou borre nomes e contatos)',
    },
    {
      aba: 'Doações recorrentes',
      texto: 'Quem doa todo mês, o total esperado por mês, a previsão para 12 meses e os cancelamentos com o motivo.',
      print: 'ong-painel-recorrentes',
      pendente: 'Painel da ONG, tela "Doações recorrentes", com o total esperado por mês',
    },
    {
      aba: 'Sorteios',
      texto: 'Crie o sorteio, deixe salvo e sorteie entre os doadores ou inscritos quando quiser. O sorteio é feito pela DuGood e fica registrado para conferência.',
      print: 'ong-painel-sorteios',
      pendente: 'Painel da ONG, tela "Sorteios", com um sorteio salvo e um realizado',
    },
    {
      aba: 'Incentivos fiscais',
      texto: 'Projetos com dedução de IR, dados fiscais da ONG e o andamento de cada recibo, com assinatura digital.',
      print: 'ong-painel-fiscal',
      pendente: 'Painel da ONG, tela "Doações incentivadas": pipeline de recibos',
    },
    {
      aba: 'Perfil e documentos',
      texto: 'Logo, descrição, contatos e galeria, exatamente como o doador vê, mais os termos assinados e os documentos institucionais.',
      print: 'ong-painel-perfil',
      pendente: 'Painel da ONG, tela "Perfil", com os números do topo e as causas',
    },
  ],
};

/** Gestão financeira e relatórios automáticos */
export const financeiro: Secao & { itens: Item[] } = {
  rotulo: 'Gestão financeira',
  titulo: 'As contas da ONG em dia, e o relatório do mês pronto sozinho.',
  lead: 'Tudo o que entrou, o que a Stripe cobrou e o que foi repassado para a conta bancária, no painel. E todo mês o relatório de captação fica salvo, sem ninguém precisar montar planilha.',
  itens: [
    { titulo: 'Extrato.', texto: 'Cada doação com doador, causa ou evento, forma de pagamento, tarifa da Stripe e valor líquido, além dos repasses. Filtros por causa, evento e meio de pagamento, e exportação em CSV.' },
    { titulo: 'Relatório mensal automático.', texto: 'Todo mês encerrado tem o relatório de captação salvo, desde a entrada da ONG na DuGood. O PDF sai com um clique: quanto a ONG captou, de onde veio o dinheiro, o valor líquido, a evolução mês a mês, os eventos, as causas e os maiores doadores.' },
    { titulo: 'Prestação de contas.', texto: 'Um resumo pronto para levar ao conselho, a parceiros e a quem apoia a ONG.' },
    { titulo: 'Previsão de receita.', texto: 'As doações mensais ativas viram o total esperado por mês e a previsão para os próximos 12 meses.' },
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
    secao(financeiro.titulo, financeiro.lead, lista(financeiro.itens)),
    secao(incentivados.titulo, lista(incentivados.itens), incentivados.destaque.texto),
    secao(passos.titulo, numerada(passos.itens)),
    secao(secaoPolitica.titulo, lista(secaoPolitica.itens)),
    perguntas(pagina.perguntas),
    secao('Contato', `${contato.lead} Formulário em ${new URL('/ongs#contato', site).href}.`),
  );
