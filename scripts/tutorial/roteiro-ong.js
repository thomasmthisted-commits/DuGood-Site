// Roteiro do vídeo tutorial para ONGs (onboarding): entrar, assinar o termo de entrada, equipe e Controle de acessos, Configurações,
// conhecer o painel e primeiros passos. Cada cena: { dur (s), fundo: 'branca' | 'verde', itens }.
// Os tempos dos itens (at, ate) contam do começo da cena. Regiões das telas (r) em px da tela de 1200x800.
// Textos conferidos com o app (repositório dugood): nada aqui pode prometer o que o app não faz.

const passo = (num, titulo, sub, mascote) => ({
  dur: 4.2,
  fundo: 'verde',
  itens: [
    { tipo: 'imagem', src: `mascotes/${mascote}.png`, x: 300, y: 300, w: 470, mascote: true, at: .1 },
    { tipo: 'passo', num, titulo, sub, x: 860, y: 330 },
  ],
});

window.ROTEIRO = [
  // Abertura
  {
    dur: 5,
    itens: [
      { tipo: 'rotulo', texto: 'Tutorial para ONGs', y: 330, at: .2 },
      { tipo: 'titulo', texto: 'Bem-vinda à *DuGood.*', y: 390, tam: 104, at: .4 },
      { tipo: 'sub', texto: 'Em poucos minutos, seu painel pronto para receber doações.', y: 540, at: 1.4 },
    ],
  },
  {
    dur: 5.2,
    fundo: 'verde',
    itens: [
      { tipo: 'imagem', src: '../../public/marca/logo-dugood-branco.png', x: 610, y: 250, w: 700, at: .2 },
      { tipo: 'sub', texto: 'Seu painel em <b>6 passos</b>.', y: 610, tam: 40, at: 1.2 },
      { tipo: 'html', x: 360, y: 700, at: 1.8, dy: 20, conteudo: `<div style="display:flex;gap:14px;font-size:22px;font-weight:600">
        ${['Entrar', 'Termo', 'Equipe', 'Configurações', 'Painel', 'Primeiros passos'].map((s, i) => `<span style="background:rgba(255,255,255,.18);border-radius:999px;padding:10px 20px">${i + 1}. ${s}</span>`).join('')}</div>` },
    ],
  },

  // 01 Entrar
  passo('01', 'Entrar no painel', 'Pelo link de cadastro que a DuGood mandou para a instituição.', 'celular'),
  {
    dur: 11,
    itens: [
      { tipo: 'titulo', texto: 'Abra o link e *entre com a sua conta.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'ong-login', x: 380, y: 180, w: 1160, url: 'dugood.com.br/?invite=…', at: .5,
        cam: [{ at: 1.8, r: [250, 230, 700, 580] }],
        aneis: [{ at: 3.2, ate: 5.6, r: [400, 376, 400, 92] }, { at: 5.8, ate: 8, r: [400, 505, 400, 160] }, { at: 8.2, r: [560, 728, 160, 34] }] },
      { tipo: 'chip', texto: 'Google ou Apple', x: 1460, y: 420, at: 3.3 },
      { tipo: 'chip', texto: 'ou e-mail e senha', x: 1460, y: 560, at: 5.9 },
      { tipo: 'chip', texto: 'Sem conta? Cadastrar', x: 1460, y: 820, at: 8.3 },
    ],
  },
  {
    dur: 9,
    itens: [
      { tipo: 'titulo', texto: 'Quem entra primeiro *vira o administrador.*', y: 110, tam: 62 },
      { tipo: 'html', x: 330, y: 330, at: .9, conteudo: `<div class="cartao" style="width:380px"><div class="avatar" style="background:#09a673">M</div><div class="nome">Mariana</div><div class="mail">entrou primeiro</div><span class="selo adm">Administrador</span></div>` },
      { tipo: 'html', x: 770, y: 330, at: 3, conteudo: `<div class="cartao" style="width:380px"><div class="avatar" style="background:#8fc9a8">P</div><div class="nome">Pedro</div><div class="mail">entrou pelo mesmo link</div><span class="selo esp">Aguardando aprovação</span></div>` },
      { tipo: 'html', x: 1210, y: 330, at: 3.4, conteudo: `<div class="cartao" style="width:380px"><div class="avatar" style="background:#b7d9c4">J</div><div class="nome">Juliana</div><div class="mail">entrou pelo mesmo link</div><span class="selo esp">Aguardando aprovação</span></div>` },
      { tipo: 'sub', texto: 'Quem entra depois pede acesso, e o administrador recebe um aviso por e-mail para aprovar.', y: 720, at: 4.6 },
    ],
  },

  // 02 Termo de entrada (Termo de Captação de Causa Comum, DocuSign: a ONG assina e depois a DuGood)
  passo('02', 'Assinar o termo', 'O contrato de entrada da instituição na DuGood, assinado pela internet.', 'livro'),
  {
    dur: 9.5,
    itens: [
      { tipo: 'titulo', texto: 'Instituição › Documentos › *Assinar.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'ong-documentos', x: 380, y: 180, w: 1160, at: .4,
        cam: [{ at: 1.6, r: [240, 150, 520, 260] }],
        aneis: [{ at: 3.2, r: [596, 301, 99, 39] }] },
      { tipo: 'chip', texto: 'Termo de Captação de Causa Comum', x: 1180, y: 300, at: 2.4 },
      { tipo: 'chip', texto: 'Um termo só, para todas as causas e eventos', x: 1060, y: 900, at: 4.4 },
    ],
  },
  {
    dur: 11,
    itens: [
      { tipo: 'titulo', texto: 'O link de assinatura *chega por e-mail.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'ong-termo-email', x: 110, y: 200, w: 1040, at: .4,
        cam: [{ at: 1.4, r: [330, 150, 540, 500] }],
        aneis: [{ at: 2.6, r: [362, 342, 476, 174] }] },
      { tipo: 'html', x: 1230, y: 250, at: 4, dy: 50, conteudo: `<div class="cartao" style="width:580px;padding:0;overflow:hidden">
          <div style="background:#f1f3f2;padding:16px 26px;font-size:19px;color:#56635b;font-weight:600">Caixa de entrada · e-mail da instituição</div>
          <div style="padding:26px 30px">
            <div style="font-size:19px;color:#8a958e">De: DocuSign</div>
            <div style="font-family:'Plus Jakarta Sans';font-weight:700;font-size:28px;margin-top:8px;line-height:1.25">Assinatura — Termo de Captação de Causa Comum</div>
            <div style="height:12px;background:#eef1ef;border-radius:6px;margin-top:22px;width:92%"></div>
            <div style="height:12px;background:#eef1ef;border-radius:6px;margin-top:10px;width:70%"></div>
            <div style="display:inline-block;margin-top:24px;background:#52b520;color:#fff;font-weight:700;font-size:21px;padding:14px 26px;border-radius:10px">Revisar e assinar</div>
          </div></div>` },
      { tipo: 'chip', texto: 'Vai para o e-mail da instituição', x: 1270, y: 700, at: 5.6 },
      { tipo: 'chip', texto: 'O responsável legal abre e assina', x: 1250, y: 790, at: 6.6 },
      { tipo: 'sub', texto: 'Não chegou? Confira a caixa de spam e o e-mail em Instituição › Perfil.', y: 990, tam: 25, at: 8 },
    ],
  },
  {
    dur: 9.5,
    itens: [
      { tipo: 'titulo', texto: 'Depois, *a DuGood assina também.*', y: 110, tam: 62 },
      ...[
        ['1', 'A instituição pede', 'em Documentos', 'Pendente', 'esp'],
        ['2', 'O responsável legal assina', 'pelo link do e-mail', 'Aguardando assinatura da DuGood', 'esp'],
        ['3', 'A DuGood assina', 'e o termo fica em Documentos', 'Assinado', 'ok2'],
      ].map(([n, a, b, selo, cls], i) => ({
        tipo: 'html', x: 170 + i * 540, y: 330, at: .9 + i * 1.3,
        conteudo: `<div class="cartao" style="width:500px;min-height:300px"><div class="avatar" style="background:#52b520">${n}</div>
          <div class="nome">${a}</div><div class="mail">${b}</div><span class="selo ${cls}">${selo}</span></div>`,
      })),
      { tipo: 'sub', texto: 'O termo assinado é necessário para criar causas e eventos na DuGood.', y: 720, at: 5 },
    ],
  },

  // 03 Equipe
  passo('03', 'Sua equipe', 'No Controle de acessos você escolhe quem entra e o que cada pessoa vê.', 'abraco'),
  {
    dur: 9.5,
    itens: [
      { tipo: 'titulo', texto: 'Configurações › *Controle de acessos.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'ong-acessos', x: 380, y: 180, w: 1160, at: .4,
        cam: [{ at: 4.6, r: [250, 220, 940, 200] }],
        aneis: [{ at: 1.4, ate: 3.2, r: [12, 682, 228, 38] }, { at: 2.6, ate: 4.4, r: [516, 180, 218, 40] }, { at: 6.2, r: [1038, 313, 116, 44] }] },
      { tipo: 'chip', texto: 'Botão Configurações, no rodapé do menu', x: 120, y: 900, at: 1.5, ate: 4.4 },
      { tipo: 'chip', texto: 'Copie o link de cadastro', x: 1180, y: 880, at: 6.3 },
      { tipo: 'chip', texto: 'ou envie no WhatsApp', x: 1240, y: 960, at: 7.2 },
    ],
  },
  {
    dur: 12,
    itens: [
      { tipo: 'titulo', texto: 'Aprove quem pediu acesso *e escolha o que cada um faz.*', y: 70, tam: 54 },
      { tipo: 'navegador', src: 'ong-acessos', x: 380, y: 180, w: 1160, at: .3,
        trocas: [{ at: 5, src: 'ong-acessos-blocos' }],
        cam: [{ at: .8, r: [280, 560, 900, 230] }, { at: 4.6, r: [0, 0, 1200, 800], dur: .8 }, { at: 5.6, r: [280, 410, 900, 290] }],
        aneis: [{ at: 1.9, ate: 4.4, r: [894, 611, 106, 43] }] },
      { tipo: 'chip', texto: 'Aprovar ou recusar', x: 1300, y: 960, at: 2, ate: 4.6 },
      { tipo: 'html', x: 330, y: 930, at: 7, dy: 20, conteudo: `<div style="display:flex;gap:16px;align-items:center">
          <span class="chip" style="position:static">Em cada bloco do menu:</span>
          <span class="chip" style="position:static;background:#eef1ef">Sem acesso</span>
          <span class="chip" style="position:static;background:#e6f6ee;color:#078a5f">Ver</span>
          <span class="chip" style="position:static;background:#52b520;color:#fff">Editar</span></div>` },
    ],
  },
  {
    dur: 8.5,
    itens: [
      { tipo: 'titulo', texto: 'Um administrador *por painel.*', y: 110, tam: 64 },
      { tipo: 'sub', texto: 'Só ele vê o Controle de acessos. Quem é aprovado começa podendo editar tudo.', y: 220, at: .9 },
      { tipo: 'navegador', src: 'ong-acessos', x: 470, y: 340, w: 980, at: .6,
        cam: [{ at: 1.2, r: [280, 660, 880, 80] }],
        aneis: [{ at: 2.4, r: [808, 686, 184, 40] }] },
      { tipo: 'chip', texto: 'Passar administração', x: 1120, y: 300, at: 2.5 },
      { tipo: 'chip', texto: 'Bloquear, liberar ou excluir quando quiser', x: 610, y: 930, at: 4 },
    ],
  },

  // 04 Configurações
  passo('04', 'Configurações', 'Avisos por e-mail e o idioma do painel.', 'ferramentas'),
  {
    dur: 10,
    itens: [
      { tipo: 'titulo', texto: 'Escolha *como receber os avisos.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'ong-notificacoes', x: 380, y: 180, w: 1160, at: .4,
        cam: [{ at: 1.6, r: [262, 245, 720, 520] }] },
      { tipo: 'chip', texto: 'A cada doação ou inscrição', x: 1300, y: 330, at: 3 },
      { tipo: 'chip', texto: 'Resumo diário, semanal ou mensal', x: 1260, y: 420, at: 4.2 },
      { tipo: 'chip', texto: 'ou nunca', x: 1420, y: 510, at: 5.4 },
      { tipo: 'sub', texto: 'Avisos importantes, como pedidos de acesso, chegam sempre.', y: 1000, tam: 26, at: 6.6 },
    ],
  },
  {
    dur: 7,
    itens: [
      { tipo: 'titulo', texto: 'O painel em *português, inglês ou espanhol.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'ong-idioma', x: 380, y: 180, w: 1160, at: .4,
        cam: [{ at: 1.5, r: [240, 120, 760, 340] }],
        aneis: [{ at: 3, r: [302, 338, 636, 64] }] },
      { tipo: 'chip', texto: 'Vale só para você', x: 1360, y: 900, at: 3.6 },
    ],
  },

  // 05 Conheça o painel
  passo('05', 'Conheça o painel', 'Tudo organizado no menu, por blocos.', 'lupa'),
  {
    dur: 10,
    itens: [
      { tipo: 'titulo', texto: 'Tudo no menu, *organizado por blocos.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'ong-menu', x: 620, y: 180, w: 1160, at: .4,
        aneis: [{ at: 1.6, r: [4, 100, 240, 480] }] },
      ...['Captação', 'Eventos', 'CRM e campanhas', 'Incentivos fiscais', 'Instituição', 'Financeiro'].map((texto, i) => ({
        tipo: 'chip', texto, x: 110, y: 250 + i * 104, at: 2 + i * .45,
      })),
    ],
  },
  {
    dur: 8.5,
    itens: [
      { tipo: 'titulo', texto: 'Visão geral: *o resumo da instituição.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'ong-geral', x: 380, y: 180, w: 1160, at: .4,
        cam: [{ at: 2.6, r: [270, 430, 920, 310] }],
        aneis: [{ at: 1.2, ate: 2.5, r: [276, 176, 900, 234] }, { at: 4.2, r: [276, 437, 444, 296] }] },
      { tipo: 'chip', texto: 'Arrecadado, doações e doadores', x: 1300, y: 300, at: 1.3, ate: 2.8 },
      { tipo: 'chip', texto: 'Pendências para resolver', x: 1300, y: 880, at: 4.3 },
    ],
  },

  // 06 Primeiros passos
  passo('06', 'Primeiros passos', 'O que fazer logo depois de entrar.', 'joinha'),
  {
    dur: 26,
    itens: [
      { tipo: 'titulo', texto: 'Para começar a *receber doações.*', y: 70, tam: 58 },
      { tipo: 'lista', x: 110, y: 260, at: .3, itens: [
        { at: 1.4, texto: 'Complete o perfil', detalhe: 'Instituição › Perfil' },
        { at: 7.4, texto: 'Ative os pagamentos', detalhe: 'Financeiro › Pagamentos, com a Stripe' },
        { at: 13.6, texto: 'Crie a primeira causa', detalhe: 'Captação › Suas causas' },
        { at: 19.6, texto: 'Acompanhe doadores e extrato', detalhe: 'CRM e campanhas e Financeiro' },
      ] },
      { tipo: 'navegador', src: 'ong-perfil', x: 830, y: 230, w: 1000, at: .8, de: 'direita',
        trocas: [{ at: 7.4, src: 'ong-pagamentos' }, { at: 13.6, src: 'ong-causas' }, { at: 19.6, src: 'ong-doadores' }, { at: 22.8, src: 'ong-extrato' }],
        aneis: [{ at: 9, ate: 13.2, r: [292, 276, 212, 50] }, { at: 15, ate: 19.2, r: [1020, 124, 160, 50] }] },
      { tipo: 'chip', texto: 'A ONG recebe 100% das doações', x: 1080, y: 930, at: 9.4, ate: 13.3, cheio: true },
      { tipo: 'sub', texto: 'A DuGood não cobra taxa. Só a Stripe cobra as tarifas dela.', x: 0, y: 1005, tam: 25, at: 10 },
      { tipo: 'chip', texto: 'Causas e eventos, com link para divulgar', x: 990, y: 930, at: 15.2, ate: 19.3 },
    ],
  },
  {
    dur: 8.5,
    itens: [
      { tipo: 'titulo', texto: 'Ficou com dúvida? *Cada tela explica.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'ong-menu', x: 380, y: 180, w: 1160, at: .4,
        aneis: [{ at: 1.4, r: [400, 138, 144, 36] }, { at: 3, r: [12, 722, 150, 30] }] },
      { tipo: 'chip', texto: '“Como usar esta tela”', x: 1000, y: 230, at: 1.5 },
      { tipo: 'chip', texto: 'Tutoriais, no menu', x: 120, y: 940, at: 3.1 },
    ],
  },

  // Fechamento
  {
    dur: 8,
    fundo: 'verde',
    itens: [
      { tipo: 'imagem', src: 'mascotes/acenando.png', x: 820, y: 120, w: 280, mascote: true, at: .1 },
      { tipo: 'titulo', texto: 'Conte com a gente.', y: 440, tam: 96, at: .4 },
      { tipo: 'sub', texto: 'Fale com a DuGood', y: 600, tam: 32, at: 1.2 },
      { tipo: 'html', x: 0, y: 670, at: 1.6, dy: 20, estilo: 'width:1920px', conteudo: `<div style="display:flex;justify-content:center;gap:22px;font-size:30px;font-weight:600">
          <span style="background:#fff;color:#17241c;border-radius:999px;padding:16px 30px">comercial@dugood.com.br</span>
          <span style="background:#fff;color:#17241c;border-radius:999px;padding:16px 30px">WhatsApp (11) 99429-9400</span></div>` },
      { tipo: 'imagem', src: '../../public/marca/logo-dugood-branco.png', x: 840, y: 860, w: 240, at: 2.4 },
    ],
  },
];
