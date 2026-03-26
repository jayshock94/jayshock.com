'use client'

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
      {/* Mini avatar with thinking eyes */}
      <div
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '8px',
          background: 'var(--color-button-primary)',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <span
          className="chat-eye--thinking"
          style={{
            position: 'absolute',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: 'var(--color-button-text)',
            top: '45%',
            left: '30%',
          }}
        />
        <span
          className="chat-eye--thinking"
          style={{
            position: 'absolute',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: 'var(--color-button-text)',
            top: '45%',
            right: '30%',
          }}
        />
      </div>

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
