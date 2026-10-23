import type { Aba, Item, ItemIcone, Pagina, Secao } from './tipos';
import { politica, pontos } from './comum';
import { leisIncentivo, niveis } from '../config';
import { cabecalho, juntar, lista, numerada, perguntas, secao } from '../lib/markdown';

export const pagina: Pagina = {
  rota: '/empresas',
  nome: 'Para empresas',
  titulo: 'DuGood para empresas: doação incentivada e benefícios',
  descricao:
    'Seja apoiador da plataforma, com benefícios para quem doa, ou faça a doação incentivada com curadoria e segurança. Sem custo para a empresa estar na DuGood.',
  resumo:
    'Empresas participam da DuGood por dois caminhos, sem pagar nada para estar na plataforma. Como apoiadora da plataforma (livre doação), qualquer empresa se associa à comunidade e oferece benefícios, como cupons, QR Codes e links, a quem doa pelo app. Na doação incentivada, empresas do lucro real destinam parte do IRPJ a projetos sociais aprovados, com a DuGood como apoio consultivo em curadoria, segurança, transparência e em todo o passo a passo até o recibo.',
  servico: {
    nome: 'Doação incentivada e benefícios para empresas',
    tipo: 'Captação de doação incentivada e programa de benefícios para marcas',
    publico: 'Empresas e marcas',
    descricao:
      'Curadoria de projetos aprovados em leis de incentivo fiscal para empresas do lucro real, e programa de benefícios em que marcas parceiras oferecem descontos a quem doa pela DuGood.',
  },
  perguntas: [
    {
      p: 'Quanto custa para a empresa estar na DuGood?',
      r: 'Nada. Empresas parceiras não pagam para estar na plataforma, publicar benefícios ou aparecer como apoiadoras. Na doação incentivada, o valor aportado vai para o projeto escolhido e é abatido do imposto de renda, dentro dos limites de cada lei.',
    },
    {
      p: 'O que é ser apoiador da plataforma?',
      r: `É participar da DuGood por livre doação, sem incentivo fiscal: a empresa se associa à comunidade e publica benefícios no app, como cupons, QR Codes ou links. ${pontos} Assim, a marca ganha público, visibilidade e uma ação de ESG concreta.`,
    },
    {
      p: 'Por que fazer a doação incentivada pela DuGood?',
      r: 'Porque a DuGood faz a curadoria dos projetos, confere a aprovação e a organização por trás de cada um, mostra para onde vai o dinheiro e cuida do caminho até o recibo. A DuGood acompanha a empresa em todo o passo a passo burocrático, e a empresa ganha tempo e segurança na escolha.',
    },
    {
      p: 'Minha empresa não é do lucro real. Ainda dá para participar?',
      r: 'Dá. As deduções de IRPJ das leis de incentivo valem para empresas do lucro real, mas qualquer empresa pode ser apoiadora da plataforma, oferecendo benefícios aos doadores, patrocinar eventos sociais ou apoiar uma ONG diretamente.',
    },
    {
      p: 'A doação incentivada custa algo a mais para a empresa?',
      r: 'O valor é abatido do imposto de renda devido, dentro do limite de cada lei. Na prática, a empresa escolhe para onde vai uma parte do imposto que já pagaria. A contabilidade da empresa confirma os valores e o enquadramento.',
    },
    {
      p: 'A DuGood garante a dedução?',
      r: 'Não. A dedução depende da lei, da regularidade do projeto e da situação fiscal da empresa. Por isso a DuGood trabalha com projetos aprovados nos órgãos responsáveis e com a documentação em dia, e orienta a empresa a validar tudo com a contabilidade.',
    },
    {
      p: 'O dinheiro passa pela DuGood?',
      r: 'Como regra, não: o valor vai para a organização responsável pelo projeto. A DuGood oferece a tecnologia, a curadoria dos projetos e o acompanhamento.',
    },
    {
      p: 'Até quando posso fazer o aporte?',
      r: 'Para abater no imposto de um ano, o aporte precisa ser feito até 31 de dezembro daquele ano. Quanto antes a conversa começar, mais tempo para escolher o projeto com calma.',
    },
    {
      p: 'Quais leis de incentivo a empresa pode usar?',
      r: `Empresas do lucro real podem deduzir do IRPJ devido (alíquota de 15%, sem o adicional) até: ${leisIncentivo.map((l) => `${(l.limite * 100).toLocaleString('pt-BR')}% na ${l.nome}`).join('; ')}.`,
    },
  ],
};

export const heroi = {
  rotulo: 'DuGood para empresas',
  titulo: 'Sua marca do lado de quem faz o bem.',
  lead: 'Seja apoiadora da plataforma e ofereça benefícios a quem doa, ou destine parte do imposto de renda a projetos aprovados, com curadoria e segurança. Estar na DuGood não custa nada para a empresa.',
};

