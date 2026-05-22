'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ExternalLink } from 'lucide-react'

const links = [
  { href: '/historia', label: 'História' },
  { href: '/obras', label: 'Obras' },
  { href: '/atelie', label: 'Ateliê' },
  { href: '/instrumentos', label: 'Instrumentos', badge: 'Em breve' },
  { href: '/contato', label: 'Contato' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  const isDark = isHome && !scrolled

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: isDark ? 'transparent' : 'var(--cream)',
          boxShadow: isDark ? 'none' : '0 1px 0 var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <span
              className="font-cormorant font-light transition-colors duration-500"
              style={{
                fontSize: '22px',
                letterSpacing: '0.04em',
                color: isDark ? 'var(--cream)' : 'var(--darker)',
              }}
            >
              Madeira Viva
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map(({ href, label, badge }) => (
              <Link
                key={href}
                href={href}
                className="relative flex items-center gap-2 transition-opacity hover:opacity-60"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: isDark ? 'rgba(250,246,238,0.85)' : 'var(--text)',
                }}
              >
                {label}
                {badge && (
                  <span
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontSize: '8px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      background: 'var(--wood-warm)',
                      color: 'var(--cream)',
                      padding: '2px 6px',
                    }}
                  >
                    {badge}
                  </span>
                )}
              </Link>
            ))}

            <a
              href={process.env.NEXT_PUBLIC_LOJA_URL ?? '/loja'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: isDark ? 'var(--cream)' : 'var(--wood-deep)',
                border: `1px solid ${isDark ? 'rgba(250,246,238,0.4)' : 'var(--wood-deep)'}`,
                padding: '8px 16px',
              }}
            >
              Loja <ExternalLink size={9} />
            </a>
          </nav>

          <button
            className="md:hidden transition-colors"
            style={{ color: isDark ? 'var(--cream)' : 'var(--darker)' }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'var(--darker)' }}
          >
            <div className="flex items-center justify-between px-6 h-16">
              <span
                className="font-cormorant font-light"
                style={{ fontSize: '22px', color: 'var(--cream)', letterSpacing: '0.04em' }}
              >
                Madeira Viva
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                style={{ color: 'var(--cream)' }}
                aria-label="Fechar menu"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-col px-8 py-10 gap-8 flex-1">
              {links.map(({ href, label, badge }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <Link
                    href={href}
                    className="flex items-center gap-4 font-cormorant font-light"
                    style={{
                      fontSize: 'clamp(32px, 7vw, 48px)',
                      color: 'var(--cream)',
                      lineHeight: 1.1,
                    }}
                  >
                    {label}
                    {badge && (
                      <span
                        style={{
                          fontFamily: 'var(--font-syne)',
                          fontSize: '10px',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          background: 'var(--wood-warm)',
                          color: 'var(--cream)',
                          padding: '3px 8px',
                        }}
                      >
                        {badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-8 pb-10">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5571999999999'}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--wood-warm)',
                }}
              >
                WhatsApp → Falar com Pedro
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
