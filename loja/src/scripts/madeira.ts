/* Desenho procedural da madeira — fallback visual quando a obra não tem foto.
   Portado do protótipo aprovado (loja-madeira-viva.html). */

type ObraDraw = { n: string; nome: string; resina: string; mica: string };

function rng(seed: string) {
  let s = 0;
  for (const c of seed) s = (s * 31 + c.charCodeAt(0)) >>> 0;
  s = s || 7;
  return () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

function shade(hex: string, p: number) {
  const n = parseInt(hex.slice(1), 16);
  const f = (v: number) => Math.max(0, Math.min(255, v + p));
  return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`;
}

export function draw(cv: HTMLCanvasElement, o: ObraDraw) {
  const r = rng(o.n + o.nome);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = cv.clientWidth || 300;
  const h = cv.clientHeight || 375;
  cv.width = w * dpr;
  cv.height = h * dpr;
  const c = cv.getContext('2d')!;
  c.scale(dpr, dpr);
  const g = c.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#7a4020');
  g.addColorStop(0.5, '#9b5e30');
  g.addColorStop(1, '#6b3d1e');
  c.fillStyle = g;
  c.fillRect(0, 0, w, h);
  const lines = 38 + Math.floor(r() * 16),
    f1 = 1.5 + r() * 2,
    f2 = 5 + r() * 4,
    amp = 8 + r() * 14;
  for (let i = 0; i < lines; i++) {
    const x0 = (i / lines) * w * 1.2 - w * 0.1,
      ph = r() * 6.28;
    c.beginPath();
    for (let y = -4; y <= h + 4; y += 4) {
      const x =
        x0 +
        Math.sin((y / h) * f1 * 3.14 + ph) * amp +
        Math.sin((y / h) * f2 * 3.14 + i) * amp * 0.25;
      y < 0 ? c.moveTo(x, y) : c.lineTo(x, y);
    }
    const dark = r() < 0.5;
    c.strokeStyle = dark
      ? `rgba(40,20,8,${0.18 + r() * 0.3})`
      : `rgba(232,184,122,${0.08 + r() * 0.14})`;
    c.lineWidth = 0.6 + r() * (dark ? 2.2 : 1.2);
    c.stroke();
  }
  if (r() < 0.7) {
    const kx = w * (0.2 + r() * 0.6),
      ky = h * (0.15 + r() * 0.7);
    for (let k = 10; k > 0; k--) {
      c.beginPath();
      c.ellipse(kx, ky, k * 2.4, k * 1.3, 0.2, 0, 6.28);
      c.strokeStyle = `rgba(35,16,6,${0.08 + k * 0.02})`;
      c.lineWidth = 1;
      c.stroke();
    }
  }
  if (o.mica !== 'Sem resina') {
    const cx = w * (0.35 + r() * 0.3),
      wid = w * (0.07 + r() * 0.08),
      a = w * 0.08,
      ph = r() * 6.28,
      L: [number, number][] = [],
      R: [number, number][] = [];
    for (let y = -6; y <= h + 6; y += 6) {
      const m = cx + Math.sin((y / h) * 3.14 * 1.6 + ph) * a,
        ww = wid * (0.55 + 0.45 * Math.abs(Math.sin((y / h) * 5 + ph)));
      L.push([m - ww, y]);
      R.push([m + ww, y]);
    }
    c.beginPath();
    L.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
    R.reverse().forEach(([x, y]) => c.lineTo(x, y));
    c.closePath();
    const rg = c.createLinearGradient(cx - wid, 0, cx + wid, h);
    rg.addColorStop(0, o.resina);
    rg.addColorStop(0.5, shade(o.resina, 40));
    rg.addColorStop(1, shade(o.resina, -30));
    c.save();
    c.fillStyle = rg;
    c.fill();
    c.clip();
    for (let i = 0; i < 260; i++) {
      c.fillStyle = `rgba(255,240,210,${r() * 0.5})`;
      c.fillRect(cx - wid * 2 + r() * wid * 4, r() * h, r() * 1.6, r() * 1.6);
    }
    c.restore();
    c.strokeStyle = 'rgba(20,10,4,.45)';
    c.lineWidth = 1.2;
    c.stroke();
  }
  const v = c.createLinearGradient(0, 0, w, h * 0.6);
  v.addColorStop(0, 'rgba(255,230,190,.16)');
  v.addColorStop(0.5, 'rgba(255,230,190,0)');
  c.fillStyle = v;
  c.fillRect(0, 0, w, h);
}
