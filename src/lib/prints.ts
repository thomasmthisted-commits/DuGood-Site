import type { ImageMetadata } from 'astro';

// Prints do app em src/assets/prints/<nome>.(png|jpg|webp)
const arquivos = import.meta.glob<{ default: ImageMetadata }>('../assets/prints/*.{png,jpg,jpeg,webp}', { eager: true });

export const print = (nome: string): ImageMetadata | undefined =>
  Object.entries(arquivos).find(([caminho]) => caminho.replace(/^.*\//, '').replace(/\.\w+$/, '') === nome)?.[1].default;
