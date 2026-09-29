import type { CollectionEntry } from 'astro:content';

export type Obra = CollectionEntry<'obras'>;
export type Situacao = 'disponivel' | 'reservada' | 'adquirida' | 'embreve';

export const TIPOS: Record<string, string> = {
  todas: 'Todas',
  'mesa-pequena': 'Mesas pequenas',
  'mesa-grande': 'Mesas grandes',
  bancada: 'Bancadas',
  instrumento: 'Instrumentos',
};

export const STATUS: Record<Situacao, string> = {
  disponivel: 'Disponível',
  reservada: 'Reservada',
  adquirida: 'Adquirida',
  embreve: 'Em breve',
};

export const brl = (v?: number | null) =>
  v == null
    ? 'Sob consulta'
    : v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

export const slug = (o: Obra) => o.data.numero ?? o.id.replace(/\.md$/, '');

export const dimensoes = (o: Obra) =>
  o.data.largura_cm
    ? `${o.data.largura_cm} × ${o.data.profundidade_cm} × ${o.data.altura_cm} cm`
    : 'Em produção';

export const acabamento = (o: Obra) =>
  o.data.cor_mica && o.data.cor_mica !== 'Sem resina'
    ? `${o.data.acabamento} · ${o.data.cor_mica}`
    : o.data.acabamento;

const pesoSituacao: Record<Situacao, number> = {
  disponivel: 0,
  reservada: 1,
  adquirida: 2,
  embreve: 3,
};

export const ordenar = (lista: Obra[]) =>
  [...lista].sort(
    (a, b) =>
      pesoSituacao[a.data.situacao] - pesoSituacao[b.data.situacao] ||
      (a.data.ordem ?? Number(a.data.numero ?? 999)) -
        (b.data.ordem ?? Number(b.data.numero ?? 999)),
  );

/** Dados serializados para o JS do catálogo (painel lateral, seleção). */
export const toClient = (o: Obra, texto: string, fotoThumb: string | null) => ({
  n: slug(o),
  nome: o.data.nome,
  tipo: o.data.tipo,
  situacao: o.data.situacao,
  preco: o.data.investimento ?? null,
  dim: dimensoes(o),
  mica: o.data.cor_mica ?? 'Sem resina',
  acabamento: acabamento(o),
  resina: o.data.cor_resina ?? '#6B4A2A',
  texto,
  foto: fotoThumb,
  url: `/loja/obras/${slug(o)}`,
});
