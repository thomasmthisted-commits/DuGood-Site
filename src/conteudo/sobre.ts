import type { Item, Pagina } from './tipos';
import { fundadores } from '../config';
import { cabecalho, juntar, lista, perguntas, secao } from '../lib/markdown';

// Textos da página Quem somos do app (história, trajetória, ecossistema e fundadores)
export const pagina: Pagina = {
  rota: '/sobre',
  nome: 'Sobre nós',
  tipo: 'AboutPage',
  titulo: 'Sobre a DuGood: nossa história e quem somos',
  descricao:
    'Como a DuGood nasceu de uma competição beneficente de natação da Poli-USP, a trajetória até o lançamento e quem são os fundadores: Nicollas, Thomas e André.',
  resumo:
    'A DuGood nasceu em 2023 como projeto de faculdade de Nicollas, que buscava resolver o desengajamento nas doações do Ecoswim, competição beneficente de natação da Poli-USP. Com o irmão Thomas e o amigo André, a ideia virou uma rede do bem que conecta doadores, ONGs e marcas, lançada em 2025.',
  perguntas: [
    {
      p: 'Quem fundou a DuGood?',
      r: 'Nicollas e Thomas, engenheiros pela Escola Politécnica da USP e ex-diretores gerais do Ecoswim, e André, publicitário formado pela ESPM e amigo de infância dos dois.',
    },
    {
      p: 'Como a DuGood começou?',
      r: 'Em 2023, como projeto de faculdade de Nicollas, para resolver um problema que ele enfrentou na organização do Ecoswim: era difícil engajar pessoas na arrecadação, e a experiência de doação poderia ser mais clara e próxima.',
    },
    { p: 'Quando a DuGood foi lançada?', r: 'Em 2025, depois da construção do MVP no fim de 2024.' },
  ],
};

export const heroi = {
  rotulo: 'Sobre nós',
  titulo: 'Uma rede do bem que nasceu na beira da piscina.',
  lead: 'A DuGood começou numa competição beneficente de natação e virou uma plataforma que conecta quem doa, as ONGs e as marcas. Esta é a nossa história.',
};

export const proposito: Item[] = [
  { titulo: 'Missão', texto: 'Garantir que ajudar o próximo seja simples, confiável e ainda mais recompensador.' },
  { titulo: 'Visão', texto: 'Um mundo onde ajudar o próximo faça parte da rotina de todos.' },
  { titulo: 'Valores', texto: 'Transparência inegociável, impacto real e simplicidade.' },
];

export const historia = {
  rotulo: 'Como foi',
  titulo: 'O início da DuGood',
  paragrafos: [
    'A sementinha da DuGood foi plantada em 2023, inicialmente como um projeto de faculdade de um dos fundadores, Nicollas. Durante noites e noites quebrando a cabeça, ele buscava resolver um problema que havia enfrentado enquanto atuava na organização de um evento beneficente.',
    'Nicollas, nadador desde os seis anos de idade, cursou Engenharia Ambiental na Poli-USP e foi diretor de marketing do Ecoswim, uma competição beneficente organizada pela equipe de natação da faculdade. Em meio à experiência, algumas pontas soltas começaram a chamar atenção: parecia cada vez mais difícil engajar pessoas na arrecadação, e a experiência de doação poderia ser muito mais clara e próxima.',
    'Quando seu irmão Thomas entrou na plataforma para contribuir, encontrou apenas um botão de "Doe agora", sem entender exatamente para onde o dinheiro seria destinado. Depois de tentar, e não conseguir, fazer uma doação direcionada, chamou Nicollas para conversar. O que começou como uma troca de ideias virou horas de discussão, questionamentos e possibilidades. Foi ali que a semente da DuGood começou a germinar.',
    'Thomas, mais conhecido entre nós como Toti, cursou Engenharia de Produção na Poli-USP e também fez parte da equipe de natação, tornando-se depois Diretor Geral do Ecoswim. A ideia inicial parecia simples: como permitir que as pessoas direcionassem suas doações para causas específicas dentro de ONGs sérias e confiáveis? Mas, conforme aprofundavam o problema, perceberam que o desafio era maior.',
    'Não bastava depender apenas da boa vontade das pessoas. Era preciso criar algo que gerasse engajamento contínuo, fortalecesse o hábito de ajudar e contribuísse para gerar receita mais estável para as organizações.',
    'Foi então que surgiu uma visão maior: criar uma rede do bem, onde ajudar o próximo se tornasse parte do dia a dia. Um espaço em que as pessoas fossem incentivadas a fazer a diferença e recebessem, além da satisfação de contribuir, benefícios reais que pudessem aproveitar sozinhas, com amigos ou com a família. Mas ainda faltava uma peça importante: como convencer marcas parceiras a fazer parte disso?',
    'Em uma viagem, Nicollas e Thomas compartilharam a ideia com André, amigo dos dois desde a infância. André cursou Comunicação e Publicidade na ESPM e rapidamente enxergou o potencial da proposta: as marcas não estariam apenas oferecendo benefícios; estariam apoiando causas de impacto social, fortalecendo iniciativas ligadas a ESG, criando conexões genuínas com novos públicos e participando ativamente de algo maior.',
    'A história da DuGood ainda está sendo escrita. A semente já brotou e continua crescendo todos os dias. E, como tudo que vale a pena construir, precisa de cuidado, pessoas e propósito para continuar florescendo. É por isso que contamos com nossos parceiros, apoiadores e doadores para seguir cultivando essa jornada.',
  ],
  destaque: 'Como permitir que as pessoas direcionassem suas doações para causas específicas dentro de ONGs sérias e confiáveis?',
};

