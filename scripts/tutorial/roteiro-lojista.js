// Roteiro do vídeo tutorial para lojistas parceiros (onboarding): entrar, aceitar os Termos de Parceria, equipe e
// idioma, informações da loja, benefícios (como o doador desbloqueia e como cadastrar) e o dia a dia na loja
// (scanner de benefícios, clientes e QR codes de doação). Mesmo formato do roteiro da ONG.
// Regiões das telas (r) em px da tela de 1200x800.
// Textos conferidos com o app (repositório dugood): nada aqui pode prometer o que o app não faz.

const passo = (num, titulo, sub, mascote) => ({
  dur: 4.2,
  fundo: 'verde',
  itens: [
    { tipo: 'imagem', src: `mascotes/${mascote}.png`, x: 300, y: 300, w: 470, mascote: true, at: .1 },
    { tipo: 'passo', num, titulo, sub, x: 860, y: 330 },
  ],
});
const cartao = (n, a, b, x, at, w = 380) => ({
  tipo: 'html', x, y: 330, at,
  conteudo: `<div class="cartao" style="width:${w}px;min-height:280px"><div class="avatar" style="background:#52b520">${n}</div>
    <div class="nome">${a}</div><div class="mail">${b}</div></div>`,
});

window.ROTEIRO = [
  // Abertura
  {
    dur: 5,
    itens: [
      { tipo: 'rotulo', texto: 'Tutorial para lojistas parceiros', y: 330, at: .2 },
      { tipo: 'titulo', texto: 'Boas-vindas à *DuGood.*', y: 390, tam: 104, at: .4 },
      { tipo: 'sub', texto: 'Benefícios para quem doa, novos clientes para a sua loja.', y: 540, at: 1.4 },
    ],
  },
  {
    dur: 5.2,
    fundo: 'verde',
    itens: [
      { tipo: 'imagem', src: '../../public/marca/logo-dugood-branco.png', x: 610, y: 250, w: 700, at: .2 },
      { tipo: 'sub', texto: 'Seu painel em <b>6 passos</b>.', y: 610, tam: 40, at: 1.2 },
      { tipo: 'html', x: 0, y: 700, at: 1.8, dy: 20, estilo: 'width:1920px', conteudo: `<div style="display:flex;justify-content:center;gap:12px;font-size:21px;font-weight:600">
        ${['Entrar', 'Termos', 'Equipe', 'Sua loja', 'Benefícios', 'Na loja'].map((s, i) => `<span style="background:rgba(255,255,255,.18);border-radius:999px;padding:10px 18px">${i + 1}. ${s}</span>`).join('')}</div>` },
    ],
  },

  // 01 Entrar
  passo('01', 'Entrar no painel', 'Pelo link de cadastro que a DuGood mandou para a loja.', 'celular'),
  {
    dur: 10,
    itens: [
      { tipo: 'titulo', texto: 'Abra o link e *entre com a sua conta.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'ong-login', x: 380, y: 180, w: 1160, url: 'dugood.com.br/?merchant_invite=…', at: .5,
        cam: [{ at: 1.8, r: [250, 230, 700, 580] }],
        aneis: [{ at: 3.2, ate: 5.4, r: [400, 376, 400, 92] }, { at: 5.6, ate: 7.6, r: [400, 505, 400, 160] }, { at: 7.8, r: [560, 728, 160, 34] }] },
      { tipo: 'chip', texto: 'Google ou Apple', x: 1460, y: 420, at: 3.3 },
      { tipo: 'chip', texto: 'ou e-mail e senha', x: 1460, y: 560, at: 5.7 },
      { tipo: 'chip', texto: 'Sem conta? Cadastrar', x: 1460, y: 820, at: 7.9 },
    ],
  },
  {
    dur: 8.5,
    itens: [
      { tipo: 'titulo', texto: 'Quem entra primeiro *vira o administrador.*', y: 110, tam: 62 },
      { tipo: 'html', x: 330, y: 330, at: .9, conteudo: `<div class="cartao" style="width:380px"><div class="avatar" style="background:#09a673">R</div><div class="nome">Rodrigo</div><div class="mail">entrou primeiro</div><span class="selo adm">Administrador</span></div>` },
      { tipo: 'html', x: 770, y: 330, at: 2.8, conteudo: `<div class="cartao" style="width:380px"><div class="avatar" style="background:#8fc9a8">P</div><div class="nome">Pedro</div><div class="mail">entrou pelo mesmo link</div><span class="selo esp">Aguardando aprovação</span></div>` },
      { tipo: 'html', x: 1210, y: 330, at: 3.2, conteudo: `<div class="cartao" style="width:380px"><div class="avatar" style="background:#b7d9c4">J</div><div class="nome">Juliana</div><div class="mail">entrou pelo mesmo link</div><span class="selo esp">Aguardando aprovação</span></div>` },
      { tipo: 'sub', texto: 'Quem entra depois pede acesso, e o administrador recebe um aviso por e-mail para aprovar.', y: 720, at: 4.4 },
    ],
  },

  // 02 Termos de Parceria (aceite no próprio painel, na primeira entrada de cada pessoa)
  passo('02', 'Aceitar os termos', 'Na primeira entrada, os Termos de Parceria aparecem no próprio painel.', 'livro'),
  {
    dur: 11,
    itens: [
      { tipo: 'titulo', texto: 'Leia e aceite os *Termos de Parceria.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'loj-termos', x: 160, y: 180, w: 1160, at: .4,
        cam: [{ at: 1.4, r: [320, 30, 560, 760] }] },
      { tipo: 'chip', texto: 'Uso da imagem e da marca da loja', x: 1260, y: 330, at: 2.8 },
      { tipo: 'chip', texto: 'Entregar os benefícios cadastrados', x: 1260, y: 430, at: 3.8 },
      { tipo: 'chip', texto: 'Manter os benefícios atualizados', x: 1260, y: 530, at: 4.8 },
      { tipo: 'chip', texto: 'Marque as duas opções e clique em Aceitar e continuar', x: 1060, y: 720, at: 6.4, cheio: true, tam: 22 },
      { tipo: 'sub', texto: 'Cada pessoa da equipe aceita na primeira vez que entra.', y: 1000, tam: 26, at: 7.8 },
    ],
  },

  // 03 Equipe e idioma
  passo('03', 'Sua equipe', 'Quem cuida do painel e o idioma de cada um.', 'abraco'),
  {
    dur: 10,
    itens: [
      { tipo: 'titulo', texto: 'Configurações › *Controle de acessos.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'loj-acessos', x: 380, y: 180, w: 1160, at: .4,
        cam: [{ at: 4.4, r: [250, 220, 940, 200] }, { at: 7, r: [280, 560, 900, 230] }],
        aneis: [{ at: 1.4, ate: 3.2, r: [12, 690, 228, 34] }, { at: 2.6, ate: 4.2, r: [380, 180, 214, 40] }, { at: 5.8, ate: 6.9, r: [1038, 313, 116, 44] }, { at: 8, r: [894, 611, 106, 43] }] },
      { tipo: 'chip', texto: 'Botão Configurações, no rodapé do menu', x: 120, y: 900, at: 1.5, ate: 4.2 },
      { tipo: 'chip', texto: 'Mande o link de cadastro para a equipe', x: 1120, y: 880, at: 5.9, ate: 7 },
      { tipo: 'chip', texto: 'Aprove quem pediu acesso', x: 1240, y: 960, at: 8.1 },
    ],
  },
  {
    dur: 7.5,
    itens: [
      { tipo: 'titulo', texto: 'Em cada bloco: *sem acesso, ver ou editar.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'loj-acessos-blocos', x: 380, y: 180, w: 1160, at: .3,
        cam: [{ at: 1, r: [280, 470, 900, 280] }] },
      { tipo: 'html', x: 300, y: 1000, at: 2.8, dy: 20, conteudo: `<div style="display:flex;gap:16px;align-items:center">
          ${['Início', 'Benefícios', 'Doações', 'Conta'].map((b) => `<span class="chip" style="position:static">${b}</span>`).join('')}
          <span class="chip" style="position:static;background:#52b520;color:#fff">Um administrador por painel</span></div>` },
    ],
  },
  {
    dur: 6.5,
    itens: [
      { tipo: 'titulo', texto: 'O painel em *português, inglês ou espanhol.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'loj-configuracoes', x: 380, y: 180, w: 1160, at: .4,
        cam: [{ at: 1.5, r: [240, 120, 760, 340] }],
        aneis: [{ at: 3, r: [302, 342, 632, 58] }] },
      { tipo: 'chip', texto: 'Configurações › Idioma, vale só para você', x: 1100, y: 900, at: 3.6 },
    ],
  },

  // 04 Informações da loja
  passo('04', 'Sua loja', 'Como a loja aparece para quem doa.', 'presente'),
  {
    dur: 9,
    itens: [
      { tipo: 'titulo', texto: 'Conta › Informações da loja.', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'loj-loja', x: 380, y: 180, w: 1160, at: .4,
        aneis: [{ at: 1.6, ate: 3.6, r: [282, 186, 900, 90] }, { at: 3.8, ate: 5.8, r: [282, 330, 900, 90] }, { at: 6, r: [282, 500, 900, 300] }] },
      { tipo: 'chip', texto: 'O logo aparece em todos os seus benefícios', x: 1080, y: 320, at: 1.7, ate: 3.8 },
      { tipo: 'chip', texto: 'Sobre a loja: produtos e propósito', x: 1180, y: 420, at: 3.9, ate: 6 },
      { tipo: 'chip', texto: 'Contato, endereço, site e redes', x: 1220, y: 900, at: 6.1 },
    ],
  },

  // 05 Benefícios
  passo('05', 'Benefícios', 'Um desconto ou brinde para quem doa pela DuGood.', 'trofeu'),
  {
    dur: 10,
    itens: [
      { tipo: 'titulo', texto: 'Como o doador *chega até a sua loja.*', y: 110, tam: 62 },
      cartao('1', 'A pessoa doa', 'para uma causa no app', 150, .8),
      cartao('2', 'Ganha pontos', 'e sobe de nível ou ganha medalhas', 560, 2),
      cartao('3', 'Desbloqueia', 'o benefício da sua loja', 970, 3.2),
      cartao('4', 'Usa na loja', 'pelo QR Code, cupom ou link', 1380, 4.4),
      { tipo: 'sub', texto: 'Para a loja, estar na DuGood não custa nada.', y: 720, at: 6 },
    ],
  },
  {
    dur: 9,
    itens: [
      { tipo: 'titulo', texto: 'Benefícios › *Meus benefícios.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'loj-beneficios', x: 380, y: 180, w: 1160, at: .4,
        cam: [{ at: 3.6, r: [280, 360, 900, 420] }],
        aneis: [{ at: 1.6, ate: 3.4, r: [1006, 370, 154, 46] }, { at: 4.8, r: [462, 545, 84, 30] }] },
      { tipo: 'chip', texto: 'Novo Benefício', x: 1420, y: 300, at: 1.7, ate: 3.6 },
      { tipo: 'chip', texto: 'Editar, pausar ou reativar quando quiser', x: 1100, y: 960, at: 5 },
    ],
  },
  {
    dur: 12,
    itens: [
      { tipo: 'titulo', texto: 'Monte o benefício *em poucos campos.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'loj-novo-beneficio', x: 160, y: 180, w: 1160, at: .4,
        cam: [{ at: 1.4, r: [330, 180, 540, 580] }],
        aneis: [{ at: 2.6, ate: 4.8, r: [364, 424, 474, 152] }, { at: 5, ate: 7.6, r: [364, 582, 474, 74] }, { at: 7.8, r: [364, 662, 474, 74] }] },
      { tipo: 'chip', texto: 'Valor, limite de usos e validade', x: 1260, y: 330, at: 2.7 },
      { tipo: 'chip', texto: 'Resgate: QR Code, cupom ou link', x: 1260, y: 440, at: 5.1 },
      { tipo: 'chip', texto: 'Por nível ou por medalhas', x: 1260, y: 550, at: 7.9 },
      { tipo: 'sub', texto: 'Depois de criado, o benefício já aparece para os doadores no app.', y: 1000, tam: 26, at: 9 },
    ],
  },

  // 06 Na loja
  passo('06', 'Na loja', 'Validar os benefícios e conhecer os clientes.', 'festa'),
  {
    dur: 9,
    itens: [
      { tipo: 'titulo', texto: 'O cliente mostra o QR, *você escaneia.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'loj-scanner', x: 380, y: 180, w: 1160, at: .4,
        cam: [{ at: 1.4, r: [280, 180, 900, 320] }],
        aneis: [{ at: 3.4, r: [726, 404, 432, 44] }] },
      { tipo: 'chip', texto: 'Quem é, qual benefício e usos restantes', x: 120, y: 900, at: 2.6 },
      { tipo: 'chip', texto: 'Aceitar Leitura registra o uso', x: 1240, y: 900, at: 3.6, cheio: true },
    ],
  },
  {
    dur: 9,
    itens: [
      { tipo: 'titulo', texto: 'Benefícios › Clientes: *quem passou pela loja.*', y: 70, tam: 56 },
      { tipo: 'navegador', src: 'loj-clientes', x: 380, y: 180, w: 1160, at: .4,
        aneis: [{ at: 1.6, ate: 4, r: [278, 186, 902, 286] }, { at: 4.2, r: [278, 510, 902, 260] }] },
      { tipo: 'chip', texto: 'Estado, faixa etária e escolaridade', x: 1220, y: 320, at: 1.7, ate: 4.2 },
      { tipo: 'chip', texto: 'Contato e validações de cada cliente', x: 1180, y: 960, at: 4.3 },
    ],
  },
  {
    dur: 8.5,
    itens: [
      { tipo: 'titulo', texto: 'Doações › *QR Codes de doação.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'loj-doacoes', x: 380, y: 180, w: 1160, at: .4,
        cam: [{ at: 1.4, r: [270, 180, 920, 420] }] },
      { tipo: 'sub', texto: 'Quando uma ONG escolhe a sua loja para validar as doações de uma causa ou evento,<br>você escaneia aqui o QR code que o doador recebeu por e-mail.', y: 920, tam: 26, at: 2.4 },
    ],
  },
  {
    dur: 8,
    itens: [
      { tipo: 'titulo', texto: 'Ficou com dúvida? *Cada tela explica.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'loj-geral', x: 380, y: 180, w: 1160, at: .4,
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
