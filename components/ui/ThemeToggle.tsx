'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import LogoSVG from '@/components/ui/LogoSVG'

/**
 * Fires the shockwave transition:
 *  1. CSS token transitions engaged via .theme-transitioning on <html>
 *  2. Soft radial wave expands from the button — stays behind all content
 *  3. Theme tokens swap while the wave is mid-flight
 *  4. Wave fades out; .theme-transitioning removed so transitions don't linger
 */
function fireShockwave(
  originX: number,
  originY: number,
  onApplyTheme: () => void,
) {
  const maxDim    = Math.hypot(window.innerWidth, window.innerHeight)
  const startSize = 60
  const scale     = (maxDim * 2.4) / startSize

  // Enable smooth token transitions across the entire document
  document.documentElement.classList.add('theme-transitioning')

  // Single soft radial wave — z-index 0 keeps it behind all page content (z-index 1)
  const wave = document.createElement('div')
  Object.assign(wave.style, {
    position:      'fixed',
    zIndex:        '0',
    borderRadius:  '50%',
    pointerEvents: 'none',
    width:         `${startSize}px`,
    height:        `${startSize}px`,
    left:          `${originX - startSize / 2}px`,
    top:           `${originY - startSize / 2}px`,
    background:    'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 50%, transparent 72%)',
    willChange:    'transform, opacity',
  })
  document.body.appendChild(wave)

  wave
    .animate(
      [
        { transform: 'scale(0)',        opacity: 1 },
        { transform: `scale(${scale})`, opacity: 0 },
      ],
      { duration: 900, easing: 'cubic-bezier(0.1, 0, 0.35, 1)', fill: 'forwards' },
    )
    .finished.then(() => wave.remove())

  // Apply theme near the wave's midpoint so the color shift feels connected
  setTimeout(onApplyTheme, 80)

  // Remove transition class after tokens have settled
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning')
  }, 700)
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  const buttonRef           = useRef<HTMLButtonElement>(null)

  // Dark is default. Only switch to light if user has explicitly saved that preference.
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light') {
      document.documentElement.removeAttribute('data-theme')
      setIsDark(false)
    } else {
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  const toggle = useCallback(() => {
    const btn = buttonRef.current
    if (!btn) return

    const next    = !isDark
    const rect    = btn.getBoundingClientRect()
    const originX = rect.left + rect.width  / 2
    const originY = rect.top  + rect.height / 2

    // Button micro-bounce — springy feel
    btn.animate(
      [
        { transform: 'scale(1)'    },
        { transform: 'scale(1.07)' },
        { transform: 'scale(1)'    },
      ],
      { duration: 320, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    )

    fireShockwave(originX, originY, () => {
      setIsDark(next)
      if (next) {
        document.documentElement.setAttribute('data-theme', 'dark')
        localStorage.removeItem('theme') // dark is default — no need to persist
      } else {
        document.documentElement.removeAttribute('data-theme')
        localStorage.setItem('theme', 'light') // only persist the non-default choice
      }
    })
  }, [isDark])

  return (
    <button
      ref={buttonRef}
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        display:      'inline-flex',
        alignItems:   'center',
        gap:          '10px',
        background:   'var(--color-badge-bg)',
        padding:      '10px 22px',
        borderRadius: '40px',
        border:       'none',
        cursor:       'pointer',
        boxShadow:    'inset 0 1px 0 rgba(255,255,255,0.10)',
        transition:   'opacity 0.2s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
    >
      <span
        style={{
          fontFamily:    'var(--font-outfit), system-ui, sans-serif',
          fontSize:      '20px',
          fontWeight:    700,
          color:         'var(--color-badge-fg)',
          letterSpacing: '-0.01em',
          lineHeight:    1,
          userSelect:    'none',
        }}
      >
        Jay
      </span>

      <span
        aria-hidden="true"
        style={{
          display:    'block',
          width:      '1px',
          height:     '16px',
          background: 'var(--color-badge-divider)',
          flexShrink: 0,
        }}
      />

      <span
        style={{
          display:    'block',
          width:      '88px',
          color:      'var(--color-badge-fg)',
          lineHeight: 0,
          flexShrink: 0,
        }}
      >
        <LogoSVG />
      </span>
    </button>
  )
}
