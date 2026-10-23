// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Endereço público do site (canonical, og:image, sitemap). Troque pelo domínio definitivo
// quando ele estiver ligado no Cloudflare; até lá o site é rascunho (src/config.ts) e fica fora do Google.
const site = process.env.SITE_URL ?? 'https://parceiros.dugood.com.br';

export default defineConfig({
  site,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (pagina) => !pagina.includes('/obrigado'),
    }),
  ],
});
