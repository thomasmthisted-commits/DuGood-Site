# Prints dos painéis com dados fictícios

Os prints dos painéis (ONG, lojista e organizador) são tirados do **app DuGood de verdade**, rodando no computador, com as chamadas ao Base44 respondidas por dados fictícios (`dados.mjs`): Instituto Exemplo, Café Exemplo, Assessoria Corre Junto e doadores inventados. Assim o site mostra as telas reais sem expor nenhum dado de doador, ONG ou loja.

Os scanners de QR Code leem um QR fictício por uma câmera simulada do Chromium (`camera.mjs`), então os prints mostram a leitura como no uso real.

## Como refazer

1. No repositório `dugood` (o app): `npm install` e `VITE_BASE44_APP_ID=demo npx vite --port 5173`.
2. Aqui: `npm install` e `npx playwright install chromium` (uma vez).
3. `npm run prints` (todos) ou `npm run prints -- lojista-` (só os do lojista).

Os arquivos saem direto em `src/assets/prints/`. O navegador fica parado em 27/10/2026 (`hoje`, em `dados.mjs`), para os gráficos e o extrato saírem sempre iguais. O print do relatório mensal (`ong-relatorio-pdf`) baixa o PDF gerado pelo próprio app e recorta a página com o `pdftoppm` (pacote `poppler-utils`). Variáveis opcionais: `APP_URL` (endereço do app), `CHROMIUM_PATH` (Chromium já instalado) e `PLAYWRIGHT_DIR` (onde está o pacote `playwright`, se não for o deste projeto).

Para mudar o que aparece num print, edite `dados.mjs`; para mudar quais prints e em que tela, edite `trabalhos.json` (a tela vai em `?view=` na URL, como no menu do painel; `passos` clica em textos e botões; `camera` liga a câmera simulada; `pdf` baixa o PDF de um botão e guarda uma página, ou só a parte de cima dela com `altura`). Se uma tela nova do app chamar uma função ou entidade que ainda não está nos dados, o script avisa em "faltando".
