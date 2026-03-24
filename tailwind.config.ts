import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm:  '375px',
      md:  '768px',
      lg:  '1024px',
      xl:  '1440px',
    },
    extend: {
      colors: {
        canvas:            'var(--color-canvas)',
        surface:           'var(--color-surface)',
        'surface-glass':   'var(--color-surface-glass)',
        ink:               'var(--color-ink)',
        'text-primary':    'var(--color-text-primary)',
        'text-secondary':  'var(--color-text-secondary)',
        'text-muted':      'var(--color-text-muted)',
        accent:            'var(--color-accent)',
        'accent-tint':     'var(--color-accent-tint)',
        'accent-border':   'var(--color-accent-border)',
        border:            'var(--color-border)',
        'border-mid':      'var(--color-border-mid)',
        'border-strong':   'var(--color-border-strong)',
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: 'var(--space-content-max)',
        layout:  'var(--space-layout-max)',
      },
      backdropBlur: {
        glass:        '14px',
        'glass-nav':  '16px',
        'glass-heavy':'20px',
      },
    },
  },
  plugins: [],
}

export default config
