// Grava o vídeo tutorial: abre cena.html com o roteiro, desenha quadro a quadro (render(t)) e manda para o ffmpeg,
// com a trilha do filme institucional encaixada na duração (o fim da música coincide com o fim do vídeo).
//
// Uso: node scripts/tutorial/render.mjs ong                 → public/filme/tutorial-ong.mp4
//      node scripts/tutorial/render.mjs ong --quadros 3,20  → só esses instantes, em PNG (para conferir)
// Variáveis: SAIDA (arquivo ou pasta), FPS (padrão 30), PLAYWRIGHT_DIR, CHROMIUM_PATH. Precisa do ffmpeg.
import { spawn, execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
const require = createRequire(process.env.PLAYWRIGHT_DIR ?? import.meta.url);
const { chromium } = require('playwright');

const roteiro = process.argv[2] ?? 'ong';
const iq = process.argv.indexOf('--quadros');
const quadros = iq > 0 ? process.argv[iq + 1].split(',').map(Number) : null;
const FPS = Number(process.env.FPS ?? 30);
const aqui = new URL('.', import.meta.url).pathname;
const trilha = new URL('../../public/filme/dugood.mp4', import.meta.url).pathname;

const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
p.on('pageerror', (e) => console.error('erro na cena:', String(e)));
await p.goto(`file://${aqui}cena.html?roteiro=${roteiro}`);
await p.waitForFunction(() => window.PRONTO === true, null, { timeout: 60000 });
const duracao = await p.evaluate(() => window.DURACAO);
console.log(`roteiro ${roteiro}: ${duracao.toFixed(1)} s`);

if (quadros) {
  const pasta = process.env.SAIDA ?? `${aqui}quadros/`;
  mkdirSync(pasta, { recursive: true });
  for (const t of quadros) {
    await p.evaluate((t) => window.render(t), t);
    await p.screenshot({ path: `${pasta}${roteiro}-${String(t).padStart(5, '0')}.png` });
  }
  await b.close();
  process.exit(0);
}

const saida = process.env.SAIDA ?? new URL(`../../public/filme/tutorial-${roteiro}.mp4`, import.meta.url).pathname;
mkdirSync(dirname(saida), { recursive: true });
// Trilha: começo do filme até "corte", depois o fim do filme (cruzando 3 s), para terminar junto com o vídeo
const fimFilme = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', trilha]).toString());
const cruz = 3;
const corte = Math.min(fimFilme, 62);
const inicioFim = Math.max(0, fimFilme - (duracao - corte + cruz));
const audio = duracao <= fimFilme
  ? `[1:a]atrim=0:${duracao},afade=t=out:st=${duracao - 3}:d=3[a]`
  : `[1:a]atrim=0:${corte}[a1];[1:a]atrim=${inicioFim},asetpts=PTS-STARTPTS[a2];[a1][a2]acrossfade=d=${cruz}[a]`;
const ff = spawn('ffmpeg', [
  '-v', 'error', '-y',
  '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
  '-i', trilha,
  '-filter_complex', `${audio};[a]volume=0.9[aout]`, '-map', '0:v', '-map', '[aout]',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '21', '-pix_fmt', 'yuv420p', '-tune', 'animation',
  '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', saida,
], { stdio: ['pipe', 'inherit', 'inherit'] });

const total = Math.round(duracao * FPS);
for (let i = 0; i < total; i++) {
  await p.evaluate((t) => window.render(t), i / FPS);
  const img = await p.screenshot({ type: 'jpeg', quality: 94 });
  if (!ff.stdin.write(img)) await new Promise((r) => ff.stdin.once('drain', r));
  if (i % (FPS * 10) === 0) console.log(`${Math.round(i / FPS)} s`);
}
ff.stdin.end();
await new Promise((r) => ff.on('close', r));
await b.close();
console.log('pronto:', saida);
