// Dados fictícios para os prints dos painéis (nenhum dado real de doador, ONG ou loja).
const M = 'https://media.base44.com/images/public/6966a6eb978f08f2caed1cef';
// "Hoje" fixo nos prints (o navegador também fica parado nesta data): 27/10/2026, 14h em São Paulo
export const hoje = '2026-10-27T17:00:00.000Z';
const HOJE = Date.parse(hoje);
const dia = (n, horas = 0) => new Date(HOJE - n * 86400000 - horas * 3600000).toISOString();

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
  created_date: dia(185),
};

export const causas = [
  {
    id: 'c1', title: 'Reforço escolar para 80 crianças', organization_id: 'org1', organization: org.name, category: 'education', cause_type: 'permanent',
    description: 'Aulas de reforço em português e matemática, com lanche, para crianças do 1º ao 5º ano.', goal_amount: 10000, raised_amount: 0,
    target_year: 2026, image_url: `${M}/f72b2d39e_Educacao.png`, status: 'active', minimum_donation: 10, visibility: 'public', created_date: dia(200),
  },
  {
    id: 'c2', title: 'Escolinha de futebol do bairro', organization_id: 'org1', organization: org.name, category: 'education', cause_type: 'permanent',
    description: 'Treinos três vezes por semana, uniforme e transporte para os jogos.', goal_amount: 6000, raised_amount: 0,
    target_year: 2026, image_url: `${M}/c824ced18_Esportes.png`, status: 'active', minimum_donation: 10, visibility: 'public', created_date: dia(150),
  },
  {
    id: 'c3', title: 'Corrida do Bem 5K', organization_id: 'org1', organization: org.name, category: 'education', cause_type: 'event',
    description: 'Corrida de rua beneficente: a inscrição é uma doação para o Instituto Exemplo.', goal_amount: 2000, raised_amount: 0,
    target_year: 2026, image_url: `${M}/48774a1da_Criancas.png`, status: 'active', minimum_donation: 50, enable_qr_code: true, qr_scanner_type: 'organization_self',
    event_address: 'Parque Exemplo – São Paulo/SP', event_date: '2026-11-29', event_time: '07:00', registration_deadline: '2026-11-25',
    enable_teams: true, teams: [{ id: 't1', name: 'Time Verde' }, { id: 't2', name: 'Time Azul' }], created_date: dia(60),
    // Evento criado pela assessoria (organizador) em favor do instituto
    created_by_organizer: true, ngo_approval_status: 'approved', partner_organizer_id: 'o1', partner_organizer_name: 'Assessoria Corre Junto', qr_scanner_type: 'event_organizer',
  },
  {
    id: 'c4', title: 'Projeto Esporte Cidadão (Lei de Incentivo ao Esporte)', organization_id: 'org1', organization: org.name, category: 'education', cause_type: 'permanent',
    description: 'Projeto aprovado na Lei de Incentivo ao Esporte: atletismo e vôlei para 120 jovens.', goal_amount: 250000, raised_amount: 0,
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
const pessoa = (i) => ({ organization_id: 'org1', user_email: email(nomes[i]), donor_name: nomes[i] });
const pagamentos = ['Pix', 'Crédito Visa •••• 4242', 'Pix', 'Crédito Mastercard •••• 5454', 'Débito Elo •••• 1234'];

// Doações avulsas às causas, mais frequentes nos meses recentes (o gráfico mensal cresce)
const avulsas = Array.from({ length: 60 }, (_, k) => {
  const i = (k * 7) % 20;
  const causa = k % 3 === 2 ? causas[1] : causas[0];
  return {
    ...pessoa(i), id: `d${k}`, cause_id: causa.id, cause_title: causa.title, cause_category: 'education', amount: valores[(k * 3) % 20],
    donation_type: 'one-time', payment_method: pagamentos[k % 5], created_date: dia(Math.round(175 * (1 - k / 60) ** 1.5), (k * 5) % 10),
  };
});

// Doações mensais à ONG (assinaturas no cartão); uma cancelada
const mensais = [[0, 30, 5], [4, 50, 4], [8, 25, 3], [12, 100, 5], [16, 40, 2], [19, 20, 4], [10, 60, 1]].flatMap(([i, valor, meses], n) =>
  Array.from({ length: meses + 1 }, (_, m) => ({
    ...pessoa(i), id: `r${n}-${m}`, cause_id: null, amount: valor, donation_type: 'recurring', is_recurring: true, recurring_frequency: 'monthly',
    stripe_subscription_id: `sub_demo_${n}`, payment_method: 'Crédito Visa •••• 4242', created_date: dia((meses - m) * 30 + n + 1, 3),
    ...(n === 5 ? { subscription_cancelled_at: dia(6), subscription_cancel_reason: 'financial' } : {}),
  })),
);

// Doações direto para a ONG (página da ONG ou QR Code institucional)
const institucionais = [[2, 200, 150], [6, 500, 96], [9, 150, 61], [13, 300, 33], [15, 1000, 12], [17, 250, 4]].map(([i, valor, d], n) => ({
  ...pessoa(i), id: `i${n}`, cause_id: null, amount: valor, donation_type: 'one-time', payment_method: pagamentos[n % 5], created_date: dia(d, 2),
}));

// Doações incentivadas (Lei de Incentivo ao Esporte), com o andamento do recibo
const incentivadas = [5000, 10000, 2500, 1500].map((valor, i) => ({
  ...pessoa(i), id: `l${i}`, cause_id: 'c4', cause_title: causas[3].title, cause_category: 'education', amount: valor, is_tax_incentivized: true, tax_incentive_law: 'lie',
  receipt_status: i < 2 ? 'certified' : 'pending', receipt_pipeline_stage: i < 2 ? 'receipt_issued' : ['awaiting_commitment_signature', 'awaiting_registration'][i - 2],
  donor_cpf: '000.000.000-00', donation_type: 'one-time', payment_method: 'Pix', created_date: dia([40, 9, 70, 120][i], 4),
}));

// Inscrições da Corrida do Bem 5K (cada uma vira um ingresso com QR Code)
const inscricoes = Array.from({ length: 14 }, (_, i) => ({
  ...pessoa(i), id: `ev${i}`, cause_id: 'c3', cause_title: causas[2].title, cause_category: 'education', amount: [50, 80, 100, 50, 60, 50, 120][i % 7],
  team_name: i % 2 ? 'Time Verde' : 'Time Azul', participant_name: nomes[i], donation_type: 'one-time', payment_method: pagamentos[i % 5], created_date: dia(i * 2 + 1, i % 6),
}));

export const doacoes = [...avulsas, ...mensais, ...institucionais, ...incentivadas, ...inscricoes].map((d) => ({ ...d, points_earned: d.amount }));
for (const c of causas) c.raised_amount = doacoes.filter((d) => d.cause_id === c.id).reduce((s, d) => s + d.amount, 0);

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
  id: `t${i}`, donation_id: `ev${i}`, participant_name: nome, cause_id: 'c3', cause_title: 'Corrida do Bem 5K', user_email: email(nome),
  amount: [50, 80, 100, 50, 60, 50, 120][i % 7], team_id: i % 2 ? 't1' : 't2', team_name: i % 2 ? 'Time Verde' : 'Time Azul', scanner_type: 'organizer',
  organizer_id: 'o1', organizer_name: organizador.organizer_name, organization_id: 'org1', organization_name: org.name, qr_code_value: `TICKET-DEMO-${i}`,
  is_used: i % 3 === 0, used_at: i % 3 === 0 ? dia(0) : undefined, created_date: dia(i + 2),
}));

