'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PHASES = [
  {
    id:    'see',
    label: 'See it',
    desc:  'The stated problem is rarely the real one. I dig until I understand what is actually happening before I touch anything.',
    color: 'var(--phase-impact-label)',
    bg:    'rgba(180, 160, 224, 0.12)',
    border:'rgba(180, 160, 224, 0.22)',
  },
  {
    id:    'own',
    label: 'Own it',
    desc:  'I figure out my part in it. The win, the miss, the gap. No excuses, no finger pointing. Just ownership.',
    color: 'var(--phase-problem-label)',
    bg:    'rgba(200, 170, 140, 0.12)',
    border:'rgba(200, 170, 140, 0.22)',
  },
  {
    id:    'solve',
    label: 'Solve it',
    desc:  'Explore every angle. The solution has to hold up for the business and the user, not just look good in a prototype.',
    color: 'var(--phase-discovery-label)',
    bg:    'rgba(128, 196, 180, 0.12)',
    border:'rgba(128, 196, 180, 0.22)',
  },
  {
    id:    'do',
    label: 'Do it',
    desc:  'Build it, test it, ship it. If a new gap shows up, the cycle starts again. I keep going until it is right.',
    color: 'var(--phase-solution-label)',
    bg:    'rgba(140, 174, 214, 0.12)',
    border:'rgba(140, 174, 214, 0.22)',
  },
] as const

/* ------------------------------------------------------------------ */
/*  Lifecycle stages — each maps to compass phases                     */
/* ------------------------------------------------------------------ */

const LIFECYCLE = [
  { step: '01', name: 'Discover',  sub: 'Stakeholder interviews, competitive analysis, user research', phases: [0] },
  { step: '02', name: 'Define',    sub: 'Problem framing, personas, journey maps, requirements',       phases: [0, 1] },
  { step: '03', name: 'Ideate',    sub: 'User flows, wireframes, concept exploration',                 phases: [1, 2] },
  { step: '04', name: 'Design',    sub: 'Mocks, prototypes, design systems, interaction design',       phases: [2] },
  { step: '05', name: 'Test',      sub: 'Usability testing, feedback synthesis, iteration',            phases: [2, 3] },
  { step: '06', name: 'Deliver',   sub: 'Dev handoff, QA review, build verification',                  phases: [3] },
] as const

/* ------------------------------------------------------------------ */
/*  Layout — pills on a circle, no overlap                             */
/* ------------------------------------------------------------------ */

const RING_SIZE = 280
const RING_R = RING_SIZE / 2

/* 0° = top, clockwise: top, right, bottom, left */
const ANGLES = [0, 90, 180, 270]

