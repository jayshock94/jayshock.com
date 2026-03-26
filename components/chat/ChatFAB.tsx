'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import CatAvatar from './CatAvatar'

const BUBBLE_DISMISSED_KEY = 'jayshock-chat-bubble-dismissed'
const AUTO_DISMISS_MS = 10000

interface ChatFABProps {
  isOpen: boolean
  isStreaming: boolean
  onClick: () => void
}

export default function ChatFAB({ isOpen, isStreaming, onClick }: ChatFABProps) {
  // Track if the FAB has been opened at least once — after that, skip entrance animation
  const hasOpened = useRef(false)
  if (isOpen) hasOpened.current = true

  // Welcome bubble state
  const [showBubble, setShowBubble] = useState(false)
  const [dismissing, setDismissing] = useState(false)

  // Check if bubble was already dismissed this session
  useEffect(() => {
    try {
      if (sessionStorage.getItem(BUBBLE_DISMISSED_KEY)) return
    } catch { /* ignore */ }

    // Show bubble after FAB entrance settles (~4.2s)
    const showTimer = setTimeout(() => setShowBubble(true), 4200)
    return () => clearTimeout(showTimer)
  }, [])

  // Auto-dismiss after 10s
  useEffect(() => {
    if (!showBubble || dismissing) return
    const timer = setTimeout(() => dismissBubble(), AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [showBubble, dismissing])

  // Hide bubble when chat opens
  useEffect(() => {
    if (isOpen && showBubble) {
      dismissBubble()
    }
  }, [isOpen, showBubble])

  const dismissBubble = useCallback(() => {
    setDismissing(true)
    try {
      sessionStorage.setItem(BUBBLE_DISMISSED_KEY, '1')
    } catch { /* ignore */ }
    // Remove from DOM after exit animation
    setTimeout(() => {
      setShowBubble(false)
      setDismissing(false)
    }, 250)
  }, [])

  const handleFABClick = useCallback(() => {
    if (showBubble) dismissBubble()
    onClick()
  }, [showBubble, dismissBubble, onClick])

  return (
    <>
      {/* Welcome bubble */}
      {showBubble && !isOpen && (
        <div
          className={dismissing ? 'chat-bubble-exit' : 'chat-bubble-enter'}
          style={{
            position: 'fixed',
            bottom: 'max(28px, env(safe-area-inset-bottom))',
            right: 'calc(max(24px, env(safe-area-inset-right)) + 72px)',
            maxWidth: '240px',
            padding: '10px 28px 10px 12px',
            borderRadius: '14px 14px 4px 14px',
            background: 'var(--glass-thin)',
            backdropFilter: 'blur(48px) saturate(180%)',
            WebkitBackdropFilter: 'blur(48px) saturate(180%)',
            border: '0.5px solid var(--glass-border-mid)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
            zIndex: 59,
          }}
        >
          {/* Dismiss button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              dismissBubble()
            }}
            aria-label="Dismiss"
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '20px',
              height: '20px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-placeholder)',
              padding: 0,
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path
                d="M1 1L7 7M7 1L1 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Message text */}
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-outfit), system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 300,
              lineHeight: '1.5',
              color: 'var(--color-text-secondary)',
            }}
          >
            Ask me anything about Jay, or tell me what you&apos;re looking for.
          </p>
        </div>
      )}

      {/* FAB button */}
      <button
        type="button"
        onClick={handleFABClick}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className={isOpen ? '' : (hasOpened.current ? '' : 'chat-fab-enter')}
        style={{
          position: 'fixed',
          bottom: 'max(24px, env(safe-area-inset-bottom))',
          right: 'max(24px, env(safe-area-inset-right))',
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
          <div style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}>
            <CatAvatar size={44} isThinking={isStreaming} />
          </div>
        )}
      </button>
    </>
  )
}
