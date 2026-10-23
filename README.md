# Site institucional DuGood (Astro + Cloudflare)

Site comercial da **DuGood** para **empresas**, **ONGs** e **organizadores de eventos sociais**, feito em [Astro](https://astro.build) e hospedado na **Cloudflare** (Workers com arquivos estáticos), no mesmo modelo da Vitrine. O app dos doadores continua no Base44 (`dugood.com.br`); este site só apresenta a DuGood e recebe os pedidos de contato.

## Páginas

| Rota | O que é |
| --- | --- |
| `/` | Início: a Rede do Bem e os três públicos |
| `/empresas` | Doação incentivada (com simulador), benefícios como lojista parceiro, painel do lojista, política, perguntas e formulário |
| `/ongs` | Como a ONG aparece no app, por que os doadores voltam, painel da ONG, projetos incentivados, como entrar e formulário |
| `/eventos` | Eventos sociais: como funciona, times e validação de ingressos, painel do organizador e formulário |
| `/obrigado` | Destino do formulário quando o navegador está sem JavaScript |
| `/llms.txt` | Resumo do site para agentes de IA |

## Onde mudar cada coisa

| O que | Onde |
| --- | --- |
| E-mail, Instagram, link do app, níveis, leis do simulador | `src/config.ts` |
| Modo rascunho (fora do Google e com molduras de print pendente) | `rascunho` em `src/config.ts` |
| Textos de cada página | `src/pages/*.astro` |
| Mascotes | `src/assets/mascotes/` |
| Prints do app | `src/assets/prints/` |
| Cores e tipografia | `src/styles/global.css` |
| Endpoint do formulário | `src/worker.js` |

## Prints do app

Cada print é um arquivo em `src/assets/prints/<nome>.png` (também vale `.jpg` ou `.webp`). Basta colocar o arquivo com o nome certo: o site gera as versões otimizadas sozinho. Enquanto um print não existe, a página mostra uma moldura "Print pendente" com o nome do arquivo esperado (só no modo rascunho; depois do lançamento, a moldura some).

Telas do celular (tiradas a 390 × 844, como no app):

| Arquivo | Tela | Status |
| --- | --- | --- |
| `inicio` | Início do app | ✅ |
| `explorar-ongs` | Explorar › ONGs | ✅ |
| `ong-perfil` | Página de uma ONG (AACC) | ✅ |
| `causa` | Página de uma causa | ✅ |
| `evento` | Página de um evento | ✅ |
| `beneficios-lista` | Benefícios | ✅ |
| `beneficio-detalhe` | Detalhe de um benefício | ✅ |
| `niveis` | Níveis de doação | ✅ |

Painéis (prints de computador, janela inteira do painel). Com a conta de admin dá para abrir o painel de qualquer ONG, lojista ou organizador (`/OrganizationDashboard?view_org_id=...`, `/MerchantDashboard?view_merchant_id=...`, `/EventOrganizerDashboard?view_organizer_id=...`). **Use contas de teste ou borre nomes, e-mails e telefones de doadores.**

| Arquivo | Tela |
| --- | --- |
| `lojista-informacoes` | Painel do lojista › Informações da Loja |
| `lojista-beneficios` | Painel do lojista › Benefícios |
| `lojista-scanner` | Painel do lojista › scanner e tabela de resgates |
| `lojista-clientes` | Painel do lojista › Clientes |
| `ong-painel-perfil` | Painel da ONG › Perfil (com os números do topo) |
| `ong-painel-causas` | Painel da ONG › Suas Causas |
| `ong-painel-eventos` | Painel da ONG › Eventos (inscritos e scanner) |
| `ong-painel-fiscal` | Painel da ONG › Incentivos Fiscais |
| `ong-painel-doadores` | Painel da ONG › Doadores |
| `ong-painel-documentos` | Painel da ONG › Documentos |
| `organizador-eventos` | Painel do organizador › Meus Eventos |
| `organizador-novo-evento` | Formulário de novo evento |
| `organizador-inscritos` | Painel do organizador › Inscritos |
| `organizador-scanner` | Painel do organizador › Escanear ingressos |

## Formulário de contato

Os três formulários enviam para `/api/contato` (`src/worker.js`). O Worker valida, descarta robôs (campo isca e envio rápido demais) e repassa para a função `submitSiteLead` do app DuGood no Base44. A função grava o contato na entidade `SiteLead`, que aparece no app em **Admin › Parceiros › Contatos do site**, e avisa os admins por e-mail.

Para funcionar, configure uma vez o mesmo texto aleatório longo nos dois lados:

1. No Base44 (app DuGood › Settings › Secrets): `SITE_LEAD_TOKEN`.
2. Na Cloudflare: `npx wrangler secret put SITE_LEAD_TOKEN` (ou no painel do Worker › Settings › Variables and Secrets).

O endereço da função fica em `BASE44_CONTATO_URL`, no `wrangler.jsonc`.

## Domínio

O site está pronto para um domínio próprio. Ao definir o domínio:

1. Ligue o domínio ao Worker na Cloudflare (Worker › Settings › Domains & Routes).
2. Troque o endereço em `astro.config.mjs` (`site`).
3. Para o lançamento, mude `rascunho` para `false` em `src/config.ts`: o site entra no Google e as molduras de print pendente somem.

Se empresas e ONGs ganharem domínios diferentes, o mesmo projeto atende os dois: em `INICIO_POR_DOMINIO` (`wrangler.jsonc`), diga qual página cada domínio abre na raiz, por exemplo `{ "ongs.exemplo.com.br": "/ongs" }`.

## Rodar no computador

Requer Node.js 22.12 ou mais novo.

```sh
npm install
npm run dev       # site em http://localhost:4321 (sem o formulário)
npm run preview   # site + Worker do formulário, como na Cloudflare
npm run build     # gera ./dist
npm run deploy    # publica na Cloudflare
```

Para testar o formulário localmente, crie `.dev.vars` (fora do git) com `SITE_LEAD_TOKEN=...` e, se quiser, `BASE44_CONTATO_URL=...`.
