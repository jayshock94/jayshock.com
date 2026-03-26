'use client'

import CatAvatar from './CatAvatar'

/** Shown while waiting for the first token from the API. */
export default function TypingIndicator() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-component-sm)',
        padding: '8px 0',
      }}
    >
      <CatAvatar size={24} isThinking />

      {/* Pulsing dots */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="chat-typing-dot"
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--color-text-muted)',
              animationDelay: `${i * 160}ms`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
