'use client'

import { useState, useCallback } from 'react'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PHASES = [
  {
    id:      'see',
    label:   'See it',
    title:   'Understand what is actually happening',
    desc:    'The stated problem is rarely the real one. I dig until I understand what is actually happening before I touch anything.',
    tabBg:   'var(--phase-impact-tab)',
    cardBg:  'var(--phase-impact-card)',
    accent:  'var(--phase-impact-extended)',
  },
  {
    id:      'own',
    label:   'Own it',
    title:   'Take responsibility for the outcome',
    desc:    'I figure out my part in it. The win, the miss, the gap. No excuses, no finger pointing. Just ownership.',
    tabBg:   'var(--phase-problem-tab)',
    cardBg:  'var(--phase-problem-card)',
    accent:  'var(--phase-problem-extended)',
  },
  {
    id:      'solve',
    label:   'Solve it',
    title:   'Find the answer that holds up',
    desc:    'Explore every angle. The solution has to hold up for the business and the user, not just look good in a prototype.',
    tabBg:   'var(--phase-discovery-tab)',
    cardBg:  'var(--phase-discovery-card)',
    accent:  'var(--phase-discovery-extended)',
  },
  {
    id:      'do',
    label:   'Do it',
    title:   'Ship it and keep going',
    desc:    'Build it, test it, ship it. If a new gap shows up, the cycle starts again. I keep going until it is right.',
    tabBg:   'var(--phase-solution-tab)',
    cardBg:  'var(--phase-solution-card)',
    accent:  'var(--phase-solution-extended)',
  },
] as const

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HowIWork() {
  const [active, setActive] = useState(0)
  const phase = PHASES[active]

  const handleKey = useCallback((e: React.KeyboardEvent, i: number) => {
    const n = PHASES.length
    let next = i
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % n
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + n) % n
    else return
    e.preventDefault()
    setActive(next)
  }, [])

  return (
    <div className="flex flex-col gap-[var(--space-stack-md)]">

      {/* Heading + subtitle */}
      <div className="flex flex-col gap-[var(--space-stack-sm)]">
        <h2
          className="text-h1"
          style={{ color: 'var(--color-ink)' }}
        >
          No matter the project.
        </h2>
        <p className="text-body-lg text-[var(--color-text-secondary)] text-center md:text-left" style={{ maxWidth: '700px' }}>
          Scopes change, problems arise, constraints shift. This is how I handle it.
        </p>
      </div>

      {/* Segment control + content card */}
      <div className="flex flex-col gap-[var(--space-component-md)]">

        {/* ── M3 Standard button group ── */}
        <div
          role="tablist"
          aria-label="Process phases"
          className="how-i-work-tabs segment-group"
        >
          {PHASES.map((p, i) => {
            const isActive = active === i
            return (
              <button
                key={p.id}
                role="tab"
                id={`tab-${p.id}`}
                className="segment-tab"
                aria-selected={isActive}
                aria-controls="how-i-work-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => handleKey(e, i)}
                style={{
                  backgroundImage:      isActive ? `linear-gradient(${p.tabBg}, ${p.tabBg})` : 'none',
                  backgroundColor:      isActive ? 'rgba(22, 22, 22, 0.50)' : 'transparent',
                  backdropFilter:       isActive ? 'blur(48px) saturate(180%)' : 'none',
                  WebkitBackdropFilter: isActive ? 'blur(48px) saturate(180%)' : 'none',
                  boxShadow:            isActive ? '0 4px 16px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.50)' : 'none',
                  color:                isActive ? p.accent : 'var(--color-text-secondary)',
                }}
              >
                {p.label}
              </button>
            )
          })}
        </div>

        {/* ── Content card ── */}
        <div
          id="how-i-work-panel"
          role="tabpanel"
          aria-labelledby={`tab-${phase.id}`}
          style={{
            padding:            '20px 24px',
            borderRadius:       '12px',
            border:             '1px solid var(--color-border-subtle-16)',
            background:         phase.cardBg,
            backdropFilter:     'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            transition:         'background 0.3s ease',
          }}
        >
          {/* Grid stack — all panels share one cell; tallest sets the height */}
          <div style={{ display: 'grid' }}>
            {PHASES.map((p, i) => (
              <div
                key={p.id}
                style={{
                  gridArea:    '1 / 1',
                  display:     'flex',
                  flexDirection: 'column',
                  gap:         'var(--space-stack-xs)',
                  opacity:     active === i ? 1 : 0,
                  transition:  'opacity 0.2s ease',
                  pointerEvents: active === i ? 'auto' : 'none',
                }}
              >
                {/* Card title — uses extended (brighter) phase accent */}
                <p
                  style={{
                    fontFamily:    'var(--font-outfit), system-ui, sans-serif',
                    fontSize:      'var(--text-body-lg-size)',
                    fontWeight:    500,
                    lineHeight:    '24px',
                    letterSpacing: '0.15px',
                    color:         p.accent,
                    margin:        0,
                  }}
                >
                  {p.title}
                </p>

                {/* Card body */}
                <p
                  style={{
                    fontFamily:    'var(--font-outfit), system-ui, sans-serif',
                    fontSize:      'var(--text-body-size)',
                    fontWeight:    400,
                    lineHeight:    '20px',
                    letterSpacing: '0.25px',
                    color:         'var(--color-text-secondary)',
                    margin:        0,
                  }}
                >
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
