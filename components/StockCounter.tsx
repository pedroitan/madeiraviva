interface StockCounterProps {
  total: number
  disponiveis: number
  dark?: boolean
  compact?: boolean
}

export default function StockCounter({
  total,
  disponiveis,
  dark = false,
  compact = false,
}: StockCounterProps) {
  const pct = ((total - disponiveis) / total) * 100

  return (
    <div className={compact ? '' : 'max-w-xs'}>
      <div className="flex justify-between items-baseline mb-2">
        <span
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: dark ? 'var(--wood-warm)' : 'var(--muted)',
          }}
        >
          Estoque
        </span>
        <span
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '15px',
            color: dark ? 'rgba(250,246,238,0.6)' : 'var(--muted)',
          }}
        >
          <span
            style={{
              color: dark ? 'var(--cream)' : 'var(--text)',
              fontWeight: 600,
            }}
          >
            {disponiveis}
          </span>{' '}
          de {total} disponíveis
        </span>
      </div>

      <div
        style={{
          height: '2px',
          background: dark ? 'rgba(255,255,255,0.1)' : 'var(--border)',
          borderRadius: '1px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: `linear-gradient(to right, var(--wood-deep), var(--wood-warm))`,
            borderRadius: '1px',
            transition: 'width 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        />
      </div>
    </div>
  )
}
