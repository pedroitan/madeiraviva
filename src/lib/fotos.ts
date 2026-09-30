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

/** Foto recortada para Open Graph (1200×630 jpeg) — preview de compartilhamento. */
export async function fotoOg(nome: string | undefined): Promise<string | null> {
  const src = fotoMeta(nome);
  if (!src) return null;
  const img = await getImage({ src, width: 1200, height: 630, fit: 'cover', format: 'jpeg' });
  return img.src;
}
