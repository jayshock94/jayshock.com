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
 * Key findings with filled number badges, larger titles, and accent top border.
 * These are the most important insights — they should punch hardest visually.
 */
export default function KeyFindings({ findings, accentColor = 'var(--color-accent)', glossary }: KeyFindingsProps) {
  return (
    <div
      className="max-w-data mx-auto"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-component-sm)]">
        {findings.map((finding, i) => (
          <ScrollReveal key={i}>
            <div
              style={{
                padding: 'var(--space-component-lg)',
                borderRadius: '8px',
                background: 'var(--color-surface)',
                border: '0.5px solid var(--color-border)',
                borderTop: `3px solid ${accentColor}`,
                height: '100%',
              }}
            >
              {/* Filled circle badge */}
              <span
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: accentColor,
                  color: 'var(--color-canvas)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  marginBottom: 'var(--space-component-sm)',
                }}
              >
                {i + 1}
              </span>

              <p
                className="text-h4"
                style={{
                  color: 'var(--color-ink)',
                  margin: '0 0 8px 0',
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
                  margin: 0,
                }}
              >
                {glossary && glossary.length > 0 ? (
                  <GlossaryText text={finding.description} glossary={glossary} accentColor={accentColor} />
                ) : (
                  finding.description
                )}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
