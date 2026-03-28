'use client'

import { useCallback } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface RoleMeta {
  label: string
  value: string
}

interface SkillChip {
  text: string
  barnabyMessage: string
}

interface CaseStudyLedeProps {
  context?: string
  overview?: string
  /** Structured role metadata — replaces long overview paragraph when provided. */
  roleMeta?: RoleMeta[]
  /** Short summary sentence shown below the metadata grid. */
  roleSummary?: string
  /** Interactive skill chips — fully rounded, open Barnaby on click. */
  skillChips?: SkillChip[]
}

export default function CaseStudyLede({ context, overview, roleMeta, roleSummary, skillChips }: CaseStudyLedeProps) {
  if (!context && !overview && !roleMeta) return null

  const openBarnaby = useCallback((message: string) => {
    window.dispatchEvent(
      new CustomEvent('open-barnaby', { detail: { message } })
    )
  }, [])

  return (
    <section
      className="bg-[var(--color-canvas)]"
      style={{
        paddingTop: 'var(--space-section-md)',
        paddingBottom: 'var(--space-section-sm)',
      }}
      aria-label="Project context"
    >
      <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">

        {/* Section eyebrow */}
        <ScrollReveal>
          <div className="flex items-center gap-[var(--space-component-sm)] mb-[var(--space-stack-sm)]">
            <span className="text-label" style={{ color: 'var(--color-text-placeholder)' }}>
              00
            </span>
            <span className="text-label" style={{ color: 'var(--color-ink)' }}>
              Overview
            </span>
          </div>
        </ScrollReveal>

        {/* Context as lede paragraph */}
        {context && (
          <ScrollReveal>
            <p
              className="text-intro max-w-content"
              style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-stack-lg)' }}
            >
              {context}
            </p>
          </ScrollReveal>
        )}

        {/* Structured role metadata grid */}
        {roleMeta && roleMeta.length > 0 && (
          <ScrollReveal>
            <div style={{ maxWidth: 'var(--space-content-max)' }}>
              <p
                className="text-label"
                style={{
                  color: 'var(--color-text-muted)',
                  marginBottom: 'var(--space-stack-md)',
                }}
              >
                My role
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-[var(--space-component-sm)]">
                {roleMeta.map((meta) => (
                  <div
                    key={meta.label}
                    style={{
                      padding: 'var(--space-component-md) var(--space-component-lg)',
                      borderRadius: '8px',
                      background: 'var(--color-surface)',
                      border: '0.5px solid var(--color-border)',
                    }}
                  >
                    <p
                      className="text-label"
                      style={{
                        color: 'var(--color-text-muted)',
                        margin: '0 0 6px 0',
                      }}
                    >
                      {meta.label}
                    </p>
                    <p
                      className="text-body-sm"
                      style={{
                        color: 'var(--color-ink)',
                        margin: 0,
                        fontWeight: 500,
                      }}
                    >
                      {meta.value}
                    </p>
                  </div>
                ))}
              </div>

              {roleSummary && (
                <p
                  className="text-body"
                  style={{
                    color: 'var(--color-text-secondary)',
                    marginTop: 'var(--space-stack-md)',
                  }}
                >
                  {roleSummary}
                </p>
              )}

              {/* Skill chips — fully rounded = interactive */}
              {skillChips && skillChips.length > 0 && (
                <div
                  className="flex flex-wrap gap-[var(--space-component-xs)]"
                  style={{ marginTop: 'var(--space-stack-md)' }}
                >
                  {skillChips.map((chip) => (
                    <button
                      key={chip.text}
                      type="button"
                      onClick={() => openBarnaby(chip.barnabyMessage)}
                      className="text-body-sm"
                      style={{
                        padding: '6px 14px',
                        borderRadius: '999px',
                        background: 'var(--color-surface)',
                        border: '0.5px solid var(--color-border)',
                        color: 'var(--color-text-secondary)',
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
                      {chip.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Fallback: long overview paragraph (for case studies without roleMeta) */}
        {!roleMeta && overview && (
          <ScrollReveal>
            <div
              style={{
                marginTop: 'var(--space-stack-lg)',
                paddingLeft: 'var(--space-component-lg)',
                borderLeft: '2px solid var(--color-border-mid)',
                maxWidth: 'var(--space-content-max)',
              }}
            >
              <p
                className="text-label"
                style={{
                  color: 'var(--color-text-muted)',
                  marginBottom: 'var(--space-stack-xs)',
                }}
              >
                My role
              </p>
              <p
                className="text-body"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {overview}
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
