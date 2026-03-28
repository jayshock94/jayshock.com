import ScrollReveal from '@/components/ui/ScrollReveal'

interface Method {
  title: string
  description: string
}

interface ResearchMethodsProps {
  methods: Method[]
}

/**
 * Research methods grid — shows what research activities were done.
 * Clean cards, no icons. Structured text only.
 */
export default function ResearchMethods({ methods }: ResearchMethodsProps) {
  return (
    <div
      className="max-w-content"
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
        className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-component-sm)]"
      >
        {methods.map((method, i) => (
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
