// Gera o PDF do guia da ONG a partir do index.html (Playwright/Chromium).
// Uso: node scripts/tutorial/guia-ong/gerar-pdf.mjs  (PLAYWRIGHT_DIR se o playwright não estiver neste projeto)
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const { chromium } = createRequire(process.env.PLAYWRIGHT_DIR ?? import.meta.url)('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const saida = path.join(here, 'DuGood-Guia-da-ONG.pdf');
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
await page.emulateMedia({ media: 'print', colorScheme: 'light' });
await page.goto(pathToFileURL(path.join(here, 'index.html')).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({
  path: saida,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate: '<div style="width:100%;font-size:8px;color:#8a958e;padding:0 15mm;display:flex;justify-content:space-between;font-family:Inter,Arial,sans-serif"><span>DuGood · Guia para ONGs</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
});
await browser.close();
console.log('PDF gerado em', saida);
