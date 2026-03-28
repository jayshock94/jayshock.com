import ScrollReveal from '@/components/ui/ScrollReveal'

interface PainPoint {
  title: string
  description: string
}

interface PainPointsProps {
  points: PainPoint[]
  accentColor?: string
}

/**
 * Scannable pain point cards — replaces long problem paragraphs.
 * Each card is a specific UX problem, bold title + short description.
 */
export default function PainPoints({ points, accentColor = 'var(--phase-problem-label)' }: PainPointsProps) {
  return (
    <div style={{ marginTop: 'var(--space-stack-lg)', marginBottom: 'var(--space-stack-lg)' }}>
      <p
        className="text-label"
        style={{
          color: 'var(--color-text-muted)',
          marginBottom: 'var(--space-stack-md)',
        }}
      >
        What was broken
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-component-sm)]">
        {points.map((point, i) => (
          <ScrollReveal key={i}>
            <div
              style={{
                padding: 'var(--space-component-lg)',
                borderRadius: '8px',
                background: 'var(--color-surface)',
                border: '0.5px solid var(--color-border)',
                height: '100%',
              }}
            >
              <span
                className="text-label"
                style={{
                  color: accentColor,
                  marginBottom: '8px',
                  display: 'block',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p
                className="text-body"
                style={{
                  color: 'var(--color-ink)',
                  fontWeight: 500,
                  margin: '0 0 6px 0',
                }}
              >
                {point.title}
              </p>
              <p
                className="text-body-sm"
                style={{
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                }}
              >
                {point.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
