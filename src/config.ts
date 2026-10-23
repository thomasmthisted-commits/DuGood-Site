// Dados da DuGood usados em todo o site (cabeçalho, rodapé, contato, SEO, llms.txt).
export const dugood = {
  nome: 'DuGood',
  slogan: 'Conectando quem doa a quem transforma',
  descricao:
    'A DuGood é uma plataforma de doações onde doadores, ONGs e marcas se conectam: quem doa acumula pontos e desbloqueia benefícios em lojas parceiras, e as ONGs recebem doações direcionadas, com transparência.',
  email: 'comercial@dugood.com.br',
  // WhatsApp comercial só com DDI e DDD, ex.: '5511999999999'. Vazio: o botão de WhatsApp não aparece.
  whatsapp: '',
  instagram: 'dugood.br',
  app: 'https://dugood.com.br',
};

// Enquanto for rascunho, o site fica fora dos buscadores e os prints que faltam
// aparecem como molduras pendentes. Ao lançar: false (prints que faltarem somem).
export const rascunho = true;

export const appLink = (pagina = '') => `${dugood.app}/${pagina}`;
export const instagramLink = `https://instagram.com/${dugood.instagram}`;

// Páginas legais ficam no app, que é onde os termos valem
export const termosLink = appLink('TermsAndConditions');
export const privacidadeLink = appLink('PrivacyPolicy');

// Níveis do programa de pontos (iguais aos do app: R$ 1 doado = 1 ponto)
export const niveis = [
  { nome: 'Bronze', pontos: '5 a 99 pontos' },
  { nome: 'Prata', pontos: '100 a 499 pontos' },
  { nome: 'Ouro', pontos: '500 a 1.999 pontos' },
  { nome: 'Platina', pontos: '2.000 pontos ou mais' },
];

// Leis de incentivo para empresas do lucro real: limite de dedução sobre o IRPJ
// devido à alíquota de 15% (sem o adicional de 10%). Usado no simulador.
export const leisIncentivo = [
  { id: 'esporte', nome: 'Lei de Incentivo ao Esporte', limite: 0.02, nota: 'Lei 11.438/06; 3% a partir de 2028' },
  { id: 'rouanet', nome: 'Lei Rouanet (cultura)', limite: 0.04, nota: 'teto de 4% dividido com audiovisual e esporte de inclusão social' },
  { id: 'fia', nome: 'Fundo da Infância e Adolescência', limite: 0.01, nota: 'FIA' },
  { id: 'idoso', nome: 'Fundo do Idoso', limite: 0.01, nota: 'Lei 12.213/10' },
  { id: 'pronon', nome: 'PRONON (oncologia)', limite: 0.01, nota: 'Lei 12.715/12' },
  { id: 'pronas', nome: 'PRONAS/PCD (pessoa com deficiência)', limite: 0.01, nota: 'Lei 12.715/12' },
];

export type Publico = 'empresa' | 'ong' | 'organizador';

// Opções "Tenho interesse em" de cada formulário. O id pré-marca a opção pelos botões
// (data-interesse) ou pelo endereço (/empresas?interesse=incentivada#contato).
export const interesses: Record<Publico, { id: string; texto: string }[]> = {
  empresa: [
    { id: 'incentivada', texto: 'Doação incentivada (leis de incentivo)' },
    { id: 'beneficios', texto: 'Ser apoiador da plataforma (benefícios aos doadores)' },
    { id: 'eventos', texto: 'Patrocinar um evento social' },
    { id: 'api', texto: 'Integrar doações ao nosso app ou site (API)' },
  ],
  ong: [
    { id: 'captar', texto: 'Captar doações pela DuGood' },
    { id: 'incentivado', texto: 'Projeto incentivado (lei de incentivo)' },
    { id: 'eventos', texto: 'Eventos com ingresso' },
    { id: 'recibos', texto: 'Recibos de incentivo fiscal' },
  ],
  organizador: [
    { id: 'competicao', texto: 'Corrida, torneio ou competição' },
    { id: 'jantar', texto: 'Jantar, feijoada ou festa beneficente' },
    { id: 'cultural', texto: 'Show ou evento cultural' },
    { id: 'outro', texto: 'Outro tipo de evento' },
  ],
};

// Fundadores (página Quem somos do app); a foto fica em src/assets/fundadores/<foto>.jpg
export const fundadores = [
  {
    nome: 'Nicollas',
    foto: 'nicollas',
    bio: 'Engenheiro Ambiental pela Escola Politécnica da USP, nadador e Diretor Geral do Ecoswim 2023, com vasta experiência profissional na área de investimentos.',
    linkedin: 'https://www.linkedin.com/in/nicollas-thisted-b20239230/',
  },
  {
    nome: 'Thomas',
    foto: 'thomas',
    bio: 'Engenheiro de Produção pela Escola Politécnica da USP, nadador e Diretor Geral do Ecoswim 2025, com especialização em mercados de capitais.',
    linkedin: 'https://www.linkedin.com/in/thomasmthisted',
  },
  {
    nome: 'André',
    foto: 'andre',
    bio: 'Publicitário formado pela ESPM, analista de dados com vasto histórico de trabalho social.',
    linkedin: 'https://www.linkedin.com/in/andredelnero/',
  },
];

// Blog: categorias (cada uma tem página própria em /blog/categoria/<id>) e níveis dos artigos
export const categoriasBlog = {
  'incentivo-fiscal': { nome: 'Leis de incentivo', descricao: 'Doação incentivada, leis de incentivo fiscal, limites, prazos e boas práticas para empresas e pessoas físicas.' },
  'para-ongs': { nome: 'Para ONGs', descricao: 'Captação de recursos, projetos incentivados e transparência para organizações sociais.' },
  sustentabilidade: { nome: 'Sustentabilidade', descricao: 'Práticas ambientais e ESG para empresas de todos os tamanhos, do primeiro passo ao relatório.' },
  'impacto-social': { nome: 'Boas práticas sociais', descricao: 'Voluntariado, apoio a ONGs e investimento social privado feitos do jeito certo.' },
  certificacoes: { nome: 'Certificações e ISOs', descricao: 'Normas ISO, selos e certificações de sustentabilidade e impacto social: o que cada um cobre e como obter.' },
} as const;
export type CategoriaBlog = keyof typeof categoriasBlog;

export const niveisBlog = {
  basico: { nome: 'Básico', descricao: 'Para começar' },
  intermediario: { nome: 'Intermediário', descricao: 'Na prática' },
  avancado: { nome: 'Avançado', descricao: 'Guia completo' },
} as const;
export type NivelBlog = keyof typeof niveisBlog;
