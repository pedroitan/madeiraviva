/* Chrome da loja: seleção (localStorage), painéis laterais, toast, mensagens
   de WhatsApp e delegação de eventos. Importado por todas as páginas. */
import { draw } from './madeira';

export type ObraClient = {
  n: string;
  nome: string;
  tipo: string;
  situacao: 'disponivel' | 'reservada' | 'adquirida' | 'embreve';
  preco: number | null;
  dim: string;
  mica: string;
  acabamento: string;
  resina: string;
  texto: string;
  foto: string | null;
  url: string;
};

type Config = {
  whatsapp: string;
  whatsapp_exibir: string;
  email: string;
  reserva_horas: number;
};

export const STATUS: Record<ObraClient['situacao'], string> = {
  disponivel: 'Disponível',
  reservada: 'Reservada',
  adquirida: 'Adquirida',
  embreve: 'Em breve',
};

const read = <T>(id: string, fb: T): T => {
  try {
    return JSON.parse(document.getElementById(id)!.textContent || '');
  } catch {
    return fb;
  }
};

export const config = read<Config>('mv-config', {
  whatsapp: '',
  whatsapp_exibir: '',
  email: '',
  reserva_horas: 48,
});
export const obras = new Map<string, ObraClient>(
  read<ObraClient[]>('mv-obras', []).map((o) => [o.n, o]),
);

export const brl = (v: number | null) =>
  v == null
    ? 'Sob consulta'
    : v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

export const wa = (msg: string) =>
  `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`;

export const contatoHtml = `<p class="contact">WhatsApp do ateliê: <span>${config.whatsapp_exibir}</span></p>`;

const $ = (id: string) => document.getElementById(id)!;

/* ── Seleção ── */
let sel: string[] = [];
try {
  sel = JSON.parse(localStorage.getItem('mv-sel') || '[]');
} catch {}
const salvar = () => {
  try {
    localStorage.setItem('mv-sel', JSON.stringify(sel));
  } catch {}
};

export const naSelecao = (n: string) => sel.includes(n);

export function refreshBadge() {
  const el = $('bagN');
  if (!el) return;
  el.textContent = String(sel.length);
  sel.length ? el.removeAttribute('data-zero') : el.setAttribute('data-zero', '');
}

/* ── Painéis ── */
let lastFocus: HTMLElement | null = null;

export function openPanel(id: string) {
  closePanels();
  lastFocus = document.activeElement as HTMLElement;
  const p = $(id);
  p.classList.add('on');
  p.setAttribute('aria-hidden', 'false');
  $('scrim').classList.add('on');
  setTimeout(() => p.querySelector<HTMLElement>('.x')?.focus(), 50);
}

export function closePanels() {
  document.querySelectorAll('.panel.on').forEach((p) => {
    p.classList.remove('on');
    p.setAttribute('aria-hidden', 'true');
  });
  $('scrim')?.classList.remove('on');
  lastFocus?.focus?.();
  lastFocus = null;
}

/* ── Toast ── */
let tt: ReturnType<typeof setTimeout>;
export function toast(t: string) {
  const e = $('toast');
  e.textContent = t;
  e.classList.add('on');
  clearTimeout(tt);
  tt = setTimeout(() => e.classList.remove('on'), 2200);
}

/* ── Ficha (compartilhada entre painel do catálogo e, em parte, a página) ── */
export function tituloComEm(nome: string) {
  return nome.replace(/ (\S+)$/, ' <em>$1</em>');
}

export function specsHtml(o: ObraClient) {
  return `<dl class="specs">
    <dt>Obra</dt><dd>${o.situacao === 'embreve' ? 'A numerar' : 'Nº ' + o.n}</dd>
    <dt>Madeira</dt><dd>Jaqueira, de uma única árvore</dd>
    <dt>Dimensões</dt><dd>${o.dim}</dd>
    <dt>Acabamento</dt><dd>${o.acabamento}</dd>
    <dt>Situação</dt><dd>${STATUS[o.situacao]}</dd>
    <dt>Origem</dt><dd>Peça assinada, com certificado de origem</dd>
  </dl>`;
}

