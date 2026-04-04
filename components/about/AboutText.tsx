'use client'

import { useState } from 'react'

const paragraphs = [
  `I started with video and graphic design, fell into UX through software engineering friends, and never looked back.`,
  `I pay attention to what people mean, not just what they say. It is basically my whole approach to research, and the reason I spot gaps other people walk past.`,
]

export default function AboutText() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="flex flex-col gap-[var(--space-component-md)]"
      style={{ maxWidth: 'var(--space-content-max)' }}
    >
      {/* First paragraph — always visible */}
      <p className="text-body-lg text-[var(--color-text-secondary)]">
        {paragraphs[0]}
      </p>

      {/* Remaining paragraphs — always visible on desktop, toggle on mobile */}
      <div className={expanded ? '' : 'hidden md:block'}>
        {paragraphs.slice(1).map((p, i) => (
          <p
            key={i}
            className="text-body-lg text-[var(--color-text-secondary)]"
          >
            {p}
          </p>
        ))}
      </div>

      {/* Show more / less — mobile only */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="md:hidden"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          fontFamily: 'var(--font-outfit), system-ui, sans-serif',
          fontSize: 'var(--text-body-sm-size)',
          fontWeight: 400,
          color: 'var(--color-text-muted)',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        {expanded ? 'Show less' : 'Show more'}
      </button>
    </div>
  )
}
