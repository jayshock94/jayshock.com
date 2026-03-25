import type { CaseStudy } from '@/data/types'
import type { ColorTokenSet } from '@/lib/colorAlgorithm'

interface CaseStudyHeroProps {
  caseStudy:      CaseStudy
  tokens:         ColorTokenSet
  heroImageSlot?: React.ReactNode
}

export default function CaseStudyHero({ caseStudy, tokens, heroImageSlot }: CaseStudyHeroProps) {
  const { title, eyebrow, role, year, types, impact, heroImage, overview } = caseStudy

  return (
    <section
      className="pt-[var(--space-section-lg)] pb-[var(--space-section-md)]"
      style={
        {
          // Light-mode values
          '--case-canvas-light': tokens.canvas,
          '--case-label-light':  tokens.label,
          '--case-border-light': tokens.border,
          '--case-bg-light':     tokens.bg,
          // Dark-mode values
          '--case-canvas-dark':  tokens.darkCanvas,
          '--case-label-dark':   tokens.darkLabel,
          '--case-border-dark':  tokens.darkBorder,
          '--case-bg-dark':      tokens.darkBg,
          backgroundColor: 'transparent',
        } as React.CSSProperties
      }
      aria-label="Case study overview"
    >
      <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
        <div className="max-w-content">

          {/* Eyebrow */}
          <p
            className="text-label mb-[var(--space-stack-sm)]"
            style={{ color: 'var(--case-label)' }}
          >
            {eyebrow}
          </p>

          {/* Title */}
          <h1 className="text-h1 text-[var(--color-ink)] mb-[var(--space-stack-md)]">
            {title}
          </h1>

          {/* Meta row — role · year */}
          <div className="flex flex-wrap gap-x-[var(--space-component-lg)] gap-y-[var(--space-component-xs)] mb-[var(--space-stack-lg)]">
            <span className="text-body-sm text-[var(--color-text-secondary)]">
              {role}
            </span>
            <span
              className="text-body-sm text-[var(--color-text-muted)]"
              aria-hidden="true"
            >
              ·
            </span>
            <span className="text-body-sm text-[var(--color-text-muted)]">
              {year}
            </span>
          </div>

          {/* Type tags */}
          {types.length > 0 && (
            <div
              className="flex flex-wrap gap-[var(--space-component-xs)] mb-[var(--space-stack-lg)]"
              aria-label="Project type tags"
            >
              {types.map(tag => (
                <span
                  key={tag}
                  className="text-ui-sm px-[10px] py-[4px] rounded-[4px] border"
                  style={{
                    color:           'var(--case-label)',
                    borderColor:     'var(--case-border)',
                    backgroundColor: 'var(--case-bg)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Overview — project-specific role or scope note */}
          {overview && (
            <p className="text-body text-[var(--color-text-secondary)] mb-[var(--space-stack-lg)]">
              {overview}
            </p>
          )}

          {/* Impact snapshot — quick metrics before the full story */}
          {impact.stats && impact.stats.length > 0 && (
            <div
              className="
                border-t border-[var(--color-border)]
                pt-[var(--space-stack-lg)]
                mb-[var(--space-stack-lg)]
                flex flex-wrap gap-x-[var(--space-stack-lg)] gap-y-[var(--space-stack-md)]
              "
              role="list"
              aria-label="Impact at a glance"
            >
              {impact.stats.map((stat, i) => (
                <div key={i} role="listitem">
                  <p className="text-h3 text-[var(--color-ink)] mb-[var(--space-component-xs)]">
                    {stat.value}
                  </p>
                  <p className="text-body-sm text-[var(--color-text-muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Hero image — full-width showcase */}
          {(heroImageSlot ?? heroImage) && (
            <div
              className="w-full rounded-[12px] overflow-hidden"
              style={{
                background:  heroImageSlot ? 'var(--color-ink)' : 'var(--color-surface)',
                aspectRatio: heroImageSlot ? '3/2' : '16/9',
              }}
            >
              {heroImageSlot ?? (
                <div className="flex items-center justify-center w-full h-full p-[var(--space-component-lg)]">
                  <p className="text-body-sm text-[var(--color-text-muted)] opacity-60">
                    {heroImage}
                  </p>
                </div>
              )}
            </div>
          )}

</div>
      </div>
    </section>
  )
}
