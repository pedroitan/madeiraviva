import { notFound } from 'next/navigation'
import { obras } from '@/lib/data/obras'
import { PrintButton } from '@/components/ui/PrintButton'

export async function generateStaticParams() {
  return obras.map((o) => ({ slug: o.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const obra = obras.find((o) => o.slug === slug)
  return {
    title: `Certificado de Autenticidade — ${obra?.nome ?? ''} · Madeira Viva`,
  }
}

export default async function CertificadoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const obra = obras.find((o) => o.slug === slug)
  if (!obra) notFound()

  const hoje = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--cream)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}
    >
      <article
        id="certificado"
        style={{
          width: '100%',
          maxWidth: '780px',
          border: '2px solid var(--wood-deep)',
          padding: 'clamp(32px, 6vw, 72px)',
          position: 'relative',
          background: 'var(--cream)',
        }}
      >
        {/* Cantos decorativos */}
        {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos) => (
          <div
            key={pos}
            className={`absolute ${pos} w-6 h-6`}
            style={{
              borderColor: 'var(--wood-warm)',
              borderStyle: 'solid',
              borderWidth:
                pos.includes('top') && pos.includes('left')
                  ? '3px 0 0 3px'
                  : pos.includes('top') && pos.includes('right')
                  ? '3px 3px 0 0'
                  : pos.includes('bottom') && pos.includes('left')
                  ? '0 0 3px 3px'
                  : '0 3px 3px 0',
            }}
          />
        ))}

        {/* Header */}
        <div className="text-center mb-10">
          <p
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: 'var(--wood-warm)',
              marginBottom: '16px',
            }}
          >
            Ateliê Madeira Viva · Salvador, Bahia
          </p>
          <h1
            className="font-cormorant font-light"
            style={{
              fontSize: 'clamp(30px, 5vw, 52px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: '8px',
            }}
          >
            Certificado de<br />Autenticidade
          </h1>
          <div
            style={{
              width: '60px',
              height: '2px',
              background: 'linear-gradient(to right, var(--wood-deep), var(--wood-warm))',
              margin: '16px auto 0',
            }}
          />
        </div>

        {/* Texto central */}
        <div className="text-center mb-10">
          <p
            style={{
              fontFamily: 'var(--font-dm)',
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginBottom: '8px',
            }}
          >
            Certificamos que a obra
          </p>
          <h2
            className="font-cormorant"
            style={{
              fontSize: 'clamp(24px, 4vw, 40px)',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: 'var(--text)',
              marginBottom: '4px',
            }}
          >
            {obra.nome}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '16px',
            }}
          >
            Nº {obra.numero} · Edição Única
          </p>
          <p
            style={{
              fontFamily: 'var(--font-dm)',
              fontSize: '15px',
              color: 'var(--muted)',
              lineHeight: 1.7,
            }}
          >
            é uma peça autoral, original e numerada,
            produzida integralmente no Ateliê Madeira Viva por Pedro Itan
            a partir de madeira de jaqueira nativa com 41 anos de crescimento,
            plantada em Salvador, Bahia.
          </p>
        </div>

        {/* Especificações */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px 32px',
            padding: '24px 0',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            marginBottom: '32px',
          }}
        >
          {[
            { label: 'Materiais', value: obra.materiais },
            { label: 'Dimensões', value: obra.dimensoes },
            { label: 'Data de criação', value: obra.dataCriacao },
            { label: 'Número de série', value: `${obra.numero} / ${67}` },
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
                className="font-cormorant"
                style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.4 }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Assinatura */}
        <div className="flex justify-between items-end">
          <div>
            <div
              style={{
                width: '160px',
                height: '1px',
                background: 'var(--wood-deep)',
                marginBottom: '8px',
              }}
            />
            <p
              className="font-cormorant italic"
              style={{ fontSize: '18px', color: 'var(--text)' }}
            >
              Pedro Itan
            </p>
            <p
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              Artesão · Criador
            </p>
          </div>
          <div className="text-right">
            <p
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '4px',
              }}
            >
              Emitido em
            </p>
            <p
              className="font-cormorant"
              style={{ fontSize: '15px', color: 'var(--text)' }}
            >
              {hoje}
            </p>
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center mt-10">
          <p
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: '8px',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--border)',
            }}
          >
            ateliemadeiraviva.com · Salvador, Bahia · Brasil
          </p>
        </div>
      </article>

      {/* Botão imprimir — oculto na impressão */}
      <PrintButton />
    </div>
  )
}
