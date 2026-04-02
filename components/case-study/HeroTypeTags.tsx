'use client'

import { useCallback } from 'react'

interface HeroTypeTagsProps {
  tags: string[]
  /** Map of tag text to Barnaby question. Tags not in this map are non-interactive. */
  barnabyMessages?: Record<string, string>
}

/**
 * Interactive hero type tags — fully rounded pills.
 * Clicking opens Barnaby with a relevant question about that skill area.
 */
export default function HeroTypeTags({ tags, barnabyMessages }: HeroTypeTagsProps) {
  const handleClick = useCallback((message: string) => {
    window.dispatchEvent(
      new CustomEvent('open-barnaby', { detail: { message } })
    )
  }, [])

  return (
    <div
      className="hero-fade-up flex flex-wrap justify-center gap-[var(--space-component-xs)]"
      style={{ animationDelay: '650ms' }}
      aria-label="Project type tags"
    >
      {tags.map(tag => {
        const message = barnabyMessages?.[tag]
        const isInteractive = !!message

        if (isInteractive) {
          return (
            <button
              key={tag}
              type="button"
              onClick={() => handleClick(message)}
              className="text-ui-sm px-[14px] py-[6px]"
              style={{
                color: 'var(--hero-text-secondary)',
                border: '1px solid var(--hero-text-muted)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'background 150ms, border-color 150ms',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
                e.currentTarget.style.borderColor = ''
              }}
            >
              {tag}
            </button>
          )
        }

        return (
          <span
            key={tag}
            className="text-ui-sm px-[14px] py-[6px]"
            style={{
              color: 'var(--hero-text-secondary)',
              border: '1px solid var(--hero-text-muted)',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '999px',
            }}
          >
            {tag}
          </span>
        )
      })}
    </div>
  )
}
