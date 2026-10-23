// Diagnóstico rápido da página de empresas: a partir do setor, de uma descrição curta, do site
// e do CNPJ (opcionais), indica o perfil da empresa, o público, as áreas de projeto que combinam
// e quantas causas e projetos da DuGood têm fit. Nunca mostra o nome dos projetos: eles são
// apresentados pela equipe depois do contato.
//
// Usado pelo Worker (/api/diagnostico) e pelo componente Diagnostico.astro.

/** Áreas de projeto e a lei de incentivo de cada uma (ids de leisIncentivo, em config.ts) */
export const areas = {
  esporte: { nome: 'esporte', lei: 'Lei de Incentivo ao Esporte' },
  rouanet: { nome: 'cultura', lei: 'Lei Rouanet' },
  fia: { nome: 'infância e adolescência', lei: 'Fundo da Infância e Adolescência' },
  idoso: { nome: 'pessoa idosa', lei: 'Fundo do Idoso' },
  pronon: { nome: 'saúde (oncologia)', lei: 'PRONON' },
  pronas: { nome: 'pessoa com deficiência', lei: 'PRONAS/PCD' },
} as const;
export type Area = keyof typeof areas;

/** Categorias das causas no app (entidade Cause) */
export type CategoriaCausa = 'environmental' | 'education' | 'food' | 'clothing' | 'health' | 'housing' | 'children' | 'animals' | 'sports';

export interface Perfil {
  id: string;
  /** Como aparece no diagnóstico: "Sua empresa é uma ..." */
  nome: string;
  publico: string;
  /** Palavras (sem acento, minúsculas) que, no site, na descrição ou no CNAE, indicam o perfil */
  palavras: string[];
  areas: Area[];
  causas: CategoriaCausa[];
}

export const perfis: Perfil[] = [
  {
    id: 'bem-estar',
    nome: 'empresa de saúde e bem-estar',
    publico: 'pessoas que cuidam do corpo e da mente (wellness)',
    palavras: ['wellness', 'bem estar', 'saude', 'clinica', 'farmac', 'nutri', 'yoga', 'pilates', 'terapia', 'medic', 'odonto', 'estetica', 'spa', 'suplement'],
    areas: ['esporte', 'pronon', 'pronas'],
    causas: ['health', 'sports'],
  },
  {
    id: 'esporte',
    nome: 'empresa ligada ao esporte',
    publico: 'pessoas ativas, que praticam e acompanham esporte',
    palavras: ['esporte', 'esportiv', 'academia', 'fitness', 'atleta', 'corrida', 'futebol', 'natacao', 'bike', 'ciclismo', 'treino', 'crossfit', 'tenis', 'surf', 'beach'],
    areas: ['esporte'],
    causas: ['sports', 'health'],
  },
  {
    id: 'pets',
    nome: 'empresa voltada a pets',
    publico: 'tutores de cães, gatos e outros animais',
    palavras: ['pet', 'animal', 'animais', 'veterin', 'cachorro', 'cao ', 'caes', 'gato', 'racao', 'banho e tosa'],
    areas: [],
    causas: ['animals'],
  },
  {
    id: 'alimentacao',
    nome: 'empresa de alimentação',
    publico: 'quem valoriza comida boa e bem-feita',
    palavras: ['restaurante', 'aliment', 'comida', 'food', 'bebida', 'cafe', 'padaria', 'confeitaria', 'bar ', 'cervej', 'delivery', 'gastronom', 'mercado', 'supermercado'],
    areas: ['fia'],
    causas: ['food', 'children'],
  },
  {
    id: 'moda',
    nome: 'empresa de moda, beleza ou varejo',
    publico: 'consumidores atentos a estilo e a marcas com propósito',
    palavras: ['moda', 'roupa', 'vestuario', 'calcado', 'cosmetic', 'beleza', 'maquiagem', 'perfum', 'loja', 'varejo', 'acessorio', 'joia', 'otica', 'decoracao'],
    areas: ['rouanet', 'fia'],
    causas: ['clothing', 'children'],
  },
  {
    id: 'tecnologia',
    nome: 'empresa de tecnologia, com público jovem e digital',
    publico: 'público jovem, conectado e digital',
    palavras: ['tecnologia', 'software', 'startup', 'app', 'aplicativo', 'digital', 'saas', 'plataforma', 'internet', 'games', 'jogos', 'fintech', 'dados', 'inteligencia artificial', 'jovem', 'joven', 'universit'],
    areas: ['esporte', 'fia', 'rouanet'],
    causas: ['education', 'children'],
  },
  {
    id: 'educacao',
    nome: 'empresa de educação, com público de famílias e crianças',
    publico: 'famílias, estudantes e crianças',
    palavras: ['escola', 'educa', 'ensino', 'curso', 'idioma', 'crianca', 'infantil', 'brinquedo', 'bebe', 'familia', 'kids', 'livr', 'editora'],
    areas: ['fia', 'rouanet'],
    causas: ['education', 'children'],
  },
  {
    id: 'cultura',
    nome: 'empresa de cultura, mídia ou entretenimento',
    publico: 'quem consome cultura, música e entretenimento',
    palavras: ['cultura', 'musica', 'arte', 'teatro', 'cinema', 'audiovisual', 'midia', 'entretenimento', 'evento', 'festival', 'publicidade', 'comunicacao', 'design', 'fotograf', 'producao'],
    areas: ['rouanet'],
    causas: ['education'],
  },
  {
    id: 'financas',
    nome: 'empresa de finanças, seguros ou serviços',
    publico: 'adultos e famílias que buscam segurança e confiança',
    palavras: ['banco', 'financ', 'seguro', 'investiment', 'credito', 'contab', 'advoca', 'juridic', 'consultoria', 'corretora', 'previdencia', 'pagamento', 'cobranca'],
    areas: ['esporte', 'rouanet', 'fia', 'idoso'],
    causas: ['education', 'health'],
  },
  {
    id: 'industria',
    nome: 'indústria ou empresa de energia e agro',
    publico: 'as comunidades e regiões onde a empresa atua',
    palavras: ['industria', 'fabrica', 'manufatura', 'energia', 'solar', 'eletric', 'agro', 'agricol', 'logistica', 'transporte', 'quimic', 'metal', 'mineracao', 'petroleo', 'embalag'],
    areas: ['esporte', 'fia'],
    causas: ['environmental', 'education'],
  },
  {
    id: 'construcao',
    nome: 'empresa de construção ou do mercado imobiliário',
    publico: 'famílias e as comunidades dos bairros onde a empresa constrói',
    palavras: ['construc', 'construtora', 'imobili', 'incorpora', 'engenharia', 'arquitet', 'obra', 'condominio', 'material de construcao'],
    areas: ['fia', 'esporte'],
    causas: ['housing', 'environmental'],
  },
  {
    id: 'senior',
    nome: 'empresa com público 60+',
    publico: 'pessoas idosas e quem cuida delas',
    palavras: ['idoso', 'senior', 'terceira idade', '60 ', 'aposentad', 'cuidador', 'longevidade', 'geriatr', 'plano de saude'],
    areas: ['idoso', 'pronas'],
    causas: ['health'],
  },
  {
    id: 'sustentavel',
    nome: 'empresa com pegada sustentável',
    publico: 'consumidores que valorizam o meio ambiente',
    palavras: ['sustentav', 'reciclag', 'ambiental', 'organico', 'vegano', 'ecolog', 'reflorest', 'carbono', 'residuo', 'circular'],
    areas: [],
    causas: ['environmental'],
  },
];

