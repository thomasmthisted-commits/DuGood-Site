# Instruções para agentes

Site institucional da DuGood (plataforma de doações) para empresas, ONGs e organizadores de eventos sociais. Astro 7, site estático publicado em Cloudflare Workers (static assets) com um Worker que roda antes dos arquivos (`src/worker.js`, `wrangler.jsonc`): formulário de contato, consulta de CNPJ e Markdown para agentes. Idioma: português do Brasil. O app dos doadores é outro projeto (Base44, repositório `dugood`). O site é só institucional: sem login, e o único chamado para ação é o contato.

## Regras

- Não invente números, preços, taxas, prazos ou funcionalidades. Tudo o que o site afirma precisa existir no app DuGood ou nos Termos de Uso (`dugood.com.br/TermsAndConditions`). Taxas e remuneração da DuGood não são publicadas: o site só diz que, nas causas incentivadas, ela é combinada com cada ONG em contrato.
- Doação incentivada: nunca prometa dedução fiscal. Os limites do simulador ficam em `leisIncentivo` (`src/config.ts`) e valem para empresas do lucro real, sobre o IRPJ à alíquota de 15%.
- Textos das páginas moram em `src/conteudo/<pagina>.ts` (tipos em `src/conteudo/tipos.ts`), nunca direto no `.astro`. Do mesmo arquivo saem o HTML, a versão Markdown (`markdown()` do arquivo, servida em `src/pages/<pagina>.md.ts`), o `llms.txt`, o `llms-full.txt` e o JSON-LD (`src/lib/schema.ts`). Ao mudar um texto, confira que o `.md` continua fazendo sentido.
- Cada `Pagina` tem `titulo` (até ~60 caracteres), `descricao` (até ~160), `resumo` factual de 2 a 3 frases e `perguntas` (viram FAQPage). Nunca use texto escondido na página para SEO: só JSON-LD, `.md` e `llms.txt`.
- Dados de contato, links do app, opções do formulário (`interesses`) e fundadores ficam só em `src/config.ts`.
- Botões que levam ao contato usam `href="#contato"` e, quando faz sentido, `data-interesse="<id>"` para já marcar a opção no formulário. Nada de links para login ou para "abrir o app" como chamada principal; o app aparece só no rodapé ("App para quem doa").
- Prints do app: `src/assets/prints/<nome>.png`, via `Print.astro` e `GaleriaAbas.astro`. Prints de painel saem de `npm run prints` (`scripts/prints/`), com dados fictícios; nunca use prints com dados reais de doadores.
- `rascunho` (`src/config.ts`): enquanto `true`, todas as páginas têm `noindex`, o `robots.txt` bloqueia tudo e os prints que faltam aparecem como moldura pendente.
- Formulário (`Formulario.astro`): envia para `/api/contato`; o Worker valida e repassa para a função `submitSiteLead` do Base44 com o cabeçalho `x-site-token`. Ao mudar campos, mude também `CAMPOS` em `src/worker.js` e na função `base44/functions/submitSiteLead` do repositório `dugood`, e a entidade `SiteLead`.
- Ao criar uma página nova: arquivo em `src/conteudo/`, a página `.astro`, o endpoint `.md.ts`, a entrada no `llms.txt` e no `llms-full.txt`, no cabeçalho e no rodapé.
- Antes de concluir: `npm run build` precisa passar sem erros.

## Visual

Simples e elegante: verde e branco, com cinzas bem claros para destacar, o fundo verde ondulado do app e os mascotes (o planeta) decorando.

- Tokens em `src/styles/global.css` (`:root`): verde escuro do logo (`--verde-escuro`), verde vivo do app (`--verde`, só em detalhes e rótulos), verde bem claro (`--verde-claro`), branco e cinzas claros (`--nevoa`, `--cinza-1`, `--linha`) e o gradiente das ondas (`--onda-*`). Não crie hex soltos nos componentes.
- Fundo verde ondulado (`Onda.astro`, classe `onda`): o mesmo do cabeçalho do app (gradiente + `src/assets/onda-verde.png`), com um véu verde escuro para o texto branco ter contraste. Só na abertura (`Heroi.astro`) e na seção final de contato (`Contato.astro` ou `Chamada.astro`).
- Tipografia: Plus Jakarta Sans nos títulos, Inter no resto (a mesma do app).
- Ritmo: abertura ondulada, seções brancas (`secao`) e cinza bem claro (`secao--nevoa`) alternadas, e uma única seção final ondulada com o contato.
- Mascotes em `src/assets/mascotes/`, sempre decorativos (`alt=""`, classe `mascote`), no máximo um por seção.
- Animação: só o fade de entrada (`data-r`, `src/scripts/revelar.ts`), que respeita `prefers-reduced-motion` e funciona sem JS. Nada de fade na abertura (atrasa a primeira imagem).
