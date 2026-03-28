'use client'

import type { GlossaryTerm } from '@/data/types'
import ScrollReveal from '@/components/ui/ScrollReveal'
import BarnabyTooltip from './BarnabyTooltip'

interface Finding {
  title: string
  description: string
}

interface KeyFindingsProps {
  findings: Finding[]
  /** Phase accent color for the number indicators. */
  accentColor?: string
  /** Glossary terms to highlight with Barnaby tooltips. */
  glossary?: GlossaryTerm[]
}

/** Render text with glossary terms replaced by BarnabyTooltip components. */
function GlossaryText({
  text,
  glossary,
  accentColor,
  className,
  style,
}: {
  text: string
  glossary: GlossaryTerm[]
  accentColor: string
  className?: string
  style?: React.CSSProperties
}) {
  const sorted = [...glossary].sort((a, b) => b.term.length - a.term.length)
  const escaped = sorted.map(g => g.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi')

  const used = new Set<string>()
  const parts = text.split(pattern)

  return (
    <span className={className} style={style}>
      {parts.map((part, i) => {
        const termLower = part.toLowerCase()
        const match = sorted.find(g => g.term.toLowerCase() === termLower)

        if (match && !used.has(termLower)) {
          used.add(termLower)
          return (
            <BarnabyTooltip
              key={i}
              term={part}
              definition={match.definition}
              accentColor={accentColor}
            />
          )
        }

        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

/**
 * Scannable key findings — bold statement + one-line explanation.
 * Breaks up long discovery/solution paragraphs into digestible insights.
 */
export default function KeyFindings({ findings, accentColor = 'var(--color-accent)', glossary }: KeyFindingsProps) {
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
        Key findings
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-component-sm)' }}>
        {findings.map((finding, i) => (
          <ScrollReveal key={i}>
            <div
              style={{
                padding: 'var(--space-component-md) var(--space-component-lg)',
                borderRadius: '8px',
                background: 'var(--color-surface)',
                border: '0.5px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', gap: 'var(--space-component-md)', alignItems: 'baseline' }}>
                <span
                  className="text-label"
                  style={{
                    color: accentColor,
                    flexShrink: 0,
                    minWidth: '20px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p
                    className="text-body"
                    style={{
                      color: 'var(--color-ink)',
                      fontWeight: 500,
                      margin: 0,
                    }}
                  >
                    {glossary && glossary.length > 0 ? (
                      <GlossaryText text={finding.title} glossary={glossary} accentColor={accentColor} />
                    ) : (
                      finding.title
                    )}
                  </p>
                  <p
                    className="text-body-sm"
                    style={{
                      color: 'var(--color-text-secondary)',
                      margin: '4px 0 0 0',
                    }}
                  >
                    {glossary && glossary.length > 0 ? (
                      <GlossaryText text={finding.description} glossary={glossary} accentColor={accentColor} />
                    ) : (
                      finding.description
                    )}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
