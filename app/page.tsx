'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { TextReveal } from '@/components/ui/TextReveal'
import StockCounter from '@/components/StockCounter'
import ObraCard from '@/components/ObraCard'
import { obras } from '@/lib/data/obras'
import { estoque } from '@/lib/data/estoque'

const MANIFESTO =
  'A jaqueira cresceu aqui. Raízes fundas no mesmo solo que fez a nossa cultura, a nossa música, a nossa maneira de receber e habitar. Meus pais a plantaram. Ela tem a minha idade. Quando ela adoeceu e precisou ser cortada, foi uma decisão carregada de respeito. E toda decisão assim pede um gesto à altura — eternalizá-la em obra. Sem encontrar quem soubesse trabalhar essa madeira do jeito certo, aprendi. Comprei as máquinas. Entrei no processo. E fui descobrindo que lixar madeira é meditar. Que cada veio conta uma história que só aquela árvore poderia contar. Que a resina com pó de mica não esconde a madeira — ela a celebra. Quando essa madeira passa pelas mãos certas, algo acontece que não tem nome técnico: a peça lembra de onde veio. Os veios contam uma história que nenhuma madeira importada pode contar. Cada mesa que sai daqui vai ser passada de mão em mão. Vai envelhecer com quem a escolheu. Vai carregar a assinatura de quem fez — não como marca, mas como pacto. E quando o estoque dessa árvore acabar, este projeto se encerra. Não haverá segunda edição. Não produzimos móveis. Criamos herdeiros.'

