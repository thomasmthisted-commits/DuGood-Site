// Dados fictícios para os prints dos painéis (nenhum dado real de doador, ONG ou loja).
const M = 'https://media.base44.com/images/public/6966a6eb978f08f2caed1cef';
const dia = (n) => new Date(Date.UTC(2026, 9, 22) - n * 86400000).toISOString();

const nomes = [
  'Ana Souza', 'Bruno Lima', 'Carla Mendes', 'Diego Rocha', 'Eduarda Alves', 'Felipe Costa', 'Gabriela Nunes', 'Henrique Prado',
  'Isabela Ramos', 'João Pedro Silva', 'Larissa Teixeira', 'Marcos Vieira', 'Natália Freitas', 'Otávio Moura', 'Paula Cardoso',
  'Rafael Barros', 'Sofia Martins', 'Tiago Moreira', 'Vanessa Dias', 'Lucas Ferreira',
];
const email = (n) => `${n.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ /g, '.')}@exemplo.com`;

export const org = {
  id: 'org1',
  name: 'Instituto Exemplo',
  email: 'contato@institutoexemplo.org',
  phone: '(11) 3000-0000',
  cnpj: '11.222.333/0001-81',
  description:
    'O Instituto Exemplo oferece reforço escolar, esporte e cultura para crianças e adolescentes da zona sul de São Paulo. Desde 2015, mais de 1.200 jovens passaram pelos nossos projetos.',
  address: 'Rua Exemplo, 100 – São Paulo/SP',
  website: 'https://institutoexemplo.org',
  logo_url: `${M}/79c2999c6_icone-ongs.png`,
  media_urls: [`${M}/f72b2d39e_Educacao.png`, `${M}/c824ced18_Esportes.png`, `${M}/48774a1da_Criancas.png`],
  status: 'approved',
  stripe_account_id: 'acct_demo',
  category: 'education',
  total_raised: 48750,
  fiscal_data: {
    legal_name: 'Instituto Exemplo de Educação',
    responsible_name: 'Mariana Lopes',
    responsible_cpf: '000.000.000-00',
    responsible_title: 'Presidente',
    legal_type: 'associacao',
  },
  terms_signatures: [{ terms_type: 'general_fundraising', status: 'signed', signed_at: dia(120) }],
  documents: [
    { label: 'Estatuto social', file_url: '#', uploaded_at: dia(118) },
    { label: 'Ata de eleição da diretoria', file_url: '#', uploaded_at: dia(118) },
    { label: 'Cartão CNPJ', file_url: '#', uploaded_at: dia(117) },
  ],
  created_date: dia(400),
};

export const causas = [
  {
    id: 'c1', title: 'Reforço escolar para 80 crianças', organization_id: 'org1', organization: org.name, category: 'education', cause_type: 'permanent',
    description: 'Aulas de reforço em português e matemática, com lanche, para crianças do 1º ao 5º ano.', goal_amount: 30000, raised_amount: 21480,
    target_year: 2026, image_url: `${M}/f72b2d39e_Educacao.png`, status: 'active', minimum_donation: 10, visibility: 'public', created_date: dia(200),
  },
  {
    id: 'c2', title: 'Escolinha de futebol do bairro', organization_id: 'org1', organization: org.name, category: 'education', cause_type: 'permanent',
    description: 'Treinos três vezes por semana, uniforme e transporte para os jogos.', goal_amount: 15000, raised_amount: 9320,
    target_year: 2026, image_url: `${M}/c824ced18_Esportes.png`, status: 'active', minimum_donation: 10, visibility: 'public', created_date: dia(150),
  },
  {
    id: 'c3', title: 'Corrida do Bem 5K', organization_id: 'org1', organization: org.name, category: 'education', cause_type: 'event',
    description: 'Corrida de rua beneficente: a inscrição é uma doação para o Instituto Exemplo.', goal_amount: 20000, raised_amount: 12950,
    target_year: 2026, image_url: `${M}/48774a1da_Criancas.png`, status: 'active', minimum_donation: 50, enable_qr_code: true, qr_scanner_type: 'organization_self',
    event_address: 'Parque Exemplo – São Paulo/SP', event_date: '2026-11-29', event_time: '07:00', registration_deadline: '2026-11-25',
    enable_teams: true, teams: [{ id: 't1', name: 'Time Verde' }, { id: 't2', name: 'Time Azul' }], created_date: dia(60),
    // Evento criado pela assessoria (organizador) em favor do instituto
    created_by_organizer: true, ngo_approval_status: 'approved', partner_organizer_id: 'o1', partner_organizer_name: 'Assessoria Corre Junto', qr_scanner_type: 'event_organizer',
  },
  {
    id: 'c4', title: 'Projeto Esporte Cidadão (Lei de Incentivo ao Esporte)', organization_id: 'org1', organization: org.name, category: 'education', cause_type: 'permanent',
    description: 'Projeto aprovado na Lei de Incentivo ao Esporte: atletismo e vôlei para 120 jovens.', goal_amount: 250000, raised_amount: 85000,
    target_year: 2026, image_url: `${M}/c824ced18_Esportes.png`, status: 'active', minimum_donation: 1000, is_tax_incentivized: true,
    tax_incentive_law: 'lie', tax_incentive_project_number: '2400000-00', tax_incentive_terms: { status: 'completed' }, created_date: dia(90),
  },
  {
    id: 'c5', title: 'Biblioteca comunitária', organization_id: 'org1', organization: org.name, category: 'education', cause_type: 'permanent',
    description: 'Montagem de uma biblioteca com 2.000 livros no espaço do instituto.', goal_amount: 12000, raised_amount: 0,
    target_year: 2027, image_url: `${M}/f72b2d39e_Educacao.png`, status: 'pending', minimum_donation: 10, submitted_date: dia(2), created_date: dia(3),
  },
];

