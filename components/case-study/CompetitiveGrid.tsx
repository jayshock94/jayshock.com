import ScrollReveal from '@/components/ui/ScrollReveal'
import Image from 'next/image'

interface Competitor {
  name: string
  /** Path to logo image. Empty string shows placeholder. */
  logo: string
  /** What category: 'bank', 'credit-union', 'fintech', 'wallet' */
  category: string
}

interface CompetitiveGridProps {
  competitors: Competitor[]
  /** What was evaluated across all competitors. */
  criteria: string[]
}

/**
 * Competitive analysis grid — shows the apps that were analyzed.
 * Logo placeholders until real images are provided.
 */
export default function CompetitiveGrid({ competitors, criteria }: CompetitiveGridProps) {
  return (
    <ScrollReveal>
      <div
        className=""
        style={{ marginTop: 'var(--space-stack-lg)', marginBottom: 'var(--space-stack-lg)' }}
      >
        <p
          className="text-label"
          style={{
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-stack-sm)',
          }}
        >
          Competitive analysis
        </p>
        <p
          className="text-body-sm"
          style={{
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-stack-md)',
          }}
        >
          {competitors.length} apps analyzed across {criteria.join(', ')}.
        </p>

        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-[var(--space-component-sm)]"
        >
          {competitors.map((comp) => (
            <div
              key={comp.name}
              style={{
                padding: 'var(--space-component-md)',
                borderRadius: '8px',
                background: 'var(--color-surface)',
                border: '0.5px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-component-sm)',
                aspectRatio: '1',
              }}
            >
              {comp.logo ? (
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '6px',
                  }}
                >
                  <Image
                    src={comp.logo}
                    alt={comp.name}
                    width={36}
                    height={36}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: 'var(--color-surface-elevated)',
                    border: '0.5px solid var(--color-border)',
                  }}
                />
              )}
              <p
                className="text-body-sm"
                style={{
                  color: 'var(--color-text-muted)',
                  margin: 0,
                  textAlign: 'center',
                  fontSize: '11px',
                  lineHeight: 1.3,
                }}
              >
                {comp.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}
