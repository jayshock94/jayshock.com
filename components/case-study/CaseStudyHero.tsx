import type { CaseStudy } from '@/data/types'
import type { ColorTokenSet } from '@/lib/colorAlgorithm'
import Button from '@/components/ui/Button'

interface CaseStudyHeroProps {
  caseStudy: CaseStudy
  tokens:    ColorTokenSet
}

export default function CaseStudyHero({ caseStudy, tokens }: CaseStudyHeroProps) {
  const { title, eyebrow, role, year, types } = caseStudy

  return (
    <section
      className="pt-[var(--space-section-lg)] pb-[var(--space-section-md)]"
      style={
        {
          '--case-surface': tokens.canvas,
          '--case-accent':  tokens.label,
          '--case-border':  tokens.border,
          '--case-label':   tokens.label,
          backgroundColor:  tokens.canvas,
          transition:       'background-color 0.7s ease',
        } as React.CSSProperties
      }
      aria-label="Case study overview"
    >
      <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
        <div className="max-w-content">

          {/* Eyebrow */}
          <p
            className="text-label mb-[var(--space-stack-sm)]"
            style={{ color: tokens.label }}
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
                    color:       tokens.label,
                    borderColor: tokens.border,
                    backgroundColor: tokens.bg,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex gap-[var(--space-component-md)]">
            <Button variant="primary" href="#impact">
              Read the case study
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}
