/* Worker da loja — roda antes dos assets estáticos apenas nas rotas /api/*.

   POST /api/checkout              → reserva as obras no KV (30 min) e cria a
                                     preferência do Mercado Pago (Checkout Pro).
   POST /api/webhook/mercadopago   → confirmação MP: aprovado marca "vendida:",
                                     recusado/cancelado libera a reserva.
   GET  /api/situacao              → overlay ao vivo: { numero: "reservada"|"adquirida" }.

   Degradação: sem KV (SITUACAO) não há trava de concorrência; sem
   MP_ACCESS_TOKEN o checkout responde 501 e o front cai no WhatsApp.

   Segredos via `npx wrangler secret put`: MP_ACCESS_TOKEN, MP_WEBHOOK_SECRET.
   KV: `npx wrangler kv namespace create SITUACAO` e binding em wrangler.toml. */

interface KVNs {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
  list(opts?: { prefix?: string }): Promise<{ keys: { name: string }[] }>;
}

interface Env {
  ASSETS: { fetch(req: Request): Promise<Response> };
  SITUACAO?: KVNs;
  MP_ACCESS_TOKEN?: string;
  MP_WEBHOOK_SECRET?: string;
}

interface ObraApi {
  n: string;
  nome: string;
  investimento: number | null;
  situacao: string;
}

const MP_API = 'https://api.mercadopago.com';
const RESERVA_TTL = 30 * 60; // 30 min — janela do checkout MP
const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

async function catalogo(request: Request, env: Env): Promise<ObraApi[]> {
  const url = new URL(request.url);
  const res = await env.ASSETS.fetch(new Request(`${url.origin}/api/catalogo.json`));
  return (await res.json()) as ObraApi[];
}

async function disponivel(obra: ObraApi, env: Env): Promise<boolean> {
  if (obra.situacao !== 'disponivel' || obra.investimento == null) return false;
  if (env.SITUACAO) {
    const [v, r] = await Promise.all([
      env.SITUACAO.get(`vendida:${obra.n}`),
      env.SITUACAO.get(`reserva:${obra.n}`),
    ]);
    if (v || r) return false;
  }
  return true;
}

async function checkout(request: Request, env: Env): Promise<Response> {
  let itens: string[];
  try {
    const body = (await request.json()) as { itens?: unknown };
    itens = Array.isArray(body.itens) ? body.itens.map(String) : [];
  } catch {
    return json({ erro: 'corpo inválido' }, 400);
  }
  if (!itens.length || itens.length > 8 || itens.some((n) => !/^[\w-]{1,20}$/.test(n)))
    return json({ erro: 'seleção inválida' }, 400);

  const cat = await catalogo(request, env);
  const obras = itens.map((n) => cat.find((o) => o.n === n));
  if (obras.some((o) => !o)) return json({ erro: 'obra desconhecida' }, 400);

  const indisponiveis: string[] = [];
  for (const o of obras as ObraApi[])
    if (!(await disponivel(o, env))) indisponiveis.push(o.n);
  if (indisponiveis.length)
    return json({ erro: 'obras indisponíveis', indisponiveis }, 409);

  const reservaId = crypto.randomUUID();
  const numeros = (obras as ObraApi[]).map((o) => o.n);
  if (env.SITUACAO)
    await Promise.all(
      numeros.map((n) => env.SITUACAO!.put(`reserva:${n}`, reservaId, { expirationTtl: RESERVA_TTL })),
    );
  const liberar = () =>
    env.SITUACAO
      ? Promise.all(numeros.map((n) => env.SITUACAO!.delete(`reserva:${n}`))).then(() => {})
      : Promise.resolve();

  if (!env.MP_ACCESS_TOKEN) {
    await liberar();
    return json({ fallback: 'whatsapp' }, 501);
  }

  const origin = new URL(request.url).origin;
  const agora = new Date();
  const expira = new Date(agora.getTime() + RESERVA_TTL * 1000);
  const pref = {
    items: (obras as ObraApi[]).map((o) => ({
      id: o.n,
      title: `Obra Nº ${o.n} — ${o.nome}`,
      quantity: 1,
      unit_price: o.investimento,
      currency_id: 'BRL',
    })),
    external_reference: `${reservaId}|${numeros.join(',')}`,
    notification_url: `${origin}/api/webhook/mercadopago`,
    back_urls: {
      success: `${origin}/retorno?status=sucesso`,
      pending: `${origin}/retorno?status=pendente`,
      failure: `${origin}/retorno?status=falha`,
    },
    auto_return: 'approved',
    expires: true,
    expiration_date_from: agora.toISOString(),
    expiration_date_to: expira.toISOString(),
    payment_methods: { excluded_payment_types: [{ id: 'ticket' }] },
    statement_descriptor: 'MADEIRA VIVA',
  };

  const res = await fetch(`${MP_API}/checkout/preferences`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.MP_ACCESS_TOKEN}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(pref),
  });
  if (!res.ok) {
    await liberar();
    console.error('MP preference falhou', res.status, await res.text());
    return json({ erro: 'pagamento indisponível' }, 502);
  }
  const data = (await res.json()) as { init_point: string; id: string };
  return json({ init_point: data.init_point, id: data.id });
}

