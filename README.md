# Madeira Viva

Site + loja do ateliê, conforme `PRD-loja-madeira-viva.md`. Estático em
**Astro**, conteúdo em Markdown, API de checkout em **Worker**, deploy na
**Cloudflare**.

## Rotas

```
/                  → catálogo (a loja é a home)
/obras/<numero>    → ficha da obra
/sobre             → sobre o ateliê
/retorno           → retorno do pagamento (Mercado Pago)
/admin             → Sveltia CMS (GitHub, fluxo editorial)
/api/catalogo.json → catálogo para o Worker (gerado no build)
/api/checkout      → POST — reserva + preferência Mercado Pago
/api/webhook/mercadopago → POST — confirmação de pagamento
/api/situacao      → GET — reservas/vendas ao vivo (overlay do catálogo)
```

## Desenvolvimento

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # gera dist/
npm run preview   # serve dist/ localmente
npm run check     # tipos
```

## Estrutura

```
src/content/obras/*.md   → uma obra por arquivo (front matter + texto)
src/data/config.json     → WhatsApp, e-mail, textos (editável no /admin)
src/assets/obras/        → fotos reais (AVIF/WebP no build)
src/lib/obras.ts         → modelo, ordenação, formatação (R$, dimensões)
src/scripts/madeira.ts   → desenho procedural (fallback sem foto)
src/scripts/chrome.ts    → seleção, painéis, checkout, overlay de situação
src/scripts/catalogo.ts  → filtros + painel da obra com URL
worker/index.ts          → /api/checkout, /api/webhook/mercadopago, /api/situacao
public/admin/            → Sveltia CMS (config.yml)
public/_redirects        → URLs antigas → novas (loja na raiz)
```

## Painel `/admin`

Sveltia CMS com backend GitHub (`pedroitan/madeiraviva`, branch `master`) e
fluxo editorial (rascunho → publicar). Cada publicação dispara build no
Cloudflare. Uploads vão para `src/assets/obras/` — o código resolve pelo nome
do arquivo (`src/lib/fotos.ts`).

## Deploy — Cloudflare

Um único Worker serve o site inteiro: assets estáticos de `dist/` + rotas
`/api/*` no `worker/index.ts` (`wrangler.toml`).

No projeto conectado ao Git (Workers & Pages):

- **Build command:** `npm run build:pages`
- **Deploy command:** `npx wrangler deploy`
- **Production branch:** `master`
- **Framework preset:** nenhum

Todo push na `master` builda e publica; branches geram previews.

## Mercado Pago — ativação

1. `npx wrangler kv namespace create SITUACAO` → copie o `id` para
   `wrangler.toml` (descomente o binding `[[kv_namespaces]]`).
2. `npx wrangler secret put MP_ACCESS_TOKEN` → access token do app MP
   (use o token de teste para homologar).
3. No painel do Mercado Pago (Suas integrações → Webhooks), cadastre
   `https://ateliemadeiraviva.com/api/webhook/mercadopago` para eventos de
   **Pagamentos** e copie a assinatura secreta →
   `npx wrangler secret put MP_WEBHOOK_SECRET`.
4. Deploy. Sem KV/token o checkout responde 501 e o front cai no WhatsApp —
   a loja continua operável.

Fluxo: checkout reserva as obras no KV por 30 min (TTL igual à expiração da
preferência MP). O webhook confere a assinatura (HMAC), ignora replays
(`pag:<id>`) e marca `vendida:` ou libera a reserva conforme o status.

## Regras de marca (valem para código e textos)

- Sem o nome do fundador; contato é "o ateliê".
- Preço = "Investimento"; verbos "adquirir"/"reservar".
- Proibido: promoção, desconto, frete grátis, oferta, contagem regressiva.