/** Soma dos limites das leis de incentivo (o mesmo total do simulador) */
export const limiteTotal = `${(leisIncentivo.reduce((s, l) => s + l.limite, 0) * 100).toLocaleString('pt-BR')}%`;

/** Os dois caminhos da empresa na DuGood */
export const caminhos = {
  rotulo: 'Dois caminhos',
  titulo: 'Como a sua empresa quer participar?',
  lead: 'Escolha um caminho, ou os dois. Em nenhum deles a empresa paga para estar na plataforma.',
  itens: [
    {
      id: 'apoiador',
      interesse: 'beneficios',
      rotulo: 'Caminho 1 · Livre doação',
      titulo: 'Seja apoiador da plataforma',
      texto: 'Para qualquer empresa que quer fazer parte da comunidade da DuGood e chegar a pessoas que doam, com benefícios no app.',
      pontos: ['Marca associada à comunidade do bem', 'Benefícios para quem doa: cupons, QR Codes e links', 'Mais público, visibilidade e ESG na prática'],
      botao: 'Quero ser apoiador',
    },
    {
      id: 'incentivada',
      interesse: 'incentivada',
      rotulo: 'Caminho 2 · Incentivo fiscal',
      titulo: 'Doação incentivada',
      texto: 'Para empresas do lucro real que querem destinar parte do IRPJ a projetos sociais aprovados, com a DuGood do lado em cada etapa.',
      pontos: ['Curadoria de projetos aprovados', 'Apoio em todo o passo a passo burocrático', 'Segurança e transparência do início ao recibo'],
      botao: 'Quero doar via incentivo',
    },
  ],
  custo: {
    titulo: 'Custo zero para a empresa.',
    texto: 'Empresas parceiras não pagam nada para estar na DuGood, publicar benefícios ou aparecer como apoiadoras. Elas fomentam uma comunidade do bem; quem doa e as ONGs saem ganhando.',
  },
};

/** Caminho 1: apoiador da plataforma (livre doação e benefícios) */
export const apoiador: Secao & { ciclo: Item[]; chamada: string } = {
  rotulo: 'Caminho 1 · Apoiador da plataforma',
  titulo: 'Esteja associado à comunidade do bem.',
  lead: 'Sua empresa entra como apoiadora da DuGood e publica benefícios no app. Quem doa ganha pontos e usa esses pontos para desbloquear os benefícios da sua marca: cada doação traz um cliente que chegou por uma boa causa.',
  ciclo: [
    { titulo: 'Doação', texto: 'A pessoa doa para uma ONG, causa ou evento pelo app.' },
    { titulo: 'Pontos', texto: 'Cada R$ 1 doado vira 1 ponto, e o doador sobe de nível.' },
    { titulo: 'Benefícios', texto: 'Com o nível, ele desbloqueia os benefícios das marcas apoiadoras.' },
  ],
  chamada: 'Fale com a gente e participe da mudança',
};

export const ganhos: Secao & { itens: ItemIcone[] } = {
  rotulo: 'O que a sua marca ganha',
  titulo: 'Público, visibilidade e ESG de verdade.',
  itens: [
    { icone: 'usuarios', titulo: 'Ganha público', texto: 'Pessoas que doam chegam à sua loja ou ao seu site pelos benefícios, e você conhece esse público: região, faixa etária e escolaridade.' },
    { icone: 'megafone', titulo: 'Ganha visibilidade', texto: 'Sua marca aparece no app, na tela de benefícios, para a comunidade de quem doa.' },
    { icone: 'folha', titulo: 'Ganha ESG', texto: 'Um apoio que dá para mostrar, não só declarar: ao lado de ONGs verificadas e de quem doa.' },
    { icone: 'coracao', titulo: 'Faz parte da comunidade', texto: 'A marca se associa à Rede do Bem e ajuda a fazer da doação um hábito do dia a dia.' },
  ],
};

export const exemplos: Secao & { itens: ItemIcone[] } = {
  rotulo: 'Exemplos de benefícios',
  titulo: 'O benefício é do seu jeito.',
  lead: 'Você escolhe o formato, o nível exigido, o limite de usos e a validade. Alguns exemplos:',
  itens: [
    { icone: 'presente', titulo: 'Cupons', texto: 'Um código de desconto para usar na sua loja online ou no caixa.' },
    { icone: 'qr', titulo: 'QR Codes', texto: 'O doador mostra o QR Code e a sua equipe confirma o resgate na hora, pelo painel.' },
    { icone: 'seta', titulo: 'Links', texto: 'Um link direto para uma oferta no seu site ou app.' },
  ],
};

