import { SectionLabel } from '@/components/ui/SectionLabel'
import { FadeUp } from '@/components/ui/FadeUp'

export const metadata = {
  title: 'O Ateliê — Madeira Viva',
  description: 'Conheça o ateliê de Pedro Itan em Salvador, Bahia, onde as peças de jaqueira ganham vida.',
}

export default function AteliePage() {
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
            <SectionLabel>Salvador, Bahia</SectionLabel>
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
              O Ateliê
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
              Um espaço de trabalho manual. Sem linha de produção, sem assistentes.
              Cada peça passa pelas mãos de uma única pessoa.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* VÍDEO PLACEHOLDER */}
      <section
        className="section-divider"
        style={{
          background: 'var(--bg2)',
          aspectRatio: '16/6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Placeholder para vídeo mudo em loop */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #0d0a04 0%, #3d1f0a 50%, #0d0a04 100%)',
          }}
        />
        <div className="relative z-10 text-center">
          <p
            className="font-cormorant italic"
            style={{ fontSize: '20px', color: 'rgba(250,246,238,0.4)', letterSpacing: '0.1em' }}
          >
            [vídeo do ateliê — em breve]
          </p>
        </div>
      </section>

      {/* ESPAÇO */}
      <section className="section-divider" style={{ background: 'var(--bg)', padding: '120px 0' }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <FadeUp>
              <SectionLabel>O Espaço</SectionLabel>
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
                Trabalho lento,<br />
                <em style={{ color: 'var(--wood-deep)' }}>resultado permanente.</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p style={{ fontSize: '17px', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '16px' }}>
                O ateliê fica no mesmo terreno onde a jaqueira cresceu, em Salvador.
                É um espaço pequeno — propositalmente. Não há espaço para velocidade aqui.
              </p>
              <p style={{ fontSize: '17px', color: 'var(--muted)', lineHeight: 1.75 }}>
                Cada peça leva entre duas semanas e dois meses para ficar pronta,
                dependendo da complexidade do processo de resina e do acabamento.
                Não existe linha de produção. Existe atenção.
              </p>
            </FadeUp>
          </div>
          <div className="flex flex-col gap-6">
            {[
              { label: 'Capacidade de produção', valor: '4–6 peças / mês' },
              { label: 'Cada peça', valor: 'assinada e numerada à mão' },
              { label: 'Assistentes', valor: 'nenhum' },
              { label: 'Localização', valor: 'Salvador, Bahia, Brasil' },
            ].map(({ label, valor }) => (
              <FadeUp key={label}>
                <div
                  style={{
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: '20px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                    }}
                  >
                    {label}
                  </p>
                  <p className="font-cormorant" style={{ fontSize: '18px', color: 'var(--text)' }}>
                    {valor}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA ATELIÊ */}
      <section className="section-divider" style={{ background: 'var(--bg2)', padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <SectionLabel>O processo em imagens</SectionLabel>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: '1',
                  background: `linear-gradient(${120 + i * 18}deg, #1a0e05 0%, #6b3d1e ${40 + i * 5}%, #c8854a 100%)`,
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