const valores = [50, 100, 30, 200, 80, 150, 25, 60, 120, 500, 40, 90, 75, 300, 35, 45, 110, 250, 65, 1000];
export const doacoes = nomes.flatMap((nome, i) => {
  const base = {
    organization_id: 'org1', user_email: email(nome), donor_name: nome, donor_phone: `(11) 9${String(8000 + i * 37).padStart(4, '0')}-${String(1000 + i * 53).slice(0, 4)}`,
  };
  const causa = causas[i % 3];
  const linhas = [
    { ...base, id: `d${i}a`, cause_id: causa.id, cause_title: causa.title, cause_category: 'education', amount: valores[i], points_earned: valores[i], donation_type: i % 4 === 0 ? 'recurring' : 'one-time', is_recurring: i % 4 === 0, recurring_frequency: i % 4 === 0 ? 'monthly' : undefined, created_date: dia(i * 3 + 1), team_name: causa.id === 'c3' ? (i % 2 ? 'Time Verde' : 'Time Azul') : undefined },
  ];
  if (i % 3 === 0) linhas.push({ ...base, id: `d${i}b`, cause_id: 'c1', cause_title: causas[0].title, cause_category: 'education', amount: valores[(i + 5) % 20], points_earned: valores[(i + 5) % 20], donation_type: 'one-time', created_date: dia(i * 3 + 30) });
  if (i < 4) linhas.push({ ...base, id: `d${i}c`, cause_id: 'c4', cause_title: causas[3].title, cause_category: 'education', amount: [5000, 10000, 2500, 1500][i], is_tax_incentivized: true, tax_incentive_law: 'lie', receipt_status: i < 2 ? 'certified' : 'pending', receipt_pipeline_stage: i < 2 ? 'receipt_issued' : ['awaiting_commitment_signature', 'awaiting_registration'][i - 2], donor_cpf: '000.000.000-00', created_date: dia(i * 5 + 4) });
  return linhas;
});

const estados = ['SP', 'SP', 'SP', 'RJ', 'MG', 'SP', 'PR', 'SP', 'SP', 'RS'];
const cidades = ['São Paulo', 'São Paulo', 'Campinas', 'Rio de Janeiro', 'Belo Horizonte', 'Santos', 'Curitiba', 'São Paulo', 'Guarulhos', 'Porto Alegre'];
const educacao = ['superior_completo', 'pos_graduacao', 'medio', 'superior_incompleto', 'superior_completo'];
export const perfis = nomes.map((nome, i) => ({
  id: `p${i}`, user_email: email(nome), nome, telefone: `(11) 9${8000 + i}-${1000 + i}`, estado: estados[i % 10], cidade: cidades[i % 10],
  data_nascimento: `${1975 + ((i * 3) % 28)}-0${(i % 9) + 1}-15`, nivel_educacao: educacao[i % 5], data_consent_accepted: true,
}));

export const usuarios = nomes.map((nome, i) => ({ id: `u${i + 10}`, email: email(nome), full_name: nome, role: 'user', user_type: 'donor' }));

export const loja = {
  id: 'm1', store_name: 'Café Exemplo', email: 'contato@cafeexemplo.com.br', phone: '(11) 3333-0000', whatsapp: '(11) 99999-0000', instagram: '@cafeexemplo',
  cnpj: '11.444.777/0001-61', description: 'Cafeteria de bairro com grãos especiais brasileiros, pães de fermentação natural e um cantinho para trabalhar.',
  address: 'Av. Exemplo, 500 – São Paulo/SP', website: 'https://cafeexemplo.com.br', logo_url: `${M}/5d226ac29_Alimentos.png`, status: 'approved', created_date: dia(300),
};

