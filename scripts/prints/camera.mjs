// Vídeos MJPEG para a câmera simulada do Chromium: um QR Code fictício parado na frente da câmera.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import QRCode from 'qrcode';
import sharp from 'sharp';

const QRS = { beneficio: 'QR-DEMO-0', ingresso: 'TICKET-DEMO-1' };
const pasta = new URL('./camera/', import.meta.url);

export async function gerarCameras() {
  mkdirSync(pasta, { recursive: true });
  for (const [nome, valor] of Object.entries(QRS)) {
    const arquivo = new URL(`${nome}.mjpeg`, pasta);
    if (existsSync(arquivo)) continue;
    const qr = await QRCode.toBuffer(valor, { width: 340, margin: 2 });
    const quadro = await sharp({ create: { width: 640, height: 480, channels: 3, background: '#ebeeec' } })
      .composite([{ input: qr, gravity: 'center' }])
      .jpeg({ quality: 90 })
      .toBuffer();
    writeFileSync(arquivo, Buffer.concat(Array(60).fill(quadro)));
  }
}
