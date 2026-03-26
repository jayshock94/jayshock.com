'use client'

import { useRef } from 'react'

interface ChatFABProps {
  isOpen: boolean
  isStreaming: boolean
  onClick: () => void
}

export default function ChatFAB({ isOpen, isStreaming, onClick }: ChatFABProps) {
  // Track if the FAB has been opened at least once — after that, skip entrance animation
  const hasOpened = useRef(false)
  if (isOpen) hasOpened.current = true

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
      className={isOpen ? '' : (hasOpened.current ? '' : 'chat-fab-enter')}
      style={{
        position: 'fixed',
        bottom: 'max(24px, env(safe-area-inset-bottom))',
        right: 'max(24px, env(safe-area-inset-right))',
        width: 'var(--chat-fab-size)',
        height: 'var(--chat-fab-size)',
        borderRadius: 'var(--chat-fab-radius)',
        border: 'none',
        background: 'var(--color-button-primary)',
        boxShadow: 'var(--shadow-chat-fab)',
        cursor: 'pointer',
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms ease',
        transform: 'scale(1)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.06)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
      onMouseDown={e => {
        e.currentTarget.style.transform = 'scale(0.94)'
      }}
      onMouseUp={e => {
        e.currentTarget.style.transform = 'scale(1.06)'
      }}
    >
      {isOpen ? (
        // Close icon (X)
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M5 5L15 15M15 5L5 15"
            stroke="var(--color-button-text)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        // Weebo eyes
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <span
            className={isStreaming ? 'chat-eye--thinking' : 'chat-eye'}
            style={{
              position: 'absolute',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: 'var(--color-button-text)',
              top: '45%',
              left: '32%',
            }}
          />
          <span
            className={isStreaming ? 'chat-eye--thinking' : 'chat-eye'}
            style={{
              position: 'absolute',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: 'var(--color-button-text)',
              top: '45%',
              right: '32%',
              animationDelay: '0.1s',
            }}
          />
        </div>
      )}
    </button>
  )
}
