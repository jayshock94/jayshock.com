'use client'

import { useState } from 'react'

const PHASES = [
  {
    id:          'see',
    label:       'See it',
    title:       'See it',
    description: 'Understand what is actually broken. Not the stated problem. The real one underneath it.',
    glassToken:  'var(--phase-impact-glass)',
    labelToken:  'var(--phase-impact-label)',
    borderToken: 'var(--phase-impact-border)',
  },
  {
    id:          'own',
    label:       'Own it',
    title:       'Own it',
    description: 'Name your part in it. The constraint, the gap, the decision that got you here. No blame, no excuses.',
    glassToken:  'var(--phase-problem-glass)',
    labelToken:  'var(--phase-problem-label)',
    borderToken: 'var(--phase-problem-border)',
  },
  {
    id:          'solve',
    label:       'Solve it',
    title:       'Solve it',
    description: 'Figure out what needs to happen. Business constraints and user reality both in the room. Neither one wins until they resolve into something that serves both.',
    glassToken:  'var(--phase-discovery-glass)',
    labelToken:  'var(--phase-discovery-label)',
    borderToken: 'var(--phase-discovery-border)',
  },
  {
    id:          'do',
    label:       'Do it',
    title:       'Do it',
    description: 'Build it, ship it, hand it off right. Engineers involved from the start, not surprised at the end.',
    glassToken:  'var(--phase-solution-glass)',
    labelToken:  'var(--phase-solution-label)',
    borderToken: 'var(--phase-solution-border)',
  },
] as const

export default function HowIWork() {
  const [active, setActive] = useState(0)
  const phase = PHASES[active]

  return (
    <div>

      {/* Header */}
      <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-xs)]">
        How I work
      </p>
      <h2 className="text-h2 text-[var(--color-ink)] mb-[var(--space-stack-md)]">
        Design gets messy. What matters is what you do next.
      </h2>
      <p
        className="text-body text-[var(--color-text-secondary)] mb-[var(--space-stack-lg)]"
        style={{ maxWidth: '560px' }}
      >
        Requirements change, research points the wrong way, features ship
        that do not work. My process is not about avoiding that. It is about
        what you do when it happens.
      </p>

      {/* Segmented control + phase content */}
      <div>

        {/* Segmented control — glass surface matching nav */}
        <div
          role="tablist"
          aria-label="Process phases"
          className="grid grid-cols-2 md:flex"
          style={{
            gap:                  '3px',
            padding:              '4px',
            background:           'var(--color-nav-card-bg)',
            backdropFilter:       'blur(48px) saturate(180%)',
            WebkitBackdropFilter: 'blur(48px) saturate(180%)',
            border:               '0.5px solid var(--color-nav-card-border)',
            borderRadius:         '20px',
            width:                '100%',
            marginBottom:         'var(--space-stack-lg)',
            boxShadow:            '0 2px 24px rgba(28,25,23,0.06), inset 0 1px 0 var(--glass-border-light)',
          }}
        >
          {PHASES.map((p, i) => {
            const isActive = active === i
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={isActive}
                aria-controls="how-i-work-panel"
                onClick={() => setActive(i)}
                className="md:flex-1"
                style={{
                  padding:              '10px 8px',
                  borderRadius:         '16px',
                  /* Tinted glass — phase color as glass tint (Apple pattern) */
                  background:           isActive ? p.glassToken : 'transparent',
                  backdropFilter:       isActive ? 'blur(40px) saturate(160%)' : 'none',
                  WebkitBackdropFilter: isActive ? 'blur(40px) saturate(160%)' : 'none',
                  border:               isActive
                    ? `0.5px solid ${p.borderToken}`
                    : '0.5px solid transparent',
                  boxShadow:            isActive
                    ? '0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.15)'
                    : 'none',
                  color:                isActive ? p.labelToken : 'var(--color-text-muted)',
                  fontSize:             '13px',
                  fontWeight:           isActive ? 500 : 400,
                  letterSpacing:        '0.02em',
                  cursor:               'pointer',
                  transition:           'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                  whiteSpace:           'nowrap',
                  textAlign:            'center',
                }}
              >
                {p.label}
              </button>
            )
          })}
        </div>

        {/* Phase content */}
        <div
          id="how-i-work-panel"
          role="tabpanel"
          style={{
            borderLeft:  `2.5px solid ${phase.labelToken}`,
            paddingLeft: 'var(--space-component-lg)',
            transition:  'border-color 0.3s ease',
          }}
        >
          <p
            className="text-h3"
            style={{
              color:        phase.labelToken,
              marginBottom: 'var(--space-stack-xs)',
              transition:   'color 0.3s ease',
            }}
          >
            {phase.title}
          </p>
          <p
            className="text-body text-[var(--color-text-secondary)]"
            style={{ transition: 'opacity 0.2s ease' }}
          >
            {phase.description}
          </p>
        </div>

      </div>
    </div>
  )
}
