'use client'

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        fontFamily: 'var(--font-syne)',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--cream)',
        background: 'var(--wood-deep)',
        border: 'none',
        padding: '14px 28px',
        cursor: 'pointer',
        zIndex: 50,
      }}
    >
      Imprimir certificado
    </button>
  )
}
