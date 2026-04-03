import ScrollReveal from '@/components/ui/ScrollReveal'

interface Method {
  title: string
  description: string
}

interface ResearchMethodsProps {
  methods: Method[]
  accentColor?: string
}

/**
 * Research methods as a horizontal numbered list.
 * Minimal chrome, no cards — just structured steps with a connecting line.
 * Visually distinct from PainPoints (cards) and KeyFindings (accent-top cards).
 */
export default function ResearchMethods({ methods, accentColor = 'var(--phase-discovery-label)' }: ResearchMethodsProps) {
  return (
    <div
      className="max-w-content mx-auto"
      style={{ marginTop: 'var(--space-stack-lg)', marginBottom: 'var(--space-stack-lg)' }}
    >
      <p
        className="text-label"
        style={{
          color: 'var(--color-text-muted)',
          marginBottom: 'var(--space-stack-md)',
        }}
      >
        Research methods
      </p>

      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-[var(--space-component-md)]"
      >
        {methods.map((method, i) => (
          <ScrollReveal key={i}>
            <div
              style={{
                height: '100%',
                position: 'relative',
              }}
            >
              {/* Step number with accent underline */}
              <div
                style={{
                  marginBottom: 'var(--space-component-sm)',
                  paddingBottom: 'var(--space-component-sm)',
                  borderBottom: `2px solid ${accentColor}`,
                  display: 'inline-block',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: accentColor,
                    letterSpacing: '0.05em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <p
                className="text-body"
                style={{
                  color: 'var(--color-ink)',
                  fontWeight: 500,
                  margin: '0 0 6px 0',
                }}
              >
                {method.title}
              </p>
              <p
                className="text-body-sm"
                style={{
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                }}
              >
                {method.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