export const trajetoria: { quando: string; titulo: string; texto: string }[] = [
  { quando: '2023', titulo: 'A semente', texto: 'Nicollas, buscando resolver o desengajamento nas doações do Ecoswim, começa a esboçar o que viria a ser a DuGood como projeto de faculdade.' },
  { quando: 'Início de 2024', titulo: 'A conversa que mudou tudo', texto: 'Thomas tenta fazer uma doação direcionada e não consegue. Liga para o irmão. Uma conversa que deveria durar minutos vira horas, e a DuGood começa a tomar forma.' },
  { quando: 'Meados de 2024', titulo: 'O time completo', texto: 'Em uma viagem, André enxerga como as marcas parceiras poderiam se encaixar no ecossistema. Os três fundadores se unem, e a DuGood ganha seu formato definitivo.' },
  { quando: 'Final de 2024', titulo: 'Construindo o MVP', texto: 'As primeiras ONGs parceiras são mapeadas, o modelo de gamificação e benefícios é estruturado e o desenvolvimento da plataforma começa.' },
  { quando: '2025', titulo: 'Lançamento', texto: 'A DuGood vai ao ar. Doadores, ONGs e lojistas parceiros se conectam pela primeira vez em uma única plataforma.' },
];

export const ecossistema = {
  rotulo: 'Como está',
  titulo: 'O ecossistema DuGood',
  lead: 'A DuGood não é apenas uma plataforma de doações. É uma rede onde doadores, ONGs e marcas se conectam em torno de um propósito comum: fazer o bem fazer parte do dia a dia.',
  itens: [
    { titulo: 'Doadores', texto: 'Doam, ganham pontos e desbloqueiam benefícios reais.' },
    { titulo: 'ONGs', texto: 'Recebem doações direcionadas, com transparência e previsibilidade.' },
    { titulo: 'Marcas', texto: 'Apoiam causas de impacto, fortalecem o ESG e se conectam com um público consciente.' },
  ],
};

export const contato = {
  titulo: 'Seja parte da Rede do Bem.',
  lead: 'Se você representa uma ONG, uma marca ou simplesmente quer fazer parte dessa história, fale com a gente.',
};

export const markdown = (site: URL | undefined) =>
  juntar(
    cabecalho(pagina, site),
    secao('Missão, visão e valores', lista(proposito.map((i) => ({ titulo: `${i.titulo}:`, texto: i.texto })))),
    secao(historia.titulo, ...historia.paragrafos),
    secao('Nossa trajetória', trajetoria.map((t) => `- **${t.quando}, ${t.titulo.toLowerCase()}:** ${t.texto}`).join('\n')),
    secao(ecossistema.titulo, ecossistema.lead, lista(ecossistema.itens.map((i) => ({ titulo: `${i.titulo}:`, texto: i.texto })))),
    secao('Fundadores', lista(fundadores.map((f) => `**${f.nome}**, cofundador: ${f.bio} (${f.linkedin})`))),
    perguntas(pagina.perguntas),
  );
