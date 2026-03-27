'use client'

import { useState } from 'react'

const paragraphs = [
  `I am a product designer with 8 years in fintech and enterprise SaaS. I have spent most of that time inside systems that are too complex for their own good, making them work for the people who actually use them.`,
  `My brain finds patterns other people walk past. Growing up with dyslexia and ADHD taught me the value that comes when you truly take the time to understand people below their surface. That is the lens I bring to every research session, every stakeholder meeting, every design decision.`,
]

export default function AboutText() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="flex flex-col gap-[var(--space-stack-sm)] mb-[var(--space-stack-lg)]"
      style={{ maxWidth: 'var(--space-content-max)' }}
    >
      {/* First paragraph — always visible */}
      <p className="text-body text-[var(--color-text-secondary)]">
        {paragraphs[0]}
      </p>

      {/* Remaining paragraphs — always visible on desktop, toggle on mobile */}
      <div className={expanded ? '' : 'hidden md:block'}>
        {paragraphs.slice(1).map((p, i) => (
          <p
            key={i}
            className="text-body text-[var(--color-text-secondary)]"
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
