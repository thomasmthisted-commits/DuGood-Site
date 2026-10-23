# Instruções para agentes

Site institucional da DuGood (plataforma de doações) para empresas, ONGs e organizadores de eventos sociais. Astro 7, site estático publicado em Cloudflare Workers (static assets) com um Worker pequeno para o formulário (`src/worker.js`, `wrangler.jsonc`). Idioma: português do Brasil. O app dos doadores é outro projeto (Base44, repositório `dugood`).

## Regras

- Não invente números, preços, taxas, prazos ou funcionalidades. Tudo o que o site afirma precisa existir no app DuGood ou nos Termos de Uso (`dugood.com.br/TermsAndConditions`). Taxas e remuneração da DuGood não são publicadas: o site só diz que, nas causas incentivadas, ela é combinada com cada ONG em contrato.
- Doação incentivada: nunca prometa dedução fiscal. Os limites do simulador ficam em `leisIncentivo` (`src/config.ts`) e valem para empresas do lucro real, sobre o IRPJ à alíquota de 15%.
- Dados de contato e links do app ficam só em `src/config.ts`.
- Prints do app: `src/assets/prints/<nome>.png`, via `Print.astro` (moldura de celular ou janela) e `GaleriaAbas.astro` (tour pelas abas de um painel). Prints de painel não podem mostrar dados reais de doadores. A lista de prints esperados está no README.
- `rascunho` (`src/config.ts`): enquanto `true`, todas as páginas têm `noindex`, o `robots.txt` bloqueia tudo e os prints que faltam aparecem como moldura pendente. Em `false`, prints que faltam somem.
- Formulário (`Formulario.astro`): envia para `/api/contato`; o Worker valida e repassa para a função `submitSiteLead` do Base44 com o cabeçalho `x-site-token`. Ao mudar campos, mude também `CAMPOS` em `src/worker.js` e na função `base44/functions/submitSiteLead` do repositório `dugood`, e a entidade `SiteLead`.
- Ao criar uma página nova, inclua-a no `llms.txt` (`src/pages/llms.txt.ts`), no cabeçalho e no rodapé.
- Antes de concluir: `npm run build` precisa passar sem erros.

## Visual

Simples e elegante: verde e branco, com cinzas bem claros para destacar, e os mascotes (o planeta) decorando.

- Tokens em `src/styles/global.css` (`:root`): verde escuro do logo (`--verde-escuro`), verde vivo do app (`--verde`, só em detalhes e rótulos), verde bem claro (`--verde-claro`), branco e cinzas claros (`--nevoa`, `--cinza-1`, `--linha`). Não crie hex soltos nos componentes.
- Tipografia: Plus Jakarta Sans nos títulos, Inter no resto (a mesma do app).
- Ritmo: alternar seções brancas (`secao`) e cinza bem claro (`secao--nevoa`). Cada página termina com uma única seção verde escura (`secao--escura`): o formulário de contato ou a `Chamada`.
- Mascotes em `src/assets/mascotes/`, sempre decorativos (`alt=""`, classe `mascote`), no máximo um por seção.
- Animação: só o fade de entrada (`data-r`, `src/scripts/revelar.ts`), que respeita `prefers-reduced-motion` e funciona sem JS.
