// Une o build da loja (Astro, loja/dist) dentro do export do site (Next, out/).
// A homepage do site (out/index.html) tem precedência; todo o resto da loja
// (/loja, /admin, /_astro, logos, sitemap, robots) entra no mesmo deploy.
import { cpSync, readdirSync, rmSync, statSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const from = join(root, 'loja', 'dist');
const to = join(root, 'out');

const SKIP = new Set(['index.html']); // homepage do site narrativo

mkdirSync(to, { recursive: true });

for (const entry of readdirSync(from)) {
  if (SKIP.has(entry)) continue;
  const src = join(from, entry);
  const dst = join(to, entry);
  if (statSync(src).isDirectory()) rmSync(dst, { recursive: true, force: true });
  cpSync(src, dst, { recursive: true });
  console.log(`  out/${entry}`);
}

console.log('Loja integrada em out/');