export const beneficios = [
  { id: 'b1', store_name: loja.store_name, merchant_id: 'm1', description: '15% de desconto em qualquer bebida', discount_value: '15%', logo_url: loja.logo_url, required_level: 'bronze', unlock_type: 'level', redemption_type: 'qr_code', icon: 'percent', category: 'food', max_uses: 4, status: 'active', valid_until: '2026-12-31', created_date: dia(100) },
  { id: 'b2', store_name: loja.store_name, merchant_id: 'm1', description: 'Pão de queijo grátis na compra de um café', discount_value: 'Grátis', logo_url: loja.logo_url, required_level: 'silver', unlock_type: 'level', redemption_type: 'qr_code', icon: 'gift', category: 'food', max_uses: 2, status: 'active', valid_until: '2026-12-31', created_date: dia(80) },
  { id: 'b3', store_name: loja.store_name, merchant_id: 'm1', description: '20% off em grãos para levar', discount_value: '20%', logo_url: loja.logo_url, required_level: 'gold', unlock_type: 'level', redemption_type: 'coupon', coupon_code: 'DUGOOD20', icon: 'tag', category: 'food', max_uses: 1, status: 'active', valid_until: '2027-03-31', created_date: dia(40) },
  { id: 'b4', store_name: loja.store_name, merchant_id: 'm1', description: 'Workshop de métodos de preparo com 50% off', discount_value: '50%', logo_url: loja.logo_url, required_level: 'platinum', unlock_type: 'level', redemption_type: 'link', redemption_url: 'https://cafeexemplo.com.br/workshop', icon: 'star', category: 'food', max_uses: 1, status: 'paused', created_date: dia(20) },
];

export const resgates = nomes.slice(0, 12).map((nome, i) => ({
  id: `q${i}`, user_email: email(nome), benefit_id: beneficios[i % 3].id, benefit_store_name: loja.store_name, merchant_id: 'm1', qr_code_value: `QR-DEMO-${i}`,
  unlocked_date: dia(i * 4 + 2), times_used: (i % 3) + 1, max_uses: beneficios[i % 3].max_uses, is_active: true, created_date: dia(i * 4 + 2), updated_date: dia(i * 2 + 1),
}));

export const organizador = {
  id: 'o1', organizer_name: 'Assessoria Corre Junto', email: 'contato@correjunto.com.br', phone: '(11) 3444-0000', whatsapp: '(11) 98888-0000',
  description: 'Assessoria esportiva que organiza corridas e caminhadas beneficentes.', logo_url: `${M}/c824ced18_Esportes.png`, status: 'approved', created_date: dia(250),
};

export const eventosOrganizador = [
  causas[2],
  {
    id: 'e2', title: 'Caminhada Solidária de Verão', organization_id: 'org2', organization: 'Associação Exemplo de Saúde', category: 'health', cause_type: 'event',
    description: 'Caminhada de 3 km com a família: a inscrição é uma doação para a Associação Exemplo de Saúde.', goal_amount: 10000, raised_amount: 0,
    image_url: `${M}/263b4ddc6_Saude.png`, status: 'awaiting_ngo', ngo_approval_status: 'pending', created_by_organizer: true, partner_organizer_id: 'o1',
    partner_organizer_name: organizador.organizer_name, event_date: '2027-01-17', event_time: '08:00', event_address: 'Orla Exemplo – Santos/SP',
    registration_deadline: '2027-01-12', minimum_donation: 40, qr_scanner_type: 'event_organizer', ngo_request_date: dia(1), created_date: dia(1),
  },
];

export const ingressos = nomes.slice(0, 14).map((nome, i) => ({
  id: `t${i}`, donation_id: `d${i}a`, participant_name: nome, cause_id: 'c3', cause_title: 'Corrida do Bem 5K', user_email: email(nome),
  amount: [50, 80, 100, 50, 60, 50, 120][i % 7], team_id: i % 2 ? 't1' : 't2', team_name: i % 2 ? 'Time Verde' : 'Time Azul', scanner_type: 'organizer',
  organizer_id: 'o1', organizer_name: organizador.organizer_name, organization_id: 'org1', organization_name: org.name, qr_code_value: `TICKET-DEMO-${i}`,
  is_used: i % 3 === 0, used_at: i % 3 === 0 ? dia(0) : undefined, created_date: dia(i + 2),
}));

export const pessoas = {
  ong: { id: 'u1', email: org.email, full_name: 'Mariana Lopes', role: 'user', user_type: 'organization', organization_id: 'org1', org_tutorial_seen: true },
  lojista: { id: 'u2', email: loja.email, full_name: 'Rodrigo Alves', role: 'user', user_type: 'merchant', merchant_id: 'm1', merchant_store_name: loja.store_name, merchant_tutorial_seen: true, merchant_consent_accepted: true },
  organizador: { id: 'u3', email: organizador.email, full_name: 'Camila Rocha', role: 'user', user_type: 'event_organizer', organizer_id: 'o1', organizer_tutorial_seen: true, organizer_consent_accepted: true },
};
