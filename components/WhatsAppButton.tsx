'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5571999999999'
  const message = encodeURIComponent(
    'Olá Pedro, vi o site do Madeira Viva e tenho interesse em uma das peças.'
  )

  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com Pedro no WhatsApp"
      className="no-print"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 100,
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        background: 'var(--wood-deep)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 24px rgba(107,61,30,0.4)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        color: 'var(--cream)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.transform = 'scale(1.08)'
        el.style.boxShadow = '0 6px 32px rgba(107,61,30,0.6)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.transform = 'scale(1)'
        el.style.boxShadow = '0 4px 24px rgba(107,61,30,0.4)'
      }}
    >
      <MessageCircle size={22} strokeWidth={1.5} />
    </a>
  )
}
