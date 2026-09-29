/* Catálogo /loja: filtros sincronizados com a URL, painel lateral da obra com
   URL própria (botão voltar fecha) e desenho dos canvases. */
import {
  obras,
  brl,
  contatoHtml,
  specsHtml,
  acoesHtml,
  tituloComEm,
  openPanel,
  closePanels,
  track,
  type ObraClient,
} from './chrome';
import { draw } from './madeira';

const $ = (id: string) => document.getElementById(id)!;

/* ── Desenha os canvases das obras sem foto ── */
function drawCanvases(root: ParentNode = document) {
  root.querySelectorAll<HTMLCanvasElement>('canvas[data-draw]').forEach((cv) => {
    const o = obras.get(cv.dataset.draw!);
    if (o) draw(cv, o);
  });
}

/* ── Filtros ── */
const params = new URLSearchParams(location.search);
let filtro = params.get('tipo') ?? 'todas';
let soDisp = params.get('disponiveis') === '1';
const tiposValidos = ['todas', 'mesa-pequena', 'mesa-grande', 'bancada', 'instrumento'];
if (!tiposValidos.includes(filtro)) filtro = 'todas';

function syncUrl() {
  const p = new URLSearchParams();
  if (filtro !== 'todas') p.set('tipo', filtro);
  if (soDisp) p.set('disponiveis', '1');
  const qs = p.toString();
  history.replaceState(history.state, '', `/loja${qs ? '?' + qs : ''}`);
}

function applyFilter() {
  document.querySelectorAll<HTMLElement>('[data-f]').forEach((b) =>
    b.setAttribute('aria-pressed', String(b.dataset.f === filtro)),
  );
  let visiveis = 0;
  document.querySelectorAll<HTMLElement>('#grid .card').forEach((card) => {
    const ok =
      (filtro === 'todas' || card.dataset.tipo === filtro) &&
      (!soDisp || card.dataset.situacao === 'disponivel');
    card.hidden = !ok;
    if (ok) visiveis++;
  });
  $('gridEmpty').hidden = visiveis > 0;
  syncUrl();
}

/* ── Painel da obra (com URL própria) ── */
let pushed = false;

function detalhe(n: string) {
  const o = obras.get(n) as ObraClient | undefined;
  if (!o) return;
  $('dObra').textContent = o.situacao === 'embreve' ? 'Em breve' : `Obra Nº ${o.n}`;
  $('dBody').innerHTML = `
    <div class="frame">${o.foto ? `<img src="${o.foto}" alt="${o.nome}">` : '<canvas></canvas>'}</div>
    <div>
      <h2 class="dt-title">${tituloComEm(o.nome)}</h2>
      <div class="dt-price"><span>Investimento</span><b>${
        o.situacao === 'adquirida'
          ? 'Obra adquirida'
          : o.situacao === 'embreve'
            ? 'A definir'
            : brl(o.preco)
      }</b></div>
    </div>
    <p class="dt-text">${o.texto}</p>
    ${specsHtml(o)}`;
  $('dFoot').innerHTML =
    acoesHtml(o) +
    `<a class="pill block" href="${o.url}" style="border-style:dashed">Ver página da obra</a>` +
    contatoHtml;
  openPanel('detail');
  const cv = $('dBody').querySelector('canvas');
  if (cv) draw(cv, o);
  track('ver_obra', o.n);
  history.pushState({ mvObra: n }, '', o.url);
  pushed = true;
}

function closeDetail() {
  if (pushed) {
    pushed = false;
    history.back();
    return;
  }
  closePanels();
}

window.addEventListener('popstate', () => {
  pushed = false;
  closePanels();
});

/* ── Eventos ── */
document.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  const f = t.closest<HTMLElement>('[data-f]');
  if (f) {
    filtro = f.dataset.f!;
    applyFilter();
    return;
  }
  const card = t.closest<HTMLAnchorElement>('#grid .card');
  if (card) {
    e.preventDefault();
    detalhe(card.dataset.n!);
    return;
  }
  if (t.closest('[data-close]') || t.id === 'scrim') closeDetail();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDetail();
});

$('onlyAvail').addEventListener('change', (e) => {
  soDisp = (e.target as HTMLInputElement).checked;
  applyFilter();
});
($('onlyAvail') as HTMLInputElement).checked = soDisp;

let rt: ReturnType<typeof setTimeout>;
addEventListener('resize', () => {
  clearTimeout(rt);
  rt = setTimeout(() => drawCanvases(), 200);
});

applyFilter();
drawCanvases();
