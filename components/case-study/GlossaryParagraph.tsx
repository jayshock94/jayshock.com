'use client'

import type { GlossaryTerm } from '@/data/types'
import BarnabyTooltip from './BarnabyTooltip'

interface GlossaryParagraphProps {
  text: string
  glossary: GlossaryTerm[]
  accentColor: string
  /** CSS class for the paragraph element. */
  className?: string
  /** Inline styles for the paragraph. */
  style?: React.CSSProperties
}

/**
 * Renders a full <p> element with glossary terms replaced by interactive BarnabyTooltip components.
 * This is a client component that owns the entire paragraph so React can hydrate the tooltips.
 * Case-insensitive matching. Only highlights the first occurrence of each term per paragraph.
 */
export default function GlossaryParagraph({ text, glossary, accentColor, className, style }: GlossaryParagraphProps) {
  // Build a single regex that matches any glossary term (case-insensitive)
  // Sort by length descending so longer terms match first
  const sorted = [...glossary].sort((a, b) => b.term.length - a.term.length)
  const escaped = sorted.map(g => g.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  // Match glossary terms plus optional common English suffixes so "chargebacks" matches "chargeback"
  const pattern = new RegExp(`((?:${escaped.join('|')})(?:s|es|ed|ing)?)`, 'gi')

  // Track which terms we've already highlighted to only do first occurrence
  const used = new Set<string>()
  const parts = text.split(pattern)

  return (
    <p className={className} style={style}>
      {parts.map((part, i) => {
        const termLower = part.toLowerCase()
        const match = sorted.find(g => termLower.startsWith(g.term.toLowerCase()))

        const baseTerm = match?.term.toLowerCase()
        if (match && baseTerm && !used.has(baseTerm)) {
          used.add(baseTerm)
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
    </p>
  )
}
