import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:           'var(--bg)',
        bg2:          'var(--bg2)',
        dark:         'var(--dark)',
        darker:       'var(--darker)',
        'wood-deep':  'var(--wood-deep)',
        'wood-mid':   'var(--wood-mid)',
        'wood-warm':  'var(--wood-warm)',
        'wood-light': 'var(--wood-light)',
        cream:        'var(--cream)',
        text:         'var(--text)',
        muted:        'var(--muted)',
        border:       'var(--border)',
        gold:         'var(--gold)',
        'gold-light': 'var(--gold-light)',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        syne:      ['var(--font-syne)', 'sans-serif'],
        dm:        ['var(--font-dm)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
