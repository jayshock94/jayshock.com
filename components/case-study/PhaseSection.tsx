import type { PhaseContent, PhaseKey } from '@/data/types'

interface PhaseSectionProps {
  phase:   PhaseKey
  content: PhaseContent
}

const PHASE_LABELS: Record<PhaseKey, string> = {
  impact:    'Impact',
  problem:   'Problem',
  discovery: 'Discovery',
  solution:  'Solution',
}

const PHASE_VARS: Record<PhaseKey, {
  bg:     string
  border: string
  label:  string
  text:   string
}> = {
  impact: {
    bg:     'var(--phase-impact-bg)',
    border: 'var(--phase-impact-border)',
    label:  'var(--phase-impact-label)',
    text:   'var(--phase-impact-text)',
  },
  problem: {
    bg:     'var(--phase-problem-bg)',
    border: 'var(--phase-problem-border)',
    label:  'var(--phase-problem-label)',
    text:   'var(--phase-problem-text)',
  },
  discovery: {
    bg:     'var(--phase-discovery-bg)',
    border: 'var(--phase-discovery-border)',
    label:  'var(--phase-discovery-label)',
    text:   'var(--phase-discovery-text)',
  },
  solution: {
    bg:     'var(--phase-solution-bg)',
    border: 'var(--phase-solution-border)',
    label:  'var(--phase-solution-label)',
    text:   'var(--phase-solution-text)',
  },
}

export default function PhaseSection({ phase, content }: PhaseSectionProps) {
  const vars   = PHASE_VARS[phase]
  const label  = PHASE_LABELS[phase]
  const { headline, paragraphs, stats, quote, estimatedNote } = content

  return (
    <section
      id={phase}
      data-phase-section={phase}
      className="
        py-[var(--space-section-md)]
        transition-colors duration-700
      "
      style={{
        backgroundColor: vars.bg,
      }}
      aria-labelledby={`phase-heading-${phase}`}
    >
      <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
        <div
          className="
            max-w-content
            border-l-[2.5px] pl-[var(--space-component-lg)]
            transition-colors duration-500
          "
          style={{ borderColor: vars.label }}
        >

          {/* Phase eyebrow */}
          <p
            className="text-ui-sm mb-[var(--space-stack-sm)]"
            style={{ color: vars.label }}
          >
            {label}
          </p>

          {/* Section headline */}
          <h2
            id={`phase-heading-${phase}`}
            className="text-h2 text-[var(--color-ink)] mb-[var(--space-stack-md)]"
          >
            {headline}
          </h2>

          {/* Stats — Impact phase only */}
          {stats && stats.length > 0 && (
            <div
              className="
                grid grid-cols-1 gap-[var(--space-component-md)]
                sm:grid-cols-3
                mb-[var(--space-stack-lg)]
              "
              role="list"
              aria-label="Impact metrics"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="
                    bg-[rgba(255,255,255,0.55)]
                    border border-[var(--color-border)]
                    rounded-[8px]
                    p-[var(--space-component-md)]
                  "
                  role="listitem"
                >
                  <p
                    className="text-h2 text-[var(--color-ink)] mb-[var(--space-stack-xs)]"
                  >
                    {stat.value}
                    {stat.estimated && (
                      <sup
                        className="text-label text-[var(--color-text-muted)] ml-[2px]"
                        aria-label="estimated"
                      >
                        *
                      </sup>
                    )}
                  </p>
                  <p className="text-body-sm text-[var(--color-text-muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Body paragraphs */}
          <div className="flex flex-col gap-[var(--space-stack-md)]">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-body text-[var(--color-text-secondary)]"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Pull quote — Discovery phase */}
          {quote && (
            <blockquote
              className="
                mt-[var(--space-stack-lg)]
                pl-[var(--space-component-md)]
                border-l-[2px]
              "
              style={{ borderColor: vars.border }}
            >
              <p className="text-body-lg text-[var(--color-ink)] italic mb-[var(--space-stack-sm)]">
                &ldquo;{quote.text}&rdquo;
              </p>
              {quote.attribution && (
                <cite className="text-body-sm text-[var(--color-text-muted)] not-italic">
                  {quote.attribution}
                </cite>
              )}
            </blockquote>
          )}

          {/* Estimated metrics footnote */}
          {estimatedNote && (
            <p
              className="
                mt-[var(--space-stack-lg)]
                text-body-sm text-[var(--color-text-muted)]
              "
            >
              <sup aria-hidden="true">*</sup> {estimatedNote}
            </p>
          )}

        </div>
      </div>
    </section>
  )
}
