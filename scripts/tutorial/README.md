# Vídeo tutorial de onboarding

Vídeo curto, no mesmo estilo do filme institucional (frases com destaque em verde, fundo ondulado, mascotes e as
telas do app em moldura de navegador), para mandar a quem acabou de receber o link de cadastro do painel.
Hoje existe o das ONGs (`roteiro-ong.js`): entrar pelo link, assinar o termo de entrada (DocuSign, por e-mail), equipe e Controle de acessos, Configurações
(notificações e idioma), o menu e a Visão geral, e os primeiros passos (perfil, pagamentos com a Stripe, primeira
causa, doadores e extrato).

- `cena.html`: o palco (1920x1080) e os tipos de elemento (título, subtítulo, mascote, navegador com zoom e
  destaques, chips, lista de passos). Sem dependências além das fontes do Google.
- `roteiro-<painel>.js`: as cenas, os textos e os tempos. Regiões das telas em px da tela de 1200x800.
- `telas/`: as telas do app com dados fictícios, tiradas pelo script de prints (`scripts/prints`), com a lista
  `telas-<painel>.json` (Instituto Exemplo, equipe fictícia: nenhum dado real).
- `render.mjs`: desenha quadro a quadro e grava o MP4 com a trilha do filme institucional encaixada na duração.

## Como refazer

1. Telas: com o app rodando (veja `scripts/prints/README.md`),
   `TRABALHOS=scripts/tutorial/telas-ong.json SAIDA=scripts/tutorial/telas/ npm run prints`.
2. Conferir alguns instantes: `node scripts/tutorial/render.mjs ong --quadros 3,20,45` (PNGs em `quadros/`).
3. Vídeo: `node scripts/tutorial/render.mjs ong` (sai em `public/filme/tutorial-ong.mp4`; `SAIDA` muda o destino).

Para organizadores e lojistas: tire as telas do painel deles (`telas-organizador.json`, perfil `organizador` ou
`lojista` nos prints), copie o roteiro da ONG para `roteiro-organizador.js` e troque textos e telas. Tudo o que o
vídeo afirma precisa existir no app (veja o CLAUDE.md do repositório `dugood`).
