'use client'

import { useState } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FadeUp } from '@/components/ui/FadeUp'
import { ArrowRight } from 'lucide-react'

export default function InstrumentosPage() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setErro('Por favor, informe um e-mail válido.')
      return
    }
    setErro('')
    setEnviado(true)
  }

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
            <SectionLabel>Em desenvolvimento</SectionLabel>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="font-cormorant font-light"
              style={{
                fontSize: 'clamp(44px, 7vw, 88px)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                color: 'var(--darker)',
                marginBottom: '24px',
              }}
            >
              Instrumentos<br />
              <em style={{ color: 'var(--wood-warm)' }}>em Jaqueira.</em>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="font-cormorant italic"
              style={{
                fontSize: 'clamp(18px, 2.5vw, 26px)',
                color: 'var(--wood-light)',
                lineHeight: 1.5,
                maxWidth: '520px',
              }}
            >
              O próximo capítulo do Madeira Viva explora a jaqueira como material acústico.
              Violas, cavaquinhos e outros instrumentos de corda.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* DESCRIÇÃO */}
      <section className="section-divider" style={{ background: 'var(--bg)', padding: '120px 0' }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <div>
            <FadeUp>
              <SectionLabel>A ideia</SectionLabel>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="font-cormorant font-light"
                style={{
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  lineHeight: 1.1,
                  color: 'var(--text)',
                  marginBottom: '20px',
                }}
              >
                Madeira que canta.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p style={{ fontSize: '17px', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '16px' }}>
                A jaqueira tem propriedades acústicas que poucos artesãos exploram no Brasil.
                A densidade e a ressonância natural da madeira criam uma voz única —
                diferente de qualquer cedro ou mogno convencional.
              </p>
              <p style={{ fontSize: '17px', color: 'var(--muted)', lineHeight: 1.75 }}>
                Estou estudando e me preparando para produzir os primeiros instrumentos.
                Ainda não há prazo confirmado — mas quando estiver pronto, os da lista de espera serão os primeiros a saber.
              </p>
            </FadeUp>
          </div>

          {/* LISTA DE ESPERA */}
          <FadeUp delay={0.15}>
            <div
              style={{
                background: 'var(--bg2)',
                padding: '40px',
                border: '1px solid var(--border)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: 'var(--wood-mid)',
                  marginBottom: '16px',
                }}
              >
                Lista de Espera
              </p>
              <h3
                className="font-cormorant font-light"
                style={{
                  fontSize: '28px',
                  lineHeight: 1.2,
                  color: 'var(--text)',
                  marginBottom: '12px',
                }}
              >
                Seja o primeiro a saber.
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                Insira seu e-mail e você receberá uma notificação assim que os instrumentos estiverem disponíveis para encomenda.
              </p>

              {enviado ? (
                <div>
                  <p
                    className="font-cormorant italic"
                    style={{ fontSize: '20px', color: 'var(--wood-deep)', lineHeight: 1.4 }}
                  >
                    Obrigado! Você está na lista.
                  </p>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '8px' }}>
                    Entraremos em contato assim que os instrumentos estiverem prontos.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'var(--cream)',
                      border: `1px solid ${erro ? '#c0392b' : 'var(--border)'}`,
                      fontFamily: 'var(--font-dm)',
                      fontSize: '15px',
                      color: 'var(--text)',
                      outline: 'none',
                    }}
                  />
                  {erro && (
                    <p style={{ fontFamily: 'var(--font-dm)', fontSize: '13px', color: '#c0392b' }}>
                      {erro}
                    </p>
                  )}
                  <button
                    type="submit"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '14px 24px',
                      background: 'var(--wood-deep)',
                      fontFamily: 'var(--font-syne)',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--cream)',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Entrar na lista <ArrowRight size={12} />
                  </button>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5 }}>
                    Sem spam. Apenas uma notificação quando os instrumentos estiverem disponíveis.
                  </p>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* TEASER VISUAL */}
      <section
        style={{
          background: 'var(--bg2)',
          padding: '100px 0',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <p
              className="font-cormorant italic"
              style={{
                fontSize: 'clamp(24px, 4vw, 44px)',
                color: 'var(--wood-mid)',
                lineHeight: 1.3,
                marginBottom: '24px',
              }}
            >
              "Uma árvore que cresceu em silêncio,<br />prestes a cantar."
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
              — Em breve
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
