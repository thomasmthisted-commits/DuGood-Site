// Prints dos painéis do app DuGood com dados fictícios (nenhum dado real de doador, ONG ou loja).
//
// Roda o app de verdade (repositório dugood, `npx vite`) e responde às chamadas do Base44 no
// navegador com os dados de dados.mjs. Os scanners leem um QR Code fictício por uma câmera
// simulada. Veja o README desta pasta.
//
// Uso: npm run prints               (todos os prints de trabalhos.json)
//      npm run prints -- lojista-   (só os que começam com "lojista-")
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import * as D from './dados.mjs';
import { gerarCameras } from './camera.mjs';
const require = createRequire(process.env.PLAYWRIGHT_DIR ?? import.meta.url);
const { chromium } = require('playwright');

const APP = process.env.APP_URL ?? 'http://127.0.0.1:5173';
const SAIDA = process.env.SAIDA ?? new URL('../../src/assets/prints/', import.meta.url).pathname;
const tabelas = {
  Organization: [D.org],
  Cause: [...D.causas, D.eventosOrganizador[1]],
  Donation: D.doacoes,
  UserProfile: D.perfis,
  User: [...D.usuarios, ...Object.values(D.pessoas)],
  Merchant: [D.loja],
  Benefit: D.beneficios,
  UserBenefitQRCode: D.resgates,
  DonationQRCode: D.ingressos,
  EventOrganizer: [D.organizador],
  EventRegistration: [],
  ImportedDonation: [],
  DonorNote: [],
  CauseUpdate: [],
  OrgMonthlyReport: [],
};

// Todas as telas com o mini tutorial já visto (sem o pontinho de "novo" no "Como usar esta tela")
const telas = [
  'inicio', 'geral', 'causas', 'causas.institucionais', 'doadores.recorrentes', 'eventos.lista', 'eventos.escanear', 'eventos.como',
  'fiscal.dados', 'fiscal.projetos', 'fiscal.doacoes', 'fiscal.recibos', 'doadores.lista', 'doadores.crm', 'doadores.composicao',
  'doadores.sorteios', 'instituicao.perfil', 'instituicao.documentos', 'financeiro.extrato', 'relatorios',
  'beneficios', 'beneficios.clientes', 'doacoes', 'loja', 'eventos', 'eventos.sorteios', 'conta.perfil',
];

const casa = (linha, q) =>
  Object.entries(q).every(([k, v]) => {
    if (k.startsWith('$')) return true;
    const valor = linha[k];
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      if ('$in' in v) return v.$in.includes(valor);
      if ('$ne' in v) return valor !== v.$ne;
      return true;
    }
    return valor === v;
  });

function ordenar(linhas, sort) {
  if (!sort) return linhas;
  const desc = sort.startsWith('-');
  const campo = sort.replace(/^[-+]/, '');
  return [...linhas].sort((a, b) => ((a[campo] ?? '') > (b[campo] ?? '') ? 1 : -1) * (desc ? -1 : 1));
}

