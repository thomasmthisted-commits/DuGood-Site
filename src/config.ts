// Dados da DuGood usados em todo o site (cabeçalho, rodapé, contato, SEO, llms.txt).
export const dugood = {
  nome: 'DuGood',
  slogan: 'Conectando quem doa a quem transforma',
  descricao:
    'A DuGood é uma plataforma de doações onde doadores, ONGs e marcas se conectam: quem doa acumula pontos e desbloqueia benefícios em lojas parceiras, e as ONGs recebem doações direcionadas, com transparência.',
  email: 'comercial@dugood.com.br',
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
  { id: 'esporte', nome: 'Lei de Incentivo ao Esporte', limite: 0.02, nota: 'Lei 11.438/06' },
  { id: 'rouanet', nome: 'Lei Rouanet (cultura)', limite: 0.04, nota: 'teto dividido com o Audiovisual' },
  { id: 'fia', nome: 'Fundo da Infância e Adolescência', limite: 0.01, nota: 'FIA' },
  { id: 'idoso', nome: 'Fundo do Idoso', limite: 0.01, nota: 'Lei 12.213/10' },
  { id: 'pronon', nome: 'PRONON (oncologia)', limite: 0.01, nota: 'Lei 12.715/12' },
  { id: 'pronas', nome: 'PRONAS/PCD (pessoa com deficiência)', limite: 0.01, nota: 'Lei 12.715/12' },
];
