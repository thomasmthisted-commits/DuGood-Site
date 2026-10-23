# Site institucional DuGood (Astro + Cloudflare)

Site comercial da **DuGood** para **empresas**, **ONGs** e **organizadores de eventos sociais**, feito em [Astro](https://astro.build) e hospedado na **Cloudflare** (Workers com arquivos estáticos), no mesmo modelo da Vitrine. É um site só institucional: não tem login, e o único chamado para ação é o contato. O app dos doadores continua no Base44 (`dugood.com.br`).

## Páginas

| Rota | O que é |
| --- | --- |
| `/` | Início: a Rede do Bem, os três públicos, quem somos e perguntas sobre a DuGood |
| `/empresas` | Doação incentivada (com simulador), benefícios como lojista parceiro, painel do lojista, política, perguntas e formulário |
| `/ongs` | Como a ONG aparece no app, por que os doadores voltam, painel da ONG, projetos incentivados, como entrar e formulário |
| `/eventos` | Eventos sociais: como funciona, times e validação de ingressos, painel do organizador e formulário |
| `/sobre` | Sobre nós: missão, história, trajetória, ecossistema e os fundadores (com fotos) |
| `/blog` | Blog: uma trilha por tema, do básico ao guia completo, com filtro por nível |
| `/blog/<artigo>` | Artigo, com resumo, índice, fontes oficiais, perguntas e artigos relacionados |
| `/blog/categoria/<tema>` | Os artigos de um tema, separados por nível |
| `/marca/` | Logo e fundo verde em alta resolução, para baixar e usar em outros materiais |
| `/obrigado` | Destino do formulário quando o navegador está sem JavaScript |

## Onde mudar cada coisa

| O que | Onde |
| --- | --- |
| Textos de cada página (uma fonte só para o HTML, o `.md`, o `llms.txt` e os dados estruturados) | `src/conteudo/*.ts` |
| Artigos do blog | `src/content/blog/<endereço>.md` (campos validados em `src/content.config.ts`) |
| Temas e níveis do blog | `categoriasBlog` e `niveisBlog` em `src/config.ts` |
| Fotos dos fundadores | `src/assets/fundadores/` |
| Logo e fundo em alta resolução para download | `public/marca/` |
| E-mail, Instagram, link do app, níveis, leis do simulador, opções do formulário, fundadores | `src/config.ts` |
| Modo rascunho (fora do Google e com molduras de print pendente) | `rascunho` em `src/config.ts` |
| Layout das páginas | `src/pages/*.astro` e `src/components/` |
| Mascotes, fundo verde ondulado (o mesmo do app) | `src/assets/mascotes/`, `src/assets/onda-verde.png` |
| Prints do app | `src/assets/prints/` |
| Cores e tipografia | `src/styles/global.css` |
| Formulário, consulta de CNPJ e Markdown para agentes | `src/worker.js` |

## Google e agentes de IA (SEO e LLMO)

- **Uma fonte de conteúdo.** Cada página tem seu arquivo em `src/conteudo/`. Dele saem a página HTML, a versão Markdown, o `llms.txt`, o `llms-full.txt` e os dados estruturados. Nunca há texto escondido só para buscadores.
- **Versão Markdown de cada página:** `/index.md`, `/empresas.md`, `/ongs.md`, `/eventos.md`. Cada página HTML aponta para a sua no `<link rel="alternate" type="text/markdown">` e no cabeçalho HTTP `Link`. Quem pede `Accept: text/markdown` no endereço normal recebe direto o Markdown.
- **`/llms.txt`** (índice com resumo e fatos importantes) e **`/llms-full.txt`** (todo o conteúdo num arquivo).
- **Dados estruturados (JSON-LD):** Organization (com fundadores e contato), WebSite, WebPage, BreadcrumbList, Service e FAQPage em cada página.
- **`robots.txt`** libera buscadores e agentes de IA (GPTBot, ClaudeBot, PerplexityBot e outros) e aponta o sitemap e o `llms.txt`. Enquanto o site for rascunho, bloqueia tudo.
- **Sitemap** com data de atualização, canonical, Open Graph e Twitter Card com imagem 1200 × 630, e a imagem principal de cada página carregando primeiro.

## Blog

Cada artigo é um arquivo Markdown em `src/content/blog/`. O nome do arquivo vira o endereço (`/blog/<nome>`). No topo, os campos obrigatórios:

- `titulo` (até ~70 caracteres) e `descricao` (até ~160, aparece no Google);
- `resumo`: 2 ou 3 frases factuais, que abrem o artigo ("Em resumo"), a versão `.md` e o `llms.txt`;
- `categoria` (um dos temas de `categoriasBlog`) e `nivel` (`basico`, `intermediario` ou `avancado`);
- `publico` (`empresa`, `ong` ou `organizador`) e, se quiser, `interesse`: definem para qual formulário a chamada do fim do artigo leva, já com a opção marcada;
- `publicado` (data), `fontes` (pelo menos uma fonte oficial ou de referência) e, opcional, `perguntas` (viram o FAQ do artigo e do Google) e `destaque: true` (aparece em "Comece por aqui" e na página inicial).

Cada artigo ganha sozinho a versão `.md`, a entrada no `llms.txt` e no `llms-full.txt`, os dados estruturados (BlogPosting, migalhas e FAQ) e o lugar na trilha do tema. Ao escrever, cite a lei ou a fonte oficial e evite prometer resultado fiscal: os artigos são informativos.

## Formulário de contato e preenchimento prévio

Os três formulários enviam para `/api/contato` (`src/worker.js`). O Worker valida, descarta robôs (campo isca e envio rápido demais) e repassa para a função `submitSiteLead` do app DuGood no Base44. A função grava o contato na entidade `SiteLead`, que aparece em **Admin › Parceiros › Contatos do site**, e avisa os admins por e-mail.

O formulário já chega preenchido sempre que possível:

- **CNPJ:** ao digitar um CNPJ válido, `/api/cnpj/<número>` busca na base pública da Receita (BrasilAPI) o nome, a razão social, a cidade e o regime tributário, e preenche o que estiver vazio. A consulta fica em cache por um dia.
- **Interesse:** os botões da página já marcam a opção certa (`data-interesse`), e dá para fazer o mesmo pelo endereço, por exemplo `/empresas?interesse=incentivada#contato`. Os ids das opções estão em `interesses`, no `src/config.ts`.
- **Simulador:** o botão "Conversar sobre este valor" escreve o valor simulado na mensagem e marca doação incentivada e lucro real.
- **Dados da pessoa:** nome, e-mail, WhatsApp, cargo e organização ficam guardados só naquela aba do navegador e já aparecem nos formulários das outras páginas.
- **Origem:** os parâmetros `utm_` (ou o site de onde a pessoa veio) vão junto com o contato.

Para funcionar, configure uma vez o mesmo texto aleatório longo nos dois lados:

1. No Base44 (app DuGood › Settings › Secrets): `SITE_LEAD_TOKEN`.
2. Na Cloudflare: `npx wrangler secret put SITE_LEAD_TOKEN` (ou no painel do Worker › Settings › Variables and Secrets).

O endereço da função fica em `BASE44_CONTATO_URL`, no `wrangler.jsonc`.

## Prints do app

Cada print é um arquivo em `src/assets/prints/<nome>.png`. O site gera as versões otimizadas sozinho.

- **Telas públicas** (início, explorar, página de ONG, causa, evento, benefícios e níveis): tiradas do app no ar, a 390 × 844.
- **Painéis** (ONG, lojista e organizador): tirados do app de verdade com **dados fictícios** (Instituto Exemplo, Café Exemplo, Assessoria Corre Junto e doadores inventados), sem nenhum dado real. Para refazer, veja `scripts/prints/README.md` (`npm run prints`).

Se faltar algum print, a página mostra uma moldura "Print pendente" (só no modo rascunho; depois do lançamento, a moldura some).

## Domínio

1. Ligue o domínio ao Worker na Cloudflare (Worker › Settings › Domains & Routes).
2. Troque o endereço em `astro.config.mjs` (`site`).
3. Para o lançamento, mude `rascunho` para `false` em `src/config.ts`: o site entra no Google e o `robots.txt` libera buscadores e agentes de IA.

Se empresas e ONGs ganharem domínios diferentes, o mesmo projeto atende os dois: em `INICIO_POR_DOMINIO` (`wrangler.jsonc`), diga qual página cada domínio abre na raiz, por exemplo `{ "ongs.exemplo.com.br": "/ongs" }`.

## Rodar no computador

Requer Node.js 22.12 ou mais novo.

```sh
npm install
npm run dev       # site em http://localhost:4321 (sem o formulário e o CNPJ)
npm run preview   # site + Worker (formulário, CNPJ, Markdown), como na Cloudflare
npm run build     # gera ./dist
npm run deploy    # publica na Cloudflare
```

Para testar o formulário localmente, crie `.dev.vars` (fora do git) com `SITE_LEAD_TOKEN=...` e, se quiser, `BASE44_CONTATO_URL=...`.
