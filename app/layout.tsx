import type { Metadata } from 'next'
import { Cormorant_Garamond, Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dm = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Madeira Viva — Peças Autorais em Jaqueira · Salvador, Bahia',
  description:
    'Ateliê de peças únicas em jaqueira assinadas por Pedro Itan. Uma árvore de 41 anos, plantada pelos seus pais, transformada em obra. Edição única — sem reposição.',
  openGraph: {
    title: 'Madeira Viva',
    description: 'Peças autorais em jaqueira. Uma edição. Para sempre.',
    url: 'https://ateliemadeiraviva.com',
    siteName: 'Madeira Viva',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Madeira Viva',
    description: 'Peças autorais em jaqueira. Uma edição. Para sempre.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${syne.variable} ${dm.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