/** Quando nada indica o perfil: as áreas mais comuns no patrocínio de empresas */
export const perfilGeral: Perfil = {
  id: 'geral',
  nome: 'empresa com público amplo',
  publico: 'um público amplo, de diferentes idades',
  palavras: [],
  areas: ['esporte', 'rouanet', 'fia'],
  causas: ['education', 'health', 'sports', 'children'],
};

/** Opções do campo "Setor" (cada uma aponta para um perfil) */
export const setores: { id: string; nome: string }[] = [
  { id: 'bem-estar', nome: 'Saúde e bem-estar' },
  { id: 'esporte', nome: 'Esporte e fitness' },
  { id: 'pets', nome: 'Pets' },
  { id: 'alimentacao', nome: 'Alimentação e bebidas' },
  { id: 'moda', nome: 'Moda, beleza e varejo' },
  { id: 'tecnologia', nome: 'Tecnologia e digital' },
  { id: 'educacao', nome: 'Educação e infantil' },
  { id: 'cultura', nome: 'Cultura, mídia e entretenimento' },
  { id: 'financas', nome: 'Finanças, seguros e serviços' },
  { id: 'industria', nome: 'Indústria, energia e agro' },
  { id: 'construcao', nome: 'Construção e imobiliário' },
  { id: 'senior', nome: 'Produtos e serviços para 60+' },
  { id: 'outro', nome: 'Outro' },
];

export const semAcento = (t: string) =>
  t
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

/** Texto sem acento, só letras e números, com espaço nas pontas */
export const normalizar = (texto: string) => ` ${semAcento(texto).replace(/[^a-z0-9]+/g, ' ')} `;

/**
 * A palavra aparece no texto? Palavras longas valem como começo de palavra ("educa" em
 * "educação"; "arte" não casa com "parte"); as curtas, só inteiras ("pet" não casa com "Petrobras").
 */
export const contem = (t: string, w: string) => {
  const p = w.trim();
  return p.length <= 4 ? t.includes(` ${p} `) || t.includes(` ${p}s `) : t.includes(` ${p}`);
};

/** Os perfis que mais combinam (até 2), pelo setor escolhido e pelas palavras do texto */
export function classificar(setor: string, texto: string): Perfil[] {
  const t = normalizar(texto);
  const pontos = perfis
    .map((p) => ({ p, n: (p.id === setor ? 3 : 0) + p.palavras.filter((w) => contem(t, w)).length }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n);
  if (!pontos.length) return [perfilGeral];
  const [primeiro, segundo] = pontos;
  return segundo && segundo.n >= Math.max(2, primeiro.n / 2) ? [primeiro.p, segundo.p] : [primeiro.p];
}

/** Junta as áreas e categorias dos perfis, sem repetir */
export const unir = <T,>(listas: T[][]) => [...new Set(listas.flat())];

export const textos = {
  rotulo: 'Diagnóstico rápido',
  titulo: 'Conte um pouco sobre a sua empresa.',
  lead: 'Em poucos segundos, mostramos com que público e com que tipo de projeto a sua empresa combina, e quantas causas e projetos da DuGood têm fit com ela. Os projetos, nós apresentamos numa conversa.',
  nota: 'Diagnóstico inicial e automático, feito com o que você informou, o seu site e o cadastro público do CNPJ. Não guardamos esses dados: eles só seguem para a DuGood se você mandar a mensagem.',
  botao: 'Ver o diagnóstico',
};
