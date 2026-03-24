'use client'

import { useState } from 'react'

const PHASES = [
  {
    id:          'see',
    label:       'See it',
    title:       'See it',
    description: 'Understand what is actually broken. Not the stated problem. The real one underneath it.',
    bgToken:     'var(--phase-impact-glass)',
    labelToken:  'var(--phase-impact-label)',
    borderToken: 'var(--phase-impact-border)',
  },
  {
    id:          'own',
    label:       'Own it',
    title:       'Own it',
    description: 'Name your part in it. The constraint, the gap, the decision that got you here. No blame, no excuses.',
    bgToken:     'var(--phase-problem-glass)',
    labelToken:  'var(--phase-problem-label)',
    borderToken: 'var(--phase-problem-border)',
  },
  {
    id:          'solve',
    label:       'Solve it',
    title:       'Solve it',
    description: 'Figure out what needs to happen. Business constraints and user reality both in the room. Neither one wins until they resolve into something that serves both.',
    bgToken:     'var(--phase-discovery-glass)',
    labelToken:  'var(--phase-discovery-label)',
    borderToken: 'var(--phase-discovery-border)',
  },
  {
    id:          'do',
    label:       'Do it',
    title:       'Do it',
    description: 'Build it, ship it, hand it off right. Engineers involved from the start, not surprised at the end.',
    bgToken:     'var(--phase-solution-glass)',
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
      <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-sm)] text-center md:text-left">
        How I work
      </p>
      <h2 className="text-h2 text-[var(--color-ink)] mb-[var(--space-stack-md)] text-center md:text-left">
        Design gets messy. What matters is what you do next.
      </h2>
      <p
        className="text-body text-[var(--color-text-secondary)] mb-[var(--space-stack-lg)] text-center md:text-left"
        style={{ maxWidth: '560px' }}
      >
        Requirements change, research points the wrong way, features ship
        that do not work. My process is not about avoiding that. It is about
        what you do when it happens.
      </p>

      {/* Segmented control + phase content */}
      <div>

        {/* Segmented control — full width of column */}
        <div
          role="tablist"
          aria-label="Process phases"
          style={{
            display:      'flex',
            gap:          '3px',
            padding:      '4px',
            background:   'var(--color-surface)',
            border:       '0.5px solid var(--color-border)',
            borderRadius: '40px',
            width:        '100%',
            marginBottom: 'var(--space-stack-lg)',
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
                style={{
                  flex:          1,
                  padding:       '10px 8px',
                  borderRadius:  '36px',
                  border:        isActive ? `0.5px solid ${p.borderToken}` : '0.5px solid transparent',
                  background:    isActive ? p.bgToken : 'transparent',
                  color:         isActive ? p.labelToken : 'var(--color-text-muted)',
                  fontFamily:    'var(--font-outfit), system-ui, sans-serif',
                  fontSize:      '13px',
                  fontWeight:    isActive ? 600 : 400,
                  letterSpacing: '0.01em',
                  cursor:        'pointer',
                  transition:    'background 0.22s ease, color 0.22s ease, border-color 0.22s ease',
                  whiteSpace:    'nowrap',
                  textAlign:     'center',
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
            paddingLeft: '20px',
            transition:  'border-color 0.3s ease',
          }}
        >
          <p
            className="text-h2"
            style={{
              color:        phase.labelToken,
              marginBottom: '12px',
              transition:   'color 0.3s ease',
            }}
          >
            {phase.title}
          </p>
          <p
            className="text-body-lg text-[var(--color-text-secondary)]"
            style={{ transition: 'opacity 0.2s ease' }}
          >
            {phase.description}
          </p>
        </div>

      </div>
    </div>
  )
}

