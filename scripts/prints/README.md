# Prints dos painéis com dados fictícios

Os prints dos painéis (ONG, lojista e organizador) são tirados do **app DuGood de verdade**, rodando no computador, com as chamadas ao Base44 respondidas por dados fictícios (`dados.mjs`): Instituto Exemplo, Café Exemplo, Assessoria Corre Junto e doadores inventados. Assim o site mostra as telas reais sem expor nenhum dado de doador, ONG ou loja.

Os scanners de QR Code leem um QR fictício por uma câmera simulada do Chromium (`camera.mjs`), então os prints mostram a leitura como no uso real.

## Como refazer

1. No repositório `dugood` (o app): `npm install` e `VITE_BASE44_APP_ID=demo npx vite --port 5173`.
2. Aqui: `npm install` e `npx playwright install chromium` (uma vez).
3. `npm run prints` (todos) ou `npm run prints -- lojista-` (só os do lojista).

Os arquivos saem direto em `src/assets/prints/`. Variáveis opcionais: `APP_URL` (endereço do app), `CHROMIUM_PATH` (Chromium já instalado) e `PLAYWRIGHT_DIR` (onde está o pacote `playwright`, se não for o deste projeto).

Para mudar o que aparece num print, edite `dados.mjs`; para mudar quais prints e em que aba, edite `trabalhos.json`. Se uma tela nova do app chamar uma função ou entidade que ainda não está nos dados, o script avisa em "faltando".