function funcao(nome, corpo, perfil) {
  switch (nome) {
    case 'createStripeConnectAccount':
      return { connected: true, charges_enabled: true, payouts_enabled: true, details_submitted: true, account_id: 'acct_demo' };
    case 'getMerchantStats': {
      const users = D.resgates.map((q) => ({
        userName: D.usuarios.find((u) => u.email === q.user_email)?.full_name,
        userEmail: q.user_email,
        userPhone: D.perfis.find((p) => p.user_email === q.user_email)?.telefone,
        benefitDescription: D.beneficios.find((b) => b.id === q.benefit_id)?.description,
        timesUsed: q.times_used,
        maxUses: q.max_uses,
        unlockedDate: q.unlocked_date,
      }));
      return { totalBenefits: D.beneficios.length, totalActivations: users.length, uniqueUsers: users.length, users };
    }
    case 'organizerEvents':
      if (corpo?.action === 'list' || !corpo?.action) return { events: D.eventosOrganizador, causes: D.eventosOrganizador, organizations: [{ id: 'org1', name: D.org.name }, { id: 'org2', name: 'Associação Exemplo de Saúde' }] };
      if (corpo.action === 'list_organizations') return { organizations: [{ id: 'org1', name: D.org.name }, { id: 'org2', name: 'Associação Exemplo de Saúde' }] };
      return { success: true };
    case 'getOrgDonorInsights': {
      const mapa = {};
      for (const d of D.doacoes) {
        const x = (mapa[d.user_email] ??= { email: d.user_email, name: d.donor_name, total_amount: 0, donation_count: 0, last_donation_date: null, is_guest: false });
        x.total_amount += d.amount;
        x.donation_count += 1;
        if (!x.last_donation_date || d.created_date > x.last_donation_date) x.last_donation_date = d.created_date;
      }
      const contacts = {};
      const donors = Object.values(mapa).map((x) => {
        const p = D.perfis.find((p) => p.user_email === x.email) ?? {};
        contacts[x.email] = { telefone: p.telefone ?? null, cpf: null };
        return { ...x, estado: p.estado, cidade: p.cidade, data_nascimento: p.data_nascimento, telefone: p.telefone, cpf: null, nivel_educacao: p.nivel_educacao };
      });
      return { donors, contacts, totalDonations: D.doacoes.length };
    }
    case 'scanBenefitQRCode': {
      const q = D.resgates[0];
      const u = D.usuarios.find((x) => x.email === q.user_email);
      return { benefit: { ...q, description: D.beneficios.find((b) => b.id === q.benefit_id).description }, user: { email: u.email, full_name: u.full_name } };
    }
    case 'scanDonationQRCode': {
      const t = D.ingressos[1];
      return { qrCode: t, donor: { full_name: t.participant_name, email: t.user_email } };
    }
    case 'runRaffle':
      if (corpo?.action !== 'list') return { raffles: [] };
      return perfil === 'organizador' ? D.sorteiosOrganizador : D.sorteios;
    case 'getOrgStatement':
      return D.extrato(corpo);
    case 'getOrgReport':
      return D.relatorio();
    case 'claimGuestDonations':
      return { claimed: 0 };
    case 'getPublicDonationStats':
      return { total: 48750 };
    default:
      return null;
  }
}

const filtro = process.argv[2] ?? '';
const jobs = JSON.parse(readFileSync(new URL('./trabalhos.json', import.meta.url))).filter((j) => j.nome.startsWith(filtro));
await gerarCameras();
const navegador = { executablePath: process.env.CHROMIUM_PATH || undefined };
const semCamera = await chromium.launch(navegador);