export function acoesHtml(o: ObraClient) {
  if (o.situacao === 'disponivel')
    return `<button class="pill dark block" data-addsel data-n="${o.n}">${
      naSelecao(o.n) ? 'Ver seleção' : 'Adicionar à seleção'
    }</button>
      <a class="pill block" target="_blank" rel="noopener" href="${wa(
        `Olá! Tenho interesse na obra Nº ${o.n}, ${o.nome} (${brl(o.preco)}).`,
      )}">Falar sobre esta obra</a>`;
  if (o.situacao === 'reservada')
    return `<a class="pill dark block" target="_blank" rel="noopener" href="${wa(
      `Olá! A obra Nº ${o.n}, ${o.nome}, está reservada. Podem me avisar se ficar disponível?`,
    )}">Avisar se ficar disponível</a>`;
  if (o.situacao === 'embreve')
    return `<a class="pill dark block" target="_blank" rel="noopener" href="${wa(
      `Olá! Quero entrar na lista de espera do ${o.nome}.`,
    )}">Entrar na lista de espera</a>`;
  return `<p class="note">Esta obra já tem dono. Veja as peças ainda disponíveis.</p><button class="pill block" data-close>Voltar ao catálogo</button>`;
}

/* ── Seleção (painel) ── */
export function sacola() {
  const itens = sel.map((n) => obras.get(n)).filter(Boolean) as ObraClient[];
  const consulta = itens.some((o) => o.preco == null);
  const total = itens.reduce((s, o) => s + (o.preco || 0), 0);
  $('bBody').innerHTML = itens.length
    ? itens
        .map(
          (o) => `
    <div class="line" data-n="${o.n}"><span class="thumb">${
      o.foto ? `<img src="${o.foto}" alt="" loading="lazy">` : '<canvas></canvas>'
    }</span>
      <div><h4>${o.nome}</h4><small>Nº ${o.n} · ${o.dim}</small><button class="rm" data-rm="${o.n}">Remover</button></div>
      <span class="v">${brl(o.preco)}</span></div>`,
        )
        .join('')
    : `<p class="empty" style="padding:48px 0">Nenhuma obra selecionada ainda.</p><p class="note">Cada peça é única. Ao reservar, ela sai do catálogo para os demais.</p>`;
  $('bBody')
    .querySelectorAll<HTMLElement>('.line')
    .forEach((l) => {
      const cv = l.querySelector('canvas');
      const o = obras.get(l.dataset.n!);
      if (cv && o) draw(cv, o);
    });
  const msg = `Olá! Gostaria de adquirir:\n${itens
    .map((o) => `• Nº ${o.n}, ${o.nome} (${brl(o.preco)})`)
    .join('\n')}\n\nTotal: ${brl(total)}${consulta ? ' + itens sob consulta' : ''}\n\nPodemos combinar pagamento e entrega?`;
  $('bFoot').innerHTML = itens.length
    ? `<div class="total"><span>Investimento</span><b>${brl(total)}${consulta ? ' +' : ''}</b></div>
    <a class="pill dark block" target="_blank" rel="noopener" href="${wa(msg)}" data-evento="reservar_whatsapp">Reservar pelo WhatsApp</a>
    <p class="note">Pagamento, entrega e instalação são combinados diretamente com o ateliê. A obra fica reservada por ${config.reserva_horas} horas após o contato.</p>${contatoHtml}`
    : `<button class="pill block" data-close>Ver o catálogo</button>`;
  openPanel('bag');
}

export function addToSel(n: string) {
  const o = obras.get(n);
  if (!o || o.situacao !== 'disponivel') return;
  if (!sel.includes(n)) {
    sel.push(n);
    salvar();
    refreshBadge();
    toast(`Nº ${n} na seleção`);
    track('adicionar_selecao', n);
  }
  sacola();
}

/* ── Analytics (Plausible) ── */
export function track(evento: string, obra?: string) {
  (window as any).plausible?.(evento, { props: obra ? { obra } : undefined });
}

/* ── Init ── */
export function initChrome() {
  // RF-15: remove da seleção obras que deixaram de estar disponíveis
  const antes = sel.length;
  sel = sel.filter((n) => obras.get(n)?.situacao === 'disponivel');
  if (sel.length !== antes) {
    salvar();
    toast('Uma obra da sua seleção não está mais disponível');
  }
  refreshBadge();

  document.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const add = t.closest<HTMLElement>('[data-addsel]');
    if (add) {
      addToSel(add.dataset.n!);
      return;
    }
    const rm = t.closest<HTMLElement>('[data-rm]');
    if (rm) {
      sel = sel.filter((n) => n !== rm.dataset.rm);
      salvar();
      refreshBadge();
      sacola();
      return;
    }
    if (t.closest('[data-close]') || t.id === 'scrim') closePanels();
  });
  $('openBag')?.addEventListener('click', sacola);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanels();
  });
}
