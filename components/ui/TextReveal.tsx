'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef, type CSSProperties } from 'react'

interface TextRevealProps {
  text: string
  className?: string
  style?: CSSProperties
  dark?: boolean
}

export function TextReveal({ text, className = '', style, dark = false }: TextRevealProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.4'],
  })
  const words = text.split(' ')

  return (
    <p ref={ref} className={`flex flex-wrap gap-x-[0.35em] gap-y-1 ${className}`} style={style}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = (i + 1) / words.length
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1])
        return (
          <motion.span
            key={i}
            style={{
              opacity,
              color: dark ? 'var(--cream)' : 'var(--text)',
            }}
          >
            {word}
          </motion.span>
        )
      })}
    </p>
  )
}
