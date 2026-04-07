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
import AimHeroImage from '@/components/case-study/AimHeroImage'
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
const IMG_CONTACT     = '/images/AIM/contact-avatar.png'
const IMG_AI_SUMMARY  = '/images/AIM/ai summary 2.png'

// ─── Types ─────────────────────────────────────────────────────────────────
type ProcessTab = 'see-it' | 'own-it' | 'solve-it' | 'do-it'

const TABS: { id: ProcessTab; label: string }[] = [
  { id: 'see-it',   label: 'See it'   },
  { id: 'own-it',   label: 'Own it'   },
  { id: 'solve-it', label: 'Solve it' },
  { id: 'do-it',    label: 'Do it'    },
]

/** Phase token mapping — drives tab pill color, text color, and section background per tab */
const PHASE_MAP: Record<ProcessTab, {
  tab: string
  extended: string
  glass: string
}> = {
  'see-it':   { tab: 'var(--phase-impact-tab)',    extended: 'var(--phase-impact-extended)',    glass: 'var(--phase-impact-glass)'    },
  'own-it':   { tab: 'var(--phase-problem-tab)',   extended: 'var(--phase-problem-extended)',   glass: 'var(--phase-problem-glass)'   },
  'solve-it': { tab: 'var(--phase-discovery-tab)', extended: 'var(--phase-discovery-extended)', glass: 'var(--phase-discovery-glass)' },
  'do-it':    { tab: 'var(--phase-solution-tab)',  extended: 'var(--phase-solution-extended)',  glass: 'var(--phase-solution-glass)'  },
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
function BrokenCard({ title, body }: { title: string; body: string }) {
  return (
    <div
      className="flex-1 min-w-0 rounded-[4px] border border-[var(--color-border-subtle-16)]"
      style={{ background: 'var(--phase-impact-card)' }}
    >
      <div className="flex flex-col px-4 py-[10px]">
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
          {body}
        </p>
      </div>
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
      className="flex flex-1 flex-col gap-3 overflow-hidden rounded-[8px] border border-[var(--color-border)] p-[25px] md:h-[302px]"
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

/** Labeled text input field */
function FormField({
  label,
  placeholder,
  type = 'text',
}: {
  label: string
  placeholder: string
  type?: string
}) {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <label
        className="font-medium text-[var(--color-text-muted)]"
        style={{
          fontSize: 'var(--text-ui-sm-size)',
          lineHeight: 'var(--text-ui-sm-line-height)',
          letterSpacing: 'var(--text-ui-sm-tracking)',
        }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-[4px] border border-[var(--color-border-mid)] font-normal outline-none text-[var(--color-ink)] placeholder:text-[var(--color-text-muted)]"
        style={{
          height: 56,
          padding: '18px 17px',
          background: 'var(--glass-dark-thin)',
          fontSize: 'var(--text-body-md-size)',
          lineHeight: 'var(--text-body-md-line-height)',
          letterSpacing: 'var(--text-body-md-tracking)',
        }}
      />
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function AimPage() {
  const [activeTab, setActiveTab] = useState<ProcessTab>('see-it')

  // ── Sticky tab dock state ────────────────────────────────────────────────
  const [docked, setDocked]               = useState(false)
  // Both measured synchronously (useLayoutEffect) so CSS transitions run in both directions
  const [naturalHeight, setNaturalHeight] = useState<number | undefined>(undefined)
  const [undockedWidth, setUndockedWidth] = useState<number | undefined>(undefined)
  // Only expand tab bar width on desktop (≥768px)
  const [isDesktop, setIsDesktop]         = useState(false)
  const tabRowRef    = useRef<HTMLDivElement>(null)
  // containerRef  → inner div.flex.flex-col (tabs + content) — DOCK detection (.top)
  // exitSentinel  → zero-height div placed immediately before the SectionDivider — EXIT detection (.top)
  const containerRef  = useRef<HTMLDivElement>(null)
  const exitSentinel  = useRef<HTMLDivElement>(null)

  // Measure natural size before first paint so explicit px→px transitions work
  useLayoutEffect(() => {
    const el = tabRowRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setNaturalHeight(Math.round(rect.height))
    setUndockedWidth(Math.round(rect.width))
    setIsDesktop(window.innerWidth >= 768)

    function onResize() { setIsDesktop(window.innerWidth >= 768) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    // CSS: top: calc(var(--nav-height) + 8px) = 100 + 8 = 108
    const NAV_OFFSET    = 108
    const DOCKED_HEIGHT = 70

    function update() {
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
            className="mx-auto flex items-center justify-center py-10 md:py-[80px]"
            style={{
              maxWidth: 'var(--space-layout-max)',
              paddingLeft: 'var(--space-page-margin)',
              paddingRight: 'var(--space-page-margin)',
            }}
          >
            <div className="w-full max-w-[978px]">
              <AimHeroImage />
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
              maxWidth: 'var(--space-content-max)',
              padding: 'var(--space-section-xl) var(--space-page-margin)',
            }}
          >
            {/* Icon + title — 80px gap below before overview/goal/role */}
            <div className="mb-10 md:mb-[80px] flex flex-col items-center gap-4">
              <IconFrame src={IMG_APP_ICON} alt="AIM loan management platform" />
              <h1
                className="text-center font-normal text-[var(--color-ink)]"
                style={{
                  fontSize: 'var(--text-display-size)',
                  lineHeight: 'var(--text-display-line-height)',
                }}
              >
                Designing
                <br />
                Loan Management Platform
              </h1>
            </div>

            {/* Two-column: overview + goal left, role right */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-[70px]">
              {/* Left */}
              <div className="flex flex-1 flex-col gap-8">
                <div className="flex flex-col gap-4">
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

                <div className="flex flex-col gap-4">
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
              <div className="flex shrink-0 flex-col gap-4 md:whitespace-nowrap md:pt-2">
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
            className="mx-auto flex flex-col gap-12 md:gap-[80px]"
            style={{
              maxWidth: 'var(--space-content-max)',
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

            <div ref={containerRef} className="flex flex-col gap-10 md:gap-[70px]">
              {/* Segment tabs — sticky 8px below nav; exits naturally when container bottom passes */}
              <div
                className="sticky z-10"
                style={{ top: 'calc(var(--nav-height) + 8px)' }}
              >
                {/*
                  Sizing wrapper:
                  - Undocked: fills parent width naturally (undockedWidth px)
                  - Docked:   expands to 1000px, centered via symmetric negative margins
                  Margin-based centering keeps the center point stable during transitions
                  (no competing left/transform animations).
                */}
                <div
                  style={(() => {
                    const expand = docked && isDesktop && undockedWidth
                    const overflow = expand ? (1000 - undockedWidth) / 2 : 0
                    return {
                      width: expand ? 1000 : undockedWidth,
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
                    onClick={() => setActiveTab(tab.id)}
                    className="min-w-0 flex-1"
                  >
                    {activeTab === tab.id ? (
                      <div
                        className="flex items-center justify-center rounded-full"
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
                        className="flex items-center justify-center px-3 py-1.5 font-medium whitespace-nowrap text-[var(--color-text-secondary)]"
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
                </div>{/* end sizing wrapper */}
              </div>{/* end sticky wrapper */}

              {/* ── "See it" tab content ── */}
              {activeTab === 'see-it' && (
                <div className="flex flex-col gap-[70px]">

                  {/* The problem */}
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                      <h3
                        className="font-medium text-[var(--color-ink)]"
                        style={{
                          fontSize: 'var(--text-h1-size)',
                          lineHeight: 'var(--text-h1-line-height)',
                        }}
                      >
                        The problem
                      </h3>
                      <p
                        className="font-normal text-[var(--color-text-secondary)]"
                        style={{
                          fontSize: 'var(--text-h3-size)',
                          lineHeight: 'var(--text-h3-line-height)',
                        }}
                      >
                        {aim.cardImpactLine}
                      </p>
                    </div>
                    <p
                      className="font-normal text-[var(--color-text-secondary)]"
                      style={{
                        fontSize: 'var(--text-body-md-size)',
                        lineHeight: 'var(--text-body-md-line-height)',
                        letterSpacing: 'var(--text-body-md-tracking)',
                      }}
                    >
                      {blockText(aim.problem.content[0])}
                    </p>

                    {/* Screenshot pair — equal width, stack on small screens */}
                    <div className="flex flex-col md:flex-row items-start gap-4">
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="aspect-video overflow-hidden rounded-[4px] border border-[var(--color-text-placeholder)]">
                          <img
                            src={IMG_CIM_1}
                            alt="Legacy CIM interface — actual screens clients were using in 2024"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p
                          className="font-medium text-[var(--color-text-placeholder)]"
                          style={{
                            fontSize: 'var(--text-label-size)',
                            lineHeight: 'var(--text-label-line-height)',
                            letterSpacing: 'var(--text-label-tracking)',
                          }}
                        >
                          Actual screen shots of what clients were using in 2024
                        </p>
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="aspect-video overflow-hidden rounded-[4px] border border-[var(--color-text-placeholder)]">
                          <img
                            src={IMG_CIM_2}
                            alt="CIM 2024 legacy interface"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p
                          className="font-medium text-[var(--color-text-placeholder)]"
                          style={{
                            fontSize: 'var(--text-label-size)',
                            lineHeight: 'var(--text-label-line-height)',
                            letterSpacing: 'var(--text-label-tracking)',
                          }}
                        >
                          CIM 2024
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* What was broken */}
                  <div className="flex flex-col gap-6">
                    <h3
                      className="font-medium text-[var(--color-ink)]"
                      style={{
                        fontSize: 'var(--text-h1-size)',
                        lineHeight: 'var(--text-h1-line-height)',
                      }}
                    >
                      What was broken
                    </h3>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {(aim.brokenItems ?? []).slice(0, 2).map((item) => (
                          <BrokenCard key={item.title} title={item.title} body={item.body} />
                        ))}
                      </div>
                      <div className="flex flex-col md:flex-row gap-6">
                        {(aim.brokenItems ?? []).slice(2, 4).map((item) => (
                          <BrokenCard key={item.title} title={item.title} body={item.body} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* The GAIN deadline */}
                  <div className="flex flex-col gap-6">
                    <h3
                      className="font-medium text-[var(--color-ink)]"
                      style={{
                        fontSize: 'var(--text-h1-size)',
                        lineHeight: 'var(--text-h1-line-height)',
                      }}
                    >
                      The GAIN deadline
                    </h3>
                    <div
                      className="font-normal text-[var(--color-text-secondary)]"
                      style={{
                        fontSize: 'var(--text-body-md-size)',
                        lineHeight: 'var(--text-body-md-line-height)',
                        letterSpacing: 'var(--text-body-md-tracking)',
                      }}
                    >
                      <p>{blockText(aim.problem.content[2])}</p>
                      <p className="mt-6">{blockText(aim.problem.content[3])}</p>
                      <p className="mt-6">{blockText(aim.problem.content[4])}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Placeholder for tabs without content yet */}
              {activeTab !== 'see-it' && (
                <div className="flex items-center justify-center py-20">
                  <p
                    className="font-normal text-[var(--color-text-muted)]"
                    style={{ fontSize: 'var(--text-body-md-size)' }}
                  >
                    Content coming soon
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ══════════════════════════════════════════════════════════
            TAKE AWAYS
        ══════════════════════════════════════════════════════════ */}
        <section className="w-full">
          <div
            className="mx-auto flex flex-col gap-12 md:gap-[80px]"
            style={{
              maxWidth: 'var(--space-content-max)',
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

            <div className="flex flex-col gap-10">
              {/* Two-column reflection */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-[70px]">
                <div className="flex flex-1 flex-col gap-6">
                  <p
                    className="md:whitespace-nowrap font-normal text-[var(--color-ink)]"
                    style={{
                      fontSize: 'var(--text-h1-size)',
                      lineHeight: 'var(--text-h1-line-height)',
                    }}
                  >
                    Not everything shipped.
                  </p>
                  <p
                    className="font-normal text-[var(--color-text-secondary)]"
                    style={{
                      fontSize: 'var(--text-intro-size)',
                      lineHeight: 'var(--text-intro-line-height)',
                    }}
                  >
                    Not everything I tested made it in. Some ideas lost to better ones,
                    which is how it should work.
                    <br />
                    <br />
                    Some were casualties of scope and budget, and some I&apos;m not sure I
                    made the strongest case for.
                  </p>
                </div>

                <div className="flex flex-1 flex-col gap-6">
                  <p
                    className="md:whitespace-nowrap font-normal text-[var(--color-ink)]"
                    style={{
                      fontSize: 'var(--text-h1-size)',
                      lineHeight: 'var(--text-h1-line-height)',
                    }}
                  >
                    What I learned from it
                  </p>
                  <p
                    className="font-normal text-[var(--color-text-secondary)]"
                    style={{
                      fontSize: 'var(--text-intro-size)',
                      lineHeight: 'var(--text-intro-line-height)',
                    }}
                  >
                    A good idea isn&apos;t enough on its own. That means research and data,
                    but also educating the people in the room.
                    <br />
                    <br />
                    Making the reasoning visible, not just the outcome. I&apos;ve worked on
                    that since.
                  </p>
                </div>
              </div>

              {/* Two-column takeaway cards */}
              <div className="flex flex-col md:flex-row gap-6">
                <TakeawayCard
                  number="01"
                  title={`Hamburger nav vs tab bar\nvs sidebar`}
                  body="Early prototypes tested three navigation patterns. Hamburger hid too much from power users who needed everything visible. Tab bar couldn't scale to twelve modules. We landed on a persistent sidebar with collapsible groups so lenders could see the full system at a glance."
                />
                <TakeawayCard
                  number="03"
                  title="AI Account Summary"
                  body={`We pushed for an AI-powered account summary that would synthesize loan history and customer context into a readable brief. When a loan landed on someone's desk with no context, they had to dig through multiple screens to piece the story together.\n\nThe AI summary would solve that cold-start problem instantly. I designed the full feature but clients pushed back due to cost and timeline. I still think it was the right idea at the wrong time.`}
                />
              </div>

              {/* Full-width AI summary screenshot */}
              <div className="flex flex-col gap-1">
                <div className="aspect-video w-full overflow-hidden rounded-[4px] border border-[var(--color-text-placeholder)]">
                  <img
                    src={IMG_AI_SUMMARY}
                    alt="AI Account Summary prototype — synthesized loan history and customer context in a readable brief"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <p
                  className="font-medium text-[var(--color-text-placeholder)]"
                  style={{
                    fontSize: 'var(--text-label-size)',
                    lineHeight: 'var(--text-label-line-height)',
                    letterSpacing: 'var(--text-label-tracking)',
                  }}
                >
                  The AI summary that didn&apos;t make it into the product
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Zero-height sentinel — bar stays docked until this divider line reaches the bar bottom */}
        <div ref={exitSentinel} aria-hidden style={{ height: 0 }} />
        <SectionDivider />

        {/* ══════════════════════════════════════════════════════════
            CONTACT
        ══════════════════════════════════════════════════════════ */}
        <section className="w-full">
          <div
            className="mx-auto flex flex-col gap-8"
            style={{
              maxWidth: 'var(--space-content-max)',
              padding: 'var(--space-section-xl) var(--space-page-margin)',
            }}
          >
            {/* Avatar + heading */}
            <div className="flex w-full flex-col items-start gap-[10px]">
              <div className="flex w-full items-start justify-center" style={{ height: 104 }}>
                <IconFrame src={IMG_CONTACT} alt="Jay Shock" />
              </div>
              <div className="flex w-full justify-center">
                <p
                  style={{
                    fontSize: 'var(--text-display-size)',
                    lineHeight: 'var(--text-display-line-height)',
                    fontWeight: 300,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  Contact{' '}
                  <span style={{ fontWeight: 500, color: 'var(--color-ink)' }}>Jay</span>
                </p>
              </div>
            </div>

            {/* Contact body + glass form */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col">
                <div className="pb-4">
                  <p
                    style={{
                      fontSize: 'var(--text-h1-size)',
                      lineHeight: 'var(--text-h1-line-height)',
                      fontWeight: 300,
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    Let&apos;s make it{' '}
                    <span style={{ fontWeight: 500, color: 'var(--color-ink)' }}>
                      simple.
                    </span>
                  </p>
                </div>
                <div className="pb-6" style={{ maxWidth: 700 }}>
                  <p
                    style={{
                      fontSize: 'var(--text-intro-size)',
                      lineHeight: 'var(--text-intro-line-height)',
                      fontWeight: 400,
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    I want to hear about whatever complex system, product, or problem we
                    could be working on.
                  </p>
                </div>
                <p
                  style={{
                    fontSize: 'var(--text-body-lg-size)',
                    lineHeight: 'var(--text-body-lg-line-height)',
                    letterSpacing: 'var(--text-body-lg-tracking)',
                    fontWeight: 300,
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Prefer email?{' '}
                  <a
                    href="mailto:hello@jayshock.com"
                    className="underline [text-decoration-skip-ink:none]"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    hello@jayshock.com
                  </a>
                </p>
              </div>

              {/* Glass form card */}
              <div
                className="relative w-full overflow-hidden rounded-2xl border border-[var(--color-border)] p-[25px] backdrop-blur-[24px]"
                style={{
                  background:
                    'linear-gradient(180deg, var(--color-hover-subtle) 0%, rgba(255,255,255,0.02) 50%, transparent 100%), rgba(255,255,255,0.04)',
                  boxShadow:
                    '0px 2px 24px 0px var(--shadow-surface-color), inset 0px 1px 0px 1px var(--color-hover-subtle)',
                }}
              >
                <form className="flex flex-col gap-6">
                  {/* Name + Email */}
                  <div className="flex flex-col md:flex-row gap-6">
                    <FormField label="Name" placeholder="Your name" />
                    <FormField label="Email" placeholder="you@example.com" type="email" />
                  </div>

                  {/* Topic select */}
                  <div className="flex flex-col gap-1">
                    <label
                      className="font-medium text-[var(--color-text-muted)]"
                      style={{
                        fontSize: 'var(--text-ui-sm-size)',
                        lineHeight: 'var(--text-ui-sm-line-height)',
                        letterSpacing: 'var(--text-ui-sm-tracking)',
                      }}
                    >
                      Topic
                    </label>
                    <div className="relative">
                      <select
                        className="w-full appearance-none rounded-[4px] border border-[var(--color-border-mid)] font-normal text-[var(--color-text-muted)] outline-none"
                        style={{
                          height: 56,
                          padding: '5px 49px 5px 17px',
                          background: 'var(--glass-dark-thin)',
                          fontSize: 'var(--text-body-md-size)',
                          lineHeight: 'var(--text-body-md-line-height)',
                          letterSpacing: 'var(--text-body-md-tracking)',
                        }}
                      >
                        <option value="">What are you reaching out about?</option>
                        <option value="work">Work opportunity</option>
                        <option value="project">Project collaboration</option>
                        <option value="consulting">Consulting</option>
                        <option value="other">Something else</option>
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M5 7.5L10 12.5L15 7.5"
                            stroke="var(--color-text-muted)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message textarea */}
                  <div className="flex flex-col gap-1">
                    <label
                      className="font-medium text-[var(--color-text-muted)]"
                      style={{
                        fontSize: 'var(--text-ui-sm-size)',
                        lineHeight: 'var(--text-ui-sm-line-height)',
                        letterSpacing: 'var(--text-ui-sm-tracking)',
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell me what you are working on."
                      className="w-full resize-none rounded-[4px] border border-[var(--color-border-mid)] font-normal text-[var(--color-ink)] placeholder:text-[var(--color-text-muted)] outline-none"
                      style={{
                        padding: '17px',
                        background: 'var(--glass-dark-thin)',
                        fontSize: 'var(--text-body-md-size)',
                        lineHeight: 'var(--text-body-md-line-height)',
                        letterSpacing: 'var(--text-body-md-tracking)',
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <div>
                    <button
                      type="submit"
                      className="whitespace-nowrap rounded-[40px] font-medium text-[var(--color-button-text)]"
                      style={{
                        padding: '12px 17px',
                        minHeight: 44,
                        background: 'var(--color-button-primary)',
                        fontSize: 'var(--text-ui-md-size)',
                        lineHeight: 'var(--text-ui-md-line-height)',
                        letterSpacing: 'var(--text-ui-md-tracking)',
                        border: '1px solid transparent',
                        boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.2)',
                      }}
                    >
                      Send to Jay
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}
