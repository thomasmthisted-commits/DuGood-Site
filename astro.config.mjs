// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Endereço público do site (canonical, og:image, sitemap). O www e o workers.dev levam para cá (src/worker.js).
const site = process.env.SITE_URL ?? 'https://dugood-parceiros.com.br';

export default defineConfig({
  site,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (pagina) => !pagina.includes('/obrigado'),
      // O conteúdo inteiro é publicado junto: a data do build vale para todas as páginas
      lastmod: new Date(),
    }),
  ],
});