export default function Home() {
  const [textVisible, setTextVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
    const t = setTimeout(() => setTextVisible(true), 1500)
    return () => clearTimeout(t)
  }, [])

  const obrasDisponiveis = obras.filter((o) => o.status === 'disponivel').slice(0, 3)
  const obrasPreview = obras.slice(0, 6)

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: 'var(--bg)' }}
      >
        {/* Watermark gigante */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 1 }}
        >
          <span
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(100px, 20vw, 260px)',
              fontWeight: 300,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(107,61,30,0.08)',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            MADEIRA VIVA
          </span>
        </div>

        <motion.div
          className="relative z-10 max-w-6xl mx-auto w-full px-6 pb-20 pt-32"
          style={{ opacity: heroOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={textVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0 }}
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: 'var(--wood-mid)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <span style={{ width: '48px', height: '1px', background: 'var(--wood-mid)', flexShrink: 0 }} />
            Peças Autorais em Jaqueira
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={textVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(56px, 9vw, 110px)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: 'var(--darker)',
              marginBottom: '28px',
            }}
          >
            Madeira <br />
            <em style={{ color: 'var(--wood-deep)', fontStyle: 'italic' }}>Viva.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={textVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              color: 'var(--wood-mid)',
              lineHeight: 1.5,
              maxWidth: '520px',
              marginBottom: '40px',
            }}
          >
            Cada peça carrega o tempo da árvore, a mão do artesão e a assinatura de quem trata cada peça como se fosse a última.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={textVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap gap-10 mb-12"
          >
            {[
              { label: 'Categoria', value: 'Design de Alto Padrão' },
              { label: 'Matéria-Prima', value: 'Jaqueira Nativa' },
              { label: 'Posicionamento', value: 'Peças Autorais Assinadas' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    marginBottom: '4px',
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '17px',
                    fontWeight: 600,
                    color: 'var(--wood-light)',
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={textVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <StockCounter
              total={estoque.total}
              disponiveis={estoque.disponiveis}
              dark
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="relative z-10 w-full h-px"
          initial={{ opacity: 0 }}
          animate={textVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          style={{
            background: 'linear-gradient(to right, var(--wood-deep), var(--wood-warm), transparent)',
          }}
        />
      </section>

      {/* ── TEXTURA (close-ups horizontais) ───────────────── */}
      <section className="section-divider" style={{ background: 'var(--bg2)', padding: '80px 0', overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <SectionLabel dark>Texturas da Jaqueira</SectionLabel>
        </div>
        <div
          className="flex gap-4 px-6"
          style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: 'clamp(200px, 28vw, 360px)',
                aspectRatio: '3/4',
                background: `linear-gradient(${135 + i * 20}deg, #1a0e05, #6b3d1e ${30 + i * 10}%, #c8854a)`,
              }}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8">
          <FadeUp>
            <p
              className="font-cormorant italic"
              style={{ fontSize: '20px', color: 'var(--wood-light)', maxWidth: '440px' }}
            >
              Cada centímetro desta madeira tem uma história que a câmera mal consegue capturar.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── VÍDEO DO ATELIÊ ───────────────────────────────── */}
      <section
        className="relative flex items-center justify-center overflow-hidden dark-accent section-divider"
        style={{ minHeight: '70vh', background: 'var(--bg)' }}
      >
        {/* Placeholder para vídeo — substituir por <video> com src real */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, var(--darker) 0%, #3d1f0a 50%, var(--darker) 100%)',
          }}
        />
        <div className="relative z-10 text-center px-6">
          <FadeUp>
            <p
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: 'var(--wood-deep)',
                marginBottom: '16px',
              }}
            >
              Ateliê em processo
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p
              className="font-cormorant italic"
              style={{ fontSize: 'clamp(28px, 5vw, 52px)', color: 'var(--cream)', lineHeight: 1.2 }}
            >
              O trabalho acontece<br />em silêncio.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── ORIGEM ────────────────────────────────────────── */}
      <section className="section-divider" style={{ background: 'var(--bg)', padding: '120px 0' }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <FadeUp>
              <SectionLabel>A Origem</SectionLabel>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="font-cormorant font-light"
                style={{
                  fontSize: 'clamp(36px, 5vw, 60px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: '28px',
                }}
              >
                Três gerações.<br />
                <em style={{ color: 'var(--wood-deep)' }}>Uma árvore.</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p
                style={{
                  fontSize: '17px',
                  color: 'var(--muted)',
                  lineHeight: 1.75,
                  marginBottom: '24px',
                }}
              >
                Meus pais plantaram essa jaqueira quando construíram a casa. Cresci brincando em torno dela.
                Quando precisei decidir o que fazer com o terreno, levou meses até eu ter coragem de cortá-la.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <Link
                href="/historia"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--wood-deep)',
                  borderBottom: '1px solid var(--wood-deep)',
                  paddingBottom: '3px',
                }}
              >
                Ler a história completa →
              </Link>
            </FadeUp>
          </div>
          <div
            style={{
              aspectRatio: '3/4',
              background: 'linear-gradient(135deg, #1a0e05, #6b3d1e 60%, #c8854a)',
            }}
          />
        </div>
      </section>

      {/* ── OBRAS PREVIEW ─────────────────────────────────── */}
      <section className="section-divider" style={{ background: 'var(--bg2)', padding: '120px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <FadeUp>
                <SectionLabel>Obras</SectionLabel>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2
                  className="font-cormorant font-light"
                  style={{
                    fontSize: 'clamp(36px, 5vw, 60px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: 'var(--text)',
                  }}
                >
                  Cada peça, <em style={{ color: 'var(--wood-deep)' }}>uma vez.</em>
                </h2>
              </FadeUp>
            </div>
            <FadeUp>
              <Link
                href="/obras"
                className="hidden md:flex items-center gap-2 transition-opacity hover:opacity-60"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--wood-deep)',
                }}
              >
                Ver todas <ArrowRight size={14} />
              </Link>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {obrasPreview.map((obra, i) => (
              <FadeUp key={obra.slug} delay={i * 0.08}>
                <ObraCard obra={obra} />
              </FadeUp>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              href="/obras"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--wood-deep)',
                borderBottom: '1px solid var(--wood-deep)',
                paddingBottom: '3px',
              }}
            >
              Ver todas as obras →
            </Link>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ─────────────────────────────────────── */}
      <section
        className="section-divider"
        style={{
          background: 'var(--bg2)',
          padding: '140px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp>
            <SectionLabel>Manifesto</SectionLabel>
          </FadeUp>
          <TextReveal
            text={MANIFESTO}
            className="font-cormorant"
            style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              lineHeight: 1.55,
              fontWeight: 300,
            }}
          />
        </div>
      </section>

      {/* ── QUOTE CENTRAL ─────────────────────────────────── */}
      <section className="section-divider" style={{ background: 'var(--bg)', padding: '120px 0' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="quote-block" style={{ paddingTop: '60px' }}>
            <blockquote
              className="font-cormorant italic"
              style={{
                fontSize: 'clamp(28px, 4.5vw, 52px)',
                lineHeight: 1.3,
                color: 'var(--text)',
                letterSpacing: '-0.02em',
                marginBottom: '24px',
              }}
            >
              &ldquo;Não vendemos móveis. Criamos peças que vão durar mais do que nós — e que contam de onde viemos.&rdquo;
            </blockquote>
            <p
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              — Pedro Itan
            </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── ESCASSEZ ──────────────────────────────────────── */}
      <section
        className="section-divider"
        style={{
          background: 'var(--bg2)',
          padding: '120px 0',
          position: 'relative',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <SectionLabel>Disponibilidade</SectionLabel>
            <h2
              className="font-cormorant font-light"
              style={{
                fontSize: 'clamp(36px, 5vw, 60px)',
                lineHeight: 1.1,
                color: 'var(--darker)',
                marginBottom: '20px',
              }}
            >
              Quando acabar,<br />
              <em style={{ color: 'var(--wood-deep)' }}>acabou.</em>
            </h2>
            <p
              style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '32px' }}
            >
              Não haverá segunda edição. A jaqueira existiu uma vez. As peças são feitas com o que resta.
              Cada venda reduz permanentemente o que ainda pode existir.
            </p>
            <StockCounter total={estoque.total} disponiveis={estoque.disponiveis} />
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="flex flex-col gap-6">
              {[
                { numero: estoque.disponiveis, label: 'Peças disponíveis' },
                { numero: estoque.reservadas, label: 'Reservadas' },
                { numero: estoque.entregues, label: 'Já entregues' },
                { numero: estoque.total, label: 'Total da edição' },
              ].map(({ numero, label }) => (
                <div
                  key={label}
                  className="flex items-baseline gap-4"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '20px' }}
                >
                  <span
                    className="font-cormorant"
                    style={{ fontSize: '48px', fontWeight: 300, color: 'var(--cream)', lineHeight: 1 }}
                  >
                    {numero}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── INSTRUMENTOS / LISTA DE ESPERA ────────────────── */}
      <section className="section-divider" style={{ background: 'var(--bg)', padding: '120px 0' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <SectionLabel className="justify-center">Próximo Capítulo</SectionLabel>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-cormorant font-light"
              style={{
                fontSize: 'clamp(36px, 5vw, 60px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: '20px',
              }}
            >
              Instrumentos musicais<br />
              <em style={{ color: 'var(--wood-deep)' }}>em jaqueira.</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              style={{
                fontSize: '18px',
                color: 'var(--muted)',
                lineHeight: 1.7,
                maxWidth: '520px',
                margin: '0 auto 40px',
              }}
            >
              O próximo projeto explora a jaqueira como material acústico.
              Violas, cavaquinhos. Entre na lista de espera para ser notificado.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <Link
              href="/instrumentos"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-syne)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--cream)',
                background: 'var(--wood-deep)',
                padding: '14px 32px',
              }}
            >
              Entrar na lista de espera <ArrowRight size={12} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--bg)',
          padding: '160px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at center, var(--wood-deep) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <h2
              className="font-cormorant font-light"
              style={{
                fontSize: 'clamp(40px, 7vw, 80px)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'var(--darker)',
                marginBottom: '32px',
              }}
            >
              Avós plantaram.<br />
              Itan transformou.<br />
              <em style={{ color: 'var(--wood-deep)' }}>Você herda.</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p
              className="font-cormorant italic"
              style={{
                fontSize: 'clamp(18px, 2.5vw, 24px)',
                color: 'var(--wood-mid)',
                marginBottom: '48px',
              }}
            >
              Design de alto padrão. Matéria-prima única. Edição encerrada.
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/obras"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-syne)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text)',
                  background: 'var(--wood-deep)',
                  padding: '16px 36px',
                }}
              >
                Ver todas as obras <ArrowRight size={12} />
              </Link>
              <Link
                href="/contato"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-syne)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--cream)',
                  border: '1px solid rgba(250,246,238,0.3)',
                  padding: '16px 36px',
                }}
              >
                Falar com Pedro
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
