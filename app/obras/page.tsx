import { SectionLabel } from '@/components/ui/SectionLabel'
import { FadeUp } from '@/components/ui/FadeUp'
import ObraCard from '@/components/ObraCard'
import StockCounter from '@/components/StockCounter'
import { obras } from '@/lib/data/obras'
import { estoque } from '@/lib/data/estoque'

export const metadata = {
  title: 'Obras — Madeira Viva',
  description: 'Todas as peças autorais em jaqueira. Edição única.',
}

export default function ObrasPage() {
  return (
    <>
      <section
        style={{
          background: 'var(--darker)',
          paddingTop: '160px',
          paddingBottom: '100px',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <SectionLabel dark>Catálogo</SectionLabel>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="font-cormorant font-light"
              style={{
                fontSize: 'clamp(48px, 7vw, 90px)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                color: 'var(--cream)',
                marginBottom: '20px',
              }}
            >
              Obras
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="font-cormorant italic"
              style={{
                fontSize: 'clamp(18px, 2.2vw, 24px)',
                color: 'var(--wood-light)',
                maxWidth: '520px',
                lineHeight: 1.5,
                marginBottom: '40px',
              }}
            >
              Cada peça existe uma vez. Quando a última for entregue, a edição fecha.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <StockCounter
              total={estoque.total}
              disponiveis={estoque.disponiveis}
              dark
            />
          </FadeUp>
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: '100px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-16">
            {obras.map((obra, i) => (
              <FadeUp key={obra.slug} delay={Math.min(i * 0.06, 0.4)}>
                <ObraCard obra={obra} />
              </FadeUp>
            ))}
          </div>

          {obras.length === 0 && (
            <div className="text-center py-20">
              <p
                className="font-cormorant italic"
                style={{ fontSize: '24px', color: 'var(--muted)' }}
              >
                Nenhuma obra disponível no momento.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
