'use client'

import { useEffect, useState } from 'react'
import type { PhaseKey } from '@/data/types'

const PHASES: { key: PhaseKey; label: string }[] = [
  { key: 'problem',   label: 'Problem' },
  { key: 'discovery', label: 'Discovery' },
  { key: 'solution',  label: 'Solution' },
  { key: 'impact',    label: 'Impact' },
]

const PHASE_COLORS: Record<PhaseKey, string> = {
  problem:   'var(--phase-problem-label)',
  discovery: 'var(--phase-discovery-label)',
  solution:  'var(--phase-solution-label)',
  impact:    'var(--phase-impact-label)',
}

export default function PhaseProgress() {
  const [activePhase, setActivePhase] = useState<PhaseKey | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Watch data-phase attribute on html
    const html = document.documentElement
    const observer = new MutationObserver(() => {
      const phase = html.getAttribute('data-phase') as PhaseKey | null
      setActivePhase(phase)
    })
    observer.observe(html, { attributes: true, attributeFilter: ['data-phase'] })

    // Read initial phase
    const initialPhase = html.getAttribute('data-phase') as PhaseKey | null
    if (initialPhase) setActivePhase(initialPhase)

    // Show/hide based on hero visibility
    const heroEl = document.querySelector('[aria-label="Case study overview"]')
    if (heroEl) {
      // Check if hero is already off-screen on mount
      const heroRect = heroEl.getBoundingClientRect()
      if (heroRect.bottom < 0) setVisible(true)

      const heroObserver = new IntersectionObserver(
        ([entry]) => setVisible(!entry.isIntersecting),
        { threshold: 0.1 }
      )
      heroObserver.observe(heroEl)
      return () => {
        observer.disconnect()
        heroObserver.disconnect()
      }
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Desktop: vertical dots on left */}
      <nav
        className="hidden md:flex"
        style={{
          position: 'fixed',
          left: 'max(20px, calc((100vw - 1200px) / 2 - 40px))',
          top: '50%',
          transform: 'translateY(-50%)',
          flexDirection: 'column',
          gap: 'var(--space-component-md)',
          zIndex: 40,
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
        aria-label="Case study progress"
      >
        {PHASES.map(({ key, label }) => {
          const isActive = activePhase === key
          return (
            <a
              key={key}
              href={`#${key}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-component-sm)',
                textDecoration: 'none',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              <span
                style={{
                  width: isActive ? '10px' : '8px',
                  height: isActive ? '10px' : '8px',
                  borderRadius: '50%',
                  background: isActive ? PHASE_COLORS[key] : 'var(--color-border)',
                  transition: 'all 0.3s ease',
                  flexShrink: 0,
                }}
              />
              <span
                className="text-ui-sm"
                style={{
                  color: isActive ? PHASE_COLORS[key] : 'transparent',
                  transition: 'color 0.3s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </span>
            </a>
          )
        })}
      </nav>

      {/* Mobile: horizontal dots below nav */}
      <div
        className="flex md:hidden justify-center"
        style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          zIndex: 40,
          gap: 'var(--space-component-md)',
          padding: 'var(--space-component-sm) 0',
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
        aria-label="Case study progress"
      >
        {PHASES.map(({ key }) => {
          const isActive = activePhase === key
          return (
            <a
              key={key}
              href={`#${key}`}
              style={{
                width: isActive ? '10px' : '6px',
                height: isActive ? '10px' : '6px',
                borderRadius: '50%',
                background: isActive ? PHASE_COLORS[key] : 'var(--color-border)',
                transition: 'all 0.3s ease',
              }}
            />
          )
        })}
      </div>
    </>
  )
}
