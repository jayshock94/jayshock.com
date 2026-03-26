'use client'

import { useRef } from 'react'
import CatAvatar from './CatAvatar'

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
        // Larger hit area than visual size
        width: '60px',
        height: '60px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        padding: 0,
        transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
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
        // Close icon — shown on a solid pill
        <div
          style={{
            width: 'var(--chat-fab-size)',
            height: 'var(--chat-fab-size)',
            borderRadius: 'var(--chat-fab-radius)',
            background: 'var(--color-button-primary)',
            boxShadow: 'var(--shadow-chat-fab)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 5L15 15M15 5L5 15"
              stroke="var(--color-button-text)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ) : (
        // Cat avatar — same component used everywhere
        <div style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}>
          <CatAvatar size={44} isThinking={isStreaming} />
        </div>
      )}
    </button>
  )
}
