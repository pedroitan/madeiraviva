import { SectionLabel } from '@/components/ui/SectionLabel'
import { FadeUp } from '@/components/ui/FadeUp'
import { TextReveal } from '@/components/ui/TextReveal'

export const metadata = {
  title: 'A História — Madeira Viva',
  description: 'A história de Pedro Itan e da jaqueira de 41 anos que deu origem ao Ateliê Madeira Viva.',
}

const MANIFESTO =
  'A jaqueira cresceu aqui. Raízes fundas no mesmo solo que fez a nossa cultura, a nossa música, a nossa maneira de receber e habitar. Meus pais a plantaram. Ela tem a minha idade. Quando ela adoeceu e precisou ser cortada, foi uma decisão carregada de respeito. E toda decisão assim pede um gesto à altura — eternalizá-la em obra. Sem encontrar quem soubesse trabalhar essa madeira do jeito certo, aprendi. Comprei as máquinas. Entrei no processo. E fui descobrindo que lixar madeira é meditar. Que cada veio conta uma história que só aquela árvore poderia contar. Que a resina com pó de mica não esconde a madeira — ela a celebra. Quando essa madeira passa pelas mãos certas, algo acontece que não tem nome técnico: a peça lembra de onde veio. Os veios contam uma história que nenhuma madeira importada pode contar. Cada mesa que sai daqui vai ser passada de mão em mão. Vai envelhecer com quem a escolheu. Vai carregar a assinatura de quem fez — não como marca, mas como pacto. E quando o estoque dessa árvore acabar, este projeto se encerra. Não haverá segunda edição. Não produzimos móveis. Criamos herdeiros.'

export default function HistoriaPage() {
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
            <SectionLabel>Origem</SectionLabel>
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
              A História
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
              Uma árvore de 41 anos. Uma família. Uma decisão que se tornou obra.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* FOTO + TEXTO ORIGEM */}
      <section className="section-divider" style={{ background: 'var(--bg)', padding: '120px 0' }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div
            style={{
              aspectRatio: '3/4',
              background: 'linear-gradient(135deg, #1a0e05, #6b3d1e 60%, #c8854a)',
            }}
          />
          <div>
            <FadeUp>
              <SectionLabel>Os Primeiros Anos</SectionLabel>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="font-cormorant font-light"
                style={{
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                  marginBottom: '20px',
                }}
              >
                Três gerações,<br />
                <em style={{ color: 'var(--wood-deep)' }}>uma raiz.</em>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p style={{ fontSize: '17px', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '16px' }}>
                Meus pais plantaram essa jaqueira quando construíram a casa no terreno familiar em Salvador.
                Era uma árvore de sombra, de fruta, de infância. Cresci brincando em torno dela,
                subindo nela, esperando as jacas amadurecerem.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p style={{ fontSize: '17px', color: 'var(--muted)', lineHeight: 1.75 }}>
                Quando o terreno precisou ser reorganizado, a decisão de cortar a árvore levou meses.
                Não é simples abrir mão de algo que tem 41 anos de história familiar.
                Mas foi na conversa com um carpinteiro que percebi: a madeira da jaqueira não precisa morrer.
                Ela pode continuar existindo — de outra forma.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* MANIFESTO COM TEXT REVEAL */}
      <section
        className="section-divider"
        style={{
          background: 'var(--bg2)',
          padding: '140px 0',
          position: 'relative',
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp>
            <SectionLabel>Manifesto</SectionLabel>
          </FadeUp>
          <TextReveal
            text={MANIFESTO}
            className="font-cormorant"
            style={{ fontSize: 'clamp(22px, 3vw, 32px)', lineHeight: 1.6, fontWeight: 300 }}
          />
        </div>
      </section>

      {/* O PROCESSO */}
      <section className="section-divider" style={{ background: 'var(--bg)', padding: '120px 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <SectionLabel>O Processo</SectionLabel>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
            {[
              {
                numero: '01',
                titulo: 'A madeira bruta',
                texto:
                  'Cada tora foi serrada manualmente e secada por meses. O processo de secagem revela as fissuras naturais — que não são defeitos, são parte da identidade da peça.',
              },
              {
                numero: '02',
                titulo: 'A resina',
                texto:
                  'A resina epóxi preenche os vazios naturais da madeira. O pó de mica — dourado, azul ou cobre — é escolhido para cada peça, criando um diálogo com os veios específicos daquela tora.',
              },
              {
                numero: '03',
                titulo: 'O acabamento',
                texto:
                  'O lixamento progressivo revela a superfície final. Cada peça passa por 7 etapas de lixamento antes de receber o verniz de proteção. O resultado é uma superfície que você precisa tocar para entender.',
              },
            ].map(({ numero, titulo, texto }, i) => (
              <FadeUp key={numero} delay={i * 0.1}>
                <div>
                  <p
                    className="font-cormorant"
                    style={{ fontSize: '48px', fontWeight: 300, color: 'var(--border)', lineHeight: 1 }}
                  >
                    {numero}
                  </p>
                  <h3
                    className="font-cormorant font-semibold"
                    style={{ fontSize: '24px', color: 'var(--text)', marginBottom: '12px', marginTop: '8px' }}
                  >
                    {titulo}
                  </h3>
                  <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7 }}>
                    {texto}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE PEDRO */}
      <section className="section-divider" style={{ background: 'var(--bg2)', padding: '100px 0' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="quote-block" style={{ paddingTop: '60px' }}>
            <blockquote
              className="font-cormorant italic"
              style={{
                fontSize: 'clamp(24px, 4vw, 40px)',
                lineHeight: 1.35,
                color: 'var(--text)',
                marginBottom: '24px',
              }}
            >
              "Eu não faço móveis. Eu faço tempo visível."
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
              — Pedro Itan, Ateliê Madeira Viva
            </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