async function assinaturaOk(request: Request, env: Env, dataId: string): Promise<boolean> {
  const secret = env.MP_WEBHOOK_SECRET;
  if (!secret) return true; // verificação via consulta ao pagamento (abaixo)
  const sig = request.headers.get('x-signature') ?? '';
  const reqId = request.headers.get('x-request-id') ?? '';
  const ts = /ts=(\d+)/.exec(sig)?.[1];
  const v1 = /v1=([0-9a-f]+)/i.exec(sig)?.[1];
  if (!ts || !v1) return false;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const mac = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(`id:${dataId};request-id:${reqId};ts:${ts};`),
  );
  const hex = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('');
  return hex === v1.toLowerCase();
}

async function webhook(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  let dataId = url.searchParams.get('data.id') ?? url.searchParams.get('id') ?? '';
  if (request.method === 'POST') {
    try {
      const body = (await request.json()) as { type?: string; data?: { id?: string | number } };
      if (body.type && body.type !== 'payment') return json({ ok: true });
      if (body.data?.id) dataId = String(body.data.id);
    } catch {
      /* notificações por query param chegam sem corpo */
    }
  }
  if (!dataId || !env.MP_ACCESS_TOKEN) return json({ ok: true });
  if (!(await assinaturaOk(request, env, dataId)))
    return json({ erro: 'assinatura inválida' }, 401);
  if (env.SITUACAO && (await env.SITUACAO.get(`pag:${dataId}`))) return json({ ok: true });

  const res = await fetch(`${MP_API}/v1/payments/${dataId}`, {
    headers: { authorization: `Bearer ${env.MP_ACCESS_TOKEN}` },
  });
  if (!res.ok) return json({ ok: true }); // MP reenvia; não 5xx por pagamento alheio
  const pag = (await res.json()) as { status?: string; external_reference?: string };
  const numeros = (pag.external_reference ?? '').split('|')[1]?.split(',') ?? [];

  if (env.SITUACAO && numeros.length) {
    if (pag.status === 'approved') {
      await Promise.all(
        numeros.flatMap((n) => [
          env.SITUACAO!.delete(`reserva:${n}`),
          env.SITUACAO!.put(`vendida:${n}`, '1'),
        ]),
      );
    } else if (['rejected', 'cancelled', 'refunded', 'charged_back'].includes(pag.status ?? '')) {
      await Promise.all(numeros.map((n) => env.SITUACAO!.delete(`reserva:${n}`)));
    }
    await env.SITUACAO.put(`pag:${dataId}`, pag.status ?? '', { expirationTtl: 30 * 24 * 3600 });
  }
  return json({ ok: true });
}

async function situacao(env: Env): Promise<Response> {
  if (!env.SITUACAO) return json({});
  const [vendidas, reservas] = await Promise.all([
    env.SITUACAO.list({ prefix: 'vendida:' }),
    env.SITUACAO.list({ prefix: 'reserva:' }),
  ]);
  const mapa: Record<string, string> = {};
  for (const k of vendidas.keys) mapa[k.name.slice(8)] = 'adquirida';
  for (const k of reservas.keys) if (!mapa[k.name.slice(8)]) mapa[k.name.slice(8)] = 'reservada';
  return new Response(JSON.stringify(mapa), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=30',
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/checkout' && request.method === 'POST') return checkout(request, env);
    if (pathname === '/api/webhook/mercadopago' && request.method === 'POST')
      return webhook(request, env);
    if (pathname === '/api/webhook/mercadopago' && request.method === 'GET')
      return webhook(request, env);
    if (pathname === '/api/situacao' && request.method === 'GET') return situacao(env);
    if (pathname.startsWith('/api/')) return json({ erro: 'não encontrado' }, 404);
    return env.ASSETS.fetch(request);
  },
};
