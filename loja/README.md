# Loja Madeira Viva

Loja do ateliê (`/loja`), conforme `PRD-loja-madeira-viva.md`. Site estático em
**Astro**, conteúdo em Markdown, deploy no **Cloudflare Pages**.

## Desenvolvimento

```bash
cd loja
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
npm run preview  # serve dist/ localmente
npm run check    # tipos
```

## Estrutura

```
src/content/obras/*.md     → uma obra por arquivo (front matter + texto)
src/data/config.json       → WhatsApp, e-mail, textos (editável no /admin)
src/assets/obras/          → fotos reais (processadas em AVIF/WebP no build)
src/lib/obras.ts           → modelo, ordenação, formatação (R$, dimensões)
src/scripts/madeira.ts     → desenho procedural (fallback sem foto)
src/scripts/chrome.ts      → seleção, painéis, toast, WhatsApp
src/scripts/catalogo.ts    → filtros + painel da obra com URL
src/scripts/obra.ts        → galeria/lightbox da página da obra
public/admin/              → Sveltia CMS (config.yml)
../functions/api/          → fase 2 (checkout, webhook, situação) — na raiz do Pages
```

## Painel `/admin`

Sveltia CMS com backend GitHub (`pedroitan/madeiraviva`) e fluxo editorial
(rascunho → publicar). Entrar com a conta GitHub que tenha acesso ao repo.
Cada publicação dispara um build no Cloudflare Pages.

**Upload de fotos:** vão para `src/assets/obras/` e o front matter guarda
`/obras/<arquivo>`. O código resolve pelo nome do arquivo — não renomear a pasta
sem ajustar `src/lib/fotos.ts`.

## Deploy — Cloudflare (Worker de assets)

Um único projeto serve **site narrativo + loja** no mesmo domínio. Usamos um
Worker de assets estáticos (sucessor dos Pages na Cloudflare), definido em
`site/wrangler.toml` → `[assets] directory = "./out"`.

No projeto conectado ao Git (Workers & Pages):

- **Root directory:** `site`
- **Build command:** `npm run build:pages`
- **Deploy command:** `npx wrangler deploy`
- **Production branch:** `main`

`build:pages` faz `npm ci` nas duas pastas, `next build` (export estático →
`out/`), `astro build` (→ `loja/dist/`) e `scripts/merge-loja.mjs` copia a loja
para dentro de `out/` — a homepage fica com o site narrativo e `/loja`, `/admin`,
`/_astro`, sitemap e robots vêm da loja.

- **Previews:** automáticos por branch/PR. Produção só após aprovação (merge em main).
- **Domínio:** o DNS já está na Cloudflare — adicionar `ateliemadeiraviva.com`
  como domínio customizado do Worker quando aprovado (sem apagar registros antes).
- **Fase 2:** rotas `/api/*` viram `main = "src/worker.ts"` com `run_worker_first`;
  o diretório `functions/` atual é a lista de rotas a implementar.

## Fase 2 (pendente de aprovação)

- `functions/api/checkout.ts` — reserva no KV (TTL 30 min) + preferência Mercado Pago
- `functions/api/webhook/mercadopago.ts` — aprovação/recusa → situação + e-mails
- `functions/api/situacao.ts` — situações ao vivo (cache 30 s)
- KV namespace `SITUACAO` — ver `wrangler.toml`
- Segredos via `wrangler pages secret put` — nunca no repo

## Regras de marca (valem para código e textos)

- Sem o nome do fundador; contato é "o ateliê".
- Preço = "Investimento"; verbos "adquirir"/"reservar".
- Proibido: promoção, desconto, frete grátis, oferta, contagem regressiva.