/** Caminho 2: doação incentivada */
export const incentivada: Secao & { itens: Item[] } = {
  rotulo: 'Caminho 2 · Doação incentivada',
  titulo: `Você sabia que é possível destinar até ${limiteTotal} do IRPJ a projetos aprovados?`,
  lead: 'Empresas do lucro real podem direcionar parte do imposto de renda devido a projetos aprovados pelo governo: esporte, cultura, infância, pessoa idosa e saúde. A empresa não só escolhe para onde vai uma parte do imposto que já pagaria: ela associa a marca a um projeto de impacto.',
  itens: [
    { titulo: 'Imposto que vira impacto.', texto: 'O valor financia um projeto que a empresa escolhe e acompanha, dentro do limite de cada lei.' },
    { titulo: 'Presença de marca.', texto: 'No patrocínio incentivado, a marca pode aparecer nas contrapartidas do projeto. O que é possível depende de cada projeto e de cada lei.' },
    { titulo: 'O dinheiro vai para o projeto.', texto: 'A DuGood não recebe nem guarda o valor: ele segue para a organização responsável.' },
    { titulo: 'Prazo.', texto: 'Para abater no imposto do ano, o aporte precisa ser feito até 31 de dezembro.' },
  ],
};

/** O papel consultivo da DuGood na doação incentivada */
export const consultivo: Secao = {
  rotulo: 'Consultivo',
  titulo: 'Não só encontramos o projeto: estamos com você em cada passo.',
  lead: 'Na DuGood, ajudamos a empresa a encontrar o projeto certo e acompanhamos todo o passo a passo burocrático, com curadoria, segurança e transparência. Se o objetivo também é presença de marca, buscamos o projeto que melhor conecta o seu imposto aos valores da empresa.',
};

/** Por que doar via DuGood: o que a DuGood garante na doação incentivada */
export const pilares: ItemIcone[] = [
  { icone: 'busca', titulo: 'Curadoria', texto: 'Selecionamos projetos aprovados e em captação e apresentamos os que combinam com o setor, a região e os valores da empresa.' },
  { icone: 'escudo', titulo: 'Segurança', texto: 'Só projetos com aprovação no órgão responsável e organizações verificadas, com cadastro e documentos conferidos.' },
  { icone: 'grafico', titulo: 'Transparência', texto: 'O dinheiro vai para o projeto, não para a DuGood. A empresa acompanha a execução pelas atualizações da ONG.' },
  { icone: 'recibo', titulo: 'Facilidade', texto: 'Cálculo do potencial, escolha, aporte e recibo assinado digitalmente, tudo com a DuGood do lado.' },
];

export const passos: Secao & { itens: Item[] } = {
  rotulo: 'Passo a passo',
  titulo: 'Da conversa ao recibo.',
  itens: [
    { titulo: 'Conversa', texto: 'Entendemos o regime tributário, o potencial de dedução e as causas que importam para a empresa.' },
    { titulo: 'Projetos', texto: 'Apresentamos projetos aprovados e em captação, com metas, contrapartidas e a organização por trás.' },
    { titulo: 'Aporte', texto: 'A empresa faz o aporte ao projeto escolhido e recebe o recibo, assinado digitalmente pela ONG, para a contabilidade.' },
    { titulo: 'Acompanhamento', texto: 'A empresa acompanha o projeto pelas atualizações da ONG e pode comunicar o apoio nas contrapartidas previstas.' },
  ],
};

export const painel: Secao & { abas: Aba[] } = {
  rotulo: 'Painel do lojista',
  titulo: 'Tudo em um painel simples.',
  lead: 'Sem integração nem instalação: o lojista cadastra os benefícios e acompanha os resgates pelo próprio painel da DuGood.',
  abas: [
    {
      aba: 'Benefícios',
      texto: 'Crie quantos benefícios quiser, escolha o nível ou badge exigido, o limite de usos e a validade. Pause e reative quando quiser.',
      print: 'lojista-beneficios',
      pendente: 'Painel do lojista, aba "Benefícios": lista de benefícios com status e o botão "Novo benefício"',
    },
    {
      aba: 'Informações da loja',
      texto: 'Nome, descrição, logo e contatos: é assim que os doadores conhecem a sua marca dentro do app.',
      print: 'lojista-informacoes',
      pendente: 'Painel do lojista, aba "Informações da Loja", com o perfil preenchido',
    },
    {
      aba: 'Validar resgates',
      texto: 'O doador mostra o QR Code do benefício e sua equipe confirma o uso na hora, pela câmera do celular.',
      print: 'lojista-scanner',
      pendente: 'Painel do lojista: scanner de QR Code do benefício e a tabela de resgates',
    },
    {
      aba: 'Clientes',
      texto: 'Quem resgatou seus benefícios e a composição desse público: região, faixa etária e escolaridade.',
      print: 'lojista-clientes',
      pendente: 'Painel do lojista, aba "Clientes" (use uma loja de teste: sem dados reais de doadores)',
    },
  ],
};

