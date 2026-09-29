import { SectionLabel } from '@/components/ui/SectionLabel'
import { FadeUp } from '@/components/ui/FadeUp'
import { Instagram, MessageCircle } from 'lucide-react'

export const metadata = {
  title: 'Contato — Madeira Viva',
  description: 'Entre em contato com Pedro Itan para saber mais sobre as obras ou agendar uma visita ao ateliê.',
}

export default function ContatoPage() {
  const whatsNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5571999999999'

  return (
    <>
      {/* HERO */}
      <section
        style={{
          background: 'var(--bg)',
          paddingTop: '160px',
          paddingBottom: '100px',
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp>
            <SectionLabel>Fale com Pedro</SectionLabel>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="font-cormorant font-light"
              style={{
                fontSize: 'clamp(48px, 7vw, 88px)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                color: 'var(--darker)',
                marginBottom: '24px',
              }}
            >
              Contato
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="font-cormorant italic"
              style={{
                fontSize: 'clamp(18px, 2.5vw, 26px)',
                color: 'var(--wood-light)',
                lineHeight: 1.5,
                maxWidth: '480px',
              }}
            >
              Para falar sobre uma peça específica, agendar uma visita ao ateliê ou tirar dúvidas.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* CANAIS */}
      <section className="section-divider" style={{ background: 'var(--bg)', padding: '120px 0' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WhatsApp */}
            <FadeUp>
              <a
                href={`https://wa.me/${whatsNumber}?text=${encodeURIComponent('Olá Pedro, vi o site do Madeira Viva e gostaria de saber mais.')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  padding: '40px',
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s',
                }}
                className="group hover:border-wood-deep"
              >
                <MessageCircle
                  size={32}
                  strokeWidth={1.5}
                  style={{ color: 'var(--wood-deep)' }}
                />
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      marginBottom: '8px',
                    }}
                  >
                    Resposta mais rápida
                  </p>
                  <h3
                    className="font-cormorant font-semibold group-hover:text-wood-deep transition-colors"
                    style={{ fontSize: '28px', color: 'var(--text)', marginBottom: '8px' }}
                  >
                    WhatsApp
                  </h3>
                  <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.6 }}>
                    A forma mais direta de falar com Pedro. Responde em até 24h nos dias úteis.
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--wood-deep)',
                    marginTop: 'auto',
                  }}
                >
                  Abrir conversa →
                </p>
              </a>
            </FadeUp>

            {/* Instagram */}
            <FadeUp delay={0.1}>
              <a
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://instagram.com/madeiraviva'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  padding: '40px',
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s',
                }}
                className="group hover:border-wood-deep"
              >
                <Instagram
                  size={32}
                  strokeWidth={1.5}
                  style={{ color: 'var(--wood-deep)' }}
                />
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      marginBottom: '8px',
                    }}
                  >
                    Acompanhe o processo
                  </p>
                  <h3
                    className="font-cormorant font-semibold group-hover:text-wood-deep transition-colors"
                    style={{ fontSize: '28px', color: 'var(--text)', marginBottom: '8px' }}
                  >
                    Instagram
                  </h3>
                  <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.6 }}>
                    Vídeos do processo, bastidores do ateliê e as peças em construção.
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--wood-deep)',
                    marginTop: 'auto',
                  }}
                >
                  @madeiraviva →
                </p>
              </a>
            </FadeUp>
          </div>

          {/* Info adicional */}
          <FadeUp delay={0.2}>
            <div
              className="mt-12"
              style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '48px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '32px',
              }}
            >
              {[
                { label: 'Localização', valor: 'Salvador, Bahia, Brasil' },
                { label: 'Atendimento', valor: 'Segunda a sexta · 9h–18h' },
                { label: 'Visita ao ateliê', valor: 'Com agendamento prévio' },
              ].map(({ label, valor }) => (
                <div key={label}>
                  <p
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.35em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      marginBottom: '8px',
                    }}
                  >
                    {label}
                  </p>
                  <p className="font-cormorant" style={{ fontSize: '18px', color: 'var(--text)' }}>
                    {valor}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* QUOTE */}
      <section
        style={{ background: 'var(--bg2)', padding: '100px 0' }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <blockquote
              className="font-cormorant italic"
              style={{
                fontSize: 'clamp(22px, 3.5vw, 36px)',
                color: 'var(--text)',
                lineHeight: 1.4,
                marginBottom: '20px',
              }}
            >
              &ldquo;Cada conversa começa com uma história. A sua, ou a da peça.&rdquo;
            </blockquote>
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
              — Pedro Itan
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
