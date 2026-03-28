import ScrollReveal from '@/components/ui/ScrollReveal'

interface CaseStudyLedeProps {
  context?: string
  overview?: string
}

export default function CaseStudyLede({ context, overview }: CaseStudyLedeProps) {
  if (!context && !overview) return null

  return (
    <section
      className="bg-[var(--color-canvas)]"
      style={{
        paddingTop: 'var(--space-section-md)',
        paddingBottom: 'var(--space-section-sm)',
      }}
      aria-label="Project context"
    >
      <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
        {/* Context as lede paragraph */}
        {context && (
          <ScrollReveal>
            <p
              className="text-intro max-w-content"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {context}
            </p>
          </ScrollReveal>
        )}

        {/* Role as bordered aside */}
        {overview && (
          <ScrollReveal>
            <div
              style={{
                marginTop: 'var(--space-stack-lg)',
                paddingLeft: 'var(--space-component-lg)',
                borderLeft: '2px solid var(--color-border-mid)',
                maxWidth: 'var(--space-content-max)',
              }}
            >
              <p
                className="text-label"
                style={{
                  color: 'var(--color-text-muted)',
                  marginBottom: 'var(--space-stack-xs)',
                }}
              >
                My role
              </p>
              <p
                className="text-body"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {overview}
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
