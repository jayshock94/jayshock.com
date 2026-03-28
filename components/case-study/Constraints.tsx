'use client'

import { useCallback } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface Constraint {
  text: string
  /** Message sent to Barnaby when clicked. */
  barnabyMessage: string
}

interface ConstraintsProps {
  constraints: Constraint[]
}

/**
 * Interactive constraint pills — fully rounded = clickable.
 * Opens Barnaby chat with a pre-loaded question about the constraint.
 */
export default function Constraints({ constraints }: ConstraintsProps) {
  const handleClick = useCallback((message: string) => {
    window.dispatchEvent(
      new CustomEvent('open-barnaby', { detail: { message } })
    )
  }, [])

  return (
    <ScrollReveal>
      <div style={{ marginTop: 'var(--space-stack-lg)', marginBottom: 'var(--space-stack-md)' }}>
        <p
          className="text-label"
          style={{
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-stack-md)',
          }}
        >
          Constraints
        </p>

        <div className="flex flex-wrap gap-[var(--space-component-sm)]">
          {constraints.map((constraint, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleClick(constraint.barnabyMessage)}
              style={{
                padding: 'var(--space-component-base) var(--space-component-md)',
                borderRadius: '999px',
                background: 'var(--color-surface)',
                border: '0.5px solid var(--color-border)',
                cursor: 'pointer',
                transition: 'background 150ms, border-color 150ms',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--color-surface-elevated)'
                e.currentTarget.style.borderColor = 'var(--color-border-mid)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--color-surface)'
                e.currentTarget.style.borderColor = 'var(--color-border)'
              }}
            >
              <span
                className="text-body-sm"
                style={{
                  color: 'var(--color-text-secondary)',
                }}
              >
                {constraint.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}
