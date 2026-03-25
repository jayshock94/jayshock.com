import type { CaseStudyImage, PhaseContent, PhaseKey } from '@/data/types'

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
    bg:     'var(--phase-impact-glass)',
    border: 'var(--phase-impact-border)',
    label:  'var(--phase-impact-label)',
    text:   'var(--phase-impact-text)',
  },
  problem: {
    bg:     'var(--phase-problem-glass)',
    border: 'var(--phase-problem-border)',
    label:  'var(--phase-problem-label)',
    text:   'var(--phase-problem-text)',
  },
  discovery: {
    bg:     'var(--phase-discovery-glass)',
    border: 'var(--phase-discovery-border)',
    label:  'var(--phase-discovery-label)',
    text:   'var(--phase-discovery-text)',
  },
  solution: {
    bg:     'var(--phase-solution-glass)',
    border: 'var(--phase-solution-border)',
    label:  'var(--phase-solution-label)',
    text:   'var(--phase-solution-text)',
  },
}

export default function PhaseSection({ phase, content }: PhaseSectionProps) {
  const vars   = PHASE_VARS[phase]
  const label  = PHASE_LABELS[phase]
  const { headline, paragraphs, stats, images, quote, estimatedNote } = content

  // Group images by which paragraph they follow (undefined = after last paragraph)
  const imagesByPara = (images ?? []).reduce<Record<number, CaseStudyImage[]>>(
    (acc, img) => {
      const key = img.afterParagraph ?? paragraphs.length - 1
      acc[key] = [...(acc[key] ?? []), img]
      return acc
    },
    {},
  )

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
          className="max-w-content pl-[var(--space-component-lg)] relative"
        >

          {/* Short accent bar — sits beside the eyebrow label only */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 w-[2.5px] transition-colors duration-500"
            style={{ height: '16px', background: vars.label }}
          />

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
                    bg-[var(--color-stat-box-bg)]
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

          {/* Body paragraphs — images interleaved after their target paragraph */}
          <div className="flex flex-col gap-[var(--space-stack-md)]">
            {paragraphs.map((p, i) => (
              <>
                <p
                  key={`p-${i}`}
                  className="text-body text-[var(--color-text-secondary)]"
                >
                  {p}
                </p>

                {/* Images that follow this paragraph */}
                {imagesByPara[i] && (
                  <div
                    key={`imgs-${i}`}
                    className={`
                      grid gap-[var(--space-component-md)] mt-[var(--space-stack-sm)]
                      ${imagesByPara[i].length >= 2 ? 'grid-cols-2' : 'grid-cols-1'}
                    `}
                  >
                    {imagesByPara[i].map((img, j) => (
                      <figure key={j} className="m-0">
                        {/* Placeholder box — replace inner content with <img> when real image exists */}
                        <div
                          className="w-full rounded-[8px] border border-[var(--color-border)] flex items-center justify-center p-[var(--space-component-md)]"
                          style={{
                            background:  'var(--color-surface)',
                            aspectRatio: img.aspect === 'landscape' ? '16/9' : '9/18',
                          }}
                        >
                          <p className="text-body-sm text-[var(--color-text-muted)] text-center opacity-60">
                            {img.alt}
                          </p>
                        </div>
                        {img.caption && (
                          <figcaption className="mt-[var(--space-stack-sm)] text-body-sm text-[var(--color-text-muted)]">
                            {img.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                )}
              </>
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
