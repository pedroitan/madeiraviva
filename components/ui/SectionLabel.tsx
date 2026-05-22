interface SectionLabelProps {
  children: React.ReactNode
  dark?: boolean
  className?: string
}

export function SectionLabel({ children, dark = false, className = '' }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-4 mb-10 ${className}`}
      style={{
        fontFamily: 'var(--font-syne)',
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: dark ? 'var(--wood-warm)' : 'var(--wood-mid)',
      }}
    >
      <span>{children}</span>
      <span
        style={{
          flex: 1,
          height: '1px',
          background: dark ? 'rgba(255,255,255,0.1)' : 'var(--border)',
        }}
      />
    </div>
  )
}