export const pessoas = {
  ong: { id: 'u1', email: org.email, full_name: 'Mariana Lopes', role: 'user', user_type: 'organization', organization_id: 'org1', org_tutorial_seen: true },
  lojista: { id: 'u2', email: loja.email, full_name: 'Rodrigo Alves', role: 'user', user_type: 'merchant', merchant_id: 'm1', merchant_store_name: loja.store_name, merchant_tutorial_seen: true, merchant_consent_accepted: true },
  organizador: { id: 'u3', email: organizador.email, full_name: 'Camila Rocha', role: 'user', user_type: 'event_organizer', organizer_id: 'o1', organizer_tutorial_seen: true, organizer_consent_accepted: true },
};

// Extrato (getOrgStatement): as movimentações como a Stripe mostra, sem taxa da DuGood
const tarifa = (d) => (d.payment_method === 'Pix' ? Math.round(d.amount * 1.19) / 100 : Math.round(d.amount * 3.99 + 39) / 100);
const cobrancas = doacoes.map((d) => {
  const disponivel = Date.parse(d.created_date) + (d.payment_method === 'Pix' ? 2 : 30) * 86400000;
  return {
    id: `txn_${d.id}`, type: 'charge', type_label: 'Pagamento', created: d.created_date,
    description: d.cause_title || (d.is_recurring ? 'Doação mensal para a ONG' : 'Doação para a ONG'),
    cause_id: d.cause_id, cause_title: d.cause_title ?? null, recurring: !!d.is_recurring,
    origin_type: d.cause_id === 'c3' ? 'event' : d.cause_id ? 'cause' : d.is_recurring ? 'recurring' : 'organization',
    team_name: d.team_name ?? null, donor_name: d.donor_name, donor_email: d.user_email, payment_method: d.payment_method, donor_covered_fee: 0,
    gross: d.amount, stripe_fee: tarifa(d), dugood_fee: 0, net: Math.round((d.amount - tarifa(d)) * 100) / 100,
    status: disponivel <= HOJE ? 'available' : 'pending', available_on: new Date(disponivel).toISOString(), receipt_url: null,
  };
});
// Repasses semanais para a conta bancária da ONG
const repasses = [3, 10, 17, 24, 31, 38, 45, 52, 59].map((d) => {
  const ate = HOJE - d * 86400000;
  const valor = cobrancas
    .filter((c) => c.status === 'available' && Date.parse(c.available_on) <= ate && Date.parse(c.available_on) > ate - 7 * 86400000)
    .reduce((s, c) => s + c.net, 0);
  return {
    id: `po_${d}`, type: 'payout', type_label: 'Repasse para a conta bancária', created: dia(d, -1), description: 'Repasse para a conta bancária',
    gross: -valor, stripe_fee: 0, dugood_fee: 0, net: -Math.round(valor * 100) / 100, status: 'available', available_on: dia(d - 1),
  };
}).filter((r) => r.net < 0);

