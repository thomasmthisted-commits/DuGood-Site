// Roteiro do vídeo tutorial para organizadores de eventos (onboarding): entrar, aceitar os Termos de Parceria,
// equipe (Controle de acessos e link de staff), Configurações, perfil e conta Stripe, criar o evento (100% para uma
// instituição ou venda em seu nome com contribuição social) e o evento no ar (página, portaria e financeiro).
// Mesmo formato do roteiro da ONG. Regiões das telas (r) em px da tela de 1200x800.
// Textos conferidos com o app (repositório dugood): nada aqui pode prometer o que o app não faz.

const passo = (num, titulo, sub, mascote) => ({
  dur: 4.2,
  fundo: 'verde',
  itens: [
    { tipo: 'imagem', src: `mascotes/${mascote}.png`, x: 300, y: 300, w: 470, mascote: true, at: .1 },
    { tipo: 'passo', num, titulo, sub, x: 860, y: 330 },
  ],
});
const cartaoPasso = (n, a, b, selo, cls, x, at) => ({
  tipo: 'html', x, y: 330, at,
  conteudo: `<div class="cartao" style="width:500px;min-height:300px"><div class="avatar" style="background:#52b520">${n}</div>
    <div class="nome">${a}</div><div class="mail">${b}</div><span class="selo ${cls}">${selo}</span></div>`,
});

