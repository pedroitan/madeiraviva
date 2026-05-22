import Link from 'next/link'
import type { Obra } from '@/lib/data/obras'

const statusLabel: Record<string, string> = {
  disponivel: 'Disponível',
  reservada: 'Reservada',
  entregue: 'Entregue',
}

const statusColor: Record<string, string> = {
  disponivel: 'var(--wood-warm)',
  reservada: 'var(--gold)',
  entregue: 'var(--muted)',
}

interface ObraCardProps {
  obra: Obra
  linkToLoja?: boolean
  lojaUrl?: string
}

export default function ObraCard({ obra, linkToLoja = false, lojaUrl = '' }: ObraCardProps) {
  const isAvailable = obra.status === 'disponivel'

  return (
    <Link
      href={`/obras/${obra.slug}`}
      className="group flex flex-col"
      style={{ textDecoration: 'none' }}
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '4/5', background: 'var(--bg2)' }}
      >
        {/* Placeholder — substituir por next/image com foto real */}
        <div
          className="w-full h-full transition-transform duration-700 group-hover:scale-105"
          style={{
            background:
              'linear-gradient(135deg, #1a0e05 0%, #3d1f0a 40%, #6b3d1e 70%, #c8854a 100%)',
          }}
        />

        {/* Status badge */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            fontFamily: 'var(--font-syne)',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: statusColor[obra.status] ?? 'var(--muted)',
            background: 'rgba(13,10,4,0.75)',
            padding: '4px 10px',
          }}
        >
          {statusLabel[obra.status] ?? obra.status}
        </div>

        {/* Numero */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            fontFamily: 'var(--font-syne)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: 'rgba(250,246,238,0.4)',
          }}
        >
          Nº {obra.numero}
        </div>

        {/* Ver obra overlay */}
        <div
          className="absolute inset-0 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(13,10,4,0.6) 0%, transparent 60%)' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--cream)',
            }}
          >
            Ver obra →
          </span>
        </div>
      </div>

      <div className="pt-4 pb-2">
        <p
          className="font-cormorant font-semibold mb-1 group-hover:text-wood-deep transition-colors"
          style={{
            fontSize: '20px',
            lineHeight: '1.25',
            color: 'var(--text)',
            letterSpacing: '0.01em',
          }}
        >
          {obra.nome}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-dm)',
            fontSize: '13px',
            color: 'var(--muted)',
            fontWeight: 300,
          }}
        >
          {obra.materiais.split(' · ')[0]} · {obra.dimensoes}
        </p>

        {isAvailable && linkToLoja && lojaUrl && (
          <a
            href={`${lojaUrl}/obras/${obra.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-block mt-3"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--wood-deep)',
              borderBottom: '1px solid var(--wood-deep)',
              paddingBottom: '2px',
            }}
          >
            Adquirir →
          </a>
        )}
      </div>
    </Link>
  )
}