for (const job of jobs) {
  // Com "camera": a câmera do navegador mostra o vídeo do QR Code fictício e o scanner lê de verdade
  const video = new URL(`./camera/${job.camera}.mjpeg`, import.meta.url).pathname;
  const b = job.camera
    ? await chromium.launch({
        ...navegador,
        args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', `--use-file-for-fake-video-capture=${video}`],
      })
    : semCamera;
  const ctx = await b.newContext({
    permissions: job.camera ? ['camera'] : [],
    viewport: { width: 1200, height: 800 },
    deviceScaleFactor: 1.4,
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
  });
  await ctx.clock.setFixedTime(new Date(D.hoje));
  await ctx.addInitScript((telas) => {
    for (const painel of ['org', 'merchant', 'organizer']) localStorage.setItem(`tours:${painel}`, JSON.stringify(telas));
    localStorage.setItem('language', 'pt');
    localStorage.setItem('has_seen_tutorial', 'true');
    localStorage.setItem('app_banner_dismissed', String(Date.now()));
    localStorage.setItem('theme', 'light');
  }, telas);
  const faltando = new Set();
  await ctx.route((u) => u.pathname.startsWith('/api/'), async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    const caminho = url.pathname;
    const json = (dados, status = 200) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(dados ?? {}) });
    if (caminho.includes('/analytics/') || caminho.includes('/app-logs/')) return json({});
    if (caminho.includes('/public-settings/')) return json({ id: 'demo', public_settings: { auth_required: false } });
    if (caminho.endsWith('/entities/User/me')) return json(D.pessoas[job.perfil]);
    const ent = caminho.match(/\/entities\/([A-Za-z]+)(?:\/([^/]+))?$/);
    if (ent) {
      const [, nome, id] = ent;
      const linhas = tabelas[nome] ?? (faltando.add(`entidade ${nome}`), []);
      if (req.method() === 'GET') {
        if (id) return json(linhas.find((l) => l.id === id) ?? null, linhas.some((l) => l.id === id) ? 200 : 404);
        const q = url.searchParams.get('q') ? JSON.parse(url.searchParams.get('q')) : {};
        let out = ordenar(linhas.filter((l) => casa(l, q)), url.searchParams.get('sort'));
        const skip = Number(url.searchParams.get('skip') ?? 0);
        const limit = Number(url.searchParams.get('limit') ?? 0);
        out = out.slice(skip, limit ? skip + limit : undefined);
        return json(out);
      }
      return json({ id: id ?? 'novo', ...(req.postDataJSON?.() ?? {}) });
    }
    const fn = caminho.match(/\/functions\/([A-Za-z]+)/);
    if (fn) {
      const r = funcao(fn[1], req.postDataJSON?.(), job.perfil);
      if (r === null) faltando.add(`função ${fn[1]} ${req.postData()?.slice(0, 80) ?? ''}`);
      return json(r ?? {});
    }
    faltando.add(`outro ${req.method()} ${caminho}`);
    return json({});
  });

  const p = await ctx.newPage();
  const erros = [];
  p.on('pageerror', (e) => erros.push(String(e).slice(0, 200)));
  await p.goto(`${APP}${job.url}${job.url.includes('?') ? '&' : '?'}access_token=demo`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  for (const passo of job.passos ?? []) {
    if (passo.clicar) await p.getByText(passo.clicar, { exact: passo.exato ?? false }).first().click();
    if (passo.botao) await p.getByRole('button', { name: new RegExp(passo.botao, 'i') }).first().click();
    if (passo.seletor) await p.locator(passo.seletor).first().click();
    if (passo.rolar) await p.mouse.wheel(0, passo.rolar);
    await p.waitForTimeout(passo.esperar ?? 1200);
  }
  if (job.pdf) {
    // "pdf": baixa o PDF gerado pelo botão e guarda uma página como imagem (precisa do pdftoppm, do poppler)
    const [download] = await Promise.all([
      p.waitForEvent('download', { timeout: 60000 }),
      p.getByRole('button', { name: new RegExp(job.pdf.botao, 'i') }).first().click(),
    ]);
    const arquivo = join(mkdtempSync(join(tmpdir(), 'prints-')), 'relatorio.pdf');
    await download.saveAs(arquivo);
    const pagina = String(job.pdf.pagina ?? 1);
    const png = arquivo.replace(/\.pdf$/, '');
    execFileSync('pdftoppm', ['-png', '-r', String(job.pdf.dpi ?? 160), '-f', pagina, '-l', pagina, '-singlefile', arquivo, png]);
    // "altura": fração da página que entra no print, de cima para baixo (1 = a página inteira)
    const imagem = sharp(`${png}.png`);
    const { width, height } = await imagem.metadata();
    await imagem.extract({ left: 0, top: 0, width, height: Math.round(height * (job.pdf.altura ?? 1)) }).toFile(`${SAIDA}${job.nome}.png`);
  } else {
    await p.screenshot({ path: `${SAIDA}${job.nome}.png` });
  }
  console.log(job.nome, '| faltando:', [...faltando], '| erros:', erros);
  await ctx.close();
  if (job.camera) await b.close();
}
await semCamera.close();