function pillPosition(angleDeg: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  const x = RING_R + RING_R * 0.82 * Math.cos(rad)
  const y = RING_R + RING_R * 0.82 * Math.sin(rad)
  return { x, y }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HowIWork() {
  const [active, setActive] = useState(0)
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const phase = PHASES[active]

  const containerRef = useRef<HTMLDivElement>(null)
  const hasAutoPlayed = useRef(false)
  const isAutoRotating = useRef(false)
  const rotateTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isMounted = useRef(false)

  /* Track mount state to avoid setState during HMR re-render */
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
            // Cycle complete — return to first phase
            rotateTimer.current = setTimeout(() => {
              if (isAutoRotating.current && isMounted.current) {
                setActive(0)
                isAutoRotating.current = false
              }
            }, 1500)
          }
        }
        // Defer to next tick to avoid setState during render
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

  /** Stop auto-rotate when user manually interacts */
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

        {/* Ring */}
        <div
          role="tablist"
          aria-label="Process phases"
          className="flex-shrink-0"
          style={{
            position: 'relative',
            width: `${RING_SIZE}px`,
            height: `${RING_SIZE}px`,
          }}
        >
          {/* Outer compass ring — tick marks at cardinal points */}
          <svg
            viewBox="0 0 280 280"
            width="100%"
            height="100%"
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          >
            {/* Outer ring */}
            <circle cx="140" cy="140" r="112" fill="none" stroke="var(--color-border)" strokeWidth="0.5" opacity="0.2" />
            {/* Inner ring */}
            <circle cx="140" cy="140" r="92" fill="none" stroke="var(--color-border)" strokeWidth="0.5" opacity="0.12" />
            {/* Tick marks at every 45° */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg - 90) * (Math.PI / 180)
              const isMajor = deg % 90 === 0
              const r1 = isMajor ? 88 : 94
              const r2 = 112
              const x1 = 140 + r1 * Math.cos(rad)
              const y1 = 140 + r1 * Math.sin(rad)
              const x2 = 140 + r2 * Math.cos(rad)
              const y2 = 140 + r2 * Math.sin(rad)
              return (
                <line
                  key={deg}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="var(--color-border)"
                  strokeWidth={isMajor ? 1.5 : 0.5}
                  opacity={isMajor ? 0.3 : 0.15}
                />
              )
            })}
          </svg>

          {/* Center glass compass face */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'var(--glass-dark-regular)',
              backdropFilter: 'blur(48px) saturate(180%)',
              WebkitBackdropFilter: 'blur(48px) saturate(180%)',
              border: '0.5px solid var(--glass-border-dark)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.16), inset 0 1px 0 var(--glass-border-subtle)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            {/* Compass needle */}
            <svg
              viewBox="0 0 72 72"
              width="72"
              height="72"
              style={{
                position: 'absolute',
                inset: 0,
                transform: `rotate(${ANGLES[active]}deg)`,
                transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {/* Needle — phase-colored tip pointing at active */}
              <polygon
                points="36,8 39,33 33,33"
                fill={phase.color}
                opacity="0.9"
              />
              {/* Tail — subtle */}
              <polygon
                points="36,64 39,39 33,39"
                fill="var(--color-text-muted)"
                opacity="0.2"
              />
              {/* Center pivot */}
              <circle cx="36" cy="36" r="3.5" fill="none" stroke="var(--color-border-mid)" strokeWidth="1" />
              <circle cx="36" cy="36" r="1.5" fill="var(--color-text-muted)" />
            </svg>
          </div>

          {/* Pills on the ring */}
          {PHASES.map((p, i) => {
            const isActive = active === i
            const pos = pillPosition(ANGLES[i])

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
                  position: 'absolute',
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  transform: `translate(-50%, -50%) scale(${isActive ? 1.06 : 1})`,
                  padding: '10px 20px',
                  borderRadius: '999px',
                  border: isActive
                    ? `1px solid ${p.border}`
                    : '0.5px solid var(--color-border)',
                  background: isActive ? p.bg : 'var(--color-surface)',
                  backdropFilter: isActive ? 'blur(48px) saturate(180%)' : 'none',
                  WebkitBackdropFilter: isActive ? 'blur(48px) saturate(180%)' : 'none',
                  boxShadow: isActive
                    ? '0 4px 20px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.10)'
                    : 'none',
                  color: isActive ? p.color : 'var(--color-text-muted)',
                  fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                  fontSize: '13px',
                  fontWeight: isActive ? 500 : 400,
                  letterSpacing: '0.02em',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
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

        {/* Description — fixed height using grid stack so layout doesn't shift */}
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
          {/* Grid stack — all descriptions occupy the same cell, tallest sets height */}
          <div style={{ display: 'grid' }}>
            {PHASES.map((p, i) => (
              <p
                key={p.id}
                className="text-body text-[var(--color-text-secondary)]"
                style={{
                  gridArea: '1 / 1',
                  opacity: active === i ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                  pointerEvents: active === i ? 'auto' : 'none',
                }}
              >
                {p.desc}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Process timeline — horizontal strip with expandable details */}
      <div style={{ marginTop: 'var(--space-section-sm)' }}>
        <p
          className="text-label text-[var(--color-text-muted)]"
          style={{ marginBottom: 'var(--space-stack-md)' }}
        >
          In practice
        </p>

        {/* Timeline strip */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-component-sm)' }}>
          {/* Step buttons in a row with connecting line */}
          <div style={{ position: 'relative' }}>
            {/* Connecting line behind the steps (desktop only) */}
            <div
              className="hidden md:block"
              style={{
                position: 'absolute',
                top: '50%',
                left: '24px',
                right: '24px',
                height: '1px',
                background: 'var(--color-border)',
                opacity: 0.3,
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            />

            <div
              className="grid grid-cols-3 md:grid-cols-6 gap-[var(--space-component-xs)]"
              style={{ position: 'relative' }}
            >
              {LIFECYCLE.map((item, idx) => {
                const isLit = (item.phases as readonly number[]).includes(active)
                const isExpanded = expandedStep === idx
                const matchPhase = isLit ? PHASES[item.phases.find(p => p === active) ?? item.phases[0]] : null

                // On mobile (3 cols), insert detail panel after each row of 3
                // Row ends at index 2 and 5. On desktop (6 cols), row ends at 5.
                const isEndOfMobileRow = (idx + 1) % 3 === 0
                const showPanelHere = expandedStep !== null &&
                  // Mobile: panel goes after the row containing the expanded step
                  Math.floor(expandedStep / 3) === Math.floor(idx / 3) &&
                  isEndOfMobileRow

                const panelItem = expandedStep !== null ? LIFECYCLE[expandedStep] : null
                const panelPhase = panelItem ? PHASES[panelItem.phases.find(p => p === active) ?? panelItem.phases[0]] : null

                return (
                  <React.Fragment key={item.step}>
                    <button
                      type="button"
                      onClick={() => {
                      stopAutoRotate()
                      if (isExpanded) {
                        setExpandedStep(null)
                      } else {
                        setExpandedStep(idx)
                        // Only move compass if this card is not already lit (grey card)
                        if (!isLit) {
                          const firstPhase = (item.phases as readonly number[])[0]
                          if (firstPhase !== undefined) {
                            setActive(firstPhase)
                          }
                        }
                      }
                    }}
                      className="flex flex-col items-center"
                      style={{
                        gap: '8px',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: isExpanded
                          ? `1px solid ${matchPhase?.border ?? 'var(--color-border)'}`
                          : isLit
                            ? `0.5px solid ${matchPhase?.border ?? 'var(--color-border)'}`
                            : '0.5px solid transparent',
                        background: isExpanded
                          ? matchPhase?.bg ?? 'var(--color-surface)'
                          : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        outline: 'none',
                      }}
                    >
                      <span
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                          fontSize: '9px',
                          fontWeight: 500,
                          letterSpacing: '0.04em',
                          color: isLit ? matchPhase?.color : 'var(--color-text-placeholder)',
                          background: isLit ? matchPhase?.bg : 'var(--color-surface)',
                          border: `0.5px solid ${isLit ? matchPhase?.border ?? 'var(--color-border)' : 'var(--color-border)'}`,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {item.step}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                          fontSize: '12px',
                          fontWeight: isLit ? 500 : 400,
                          color: isLit ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                          transition: 'color 0.3s ease',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.name}
                      </span>
                    </button>

                    {/* Detail panel — spans full row, inserted after the row containing the active step */}
                    {showPanelHere && panelItem && (
                      <div
                        className="col-span-3 md:col-span-6"
                        style={{
                          padding: 'var(--space-component-md)',
                          borderRadius: '10px',
                          border: `0.5px solid ${panelPhase?.border ?? 'var(--color-border)'}`,
                          background: panelPhase?.bg ?? 'var(--color-surface)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                            fontSize: '13px',
                            fontWeight: 300,
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.6,
                          }}
                        >
                          {panelItem.sub}
                        </span>
                      </div>
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
