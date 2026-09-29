/* Página da obra: desenho do canvas de fallback, lightbox da galeria e
   evento de analytics. */
import { obras, track } from './chrome';
import { draw } from './madeira';

const galeria = document.getElementById('galeria');
const n = galeria?.dataset.n;

if (n) track('ver_obra', n);

/* Canvas de fallback */
document.querySelectorAll<HTMLCanvasElement>('canvas[data-draw]').forEach((cv) => {
  const o = obras.get(cv.dataset.draw!);
  if (o) draw(cv, o);
});

/* Lightbox */
const lb = document.getElementById('lightbox')!;
const lbBody = document.getElementById('lbBody')!;
const lbNav = document.getElementById('lbNav')!;
const thumbs = [...document.querySelectorAll<HTMLElement>('#galeria [data-lb]')];
let atual = 0;

function mostrar(i: number) {
  atual = i;
  const img = thumbs[i]?.querySelector('img');
  if (!img) return;
  lbBody.innerHTML = '';
  const grande = document.createElement('img');
  grande.src = img.currentSrc || img.src;
  grande.alt = img.alt;
  lbBody.appendChild(grande);
  lbNav.innerHTML =
    thumbs.length > 1
      ? thumbs
          .map(
            (_, k) =>
              `<button data-lb-go="${k}" aria-label="Foto ${k + 1}" ${k === i ? 'disabled' : ''}>${k + 1}</button>`,
          )
          .join('')
      : '';
  lb.classList.add('on');
  lb.setAttribute('aria-hidden', 'false');
  lb.querySelector<HTMLElement>('.x')?.focus();
}

function fecharLb() {
  lb.classList.remove('on');
  lb.setAttribute('aria-hidden', 'true');
}

thumbs.forEach((t) =>
  t.addEventListener('click', () => mostrar(Number(t.dataset.lb))),
);
lb.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  const go = t.closest<HTMLElement>('[data-lb-go]');
  if (go) {
    mostrar(Number(go.dataset.lbGo));
    return;
  }
  if (t.closest('[data-lb-close]') || t === lb) fecharLb();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') fecharLb();
  if (lb.classList.contains('on')) {
    if (e.key === 'ArrowRight') mostrar((atual + 1) % thumbs.length);
    if (e.key === 'ArrowLeft') mostrar((atual - 1 + thumbs.length) % thumbs.length);
  }
});
