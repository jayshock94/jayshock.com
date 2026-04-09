'use client'

/**
 * AIM Case Study — Loan Management Platform
 * Figma source: node 60886:1140 (Material-3-Design-Kit community file)
 *
 * This static route overrides /work/[slug] for the AIM case study.
 * All colors reference CSS custom property tokens — no hardcoded hex/rgb.
 * All typography uses token vars for size, line-height, and tracking.
 */

import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import Image from 'next/image'
import aim from '@/data/case-studies/aim'

// ─── Helpers ──────────────────────────────────────────────────────────────
/** Extract .text from a paragraph/subheader ContentBlock (narrows union) */
function blockText(block: import('@/data/types').ContentBlock): string {
  return 'text' in block ? block.text : ''
}

// ─── Image assets ──────────────────────────────────────────────────────────
const IMG_APP_ICON    = '/images/AIM/aim-app-icon.png'
const IMG_CIM_1       = '/images/AIM/cim-legacy-1.png'
const IMG_CIM_2       = '/images/AIM/cim-legacy-2.png'
const IMG_CIM_3       = '/images/AIM/cim-legacy-3.png'
const IMG_AI_SUMMARY  = '/images/AIM/ai summary 2.png'

// ─── Research method cards (Identify it tab) ─────────────────────────────
const RESEARCH_METHODS = [
  {
    number: '01',
    title: 'User interviews',
    description:
      'Interviewed financial leads, branch managers, branch reps and POs across multiple products to understand the full lending ecosystem.',
    image: '/images/AIM/research-user-interviews.png',
    caption: 'Figjam Screenshot of actual research outputs from user interviews',
  },
  {
    number: '02',
    title: 'Workflow mapping',
    description:
      'Documented every tool, spreadsheet, and sticky-note system that lenders used to fill the gaps in existing products.',
    image: '/images/AIM/research-workflow-mapping.png',
    caption: 'Figjam Screenshot of actual research outputs from workflow mapping',
  },
  {
    number: '04',
    title: 'Competitive analysis',
    description:
      'Studied how competitors and adjacent fintech tools approached the same problems. Identified patterns in what the market had already solved and where the gaps still were.',
    image: '/images/AIM/research-competitive-analysis.png',
    caption: 'Figjam Screenshot of actual competitive analysis',
  },
] as const

// ─── "What was broken" cards (Identify it tab) ───────────────────────────
const BROKEN_ITEMS = [
  {
    title: 'Five or more tabs open at all times',
    description:
      'Lenders managed loans across separate tools, spreadsheets, and browser tabs. Context was scattered. Errors compounded.',
  },
  {
    title: 'Cross-team handoffs broke constantly',
    description:
      'Different teams used different products for each phase of the loan process. Handing work from one team to the next meant switching systems and losing context.',
  },
  {
    title: 'Managing the queue was a job before the job',
    description:
      'Branch managers came in early just to figure out who should work on what. Queue management was manual. Every morning.',
  },
  {
    title: 'Powerful on paper. Outdated in practice.',
    description:
      'Built to do everything. Painful to learn. Impossible to love.',
  },
] as const

// ─── Types ─────────────────────────────────────────────────────────────────
type ProcessTab = 'identify-it' | 'face-it' | 'solve-it' | 'prove-it'

const TABS: { id: ProcessTab; label: string }[] = [
  { id: 'identify-it', label: 'Identify it' },
  { id: 'face-it',     label: 'Face it'     },
  { id: 'solve-it',    label: 'Solve it'    },
  { id: 'prove-it',    label: 'Prove it'    },
]

/** Phase token mapping — drives tab pill color, text color, and section background per tab */
const PHASE_MAP: Record<ProcessTab, {
  tab: string
  extended: string
  glass: string
  bg: string
  hover: string
}> = {
  'identify-it': { tab: 'var(--phase-impact-tab)',    extended: 'var(--phase-impact-extended)',    glass: 'var(--phase-impact-glass)',    bg: 'var(--phase-impact-bg)',    hover: 'rgba(209,188,254,0.08)' },
  'face-it':     { tab: 'var(--phase-problem-tab)',   extended: 'var(--phase-problem-extended)',   glass: 'var(--phase-problem-glass)',   bg: 'var(--phase-problem-bg)',   hover: 'rgba(229,195,153,0.08)' },
  'solve-it':    { tab: 'var(--phase-discovery-tab)', extended: 'var(--phase-discovery-extended)', glass: 'var(--phase-discovery-glass)', bg: 'var(--phase-discovery-bg)', hover: 'rgba(34,105,92,0.25)'   },
  'prove-it':    { tab: 'var(--phase-solution-tab)',  extended: 'var(--phase-solution-extended)',  glass: 'var(--phase-solution-glass)',  bg: 'var(--phase-solution-bg)',  hover: 'rgba(162,202,248,0.08)' },
}

// ─── Shared sub-components ─────────────────────────────────────────────────

/** Radial-gradient horizontal rule between major sections */
function SectionDivider() {
  return (
    <div className="mx-auto max-w-[var(--space-layout-max)] px-[calc(var(--space-page-margin)+16px)]">
      <div
        className="h-px w-full"
        style={{
          background:
            'radial-gradient(ellipse 70% 100% at center, var(--color-border-mid) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}

/** 104 × 104 rounded app icon frame — matches Figma node 60891:924 */
function IconFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative shrink-0 rounded-[18px] border border-[var(--work-card-border)] p-px overflow-clip"
      style={{
        width: 104,
        height: 104,
        background: 'var(--color-canvas)',
        boxShadow:
          'inset 0px 1px 0px 1px rgba(255,255,255,0.04), inset 0px -1px 0px 1px rgba(255,255,255,0.02)',
      }}
    >
      {/* Radial gradient overlay from bottom — creates inner shadow depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[18px]"
        style={{
          background:
            'radial-gradient(ellipse 100% 50% at 50% 100%, var(--aim-icon-shadow) 0%, transparent 65%)',
        }}
      />
      {/* Impact-phase purple accent line at bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 h-[2px] rounded-[1px] opacity-40"
        style={{
          left: 'calc(15.67% - 0.69px)',
          right: 'calc(15.66% - 0.69px)',
          background:
            'linear-gradient(90deg, transparent 0%, var(--phase-impact-label) 50%, transparent 100%)',
        }}
      />
      {/* Image — 102px inside 1px padding */}
      <img
        src={src}
        alt={alt}
        className="relative h-full w-full rounded-[17px] object-cover"
      />
    </div>
  )
}

/** "What was broken" tinted list card */
/** Numbered research method card — "Identify it" tab */
function ResearchMethodCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="flex flex-1 min-w-0 flex-col gap-[var(--space-component-base)]">
      {/* Number label with accent bottom border */}
      <div
        className="pb-2"
        style={{ borderBottom: '2px solid var(--phase-impact-extended)' }}
      >
        <p
          className="font-semibold"
          style={{
            fontSize: 'var(--text-ui-sm-size)',
            lineHeight: 'var(--text-ui-sm-line-height)',
            letterSpacing: 'var(--text-ui-sm-tracking)',
            color: 'var(--phase-impact-extended)',
          }}
        >
          {number}
        </p>
      </div>
      {/* Title */}
      <p
        className="font-medium text-[var(--color-ink)]"
        style={{
          fontSize: 'var(--text-h3-size)',
          lineHeight: 'var(--text-h3-line-height)',
        }}
      >
        {title}
      </p>
      {/* Description */}
      <p
        className="font-normal text-[var(--color-text-secondary)]"
        style={{
          fontSize: 'var(--text-body-md-size)',
          lineHeight: 'var(--text-body-md-line-height)',
          letterSpacing: 'var(--text-body-md-tracking)',
        }}
      >
        {description}
      </p>
    </div>
  )
}