window.ROTEIRO = [
  // Abertura
  {
    dur: 5,
    itens: [
      { tipo: 'rotulo', texto: 'Tutorial para organizadores de eventos', y: 330, at: .2 },
      { tipo: 'titulo', texto: 'Boas-vindas à *DuGood.*', y: 390, tam: 104, at: .4 },
      { tipo: 'sub', texto: 'Eventos sociais em que a inscrição vira doação.', y: 540, at: 1.4 },
    ],
  },
  {
    dur: 5.2,
    fundo: 'verde',
    itens: [
      { tipo: 'imagem', src: '../../public/marca/logo-dugood-branco.png', x: 610, y: 250, w: 700, at: .2 },
      { tipo: 'sub', texto: 'Seu painel em <b>7 passos</b>.', y: 610, tam: 40, at: 1.2 },
      { tipo: 'html', x: 0, y: 700, at: 1.8, dy: 20, estilo: 'width:1920px', conteudo: `<div style="display:flex;justify-content:center;gap:12px;font-size:21px;font-weight:600">
        ${['Entrar', 'Termos', 'Equipe', 'Configurações', 'Perfil e Stripe', 'Criar o evento', 'Evento no ar'].map((s, i) => `<span style="background:rgba(255,255,255,.18);border-radius:999px;padding:10px 18px">${i + 1}. ${s}</span>`).join('')}</div>` },
    ],
  },

  // 01 Entrar
  passo('01', 'Entrar no painel', 'Pelo link de cadastro que a DuGood mandou para você.', 'celular'),
  {
    dur: 10,
    itens: [
      { tipo: 'titulo', texto: 'Abra o link e *entre com a sua conta.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'ong-login', x: 380, y: 180, w: 1160, url: 'dugood.com.br/?organizer_invite=…', at: .5,
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
      { tipo: 'html', x: 330, y: 330, at: .9, conteudo: `<div class="cartao" style="width:380px"><div class="avatar" style="background:#09a673">C</div><div class="nome">Camila</div><div class="mail">entrou primeiro</div><span class="selo adm">Administrador</span></div>` },
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
      { tipo: 'navegador', src: 'org-termos', x: 160, y: 180, w: 1160, at: .4,
        cam: [{ at: 1.4, r: [300, 20, 600, 760] }] },
      { tipo: 'chip', texto: 'Uso da imagem e da marca do seu evento', x: 1260, y: 330, at: 2.8 },
      { tipo: 'chip', texto: 'Validar os ingressos na entrada', x: 1260, y: 430, at: 3.8 },
      { tipo: 'chip', texto: 'Manter os times atualizados', x: 1260, y: 530, at: 4.8 },
      { tipo: 'chip', texto: 'Marque as duas opções e clique em Aceitar e continuar', x: 1060, y: 720, at: 6.4, cheio: true, tam: 22 },
      { tipo: 'sub', texto: 'Cada pessoa da equipe aceita na primeira vez que entra.', y: 1000, tam: 26, at: 7.8 },
    ],
  },

  // 03 Equipe
  passo('03', 'Sua equipe', 'Quem cuida do painel e quem trabalha na portaria.', 'abraco'),
  {
    dur: 10,
    itens: [
      { tipo: 'titulo', texto: 'Configurações › *Controle de acessos.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'org-acessos', x: 380, y: 180, w: 1160, at: .4,
        cam: [{ at: 4.4, r: [250, 220, 940, 200] }, { at: 7, r: [280, 560, 900, 230] }],
        aneis: [{ at: 1.4, ate: 3.2, r: [12, 690, 228, 34] }, { at: 2.6, ate: 4.2, r: [516, 180, 218, 40] }, { at: 5.8, ate: 6.9, r: [1038, 313, 116, 44] }, { at: 8, r: [894, 611, 106, 43] }] },
      { tipo: 'chip', texto: 'Botão Configurações, no rodapé do menu', x: 120, y: 900, at: 1.5, ate: 4.2 },
      { tipo: 'chip', texto: 'Mande o link de cadastro para a equipe', x: 1120, y: 880, at: 5.9, ate: 7 },
      { tipo: 'chip', texto: 'Aprove quem pediu acesso', x: 1240, y: 960, at: 8.1 },
    ],
  },
  {
    dur: 7.5,
    itens: [
      { tipo: 'titulo', texto: 'Em cada bloco: *sem acesso, ver ou editar.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'org-acessos-blocos', x: 380, y: 180, w: 1160, at: .3,
        cam: [{ at: 1, r: [280, 500, 900, 240] }] },
      { tipo: 'html', x: 300, y: 1000, at: 2.8, dy: 20, conteudo: `<div style="display:flex;gap:16px;align-items:center">
          ${['Início', 'Eventos', 'Conta', 'Financeiro'].map((b) => `<span class="chip" style="position:static">${b}</span>`).join('')}
          <span class="chip" style="position:static;background:#52b520;color:#fff">Um administrador por painel</span></div>` },
    ],
  },
  {
    dur: 11,
    itens: [
      { tipo: 'titulo', texto: 'Na portaria: *o link de staff do evento.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'org-evento-staff', x: 110, y: 200, w: 1080, at: .4,
        cam: [{ at: 1.8, r: [270, 520, 920, 280] }],
        aneis: [{ at: 1, ate: 1.8, r: [800, 598, 180, 32] }, { at: 3.4, r: [1040, 718, 116, 44] }] },
      { tipo: 'chip', texto: 'Aba Staff, na página do evento', x: 1260, y: 330, at: 1.1 },
      { tipo: 'chip', texto: 'Só vê a lista e faz o check-in', x: 1260, y: 470, at: 4.4 },
      { tipo: 'chip', texto: 'Não vê valores nem altera o evento', x: 1260, y: 570, at: 5.4 },
      { tipo: 'chip', texto: 'Vale até o dia seguinte ao evento', x: 1260, y: 670, at: 6.4 },
    ],
  },

  // 04 Configurações
  passo('04', 'Configurações', 'Avisos por e-mail e o idioma do painel.', 'ferramentas'),
  {
    dur: 8.5,
    itens: [
      { tipo: 'titulo', texto: 'Escolha *como saber das inscrições.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'org-notificacoes', x: 380, y: 180, w: 1160, at: .4,
        cam: [{ at: 1.5, r: [262, 230, 720, 360] }],
        aneis: [{ at: 3, r: [298, 452, 340, 44] }] },
      { tipo: 'chip', texto: 'A cada inscrição', x: 1380, y: 330, at: 3.2 },
      { tipo: 'chip', texto: 'Uma vez por dia', x: 1380, y: 420, at: 4 },
      { tipo: 'chip', texto: 'ou nunca', x: 1420, y: 510, at: 4.8 },
      { tipo: 'sub', texto: 'Avisos importantes, como pedidos de acesso, chegam sempre.', y: 1000, tam: 26, at: 5.8 },
    ],
  },
  {
    dur: 6.5,
    itens: [
      { tipo: 'titulo', texto: 'O painel em *português, inglês ou espanhol.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'org-idioma', x: 380, y: 180, w: 1160, at: .4,
        cam: [{ at: 1.5, r: [240, 120, 760, 340] }],
        aneis: [{ at: 3, r: [302, 342, 632, 58] }] },
      { tipo: 'chip', texto: 'Vale só para você', x: 1360, y: 900, at: 3.6 },
    ],
  },

  // 05 Perfil e conta Stripe
  passo('05', 'Perfil e Stripe', 'Quem você é e onde caem as suas vendas.', 'trofeu'),
  {
    dur: 8,
    itens: [
      { tipo: 'titulo', texto: 'Conta › Perfil: *quem organiza o evento.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'org-perfil', x: 380, y: 180, w: 1160, at: .4,
        cam: [{ at: 1.5, r: [262, 180, 720, 500] }] },
      { tipo: 'chip', texto: 'Logo, sobre você e site', x: 1360, y: 360, at: 2.8 },
      { tipo: 'chip', texto: 'Aparece em “Sobre o organizador”', x: 1260, y: 450, at: 3.8 },
      { tipo: 'sub', texto: 'nas páginas dos seus eventos.', y: 1000, tam: 26, at: 4.6 },
    ],
  },
  {
    dur: 10,
    itens: [
      { tipo: 'titulo', texto: 'Financeiro › Pagamentos: *sua conta Stripe.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'org-pagamentos', x: 380, y: 180, w: 1160, at: .4,
        cam: [{ at: 1.5, r: [270, 190, 920, 290] }],
        aneis: [{ at: 3, r: [300, 296, 860, 66] }] },
      { tipo: 'chip', texto: 'Pessoa física (CPF) ou jurídica (CNPJ)', x: 1100, y: 880, at: 3.2 },
      { tipo: 'chip', texto: 'Necessária para vender em seu nome', x: 1140, y: 970, at: 4.4, cheio: true },
      { tipo: 'chip', texto: 'O cadastro é feito no site da Stripe', x: 120, y: 880, at: 5.6 },
    ],
  },

  // 06 Criar o evento
  passo('06', 'Criar o evento', 'Escolha para onde vai o dinheiro.', 'ingresso'),
  {
    dur: 11,
    itens: [
      { tipo: 'titulo', texto: 'Meus eventos › Novo Evento: *para onde vai o dinheiro?*', y: 70, tam: 54 },
      { tipo: 'navegador', src: 'org-novo-evento-destino', x: 480, y: 170, w: 960, at: .4,
        cam: [{ at: 1.4, r: [270, 230, 660, 300] }],
        aneis: [{ at: 2.8, ate: 5.6, r: [300, 288, 300, 92] }, { at: 5.8, r: [598, 288, 300, 92] }] },
      { tipo: 'html', x: 110, y: 890, at: 3, dy: 20, conteudo: `<div class="cartao" style="width:820px;padding:22px 28px"><div class="nome" style="margin:0;font-size:28px">100% para uma instituição</div><div class="mail" style="font-size:21px;margin-top:6px">Tudo o que os participantes pagam vai para a ONG escolhida.</div></div>` },
      { tipo: 'html', x: 990, y: 890, at: 6, dy: 20, conteudo: `<div class="cartao" style="width:820px;padding:22px 28px"><div class="nome" style="margin:0;font-size:28px">Venda em meu nome</div><div class="mail" style="font-size:21px;margin-top:6px">O dinheiro cai na sua conta e uma parte vai para as ONGs.</div></div>` },
    ],
  },
  {
    dur: 11,
    itens: [
      { tipo: 'titulo', texto: 'Venda em seu nome, *com contribuição social.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'org-novo-evento-divisao', x: 380, y: 180, w: 1160, at: .4,
        cam: [{ at: 1.4, r: [280, 160, 640, 500] }],
        aneis: [{ at: 3, ate: 5.8, r: [302, 476, 596, 162] }, { at: 6, r: [302, 272, 596, 200] }] },
      { tipo: 'chip', texto: 'Uma ou mais instituições, com o % de cada', x: 1080, y: 860, at: 3.1, ate: 6 },
      { tipo: 'chip', texto: 'Você absorve a tarifa ou o comprador paga', x: 1080, y: 860, at: 6.2 },
      { tipo: 'chip', texto: 'A doação extra vai 100% para uma das ONGs', x: 120, y: 960, at: 7.6 },
    ],
  },
  {
    dur: 9.5,
    itens: [
      { tipo: 'titulo', texto: 'Cada instituição *aprova antes de ir ao ar.*', y: 110, tam: 62 },
      cartaoPasso('1', 'Você envia o evento', 'para as instituições', 'Aguardando ONG', 'esp', 170, .9),
      cartaoPasso('2', 'A instituição recebe o pedido', 'por e-mail, vendo a divisão', 'Aprovou', 'ok2', 710, 2.2),
      cartaoPasso('3', 'O evento vai ao ar', 'quando todas aprovarem', 'No ar', 'adm', 1250, 3.5),
      { tipo: 'sub', texto: 'Se uma instituição recusar, você ajusta o evento ou escolhe outra.', y: 720, at: 5 },
    ],
  },

  // 07 Evento no ar
  passo('07', 'Evento no ar', 'A página do evento, a portaria e o financeiro.', 'festa'),
  {
    dur: 10,
    itens: [
      { tipo: 'titulo', texto: 'Tudo do evento *na página dele.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'org-evento', x: 380, y: 180, w: 1160, at: .4,
        aneis: [{ at: 1.6, ate: 3.6, r: [292, 440, 892, 116] }, { at: 3.8, ate: 6, r: [292, 596, 892, 30] }, { at: 6.2, r: [296, 350, 590, 34] }] },
      { tipo: 'chip', texto: 'Arrecadado, inscritos e check-ins', x: 1260, y: 320, at: 1.7, ate: 3.8 },
      { tipo: 'chip', texto: 'Inscritos, Informações, Configurações, Times e Staff', x: 960, y: 980, at: 3.9, ate: 6.2 },
      { tipo: 'chip', texto: 'Escanear ingressos e enviar atualizações', x: 1100, y: 980, at: 6.3 },
    ],
  },
  {
    dur: 8,
    itens: [
      { tipo: 'titulo', texto: 'Na entrada, *escaneie o ingresso.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'org-scanner', x: 380, y: 180, w: 1160, at: .4,
        cam: [{ at: 1.4, r: [250, 160, 900, 420] }],
        aneis: [{ at: 3, r: [570, 470, 200, 44] }] },
      { tipo: 'chip', texto: 'Confira o nome e confirme', x: 1300, y: 900, at: 3.2 },
      { tipo: 'sub', texto: 'Também dá para marcar a chegada à mão, na lista de inscritos.', y: 1000, tam: 26, at: 4.6 },
    ],
  },
  {
    dur: 9,
    itens: [
      { tipo: 'titulo', texto: 'Financeiro: *extrato, repasses e relatórios.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'org-extrato', x: 380, y: 180, w: 1160, at: .4,
        cam: [{ at: 1.5, r: [270, 520, 920, 300] }] },
      { tipo: 'chip', texto: 'Vendas, parte das ONGs e tarifas', x: 1240, y: 870, at: 3 },
      { tipo: 'chip', texto: 'A DuGood repassa a parte das ONGs', x: 120, y: 870, at: 4.2 },
      { tipo: 'chip', texto: 'Relatório mensal em PDF e planilha', x: 700, y: 960, at: 5.4 },
    ],
  },
  {
    dur: 8,
    itens: [
      { tipo: 'titulo', texto: 'Ficou com dúvida? *Cada tela explica.*', y: 70, tam: 58 },
      { tipo: 'navegador', src: 'org-geral', x: 380, y: 180, w: 1160, at: .4,
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
