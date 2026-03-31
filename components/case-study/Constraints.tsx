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
 * Interactive constraint pills with Barnaby chat icon.
 * Pill shape signals clickable. Cat icon signals "ask about this."
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
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 'var(--space-component-sm)',
            marginBottom: 'var(--space-stack-md)',
          }}
        >
          <p
            className="text-label"
            style={{
              color: 'var(--color-text-muted)',
              margin: 0,
            }}
          >
            Constraints
          </p>
          <span
            className="text-body-sm"
            style={{
              color: 'var(--color-text-placeholder)',
              fontStyle: 'italic',
            }}
          >
            tap to ask Barnaby
          </span>
        </div>

        <div className="flex flex-wrap gap-[var(--space-component-sm)]">
          {constraints.map((constraint, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleClick(constraint.barnabyMessage)}
              style={{
                padding: 'var(--space-component-base) var(--space-component-md)',
                paddingRight: 'var(--space-component-lg)',
                borderRadius: '999px',
                background: 'var(--color-surface)',
                border: '0.5px solid var(--color-border)',
                cursor: 'pointer',
                transition: 'background 200ms, border-color 200ms, transform 200ms',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--color-surface-elevated)'
                e.currentTarget.style.borderColor = 'var(--color-border-mid)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--color-surface)'
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Small Barnaby cat icon */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                style={{ flexShrink: 0, opacity: 0.5 }}
              >
                <path
                  d="M4 7V4l3 3M16 7V4l-3 3M3 10a7 7 0 0 1 14 0v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3z"
                  stroke="var(--color-text-muted)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="8" cy="11" r="1" fill="var(--color-text-muted)" />
                <circle cx="12" cy="11" r="1" fill="var(--color-text-muted)" />
              </svg>

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
