'use client'

import { useState, useCallback } from 'react'
import { TOOLKIT_TOOLS, AI_TOOLS, TOOLKIT_SKILLS } from '@/data/resume'

interface ToolCategory {
  id: string
  label: string
  color: string
  bg: string
  border: string
  items: readonly string[]
}

const CATEGORIES: ToolCategory[] = [
  {
    id: 'design',
    label: 'Design',
    color: 'var(--phase-impact-label)',
    bg: 'rgba(180, 160, 224, 0.12)',
    border: 'rgba(180, 160, 224, 0.22)',
    items: TOOLKIT_TOOLS,
  },
  {
    id: 'ai',
    label: 'AI',
    color: 'var(--phase-discovery-label)',
    bg: 'rgba(128, 196, 180, 0.12)',
    border: 'rgba(128, 196, 180, 0.22)',
    items: AI_TOOLS,
  },
  {
    id: 'skills',
    label: 'Skills',
    color: 'var(--phase-problem-label)',
    bg: 'rgba(200, 170, 140, 0.12)',
    border: 'rgba(200, 170, 140, 0.22)',
    items: TOOLKIT_SKILLS,
  },
]

export default function ToolsToggle() {
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
    <div className="flex flex-col items-center md:items-start">
      {/* Segment toggle */}
      <div
        role="tablist"
        aria-label="Tool categories"
        className="segment-group mb-[16px]"
      >
        {CATEGORIES.map((c, i) => {
          const isActive = active === i
          return (
            <button
              key={c.id}
              role="tab"
              id={`tools-tab-${c.id}`}
              className="segment-tab"
              aria-selected={isActive}
              aria-controls="tools-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => handleKey(e, i)}
              style={{
                minWidth:             c.id === 'ai' ? '48px' : undefined,
                backgroundImage:      isActive ? `linear-gradient(${c.bg}, ${c.bg})` : 'none',
                backgroundColor:      isActive ? 'rgba(22, 22, 22, 0.50)' : 'transparent',
                backdropFilter:       isActive ? 'blur(48px) saturate(180%)' : 'none',
                WebkitBackdropFilter: isActive ? 'blur(48px) saturate(180%)' : 'none',
                boxShadow:            isActive ? '0 4px 16px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.50)' : 'none',
                color:                isActive ? c.color : 'var(--color-text-secondary)',
              }}
            >
              {c.label}
            </button>
          )
        })}
      </div>

      {/* Chip grid panel */}
      <div
        id="tools-panel"
        role="tabpanel"
        aria-labelledby={`tools-tab-${cat.id}`}
        className="w-full"
      >
        <div
          className="flex flex-wrap gap-x-[8px] gap-y-[16px]"
          style={{
            border: '1px solid var(--color-border-subtle-16)',
            borderRadius: '8px',
            padding: '20px 24px',
          }}
        >
          {cat.items.map((item) => (
            <span
              key={item}
              style={{
                padding: '6px 16px',
                height: '32px',
                display: 'inline-flex',
                alignItems: 'center',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-text-placeholder)',
                background: 'transparent',
                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                fontSize: 'var(--text-ui-md-size)',
                fontWeight: 500,
                color: cat.color,
                letterSpacing: '0.1px',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