export const outras: Secao & { itens: (ItemIcone & { interesse?: string })[] } = {
  rotulo: 'Outras formas de participar',
  titulo: 'Cada empresa apoia do jeito que faz mais sentido.',
  itens: [
    { icone: 'calendario', titulo: 'Eventos sociais', texto: 'Patrocine corridas, torneios e jantares beneficentes, ou valide os ingressos no seu espaço. A arrecadação vai 100% para a ONG.', href: '/eventos' },
    { icone: 'codigo', titulo: 'Doação dentro do seu produto', texto: 'Pela API da DuGood, seu app, site ou checkout cria doações para ONGs aprovadas e recebe a confirmação automaticamente.', interesse: 'api' },
    { icone: 'coracao', titulo: 'Apoio direto a uma ONG', texto: 'Escolha uma ONG ou causa da plataforma e acompanhe o impacto pelas atualizações que ela envia a quem doa.' },
  ],
};

export const secaoPolitica: Secao & { itens: Item[] } = {
  rotulo: 'Nossa política',
  titulo: 'Transparência inegociável.',
  lead: 'É um dos valores da DuGood, e está nos Termos de Uso.',
  itens: [politica.recebimento, politica.verificacao, politica.semCusto, politica.prestacao, politica.dados],
};

export const contato = {
  titulo: 'Vamos conversar sobre a sua empresa.',
  lead: 'Conte o que vocês têm em mente. Respondemos com os projetos e as formas de apoio que fazem sentido para o seu caso.',
  itens: [
    { titulo: 'Doação incentivada:', texto: 'projetos aprovados e o potencial de dedução.' },
    { titulo: 'Apoiador da plataforma:', texto: 'como a sua marca entra no app.' },
    { titulo: 'Eventos e API:', texto: 'patrocínio e integração.' },
  ],
  formulario: 'Fale com a DuGood',
};

export const markdown = (site: URL | undefined) =>
  juntar(
    cabecalho(pagina, site),
    secao(caminhos.titulo, caminhos.lead, caminhos.itens.map((c) => `### ${c.rotulo}: ${c.titulo}\n\n${c.texto}\n\n${lista(c.pontos)}`).join('\n\n'), `**${caminhos.custo.titulo}** ${caminhos.custo.texto}`),
    secao(apoiador.titulo, apoiador.lead, `Doação → pontos → benefícios:`, numerada(apoiador.ciclo), lista(niveis.map((n) => `${n.nome}: ${n.pontos}`))),
    secao(ganhos.titulo, lista(ganhos.itens.map((i) => ({ titulo: `${i.titulo}:`, texto: i.texto })))),
    secao(exemplos.titulo, exemplos.lead, lista(exemplos.itens.map((i) => ({ titulo: `${i.titulo}:`, texto: i.texto })))),
    secao(painel.titulo, painel.lead, lista(painel.abas.map((a) => ({ titulo: `${a.aba}:`, texto: a.texto })))),
    secao(incentivada.titulo, incentivada.lead, lista(incentivada.itens)),
    secao(
      'Quanto a empresa pode direcionar',
      'Limites de dedução para empresas do lucro real, sobre o IRPJ devido à alíquota de 15% (sem o adicional de 10%):',
      lista(leisIncentivo.map((l) => `${l.nome}: até ${(l.limite * 100).toLocaleString('pt-BR')}% do IRPJ (${l.nota})`)),
      'Exemplo: com lucro real de R$ 10 milhões, o IRPJ a 15% é R$ 1,5 milhão, e o potencial somado das leis acima é de R$ 150 mil por ano. É uma estimativa: as regras mudam conforme o projeto, e a contabilidade da empresa confirma os valores.',
    ),
    secao(consultivo.titulo, consultivo.lead, lista(pilares.map((p) => ({ titulo: `${p.titulo}:`, texto: p.texto })))),
    secao(passos.titulo, numerada(passos.itens)),
    secao(outras.titulo, lista(outras.itens.map((i) => ({ titulo: `${i.titulo}:`, texto: i.texto })))),
    secao(secaoPolitica.titulo, lista(secaoPolitica.itens)),
    perguntas(pagina.perguntas),
    secao('Contato', `${contato.lead} Formulário em ${new URL('/empresas#contato', site).href}.`),
  );
