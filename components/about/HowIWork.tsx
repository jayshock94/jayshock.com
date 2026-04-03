'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PHASES = [
  {
    id:    'see',
    label: 'See it',
    title: 'Understand what is actually happening',
    desc:  'The stated problem is rarely the real one. I dig until I understand what is actually happening before I touch anything.',
    color: 'var(--phase-impact-label)',
    bg:    'rgba(180, 160, 224, 0.12)',
    border:'rgba(180, 160, 224, 0.22)',
  },
  {
    id:    'own',
    label: 'Own it',
    title: 'Take responsibility for the outcome',
    desc:  'I figure out my part in it. The win, the miss, the gap. No excuses, no finger pointing. Just ownership.',
    color: 'var(--phase-problem-label)',
    bg:    'rgba(200, 170, 140, 0.12)',
    border:'rgba(200, 170, 140, 0.22)',
  },
  {
    id:    'solve',
    label: 'Solve it',
    title: 'Find the answer that holds up',
    desc:  'Explore every angle. The solution has to hold up for the business and the user, not just look good in a prototype.',
    color: 'var(--phase-discovery-label)',
    bg:    'rgba(128, 196, 180, 0.12)',
    border:'rgba(128, 196, 180, 0.22)',
  },
  {
    id:    'do',
    label: 'Do it',
    title: 'Ship it and keep going',
    desc:  'Build it, test it, ship it. If a new gap shows up, the cycle starts again. I keep going until it is right.',
    color: 'var(--phase-solution-label)',
    bg:    'rgba(140, 174, 214, 0.12)',
    border:'rgba(140, 174, 214, 0.22)',
  },
] as const

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HowIWork() {
  const [active, setActive] = useState(0)
  const phase = PHASES[active]

  const containerRef = useRef<HTMLDivElement>(null)
  const hasAutoPlayed = useRef(false)
  const isAutoRotating = useRef(false)
  const rotateTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => { isMounted.current = false }
  }, [])

  /* Auto-rotate through phases when section scrolls into view */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAutoPlayed.current || !isMounted.current) return
        hasAutoPlayed.current = true
        isAutoRotating.current = true

        let step = 0
        const cycle = () => {
          if (!isAutoRotating.current || !isMounted.current) return
          setActive(step)
          step++
          if (step < PHASES.length) {
            rotateTimer.current = setTimeout(cycle, 1500)
          } else {
            rotateTimer.current = setTimeout(() => {
              if (isAutoRotating.current && isMounted.current) {
                setActive(0)
                isAutoRotating.current = false
              }
            }, 1500)
          }
        }
        rotateTimer.current = setTimeout(cycle, 50)
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (rotateTimer.current) clearTimeout(rotateTimer.current)
    }
  }, [])

  const stopAutoRotate = useCallback(() => {
    isAutoRotating.current = false
    if (rotateTimer.current) {
      clearTimeout(rotateTimer.current)
      rotateTimer.current = null
    }
  }, [])

  const handleKey = useCallback((e: React.KeyboardEvent, i: number) => {
    stopAutoRotate()
    const n = PHASES.length
    let next = i
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % n
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + n) % n
    else return
    e.preventDefault()
    setActive(next)
  }, [stopAutoRotate])

  return (
    <div ref={containerRef}>
      {/* Header */}
      <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-sm)] text-center">
        How I work
      </p>
      <h2 className="text-h2 text-[var(--color-ink)] mb-[var(--space-stack-sm)] text-center">
        No matter the project.
      </h2>
      <p
        className="text-body text-[var(--color-text-secondary)] mb-[var(--space-stack-lg)] text-center mx-auto"
        style={{ maxWidth: 'var(--space-content-max)' }}
      >
        Whether it is a full product redesign or a single flow. Scopes change,
        problems arise, constraints shift. This is how I handle it.
      </p>

      {/* Toggle row — 4 pills, always fits one line */}
      <div
        role="tablist"
        aria-label="Process phases"
        className="flex justify-center gap-[var(--space-component-xs)] mb-[var(--space-stack-lg)]"
      >
        {PHASES.map((p, i) => {
          const isActive = active === i
          return (
            <button
              key={p.id}
              role="tab"
              id={`tab-${p.id}`}
              aria-selected={isActive}
              aria-controls="how-i-work-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => { stopAutoRotate(); setActive(i) }}
              onKeyDown={(e) => handleKey(e, i)}
              style={{
                padding: '10px 18px',
                borderRadius: '999px',
                border: isActive
                  ? `1px solid ${p.border}`
                  : '0.5px solid var(--color-border)',
                background: isActive ? p.bg : 'transparent',
                color: isActive ? p.color : 'var(--color-text-muted)',
                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: isActive ? 500 : 400,
                letterSpacing: '0.02em',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                outline: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {p.label}
            </button>
          )
        })}
      </div>

      {/* Description card */}
      <div
        id="how-i-work-panel"
        role="tabpanel"
        aria-labelledby={`tab-${phase.id}`}
        className="max-w-content mx-auto"
      >
        <div
          style={{
            padding: 'var(--space-component-lg)',
            borderRadius: '12px',
            border: `0.5px solid ${phase.border}`,
            background: phase.bg,
            transition: 'border-color 0.3s ease, background 0.3s ease',
          }}
        >
          {/* Grid stack — all descriptions occupy the same cell, tallest sets height */}
          <div style={{ display: 'grid' }}>
            {PHASES.map((p, i) => (
              <div
                key={p.id}
                style={{
                  gridArea: '1 / 1',
                  opacity: active === i ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                  pointerEvents: active === i ? 'auto' : 'none',
                }}
              >
                <p
                  className="text-h4"
                  style={{
                    color: 'var(--color-ink)',
                    marginBottom: 'var(--space-stack-xs)',
                  }}
                >
                  {p.title}
                </p>
                <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
