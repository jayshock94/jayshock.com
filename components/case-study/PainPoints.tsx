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
 * Pain point cards with left accent border and filled number badges.
 * Visual tension signals "this was broken" at a glance.
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-component-sm)]">
        {points.map((point, i) => (
          <ScrollReveal key={i}>
            <div
              style={{
                padding: 'var(--space-component-lg)',
                paddingLeft: 'var(--space-component-lg)',
                borderRadius: '8px',
                background: 'var(--color-surface)',
                border: '0.5px solid var(--color-border)',
                borderLeft: `3px solid ${accentColor}`,
                height: '100%',
                display: 'flex',
                gap: 'var(--space-component-md)',
              }}
            >
              {/* Filled number badge */}
              <span
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: accentColor,
                  color: 'var(--color-canvas)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                {i + 1}
              </span>

              <div style={{ flex: 1, minWidth: 0 }}>
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
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