export function extrato({ from, to }) {
  const ini = Date.parse(from);
  const fim = Date.parse(to);
  const rows = [...cobrancas, ...repasses].filter((r) => Date.parse(r.created) >= ini && Date.parse(r.created) <= fim);
  return { mode: 'stripe', rows, truncated: false };
}

// Relatórios mensais (getOrgReport): os dados da ONG e os meses já fechados e salvos
export function relatorio() {
  const donations = doacoes.map((d) => ({
    id: d.id, date: d.created_date, amount: d.amount, cause_id: d.cause_id, type: d.is_recurring ? 'recurring' : 'one-time',
    subscription_id: d.stripe_subscription_id ?? null, cancelled_at: d.subscription_cancelled_at ?? null, donor_key: d.user_email, donor_name: d.donor_name,
    is_guest: false, from_partner: false, is_tax_incentivized: !!d.is_tax_incentivized,
    receipt_stage: d.is_tax_incentivized ? d.receipt_pipeline_stage : null, team_name: d.team_name ?? null,
  }));
  const mes = (iso) => iso.slice(0, 7);
  const totais = {};
  for (const d of donations) totais[mes(d.date)] = (totais[mes(d.date)] ?? 0) + d.amount;
  const fechados = Object.keys(totais).filter((m) => m < mes(hoje)).sort().reverse();
  return {
    organization: { id: org.id, name: org.name, logo_url: org.logo_url, cnpj: org.cnpj, created_date: org.created_date },
    causes: causas.map((c) => ({
      id: c.id, title: c.title, cause_type: c.cause_type, category: c.category, status: c.status, goal_amount: c.goal_amount,
      is_tax_incentivized: !!c.is_tax_incentivized, tax_incentive_law: c.tax_incentive_law ?? null, event_date: c.event_date ?? null, event_end_date: null, created_date: c.created_date,
    })),
    donations,
    registrations: [],
    checkins: ingressos.filter((t) => t.is_used).map((t) => ({ cause_id: t.cause_id, date: t.used_at })),
    generated_at: hoje,
    saved_reports: fechados.map((m) => {
      const [a, n] = m.split('-').map(Number);
      return { id: `rel-${m}`, month: m, total_amount: totais[m], saved_at: new Date(Date.UTC(a, n, 1, 9)).toISOString() };
    }),
  };
}

// Sorteios (runRaffle): um salvo e um já realizado na corrida
export const sorteios = {
  plans: [
    {
      id: 'pl1', title: 'Sorteio de fim de ano entre os doadores', description: 'Uma camiseta autografada pelos alunos da escolinha de futebol.',
      scope: 'organization', winners_count: 3, ticket_mode: 'per_amount', amount_per_ticket: 50, period_start: '2026-11-01', period_end: '2026-12-20', draw_unit: 'person',
    },
  ],
  raffles: [
    {
      id: 'rf1', title: 'Kit de corrida na Corrida do Bem 5K', description: 'Um tênis de corrida e um relógio esportivo doados por parceiros.',
      scope: 'event', cause_title: 'Corrida do Bem 5K', ticket_mode: 'per_donor', draw_unit: 'person', drawn_at: dia(2, 5), participants_count: 14, tickets_count: 14,
      drawn_by_email: org.email, participants_hash: '9f2c4e…a71b', seed: '5d1e8c…02af',
      winners: [
        { position: 1, name: nomes[6], email: email(nomes[6]), team_name: 'Time Azul', tickets: 1 },
        { position: 2, name: nomes[11], email: email(nomes[11]), team_name: 'Time Verde', tickets: 1 },
      ],
    },
  ],
};

// No painel do organizador, o sorteio salvo é do evento dele
export const sorteiosOrganizador = {
  plans: [
    {
      id: 'pl2', title: 'Brindes na largada', description: 'Três kits de hidratação para quem estiver inscrito até a véspera.',
      scope: 'event', cause_title: 'Corrida do Bem 5K', winners_count: 3, ticket_mode: 'per_donor', team_names: ['Time Verde', 'Time Azul'], draw_unit: 'person',
    },
  ],
  raffles: sorteios.raffles.map((r) => ({ ...r, drawn_by_email: organizador.email })),
};
