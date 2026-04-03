'use client'

import { useState, useCallback } from 'react'
import { TOOLKIT_TOOLS, TOOLKIT_SKILLS, EDUCATION, CERTIFICATIONS } from '@/data/resume'
// CERTIFICATIONS includes all certs (primary + LinkedIn courses)

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ChipCategory {
  id: string
  label: string
  color: string
  bg: string
  border: string
  kind: 'chips'
  items: string[]
}

interface CardCategory {
  id: string
  label: string
  color: string
  bg: string
  border: string
  kind: 'cards'
  items: { title: string; subtitle: string }[]
}

type Category = ChipCategory | CardCategory

const CATEGORIES: Category[] = [
  {
    id: 'tools',
    label: 'Tools',
    color: 'var(--phase-impact-label)',
    bg: 'rgba(180, 160, 224, 0.12)',
    border: 'rgba(180, 160, 224, 0.22)',
    kind: 'chips',
    items: [...TOOLKIT_TOOLS],
  },
  {
    id: 'skills',
    label: 'Skills',
    color: 'var(--phase-problem-label)',
    bg: 'rgba(200, 170, 140, 0.12)',
    border: 'rgba(200, 170, 140, 0.22)',
    kind: 'chips',
    items: [...TOOLKIT_SKILLS],
  },
  {
    id: 'education',
    label: 'Education',
    color: 'var(--phase-discovery-label)',
    bg: 'rgba(128, 196, 180, 0.12)',
    border: 'rgba(128, 196, 180, 0.22)',
    kind: 'cards',
    items: EDUCATION.map(e => ({ title: e.label, subtitle: e.institution })),
  },
  {
    id: 'certs',
    label: 'Certs',
    color: 'var(--phase-solution-label)',
    bg: 'rgba(140, 174, 214, 0.12)',
    border: 'rgba(140, 174, 214, 0.22)',
    kind: 'cards',
    items: CERTIFICATIONS.map(c => ({ title: c.title, subtitle: c.institution })),
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Toolkit() {
  const [active, setActive] = useState(0)
  const cat = CATEGORIES[active]

  const handleKey = useCallback((e: React.KeyboardEvent, i: number) => {
    const n = CATEGORIES.length
    let next = i
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % n
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + n) % n
    else return
    e.preventDefault()
    setActive(next)
  }, [])

  return (
    <div>
      {/* Header */}
      <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-xs)] text-center">
        My toolkit
      </p>
      <h2 className="text-h2 text-[var(--color-ink)] mb-[var(--space-stack-sm)] text-center">
        What I work with.
      </h2>
      <p
        className="text-body text-[var(--color-text-secondary)] mb-[var(--space-stack-lg)] text-center mx-auto"
        style={{ maxWidth: 'var(--space-content-max)' }}
      >
        The software, skills, and credentials I bring to the table.
      </p>

      {/* Category pills */}
      <div
        role="tablist"
        aria-label="Toolkit categories"
        className="flex flex-wrap justify-center gap-[var(--space-component-sm)] mb-[var(--space-stack-lg)]"
      >
        {CATEGORIES.map((c, i) => {
          const isActive = active === i
          return (
            <button
              key={c.id}
              role="tab"
              id={`toolkit-tab-${c.id}`}
              aria-selected={isActive}
              aria-controls="toolkit-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => handleKey(e, i)}
              style={{
                padding: '10px 20px',
                borderRadius: '999px',
                border: isActive
                  ? `1px solid ${c.border}`
                  : '0.5px solid var(--color-border)',
                background: isActive ? c.bg : 'var(--color-surface)',
                backdropFilter: isActive ? 'blur(48px) saturate(180%)' : 'none',
                WebkitBackdropFilter: isActive ? 'blur(48px) saturate(180%)' : 'none',
                boxShadow: isActive
                  ? '0 4px 20px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.10)'
                  : 'none',
                color: isActive ? c.color : 'var(--color-text-muted)',
                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: isActive ? 500 : 400,
                letterSpacing: '0.02em',
                cursor: 'pointer',
                transform: `scale(${isActive ? 1.06 : 1})`,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                outline: 'none',
              }}
            >
              {c.label}
            </button>
          )
        })}
      </div>

      {/* Content panel — only render active tab */}
      <div
        id="toolkit-panel"
        role="tabpanel"
        aria-labelledby={`toolkit-tab-${cat.id}`}
      >
        {cat.kind === 'chips' ? (
          <ChipGrid category={cat} />
        ) : (
          <CardGrid category={cat} />
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Chip grid — for Tools and Skills                                   */
/* ------------------------------------------------------------------ */

function ChipGrid({ category }: { category: ChipCategory }) {
  return (
    <div className="flex flex-wrap justify-center gap-[var(--space-component-sm)] max-w-data mx-auto">
      {category.items.map((item) => (
        <span
          key={item}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            border: `0.5px solid ${category.border}`,
            background: 'transparent',
            fontFamily: 'var(--font-outfit), system-ui, sans-serif',
            fontSize: '13px',
            fontWeight: 400,
            color: category.color,
            letterSpacing: '0.01em',
            whiteSpace: 'nowrap',
          }}
        >
          {item}
        </span>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Card grid — for Education and Certs                                */
/* ------------------------------------------------------------------ */

function CardGrid({ category }: { category: CardCategory }) {
  const [expanded, setExpanded] = useState(false)
  const VISIBLE_COUNT = 4
  const hasMore = category.items.length > VISIBLE_COUNT
  const remaining = category.items.length - VISIBLE_COUNT
  const visible = expanded ? category.items : category.items.slice(0, VISIBLE_COUNT)

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-component-sm)]">
        {visible.map((item) => (
          <div
            key={item.title}
            style={{
              padding: 'var(--space-component-md) var(--space-component-lg)',
              borderRadius: '10px',
              border: `0.5px solid ${category.border}`,
              background: category.bg,
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
                marginBottom: '4px',
              }}
            >
              {item.title}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: 300,
                color: category.color,
              }}
            >
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          style={{
            marginTop: 'var(--space-stack-sm)',
            background: 'none',
            border: 'none',
            padding: 0,
            fontFamily: 'var(--font-outfit), system-ui, sans-serif',
            fontSize: '13px',
            fontWeight: 400,
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
          }}
        >
          {expanded ? 'Show less' : `Show ${remaining} more`}
        </button>
      )}
    </div>
  )
}
