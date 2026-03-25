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
              className="flex min-h-[280px] md:min-h-[340px] lg:min-h-[420px]"
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

      {/* ── Zone 2: Quick overview ─────────────────────────────────── */}
      <section
        className="bg-[var(--color-canvas)]"
        style={{ paddingTop: 'var(--space-section-sm)', paddingBottom: 'var(--space-section-sm)' }}
        aria-label="Project overview"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">

          {/* Overview label */}
          <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-md)]">
            Quick overview
          </p>

          {/* Grid: project + role + stats in one row on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-[var(--space-stack-lg)] items-start">

            {/* Project context */}
            {context && (
              <div>
                <p className="text-ui-sm text-[var(--color-text-muted)] mb-[var(--space-stack-xs)]">
                  Project
                </p>
                <p className="text-body text-[var(--color-text-primary)]">
                  {context}
                </p>
              </div>
            )}

            {/* Role */}
            {overview && (
              <div>
                <p className="text-ui-sm text-[var(--color-text-muted)] mb-[var(--space-stack-xs)]">
                  My role
                </p>
                <p className="text-body text-[var(--color-text-primary)]">
                  {overview}
                </p>
              </div>
            )}

            {/* Impact stats — compact column */}
            {impact.stats && impact.stats.length > 0 && (
              <div
                className="flex flex-row md:flex-col gap-[var(--space-component-lg)] md:gap-[var(--space-component-md)] md:border-l md:border-[var(--color-border)] md:pl-[var(--space-component-lg)]"
                role="list"
                aria-label="Impact at a glance"
              >
                {impact.stats.map((stat, i) => (
                  <div key={i} role="listitem">
                    <p className="text-h3 text-[var(--color-ink)] mb-[2px]">
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

        </div>
      </section>
    </>
  )
}
