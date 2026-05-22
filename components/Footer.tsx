import Link from 'next/link'
import { Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg2)',
        borderTop: '3px solid transparent',
        borderImage: 'linear-gradient(to right, var(--wood-deep), var(--wood-warm), var(--wood-light)) 1',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p
            className="font-cormorant font-light mb-2"
            style={{ fontSize: '28px', color: 'var(--darker)', letterSpacing: '0.04em' }}
          >
            Madeira Viva
          </p>
          <p
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--wood-warm)',
            }}
          >
            Peças Autorais em Jaqueira
          </p>
          <p
            className="mt-2 font-cormorant italic"
            style={{ fontSize: '14px', color: 'var(--text)' }}
          >
            por Pedro Itan — Salvador, Bahia
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          {[
            { href: '/historia', label: 'A História' },
            { href: '/obras', label: 'Obras' },
            { href: '/atelie', label: 'O Ateliê' },
            { href: '/contato', label: 'Contato' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text)',
              }}
              className="hover:text-wood-deep transition-colors w-fit"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-4">
          <a
            href={process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://instagram.com/madeiraviva'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-70 transition-opacity w-fit"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--wood-deep)',
            }}
          >
            <Instagram size={14} />
            @madeiraviva
          </a>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5571999999999'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity w-fit"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text)',
            }}
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-6 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-2"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <p
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          © 2026 Madeira Viva · Por Pedro Itan
        </p>
        <p
          className="font-cormorant italic"
          style={{ fontSize: '13px', color: 'var(--muted)' }}
        >
          Este projeto existe enquanto durar o estoque da árvore.
        </p>
      </div>
    </footer>
  )
}
