import type { CaseStudy } from '@/data/types'
import type { ColorTokenSet } from '@/lib/colorAlgorithm'

interface CaseStudyHeroProps {
  caseStudy:      CaseStudy
  tokens:         ColorTokenSet
  heroImageSlot?: React.ReactNode
}

export default function CaseStudyHero({ caseStudy, tokens, heroImageSlot }: CaseStudyHeroProps) {
  const { title, role, year, types, impact, overview, context } = caseStudy

  return (
    <>
      {/* ── Zone 1: Brand color hero band ───────────────────────────── */}
      <section
        style={{ background: tokens.heroZone, position: 'relative', overflow: 'visible' }}
        aria-label="Case study overview"
      >
        <div
          className="max-w-layout mx-auto px-[var(--space-page-margin)] grid grid-cols-1 md:grid-cols-[55fr_45fr]"
          style={{
            gap:          'var(--space-stack-lg)',
            alignItems:   'center',
            minHeight:    '420px',
            paddingTop:   'var(--space-section-md)',
            paddingBottom:'var(--space-section-md)',
          }}
        >
          {/* Left — text */}
          <div>
            {/* Title */}
            <h1
              className="text-h1 mb-[var(--space-stack-md)]"
              style={{ color: '#FFFFFF' }}
            >
              {title}
            </h1>

            {/* Meta row — role · year */}
            <div
              className="flex flex-wrap gap-x-[var(--space-component-lg)] gap-y-[var(--space-component-xs)] mb-[var(--space-stack-lg)]"
            >
              <span className="text-body-sm" style={{ color: 'rgba(255,255,255,0.92)' }}>
                {role}
              </span>
              <span className="text-body-sm" style={{ color: 'rgba(255,255,255,0.50)' }} aria-hidden="true">·</span>
              <span className="text-body-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {year}
              </span>
            </div>

            {/* Type tags */}
            {types.length > 0 && (
              <div className="flex flex-wrap gap-[var(--space-component-xs)]" aria-label="Project type tags">
                {types.map(tag => (
                  <span
                    key={tag}
                    className="text-ui-sm px-[12px] py-[5px] rounded-[4px]"
                    style={{
                      color:           '#ffffff',
                      border:          '1.5px solid rgba(255,255,255,0.50)',
                      backgroundColor: 'rgba(255,255,255,0.14)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right — hero image slot */}
          {heroImageSlot && (
            <div
              className="flex min-h-[340px] md:min-h-[420px]"
              style={{
                justifyContent: 'center',
                alignItems:     'flex-end',
                overflow:       'visible',
              }}
            >
              {heroImageSlot}
            </div>
          )}
        </div>
      </section>

      {/* ── Zone 2: Overview section ────────────────────────────────── */}
      <section
        className="bg-[var(--color-canvas)]"
        style={{ paddingTop: 'var(--space-section-md)', paddingBottom: 'var(--space-section-md)' }}
        aria-label="Project overview"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">

          {/* Two-column overview grid */}
          {(context || overview) && (
            <div
              className="grid gap-x-[var(--space-stack-lg)] gap-y-[var(--space-stack-lg)] mb-[var(--space-stack-lg)]"
              style={{ gridTemplateColumns: context && overview ? '1fr 1fr' : '1fr' }}
            >
              {context && (
                <div>
                  <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-sm)]">
                    Project
                  </p>
                  <p className="text-body-lg text-[var(--color-text-primary)]">
                    {context}
                  </p>
                </div>
              )}
              {overview && (
                <div>
                  <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-sm)]">
                    My role
                  </p>
                  <p className="text-body-lg text-[var(--color-text-primary)]">
                    {overview}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Impact snapshot */}
          {impact.stats && impact.stats.length > 0 && (
            <div
              className="
                border-t border-[var(--color-border)]
                pt-[var(--space-stack-lg)]
                flex flex-wrap gap-x-[var(--space-stack-lg)] gap-y-[var(--space-stack-md)]
              "
              role="list"
              aria-label="Impact at a glance"
            >
              {impact.stats.map((stat, i) => (
                <div key={i} role="listitem">
                  <p className="text-h2 text-[var(--color-ink)] mb-[var(--space-component-xs)]">
                    {stat.value}
                  </p>
                  <p className="text-body-sm text-[var(--color-text-muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  )
}
