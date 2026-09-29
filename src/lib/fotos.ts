import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

const mods = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/obras/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

/** Resolve um nome de foto (valor do CMS, ex. "/obras/001-capa.jpg") para ImageMetadata. */
export function fotoMeta(nome?: string): ImageMetadata | null {
  if (!nome) return null;
  const base = nome.split('/').pop()!;
  return mods[`/src/assets/obras/${base}`]?.default ?? null;
}

export async function fotoUrl(nome: string | undefined, width: number): Promise<string | null> {
  const src = fotoMeta(nome);
  if (!src) return null;
  const img = await getImage({ src, width, format: 'webp' });
  return img.src;
}