/** Phase-tinted "What was broken" card */
function BrokenCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div
      className="flex flex-1 min-w-0 flex-col rounded-[4px]"
      style={{
        background: 'var(--phase-impact-card)',
        border: '1px solid var(--color-border-subtle-16)',
        padding: 'var(--space-component-md)',
      }}
    >
      <p
        className="font-normal text-[var(--color-ink)]"
        style={{
          fontSize: 'var(--text-body-md-size)',
          lineHeight: 'var(--text-body-md-line-height)',
          letterSpacing: 'var(--text-body-md-tracking)',
        }}
      >
        {title}
      </p>
      <p
        className="font-normal text-[var(--color-text-muted)]"
        style={{
          fontSize: 'var(--text-body-size)',
          lineHeight: 'var(--text-body-line-height)',
          letterSpacing: 'var(--text-body-tracking)',
        }}
      >
        {description}
      </p>
    </div>
  )
}

/** Numbered take-away card */
function TakeawayCard({
  number,
  title,
  body,
}: {
  number: string
  title: string
  body: string
}) {
  return (
    <div
      className="flex flex-1 flex-col gap-[var(--space-component-base)] overflow-hidden rounded-[8px] border border-[var(--color-border)] p-[var(--space-component-lg)]"
      style={{ background: 'var(--color-surface)' }}
    >
      <p
        className="shrink-0 font-medium text-[var(--color-text-muted)]"
        style={{
          fontSize: 'var(--text-body-size)',
          lineHeight: 'var(--text-body-line-height)',
        }}
      >
        {number}
      </p>
      <p
        className="shrink-0 font-normal text-[var(--color-ink)] whitespace-pre-line"
        style={{
          fontSize: 'var(--text-intro-size)',
          lineHeight: 'var(--text-intro-line-height)',
        }}
      >
        {title}
      </p>
      <p
        className="overflow-hidden font-normal text-[var(--color-text-secondary)] whitespace-pre-wrap"
        style={{
          fontSize: 'var(--text-body-size)',
          lineHeight: 'var(--text-body-line-height)',
          letterSpacing: 'var(--text-body-tracking)',
        }}
      >
        {body}
      </p>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function AimPage() {
  const [activeTab, setActiveTab] = useState<ProcessTab>('identify-it')
  const [hoveredTab, setHoveredTab] = useState<ProcessTab | null>(null)

  // ── Sticky tab dock state ────────────────────────────────────────────────
  const [docked, setDocked]               = useState(false)
  // Both measured synchronously (useLayoutEffect) so CSS transitions run in both directions
  const [naturalHeight, setNaturalHeight] = useState<number | undefined>(undefined)
  const [undockedWidth, setUndockedWidth] = useState<number | undefined>(undefined)
  // Only expand tab bar width on desktop (≥768px)
  const [isDesktop, setIsDesktop]         = useState(false)
  const tabRowRef    = useRef<HTMLDivElement>(null)
  // Per-tab scroll offset (relative to container top) so returning to a tab restores position
  const tabScrollOffsets = useRef<Partial<Record<ProcessTab, number>>>({})
  // containerRef  → inner div.flex.flex-col (tabs + content) — DOCK detection (.top)
  // exitSentinel  → zero-height div placed immediately before the SectionDivider — EXIT detection (.top)
  const containerRef  = useRef<HTMLDivElement>(null)
  const exitSentinel  = useRef<HTMLDivElement>(null)

  // Measure natural size before first paint so explicit px→px transitions work.
  // Re-measure on resize because switching between mobile/desktop can leave stale 0-width values.
  useLayoutEffect(() => {
    function measure() {
      const el = tabRowRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      // Only update if the element is actually visible (display:none → 0)
      if (rect.width > 0) {
        setUndockedWidth(Math.round(rect.width))
      }
      if (rect.height > 0) {
        setNaturalHeight(Math.round(rect.height))
      }
      setIsDesktop(window.innerWidth >= 768)
    }

    measure()

    function onResize() {
      setIsDesktop(window.innerWidth >= 768)
      // Re-measure after layout settles (hidden→block transition)
      requestAnimationFrame(measure)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const DOCKED_HEIGHT = 70

    function update() {
      // Sticky top: mobile 80px, desktop 108px (matches Tailwind top-[80px] md:top-[108px])
      const NAV_OFFSET = window.innerWidth >= 768 ? 108 : 80
      const c = containerRef.current?.getBoundingClientRect()
      const e = exitSentinel.current?.getBoundingClientRect()
      if (!c || !e) return

      // DOCK: container top has scrolled up to the sticky threshold
      const past = c.top <= NAV_OFFSET

      // EXIT: the sentinel (placed directly before the SectionDivider line) reaches
      // the bottom edge of the docked bar. Direct measurement — no padding offset error.
      const exiting = e.top <= NAV_OFFSET + DOCKED_HEIGHT

      setDocked(past && !exiting)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <>
        {/* ══════════════════════════════════════════════════════════
            HERO — Brand navy banner with composite interface image
        ══════════════════════════════════════════════════════════ */}
        <section className="w-full bg-[var(--aim-hero-bg)]">
          <div
            className="mx-auto flex items-center justify-center py-12 md:py-20"
            style={{
              maxWidth: 'var(--space-layout-max)',
              paddingLeft: 'var(--space-page-margin)',
              paddingRight: 'var(--space-page-margin)',
            }}
          >
            <div className="w-full max-w-[978px]">
              <img
                src="/images/aim case study hero.png"
                alt="AIM loan management platform — customer dashboard with loan list, task queue, and quick actions"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            CASE STUDY INFO — Icon · title · overview / goal / role
        ══════════════════════════════════════════════════════════ */}
        <section className="w-full">
          <div
            className="mx-auto"
            style={{
              maxWidth: 'calc(var(--space-content-max) + var(--space-page-margin) * 2)',
              padding: 'var(--space-section-xl) var(--space-page-margin)',
            }}
          >
            {/* Icon + title — 80px gap below before overview/goal/role */}
            <div className="mb-[var(--space-section-xl)] flex flex-col items-center gap-[var(--space-component-lg)]">
              <IconFrame src={IMG_APP_ICON} alt="AIM loan management platform" />
              <h1
                className="text-center font-normal text-[var(--color-ink)]"
                style={{
                  fontSize: 'var(--text-display-size)',
                  lineHeight: 'var(--text-display-line-height)',
                }}
              >
                Designing AIM
                <br />
                A Loan Management Platform
              </h1>
            </div>

            {/* Two-column: overview + goal left, role right */}
            <div className="flex flex-col md:flex-row gap-[var(--space-stack-lg)] md:gap-[var(--space-7)]">
              {/* Left */}
              <div className="flex flex-1 flex-col gap-[var(--space-stack-lg)]">
                <div className="flex flex-col gap-[var(--space-component-md)]">
                  <h3
                    className="shrink-0 whitespace-nowrap font-medium text-[var(--color-text-secondary)]"
                    style={{
                      fontSize: 'var(--text-h3-size)',
                      lineHeight: 'var(--text-h3-line-height)',
                    }}
                  >
                    Overview
                  </h3>
                  <p
                    className="font-normal text-[var(--color-ink)]"
                    style={{
                      fontSize: 'var(--text-body-md-size)',
                      lineHeight: 'var(--text-body-md-line-height)',
                      letterSpacing: 'var(--text-body-md-tracking)',
                    }}
                  >
                    {aim.context}
                  </p>
                </div>

                <div className="flex flex-col gap-[var(--space-component-md)]">
                  <h3
                    className="shrink-0 whitespace-nowrap font-medium text-[var(--color-text-secondary)]"
                    style={{
                      fontSize: 'var(--text-h3-size)',
                      lineHeight: 'var(--text-h3-line-height)',
                    }}
                  >
                    Goal
                  </h3>
                  <p
                    className="font-normal text-[var(--color-ink)]"
                    style={{
                      fontSize: 'var(--text-body-md-size)',
                      lineHeight: 'var(--text-body-md-line-height)',
                      letterSpacing: 'var(--text-body-md-tracking)',
                    }}
                  >
                    {aim.goal}
                  </p>
                </div>
              </div>

              {/* Right: Role */}
              <div className="flex shrink-0 flex-col gap-[var(--space-component-md)] md:whitespace-nowrap md:pt-[var(--space-component-sm)]">
                <p
                  className="font-medium text-[var(--color-text-secondary)]"
                  style={{
                    fontSize: 'var(--text-body-md-size)',
                    lineHeight: 'var(--text-body-md-line-height)',
                    letterSpacing: '0.15px',
                  }}
                >
                  Role
                </p>
                <p
                  className="font-semibold text-[var(--color-ink)]"
                  style={{
                    fontSize: 'var(--text-body-md-size)',
                    lineHeight: 'var(--text-body-md-line-height)',
                    letterSpacing: '0.15px',
                  }}
                >
                  {aim.role}
                </p>
                <p
                  className="font-normal text-[var(--color-text-secondary)]"
                  style={{
                    fontSize: 'var(--text-body-size)',
                    lineHeight: 'var(--text-body-line-height)',
                    letterSpacing: 'var(--text-body-tracking)',
                  }}
                >
                  {aim.skills}
                </p>
                <p
                  className="font-medium text-[var(--color-text-secondary)]"
                  style={{
                    fontSize: 'var(--text-label-size)',
                    lineHeight: 'var(--text-label-line-height)',
                    letterSpacing: 'var(--text-label-tracking)',
                  }}
                >
                  {aim.yearDisplay}
                </p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ══════════════════════════════════════════════════════════
            DESIGN PROCESS — Segment tabs + phase content
        ══════════════════════════════════════════════════════════ */}
        <section
          className="w-full"
          style={{
            background: PHASE_MAP[activeTab].glass,
            transition: 'background var(--transition-smooth)',
          }}
        >
          <div
            className="mx-auto flex flex-col gap-[var(--space-section-xl)]"
            style={{
              maxWidth: 'calc(var(--space-content-max) + var(--space-page-margin) * 2)',
              padding: 'var(--space-section-xl) var(--space-page-margin)',
            }}
          >
            <h2
              className="w-full text-center font-medium text-[var(--color-ink)]"
              style={{
                fontSize: 'var(--text-display-size)',
                lineHeight: 'var(--text-display-line-height)',
              }}
            >
              Design process
            </h2>

            <div ref={containerRef} className="flex flex-col gap-[var(--space-section-xl)]">
              {/* Segment tabs — sticky below nav; exits when container bottom passes.
                 Desktop and mobile are separate renders to avoid responsive conflicts. */}
              <div
                className="sticky z-10 relative top-[80px] md:top-[108px]"
              >
                {/* ── DESKTOP tab bar ── */}
                <div
                  className="hidden md:block relative"
                  style={(() => {
                    const w = undockedWidth || undefined // fallback to auto if 0
                    const expand = docked && w
                    const overflow = expand ? (1000 - (w as number)) / 2 : 0
                    return {
                      width: expand ? 1000 : w,
                      marginLeft: -overflow,
                      marginRight: -overflow,
                      transition: 'width var(--transition-smooth), margin var(--transition-smooth)',
                    }
                  })()}
                >
                  <div
                    ref={tabRowRef}
                    className="flex w-full items-center gap-2 overflow-hidden rounded-full"
                    style={{
                      background: 'var(--color-surface-elevated)',
                      height: docked ? 70 : naturalHeight,
                      transition: 'height var(--transition-smooth)',
                    }}
                  >
                    {TABS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          if (tab.id === activeTab) return
                          const container = containerRef.current
                          if (container) {
                            const containerTop = container.getBoundingClientRect().top + window.scrollY
                            tabScrollOffsets.current[activeTab] = window.scrollY - containerTop
                          }
                          setActiveTab(tab.id)
                          requestAnimationFrame(() => {
                            const el = containerRef.current
                            if (!el) return
                            const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 100
                            const containerTop = el.getBoundingClientRect().top + window.scrollY
                            const saved = tabScrollOffsets.current[tab.id]
                            const top = saved != null ? containerTop + saved : containerTop - navH
                            window.scrollTo({ top, behavior: 'instant' })
                          })
                        }}
                        onMouseEnter={() => setHoveredTab(tab.id)}
                        onMouseLeave={() => setHoveredTab(null)}
                        className="min-w-0 flex-1 h-full cursor-pointer"
                      >
                        {activeTab === tab.id ? (
                          <div
                            className="flex h-full items-center justify-center rounded-full"
                            style={{
                              backgroundImage: `linear-gradient(${PHASE_MAP[activeTab].tab}, ${PHASE_MAP[activeTab].tab})`,
                              backgroundColor: 'var(--glass-dark-thick)',
                              backdropFilter: 'blur(48px) saturate(180%)',
                              boxShadow: '0px 4px 16px var(--shadow-surface-color), inset 0px 1px 0px var(--glass-border-light)',
                            }}
                          >
                            <span
                              className="flex items-center justify-center px-6 py-4 font-medium whitespace-nowrap"
                              style={{
                                color: PHASE_MAP[activeTab].extended,
                                fontSize: 'var(--text-body-md-size)',
                                lineHeight: 'var(--text-body-md-line-height)',
                                letterSpacing: '0.15px',
                              }}
                            >
                              {tab.label}
                            </span>
                          </div>
                        ) : (
                          <span
                            className="flex h-full w-full items-center justify-center rounded-full font-medium whitespace-nowrap text-[var(--color-text-secondary)]"
                            style={{
                              paddingLeft: '12px',
                              paddingRight: '12px',
                              fontSize: 'var(--text-ui-md-size)',
                              lineHeight: 'var(--text-ui-md-line-height)',
                              letterSpacing: 'var(--text-ui-md-tracking)',
                              backgroundColor: hoveredTab === tab.id ? PHASE_MAP[tab.id].hover : 'transparent',
                              transition: 'background-color 150ms ease',
                            }}
                          >
                            {tab.label}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  {/* Desktop blocker — hugs tab bar width */}
                  {docked && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute left-0 right-0"
                      style={{ bottom: 0, height: '100vh', background: PHASE_MAP[activeTab].bg, transition: 'background var(--transition-smooth)', zIndex: -1 }}
                    />
                  )}
                </div>

                {/* ── MOBILE tab bar ── */}
                <div
                  className="md:hidden"
                  style={{
                    ...(docked ? {
                      position: 'fixed' as const,
                      top: 80,
                      left: 0,
                      width: '100vw',
                      zIndex: 10,
                    } : {
                      width: '100%',
                    }),
                    transition: 'width 0.3s, margin 0.3s',
                  }}
                >
                  <div
                    className="flex w-full items-center gap-1"
                    style={{
                      background: 'var(--color-surface-elevated)',
                      height: docked ? 72 : 56,
                      borderRadius: docked ? 0 : '9999px',
                      overflow: docked ? 'visible' : 'hidden',
                      paddingTop: docked ? 8 : 0,
                      paddingBottom: docked ? 8 : 0,
                      paddingLeft: docked ? 'var(--space-page-margin)' : 0,
                      paddingRight: docked ? 'var(--space-page-margin)' : 0,
                      transition: 'height 0.3s, padding 0.3s, border-radius 0.3s',
                    }}
                  >
                    {TABS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          if (tab.id === activeTab) return
                          const wasDocked = docked
                          setActiveTab(tab.id)
                          if (!wasDocked) {
                            // Not docked — scroll to dock the tab bar
                            requestAnimationFrame(() => {
                              const el = containerRef.current
                              if (!el) return
                              const containerTop = el.getBoundingClientRect().top + window.scrollY
                              window.scrollTo({ top: containerTop - 80, behavior: 'instant' })
                            })
                          }
                          // When docked, don't scroll — content swaps in place below fixed bar
                        }}
                        className="min-w-0 flex-1 h-full cursor-pointer"
                      >
                        {activeTab === tab.id ? (
                          <div
                            className="flex h-full items-center justify-center rounded-full"
                            style={{
                              backgroundImage: `linear-gradient(${PHASE_MAP[activeTab].tab}, ${PHASE_MAP[activeTab].tab})`,
                              backgroundColor: 'var(--glass-dark-thick)',
                              backdropFilter: 'blur(48px) saturate(180%)',
                              boxShadow: '0px 4px 16px var(--shadow-surface-color), inset 0px 1px 0px var(--glass-border-light)',
                            }}
                          >
                            <span
                              className="font-medium whitespace-nowrap"
                              style={{
                                color: PHASE_MAP[activeTab].extended,
                                fontSize: 'var(--text-ui-md-size)',
                                lineHeight: 'var(--text-ui-md-line-height)',
                                letterSpacing: '0.15px',
                              }}
                            >
                              {tab.label}
                            </span>
                          </div>
                        ) : (
                          <span
                            className="flex w-full items-center justify-center rounded-full font-medium whitespace-nowrap text-[var(--color-text-secondary)]"
                            style={{
                              fontSize: 'var(--text-ui-md-size)',
                              lineHeight: 'var(--text-ui-md-line-height)',
                              letterSpacing: 'var(--text-ui-md-tracking)',
                            }}
                          >
                            {tab.label}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  {/* Mobile blocker — full-bleed */}
                  {docked && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute"
                      style={{ bottom: 0, height: '100vh', left: '-50vw', right: '-50vw', background: PHASE_MAP[activeTab].bg, transition: 'background var(--transition-smooth)', zIndex: -1 }}
                    />
                  )}
                </div>
                {/* Spacer — when mobile bar goes fixed, this reserves its height in the flow */}
                {docked && <div className="md:hidden" style={{ height: 72 }} />}
              </div>{/* end sticky wrapper */}

              {/* ── "Identify it" tab content ── */}
              {activeTab === 'identify-it' && (
                <div className="flex flex-col gap-[var(--space-section-xl)]">

                  {/* What it means */}
                  <div className="flex flex-col" style={{ gap: 'var(--space-subsection)' }}>
                    <h3
                      className="font-medium text-[var(--color-ink)]"
                      style={{
                        fontSize: 'var(--text-h1-size)',
                        lineHeight: 'var(--text-h1-line-height)',
                      }}
                    >
                      What it means
                    </h3>
                    <div className="flex flex-col gap-[var(--space-component-md)]">
                      <p
                        className="font-medium text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-h3-size)',
                          lineHeight: 'var(--text-h3-line-height)',
                          letterSpacing: 'var(--text-h3-tracking)',
                        }}
                      >
                        Nothing is fact until we identify it.
                      </p>
                      <p
                        className="font-normal text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-body-lg-size)',
                          lineHeight: 'var(--text-body-lg-line-height)',
                          letterSpacing: 'var(--text-body-lg-tracking)',
                        }}
                      >
                        Every project starts with assumptions. Mine. The stakeholders. The brief. I start by questioning all of it. What is the real goal. What is the actual problem. What are we all pretending we already know. Nothing is fact until we identify it.
                      </p>
                    </div>
                  </div>

                  {/* How to identify it */}
                  <div className="flex flex-col" style={{ gap: 'var(--space-subsection)' }}>
                    <h3
                      className="font-medium text-[var(--color-ink)]"
                      style={{
                        fontSize: 'var(--text-h1-size)',
                        lineHeight: 'var(--text-h1-line-height)',
                      }}
                    >
                      How to identify it
                    </h3>

                    {/* Intro — subtitle + two body paragraphs */}
                    <div className="flex flex-col gap-[var(--space-component-md)]">
                      <p
                        className="font-medium text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-h3-size)',
                          lineHeight: 'var(--text-h3-line-height)',
                          letterSpacing: 'var(--text-h3-tracking)',
                        }}
                      >
                        Choose the right research methods
                      </p>
                      <p
                        className="font-normal text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-body-lg-size)',
                          lineHeight: 'var(--text-body-lg-line-height)',
                          letterSpacing: 'var(--text-body-lg-tracking)',
                        }}
                      >
                        The assumption was clear. We were losing clients to competitors like Salesforce and their proposed solution was a more powerful dashboard. That was the brief. That was the starting point. Not the full answer.
                      </p>
                      <p
                        className="font-normal text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-body-lg-size)',
                          lineHeight: 'var(--text-body-lg-line-height)',
                          letterSpacing: 'var(--text-body-lg-tracking)',
                        }}
                      >
                        Based on those assumptions I chose these methods to find what we were missing, and what was actually true.
                      </p>
                    </div>

                    {/* Research method rows — alternating card + image */}
                    <div className="flex flex-col" style={{ gap: 'var(--space-stack-lg)' }}>
                      {RESEARCH_METHODS.map((card, i) => {
                        const imageFirst = i % 2 !== 0
                        const cardEl = (
                          <ResearchMethodCard
                            key={card.number}
                            number={card.number}
                            title={card.title}
                            description={card.description}
                          />
                        )
                        const imageEl = (
                          <div className="flex flex-1 min-w-0 flex-col gap-[var(--space-component-xs)]">
                            <div
                              className="relative w-full overflow-hidden rounded-[4px]"
                              style={{
                                aspectRatio: '422 / 217',
                                border: '1px solid rgba(255, 255, 255, 0.14)',
                              }}
                            >
                              <Image
                                src={card.image}
                                alt={card.caption}
                                fill
                                sizes="50vw"
                                style={{ objectFit: 'cover' }}
                              />
                            </div>
                            <p
                              className="font-medium text-[var(--color-text-muted)]"
                              style={{
                                fontSize: '11px',
                                lineHeight: '16px',
                                letterSpacing: '0.5px',
                              }}
                            >
                              {card.caption}
                            </p>
                          </div>
                        )
                        return (
                          <div
                            key={card.number}
                            className="flex flex-col md:flex-row"
                            style={{ gap: 'var(--space-stack-md)' }}
                          >
                            {imageFirst ? imageEl : cardEl}
                            {imageFirst ? cardEl : imageEl}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* The problem identified */}
                  <div className="flex flex-col" style={{ gap: 'var(--space-subsection)' }}>
                    <h3
                      className="font-medium text-[var(--color-ink)]"
                      style={{
                        fontSize: 'var(--text-h1-size)',
                        lineHeight: 'var(--text-h1-line-height)',
                      }}
                    >
                      The problem identified
                    </h3>

                    {/* Subtitle + body + images */}
                    <div className="flex flex-col gap-[var(--space-component-md)]">
                      <p
                        className="font-medium text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-h3-size)',
                          lineHeight: 'var(--text-h3-line-height)',
                          letterSpacing: 'var(--text-h3-tracking)',
                        }}
                      >
                        The current software was driving clients away
                      </p>

                      {/* Body + CIM images */}
                      <div className="flex flex-col gap-[var(--space-stack-md)]">
                        <p
                          className="font-normal text-[var(--color-text-secondary)]"
                          style={{
                            fontSize: 'var(--text-body-lg-size)',
                            lineHeight: 'var(--text-body-lg-line-height)',
                            letterSpacing: 'var(--text-body-lg-tracking)',
                          }}
                        >
                          {blockText(aim.problem.content[0])}
                        </p>

                        {/* CIM 2024 image pair */}
                        <div className="flex flex-col md:flex-row items-start gap-[var(--space-component-md)]">
                          <div className="flex min-w-0 flex-1 flex-col gap-[var(--space-component-xs)]">
                            <div
                              className="overflow-hidden rounded-[4px]"
                              style={{ border: '1px solid rgba(255, 255, 255, 0.14)' }}
                            >
                              <img
                                src={IMG_CIM_1}
                                alt="Legacy CIM interface — actual screens clients were using in 2024"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <p
                              className="font-medium text-[var(--color-text-muted)]"
                              style={{
                                fontSize: '11px',
                                lineHeight: '16px',
                                letterSpacing: '0.5px',
                              }}
                            >
                              CIM 2024
                            </p>
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col gap-[var(--space-component-xs)]">
                            <div
                              className="overflow-hidden rounded-[4px]"
                              style={{ border: '1px solid rgba(255, 255, 255, 0.14)' }}
                            >
                              <img
                                src={IMG_CIM_2}
                                alt="CIM 2024 legacy interface"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <p
                              className="font-medium text-[var(--color-text-muted)]"
                              style={{
                                fontSize: '11px',
                                lineHeight: '16px',
                                letterSpacing: '0.5px',
                              }}
                            >
                              CIM 2024
                            </p>
                          </div>
                        </div>

                        {/* Full-width CIM image */}
                        <div className="flex flex-col gap-[var(--space-component-xs)]">
                          <div
                            className="relative w-full overflow-hidden rounded-[4px]"
                            style={{
                              aspectRatio: '422 / 217',
                              border: '1px solid rgba(255, 255, 255, 0.14)',
                            }}
                          >
                            <Image
                              src={IMG_CIM_3}
                              alt="CIM 2024 legacy workflow"
                              fill
                              sizes="100vw"
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                          <p
                            className="font-medium text-[var(--color-text-muted)]"
                            style={{
                              fontSize: '11px',
                              lineHeight: '16px',
                              letterSpacing: '0.5px',
                            }}
                          >
                            CIM 2024
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* What was broken — subtitle + card grid */}
                    <div className="flex flex-col gap-[var(--space-stack-md)]">
                      <p
                        className="font-medium text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-h3-size)',
                          lineHeight: 'var(--text-h3-line-height)',
                          letterSpacing: 'var(--text-h3-tracking)',
                        }}
                      >
                        What was broken
                      </p>

                      {/* 2x2 card grid */}
                      <div className="flex flex-col gap-[var(--space-stack-md)]">
                        <div className="flex flex-col md:flex-row gap-[var(--space-stack-md)]">
                          {BROKEN_ITEMS.slice(0, 2).map((item) => (
                            <BrokenCard key={item.title} title={item.title} description={item.description} />
                          ))}
                        </div>
                        <div className="flex flex-col md:flex-row gap-[var(--space-stack-md)]">
                          {BROKEN_ITEMS.slice(2, 4).map((item) => (
                            <BrokenCard key={item.title} title={item.title} description={item.description} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── "Face it" tab content ── */}
              {activeTab === 'face-it' && (
                <div className="flex flex-col gap-[var(--space-section-xl)]">

                  {/* What it means */}
                  <div className="flex flex-col" style={{ gap: 'var(--space-subsection)' }}>
                    <h3
                      className="font-medium text-[var(--color-ink)]"
                      style={{
                        fontSize: 'var(--text-h1-size)',
                        lineHeight: 'var(--text-h1-line-height)',
                      }}
                    >
                      What it means
                    </h3>
                    <div className="flex flex-col gap-[var(--space-component-md)]">
                      <p
                        className="font-medium text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-h3-size)',
                          lineHeight: 'var(--text-h3-line-height)',
                          letterSpacing: 'var(--text-h3-tracking)',
                        }}
                      >
                        You can&apos;t build the right solution until you know what you&apos;re facing.
                      </p>
                      <p
                        className="font-normal text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-body-lg-size)',
                          lineHeight: 'var(--text-body-lg-line-height)',
                          letterSpacing: 'var(--text-body-lg-tracking)',
                        }}
                      >
                        Face it is about confronting reality after you have identified it. You now know what is actually true. But knowing it and facing it are different things.
                      </p>
                      <p
                        className="font-normal text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-body-lg-size)',
                          lineHeight: 'var(--text-body-lg-line-height)',
                          letterSpacing: 'var(--text-body-lg-tracking)',
                        }}
                      >
                        Facing it means looking at the constraints without flinching. The technical debt. The budget. The timeline. The gap between what users need and what the business can actually deliver. The politics. The things nobody wants to say out loud in the room.
                      </p>
                    </div>
                  </div>

                  {/* The constraints */}
                  <div className="flex flex-col" style={{ gap: 'var(--space-subsection)' }}>
                    <h3
                      className="font-medium text-[var(--color-ink)]"
                      style={{
                        fontSize: 'var(--text-h1-size)',
                        lineHeight: 'var(--text-h1-line-height)',
                      }}
                    >
                      The constraints
                    </h3>

                    {/* Four months */}
                    <div className="flex flex-col gap-[var(--space-component-md)]">
                      <p
                        className="font-medium text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-h3-size)',
                          lineHeight: 'var(--text-h3-line-height)',
                          letterSpacing: 'var(--text-h3-tracking)',
                        }}
                      >
                        Four months to prove it was worth building.
                      </p>
                      <p
                        className="font-semibold text-[var(--color-ink)]"
                        style={{
                          fontSize: 'var(--text-body-lg-size)',
                          lineHeight: 'var(--text-body-lg-line-height)',
                          letterSpacing: '0.15px',
                        }}
                      >
                        No prototype, no funding.
                      </p>
                      <p
                        className="font-normal text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-body-lg-size)',
                          lineHeight: 'var(--text-body-lg-line-height)',
                          letterSpacing: 'var(--text-body-lg-tracking)',
                        }}
                      >
                        GAIN is our annual client conference. Where deals are made, products are demoed, and contracts are renewed. If we wanted funding to continue this project we needed something to show. We had four months from first contact to working prototype.
                      </p>
                    </div>

                    {/* Client lock-in */}
                    <div className="flex flex-col gap-[var(--space-component-md)]">
                      <p
                        className="font-medium text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-h3-size)',
                          lineHeight: 'var(--text-h3-line-height)',
                          letterSpacing: 'var(--text-h3-tracking)',
                        }}
                      >
                        Client lock-in
                      </p>
                      <p
                        className="font-normal text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-body-lg-size)',
                          lineHeight: 'var(--text-body-lg-line-height)',
                          letterSpacing: 'var(--text-body-lg-tracking)',
                        }}
                      >
                        Certain clients were paying the bills and had hard coded features built specifically for them. Features that did not translate to the broader lender market. Designing for everyone meant navigating what was built for someone.
                      </p>
                    </div>

                    {/* Ecosystem complexity */}
                    <div className="flex flex-col gap-[var(--space-component-md)]">
                      <p
                        className="font-medium text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-h3-size)',
                          lineHeight: 'var(--text-h3-line-height)',
                          letterSpacing: 'var(--text-h3-tracking)',
                        }}
                      >
                        Ecosystem complexity
                      </p>
                      <p
                        className="font-normal text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-body-lg-size)',
                          lineHeight: 'var(--text-body-lg-line-height)',
                          letterSpacing: 'var(--text-body-lg-tracking)',
                        }}
                      >
                        AIM was not a standalone product. It had to receive loan applications from multiple upstream products, GTO and others, each with their own code, their own POs, their own logic. You could not design in isolation. Every decision had to work across the whole ecosystem. That meant getting close with every dev lead and PO across multiple products before a single screen could be finalized.
                      </p>
                    </div>
                  </div>

                  {/* The complexity */}
                  <div className="flex flex-col" style={{ gap: 'var(--space-subsection)' }}>
                    <h3
                      className="font-medium text-[var(--color-ink)]"
                      style={{
                        fontSize: 'var(--text-h1-size)',
                        lineHeight: 'var(--text-h1-line-height)',
                      }}
                    >
                      The complexity
                    </h3>

                    {/* The dashboard problem */}
                    <div className="flex flex-col gap-[var(--space-component-md)]">
                      <p
                        className="font-medium text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-h3-size)',
                          lineHeight: 'var(--text-h3-line-height)',
                          letterSpacing: 'var(--text-h3-tracking)',
                        }}
                      >
                        The dashboard problem
                      </p>
                      <p
                        className="font-normal text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-body-lg-size)',
                          lineHeight: 'var(--text-body-lg-line-height)',
                          letterSpacing: 'var(--text-body-lg-tracking)',
                        }}
                      >
                        Clients wanted to create custom tiles, with data tables, columns, customize field logic, control what they saw and how. But infinite customization without guardrails creates chaos. Too much flexibility and nobody knows where anything is. Too little and the clients feel like the product does not fit their workflow. Finding that line is genuinely hard to think through.
                      </p>
                    </div>

                    {/* The decision engine integration */}
                    <div className="flex flex-col gap-[var(--space-component-md)]">
                      <p
                        className="font-medium text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-h3-size)',
                          lineHeight: 'var(--text-h3-line-height)',
                          letterSpacing: 'var(--text-h3-tracking)',
                        }}
                      >
                        The decision engine integration
                      </p>
                      <p
                        className="font-normal text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-body-lg-size)',
                          lineHeight: 'var(--text-body-lg-line-height)',
                          letterSpacing: 'var(--text-body-lg-tracking)',
                        }}
                      >
                        Every client had their own automated decision engine set up their own way. AIM had to surface the right data at the right time to feed into a system that was different for every single client. You could not design one flow. You had to design something flexible enough to serve all of them without breaking any of them.
                      </p>
                    </div>

                    {/* The settings complexity */}
                    <div className="flex flex-col gap-[var(--space-component-md)]">
                      <p
                        className="font-medium text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-h3-size)',
                          lineHeight: 'var(--text-h3-line-height)',
                          letterSpacing: 'var(--text-h3-tracking)',
                        }}
                      >
                        The settings complexity
                      </p>
                      <p
                        className="font-normal text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-body-lg-size)',
                          lineHeight: 'var(--text-body-lg-line-height)',
                          letterSpacing: 'var(--text-body-lg-tracking)',
                        }}
                      >
                        All of that customization has to live somewhere. And designing a settings experience that is powerful enough for a technical admin but does not terrify everyone else is its own challenge.
                      </p>
                    </div>
                  </div>

                  {/* The curse of knowledge */}
                  <div className="flex flex-col" style={{ gap: 'var(--space-subsection)' }}>
                    <h3
                      className="font-medium text-[var(--color-ink)]"
                      style={{
                        fontSize: 'var(--text-h1-size)',
                        lineHeight: 'var(--text-h1-line-height)',
                      }}
                    >
                      The curse of knowledge
                    </h3>
                    <div className="flex flex-col gap-[var(--space-component-md)]">
                      <p
                        className="font-medium text-[var(--color-ink)]"
                        style={{
                          fontSize: 'var(--text-h3-size)',
                          lineHeight: 'var(--text-h3-line-height)',
                          letterSpacing: 'var(--text-h3-tracking)',
                        }}
                      >
                        The people who built it could no longer see it the way the people using it did.
                      </p>
                      <p
                        className="font-normal text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-body-lg-size)',
                          lineHeight: 'var(--text-body-lg-line-height)',
                          letterSpacing: 'var(--text-body-lg-tracking)',
                        }}
                      >
                        We did the research. We had research validating what users told us. Interview notes. Real evidence. But stakeholders had been living inside this product for years and had solutions in mind before the research even started.
                      </p>
                      <p
                        className="font-normal text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-body-lg-size)',
                          lineHeight: 'var(--text-body-lg-line-height)',
                          letterSpacing: 'var(--text-body-lg-tracking)',
                        }}
                      >
                        When you understand something deeply enough you stop being able to see it the way someone new does. They wanted more data on every screen, more customization over every field, more control over every element. To them that was power. To Erica it was noise.
                      </p>
                      <p
                        className="font-normal text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-body-lg-size)',
                          lineHeight: 'var(--text-body-lg-line-height)',
                          letterSpacing: 'var(--text-body-lg-tracking)',
                        }}
                      >
                        Our job was not just to design the right solution. It was to bridge two completely different versions of reality that both genuinely believed they were right. That is harder than any design problem.
                      </p>
                    </div>
                  </div>

                </div>
              )}

              {/* ── Empty tab placeholder (Solve it / Prove it) ── */}
              {(activeTab === 'solve-it' || activeTab === 'prove-it') && (
                <div className="flex items-center justify-center py-20">
                  <p
                    className="font-normal text-[var(--color-text-muted)]"
                    style={{ fontSize: 'var(--text-body-md-size)', lineHeight: 'var(--text-body-md-line-height)' }}
                  >
                    Still being worked on
                  </p>
                </div>
              )}
              {/* Zero-height sentinel — docked state exits when this reaches the bar bottom */}
              <div ref={exitSentinel} aria-hidden style={{ height: 0 }} />
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ══════════════════════════════════════════════════════════
            IMPACT — Metrics + outcomes + prototype image
        ══════════════════════════════════════════════════════════ */}
        <section className="w-full">
          <div
            className="mx-auto flex flex-col gap-[var(--space-section-xl)]"
            style={{
              maxWidth: 'calc(var(--space-content-max) + var(--space-page-margin) * 2)',
              padding: 'var(--space-section-xl) var(--space-page-margin)',
            }}
          >
            {/* Section heading */}
            <h2
              className="w-full text-center font-medium text-[var(--color-ink)]"
              style={{
                fontSize: 'var(--text-display-size)',
                lineHeight: 'var(--text-display-line-height)',
              }}
            >
              Impact
            </h2>

            {/* Metric cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-component-md)]">
              <div
                className="flex flex-col gap-[var(--space-stack-xs)] rounded-[8px] border border-[var(--color-border)] p-[var(--space-component-lg)]"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <p
                  className="font-normal text-[var(--color-ink)]"
                  style={{
                    fontSize: 'clamp(40px, 8vw, 57px)',
                    lineHeight: 1.12,
                  }}
                >
                  $10M+
                </p>
                <p
                  className="font-normal text-[var(--color-text-muted)]"
                  style={{
                    fontSize: 'var(--text-body-sm-size)',
                    lineHeight: 'var(--text-body-sm-line-height)',
                  }}
                >
                  Annual contract secured
                </p>
              </div>

              <div
                className="flex flex-col gap-[var(--space-stack-xs)] rounded-[8px] border border-[var(--color-border)] p-[var(--space-component-lg)]"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <p
                  className="font-normal text-[var(--color-ink)]"
                  style={{
                    fontSize: 'clamp(40px, 8vw, 57px)',
                    lineHeight: 1.12,
                  }}
                >
                  ~40%<span
                    className="font-medium text-[var(--color-text-muted)] align-super"
                    style={{
                      fontSize: 'var(--text-label-size)',
                      letterSpacing: 'var(--text-label-tracking)',
                    }}
                  >*</span>
                </p>
                <p
                  className="font-normal text-[var(--color-text-muted)]"
                  style={{
                    fontSize: 'var(--text-body-sm-size)',
                    lineHeight: 'var(--text-body-sm-line-height)',
                  }}
                >
                  Faster cross-team handoffs
                </p>
              </div>
            </div>

            {/* What AIM did */}
            <div className="flex flex-col gap-[var(--space-stack-md)]">
              <h3
                className="font-medium text-[var(--color-ink)]"
                style={{
                  fontSize: 'var(--text-h2-size)',
                  lineHeight: 'var(--text-h2-line-height)',
                }}
              >
                What AIM did
              </h3>
              <ul
                className="flex flex-col gap-[var(--space-component-sm)] list-disc pl-[var(--space-component-lg)] text-[var(--color-ink)]"
                style={{
                  fontSize: 'var(--text-h3-size)',
                  lineHeight: 'var(--text-h3-line-height)',
                }}
              >
                <li>Saved clients who were actively signing with competitors.</li>
                <li>It brought back clients who had already left.</li>
                <li>Gained one contract alone that was a multiple 10M a year contract.</li>
                <li>Potential clients the VP team had never been able to secure joined.</li>
              </ul>
            </div>

            {/* AI Summary prototype image */}
            <div className="flex flex-col gap-[var(--space-component-xs)]">
              <div
                className="overflow-hidden rounded-[4px] border border-[var(--color-border-mid)]"
              >
                <img
                  src="/images/AIM/ai-summary-prototype.png"
                  alt="AI Account Summary prototype — synthesized loan history and customer context in a readable brief"
                  className="w-full object-cover"
                />
              </div>
              <p
                className="font-medium text-[var(--color-text-muted)]"
                style={{
                  fontSize: 'var(--text-label-size)',
                  lineHeight: 'var(--text-label-line-height)',
                  letterSpacing: 'var(--text-label-tracking)',
                }}
              >
                The AI summary that was killed before launch.
              </p>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ══════════════════════════════════════════════════════════
            TAKE AWAYS
        ══════════════════════════════════════════════════════════ */}
        <section className="w-full">
          <div
            className="mx-auto flex flex-col gap-[var(--space-section-xl)]"
            style={{
              maxWidth: 'calc(var(--space-content-max) + var(--space-page-margin) * 2)',
              padding: 'var(--space-section-xl) var(--space-page-margin)',
            }}
          >
            <h2
              className="w-full text-center font-medium text-[var(--color-ink)]"
              style={{
                fontSize: 'var(--text-display-size)',
                lineHeight: 'var(--text-display-line-height)',
              }}
            >
              Take aways
            </h2>

            {/* Two-column reflection */}
            <div className="flex flex-col md:flex-row gap-[var(--space-stack-lg)] md:gap-[var(--space-7)]">
              <div className="flex flex-1 flex-col gap-[var(--space-component-lg)]">
                <p
                  className="md:whitespace-nowrap font-normal text-[var(--color-ink)]"
                  style={{
                    fontSize: 'var(--text-h1-size)',
                    lineHeight: 'var(--text-h1-line-height)',
                  }}
                >
                  {aim.takeaways?.[0]?.headline}
                </p>
                <p
                  className="font-normal text-[var(--color-text-secondary)] whitespace-pre-line"
                  style={{
                    fontSize: 'var(--text-intro-size)',
                    lineHeight: 'var(--text-intro-line-height)',
                  }}
                >
                  {aim.takeaways?.[0]?.body}
                </p>
              </div>

              <div className="flex flex-1 flex-col gap-[var(--space-component-lg)]">
                <p
                  className="md:whitespace-nowrap font-normal text-[var(--color-ink)]"
                  style={{
                    fontSize: 'var(--text-h1-size)',
                    lineHeight: 'var(--text-h1-line-height)',
                  }}
                >
                  {aim.takeaways?.[1]?.headline}
                </p>
                <p
                  className="font-normal text-[var(--color-text-secondary)] whitespace-pre-line"
                  style={{
                    fontSize: 'var(--text-intro-size)',
                    lineHeight: 'var(--text-intro-line-height)',
                  }}
                >
                  {aim.takeaways?.[1]?.body}
                </p>
              </div>
            </div>

            {/* ── Explorations that didn't ship ── */}
            <div className="flex flex-col gap-[var(--space-subsection)]">
              <h3
                className="font-medium text-[var(--color-text-secondary)]"
                style={{
                  fontSize: 'var(--text-h2-size)',
                  lineHeight: 'var(--text-h2-line-height)',
                }}
              >
                Explorations
              </h3>

              {/* Exploration cards — all three from data */}
              <div className="flex flex-col gap-[var(--space-component-lg)]">
                <div className="flex flex-col md:flex-row gap-[var(--space-component-lg)]">
                  {(aim.explorations ?? []).slice(0, 2).map((exp, i) => (
                    <TakeawayCard
                      key={exp.title}
                      number={String(i + 1).padStart(2, '0')}
                      title={exp.title}
                      body={exp.description}
                    />
                  ))}
                </div>
                {(aim.explorations ?? []).slice(2).map((exp, i) => (
                  <TakeawayCard
                    key={exp.title}
                    number={String(i + 3).padStart(2, '0')}
                    title={exp.title}
                    body={exp.description}
                  />
                ))}
              </div>

              {/* Exploration screenshot — renders for the first exploration with an image */}
              {(() => {
                const withImage = (aim.explorations ?? []).find(e => e.image)
                if (!withImage?.image) return null
                return (
                  <div className="flex flex-col gap-[var(--space-component-xs)]">
                    <div className="aspect-video w-full overflow-hidden rounded-[4px] border border-[var(--color-border-mid)]">
                      <img
                        src={withImage.image.src}
                        alt={withImage.image.alt}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <p
                      className="font-medium text-[var(--color-text-muted)]"
                      style={{
                        fontSize: 'var(--text-label-size)',
                        lineHeight: 'var(--text-label-line-height)',
                        letterSpacing: 'var(--text-label-tracking)',
                      }}
                    >
                      {withImage.image.caption}
                    </p>
                  </div>
                )
              })()}
            </div>
          </div>
        </section>

        {/* exitSentinel moved inside containerRef — see below */}
        <SectionDivider />

        {/* ══════════════════════════════════════════════════════════
            CONTACT CTA — lightweight, links to /contact
        ══════════════════════════════════════════════════════════ */}
        <section className="w-full">
          <div
            className="mx-auto flex flex-col items-center gap-[var(--space-component-lg)] text-center"
            style={{
              maxWidth: 'calc(var(--space-content-max) + var(--space-page-margin) * 2)',
              padding: 'var(--space-section-xl) var(--space-page-margin)',
            }}
          >
            <p
              className="font-light text-[var(--color-text-secondary)]"
              style={{
                fontSize: 'var(--text-h1-size)',
                lineHeight: 'var(--text-h1-line-height)',
              }}
            >
              Like what you see?{' '}
              <span className="font-medium text-[var(--color-ink)]">Let&apos;s talk.</span>
            </p>
            <a
              href="/contact"
              className="whitespace-nowrap rounded-[40px] font-medium text-[var(--color-button-text)]"
              style={{
                padding: '12px 24px',
                minHeight: 44,
                display: 'inline-flex',
                alignItems: 'center',
                background: 'var(--color-button-primary)',
                fontSize: 'var(--text-ui-md-size)',
                lineHeight: 'var(--text-ui-md-line-height)',
                letterSpacing: 'var(--text-ui-md-tracking)',
                border: '1px solid transparent',
                boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.2)',
              }}
            >
              Get in touch
            </a>
          </div>
        </section>

        <SectionDivider />

        {/* ══════════════════════════════════════════════════════════
            NEXT CASE STUDY
        ══════════════════════════════════════════════════════════ */}
        <section className="w-full">
          <a
            href={`/work/${aim.nextSlug}`}
            className="group block"
          >
            <div
              className="mx-auto flex flex-col items-center gap-[var(--space-component-base)] text-center"
              style={{
                maxWidth: 'calc(var(--space-content-max) + var(--space-page-margin) * 2)',
                padding: 'var(--space-section-xl) var(--space-page-margin)',
              }}
            >
              <p
                className="font-medium text-[var(--color-text-muted)]"
                style={{
                  fontSize: 'var(--text-label-size)',
                  lineHeight: 'var(--text-label-line-height)',
                  letterSpacing: 'var(--text-label-tracking)',
                  textTransform: 'uppercase',
                }}
              >
                Next project
              </p>
              <p
                className="font-medium text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-text-secondary)]"
                style={{
                  fontSize: 'var(--text-h1-size)',
                  lineHeight: 'var(--text-h1-line-height)',
                }}
              >
                From support calls to self-service
              </p>
              <p
                className="font-normal text-[var(--color-text-muted)]"
                style={{
                  fontSize: 'var(--text-body-md-size)',
                  lineHeight: 'var(--text-body-md-line-height)',
                }}
              >
                White-label loan management app
              </p>
              {/* Arrow */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="mt-2 text-[var(--color-text-muted)] transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
        </section>
    </>
  )
}
