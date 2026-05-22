'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeUp } from '@/components/ui/FadeUp'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { obras } from '@/lib/data/obras'
import { use } from 'react'

const statusLabel: Record<string, string> = {
  disponivel: 'Disponível para aquisição',
  reservada: 'Reservada',
  entregue: 'Já entregue',
}
const statusColor: Record<string, string> = {
  disponivel: 'var(--wood-warm)',
  reservada: 'var(--gold)',
  entregue: 'var(--muted)',
}

export default function ObraPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const obra = obras.find((o) => o.slug === slug)
  if (!obra) notFound()

  const lojaUrl = process.env.NEXT_PUBLIC_LOJA_URL ?? 'https://loja.ateliemadeiraviva.com'
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5571999999999'
  const whatsappMsg = encodeURIComponent(
    `Olá Pedro, tenho interesse na obra "${obra.nome}" (Nº ${obra.numero}). Podemos conversar?`
  )

  return (
    <>
      <div
        className="fixed top-0 inset-x-0 z-40 h-16 flex items-center px-6 gap-6"
        style={{ background: 'var(--cream)', borderBottom: '1px solid var(--border)' }}
      >
        <Link
          href="/obras"
          className="flex items-center gap-2 transition-opacity hover:opacity-60"
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text)',
          }}
        >
          <ArrowLeft size={14} /> Obras
        </Link>
        <span style={{ color: 'var(--border)' }}>·</span>
        <span
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: 'var(--muted)',
          }}
        >
          Nº {obra.numero}
        </span>
      </div>

      <div className="pt-16">
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ minHeight: 'calc(100vh - 64px)' }}
        >
          {/* ── FOTO STICKY ─────────────────────────────── */}
          <div className="relative lg:sticky lg:top-16 lg:h-[calc(100vh-64px)]">
            <motion.div
              className="w-full h-full min-h-[60vw] lg:min-h-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                background:
                  'linear-gradient(135deg, #1a0e05 0%, #3d1f0a 35%, #6b3d1e 65%, #c8854a 100%)',
              }}
            />
            {/* Status overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                fontFamily: 'var(--font-syne)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: statusColor[obra.status] ?? 'var(--muted)',
                background: 'rgba(13,10,4,0.75)',
                padding: '6px 14px',
              }}
            >
              {statusLabel[obra.status] ?? obra.status}
            </div>
          </div>

          {/* ── DETALHES ─────────────────────────────────── */}
          <div
            className="px-8 py-16 lg:py-20 lg:px-14 flex flex-col gap-12"
            style={{ background: 'var(--cream)' }}
          >
            <FadeUp>
              <SectionLabel>Obra</SectionLabel>
              <h1
                className="font-cormorant font-light"
                style={{
                  fontSize: 'clamp(36px, 4.5vw, 64px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: '8px',
                }}
              >
                {obra.nome}
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                Nº {obra.numero} · {obra.dataCriacao}
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p
                style={{
                  fontSize: '17px',
                  color: 'var(--text)',
                  lineHeight: 1.75,
                  fontWeight: 300,
                }}
              >
                {obra.descricao}
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div
                style={{
                  borderTop: '1px solid var(--border)',
                  borderBottom: '1px solid var(--border)',
                  padding: '24px 0',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                }}
              >
                {[
                  { label: 'Materiais', value: obra.materiais },
                  { label: 'Dimensões', value: obra.dimensoes },
                  { label: 'Criação', value: obra.dataCriacao },
                  ...(obra.destino
                    ? [{ label: 'Destino', value: obra.destino }]
                    : []),
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
                        marginBottom: '6px',
                      }}
                    >
                      {label}
                    </p>
                    <p
                      className="font-cormorant"
                      style={{ fontSize: '16px', color: 'var(--text)', lineHeight: 1.4 }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-col gap-3">
                {obra.status === 'disponivel' && (
                  <a
                    href={`${lojaUrl}/obras/${obra.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '16px 32px',
                      background: 'var(--wood-deep)',
                      fontFamily: 'var(--font-syne)',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--cream)',
                    }}
                  >
                    Adquirir esta obra →
                  </a>
                )}

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px 32px',
                    border: '1px solid var(--wood-deep)',
                    fontFamily: 'var(--font-syne)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--wood-deep)',
                  }}
                >
                  Perguntar sobre esta obra
                </a>

                <Link
                  href={`/obras/${obra.slug}/certificado`}
                  className="flex items-center justify-center gap-2 transition-opacity hover:opacity-60"
                  style={{
                    padding: '12px 32px',
                    fontFamily: 'var(--font-syne)',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                  }}
                >
                  <Award size={13} /> Ver certificado digital
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </>
  )
}
