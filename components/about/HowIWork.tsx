'use client'

import { useState, useCallback } from 'react'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PHASES = [
  {
    id:    'see',
    label: 'See it',
    desc:  'Understand what the project actually is. The scope, the goals, the real problem underneath the stated one. I dig deeper here because what people think is broken usually isn\'t the whole story.',
    color: 'var(--phase-impact-label)',
    bg:    'rgba(180, 160, 224, 0.12)',
    border:'rgba(180, 160, 224, 0.22)',
  },
  {
    id:    'own',
    label: 'Own it',
    desc:  'What is my role? Am I the product designer, the UX designer, a mix? Whatever it is, I own it. I own my part in making sure the project succeeds and the goals of the company, the client, and the user are met.',
    color: 'var(--phase-problem-label)',
    bg:    'rgba(200, 170, 140, 0.12)',
    border:'rgba(200, 170, 140, 0.22)',
  },
  {
    id:    'solve',
    label: 'Solve it',
    desc:  'Do the research. Discovery, user flows, empathy maps, personas, wireframes, testing. This is where I solve the problem or identify the roadmap to achieve the goal.',
    color: 'var(--phase-discovery-label)',
    bg:    'rgba(128, 196, 180, 0.12)',
    border:'rgba(128, 196, 180, 0.22)',
  },
  {
    id:    'do',
    label: 'Do it',
    desc:  'Mocks, prototypes, user testing. The problem is solved, so now I go and do it. Sometimes that means I find a new gap, and the cycle starts again. I keep going until it is complete and ready to hand off.',
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

  const handleKey = useCallback((e: React.KeyboardEvent, i: number) => {
    const n = PHASES.length
    let next = i
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % n
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + n) % n
    else return
    e.preventDefault()
    setActive(next)
  }, [])

  /* Pill positions — tighter circle, pills sit closer together */
  const positions = [
    { top: '0',    left: '50%',  tx: '-50%', ty: '0'    },
    { top: '50%',  left: '100%', tx: '-100%',ty: '-50%' },
    { top: '100%', left: '50%',  tx: '-50%', ty: '-100%'},
    { top: '50%',  left: '0',    tx: '0',    ty: '-50%' },
  ]

  return (
    <div>
      {/* Header */}
      <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-xs)]">
        How I work
      </p>
      <h2 className="text-h2 text-[var(--color-ink)] mb-[var(--space-stack-sm)]">
        No matter the project.
      </h2>
      <p
        className="text-body text-[var(--color-text-secondary)] mb-[var(--space-stack-lg)]"
        style={{ maxWidth: 'var(--space-content-max)' }}
      >
        Whether it is a full product redesign or a single flow. Scopes change,
        problems arise, constraints shift. This is how I handle it.
      </p>

      {/* Ring + description */}
      <div className="flex flex-col items-center gap-[var(--space-component-lg)] md:flex-row md:items-center md:justify-start md:gap-[var(--space-7)]">

        {/* Circle with pills — compact */}
        <div
          role="tablist"
          aria-label="Process phases"
          className="flex-shrink-0"
          style={{
            position: 'relative',
            width: '260px',
            height: '260px',
          }}
        >
          {/* Subtle connecting ring */}
          <div
            style={{
              position: 'absolute',
              top: '18%',
              left: '18%',
              width: '64%',
              height: '64%',
              borderRadius: '50%',
              border: '0.5px solid var(--color-border)',
              opacity: 0.3,
            }}
          />

          {/* Center label */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            <span
              className="text-h3"
              style={{
                color: phase.color,
                transition: 'color 0.3s ease',
              }}
            >
              {phase.label}
            </span>
          </div>

          {/* 4 pills */}
          {PHASES.map((p, i) => {
            const isActive = active === i
            const pos = positions[i]

            return (
              <button
                key={p.id}
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={isActive}
                aria-controls="how-i-work-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => handleKey(e, i)}
                className={isActive ? 'glass-pill' : ''}
                style={{
                  position: 'absolute',
                  top: pos.top,
                  left: pos.left,
                  transform: `translate(${pos.tx}, ${pos.ty})`,
                  padding: 'var(--space-component-sm) var(--space-component-md)',
                  borderRadius: '999px',
                  border: isActive
                    ? `0.5px solid ${p.border}`
                    : '0.5px solid var(--color-border)',
                  background: isActive ? p.bg : 'var(--color-surface)',
                  backdropFilter: isActive ? 'blur(48px) saturate(180%)' : 'none',
                  WebkitBackdropFilter: isActive ? 'blur(48px) saturate(180%)' : 'none',
                  boxShadow: isActive
                    ? '0 2px 16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.08)'
                    : 'none',
                  color: isActive ? p.color : 'var(--color-text-muted)',
                  fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                  fontSize: '13px',
                  fontWeight: isActive ? 500 : 400,
                  letterSpacing: '0.02em',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  whiteSpace: 'nowrap',
                  zIndex: isActive ? 3 : 1,
                  outline: 'none',
                }}
              >
                {p.label}
              </button>
            )
          })}
        </div>

        {/* Description */}
        <div
          id="how-i-work-panel"
          role="tabpanel"
          aria-labelledby={`tab-${phase.id}`}
          className="w-full md:flex-1 md:max-w-[420px]"
          style={{
            borderLeft: `2.5px solid ${phase.color}`,
            paddingLeft: 'var(--space-component-lg)',
            transition: 'border-color 0.3s ease',
          }}
        >
          <p className="text-body text-[var(--color-text-secondary)]">
            {phase.desc}
          </p>
        </div>
      </div>
    </div>
  )
}
