'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import CatAvatar from './CatAvatar'
import ChatBubble from './ChatBubble'

const AUTO_DISMISS_MS = 10000
const SITE_ENTERED_KEY = 'jayshock-chat-bubble-site-entered'
const CASE_STUDY_KEY = 'jayshock-chat-bubble-case-study'

interface ChatFABProps {
  isOpen: boolean
  isStreaming: boolean
  onClick: () => void
  /** Current page type — changes the bubble message. */
  pageType?: string
}

const BUBBLE_MESSAGES: Record<string, string> = {
  'case-study': 'I was there for this one. Ask me anything about it.',
  home: 'Ask me anything about Jay, or tell me what you\'re looking for.',
}

export default function ChatFAB({ isOpen, isStreaming, onClick, pageType }: ChatFABProps) {
  // Only show bubble on first site entry OR first case study visit
  const isCaseStudy = pageType === 'case-study'
  const dismissKey = isCaseStudy ? CASE_STUDY_KEY : SITE_ENTERED_KEY

  // Track if the FAB has been opened at least once — after that, skip entrance animation
  const hasOpened = useRef(false)
  if (isOpen) hasOpened.current = true

  // Welcome bubble state
  const [showBubble, setShowBubble] = useState(false)
  const [dismissing, setDismissing] = useState(false)

  // Only show bubble on first site entry (home) or first case study visit
  useEffect(() => {
    // Skip bubble for about, experience, contact pages
    if (!isCaseStudy && pageType !== 'home' && pageType !== undefined) return

    try {
      if (sessionStorage.getItem(dismissKey)) return
    } catch { /* ignore */ }

    const delay = isCaseStudy ? 2000 : 4200
    const showTimer = setTimeout(() => setShowBubble(true), delay)
    return () => clearTimeout(showTimer)
  }, [dismissKey, isCaseStudy, pageType])

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
      sessionStorage.setItem(dismissKey, '1')
    } catch { /* ignore */ }
    setTimeout(() => {
      setShowBubble(false)
      setDismissing(false)
    }, 250)
  }, [dismissKey])

  const handleFABClick = useCallback(() => {
    if (showBubble) dismissBubble()
    onClick()
  }, [showBubble, dismissBubble, onClick])

  return (
    <>
      {/* Welcome bubble */}
      {showBubble && !isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 'calc(max(24px, env(safe-area-inset-bottom)) + 96px)',
            right: 'calc(max(24px, env(safe-area-inset-right)) - 10px)',
            maxWidth: '240px',
            zIndex: 59,
          }}
        >
          <ChatBubble dismissing={dismissing}>
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
                top: '6px',
                right: '6px',
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

            {/* Header */}
            <p
              style={{
                margin: '0 0 6px 0',
                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                fontSize: 'var(--text-label-size)',
                fontWeight: 'var(--text-label-weight)',
                letterSpacing: 'var(--text-label-tracking)',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
              }}
            >
              Barnaby
            </p>

            {/* Message text */}
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                fontSize: 'var(--text-body-size)',
                fontWeight: 'var(--text-body-weight)',
                lineHeight: 'var(--text-body-line-height)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {BUBBLE_MESSAGES[pageType ?? 'home'] ?? BUBBLE_MESSAGES.home}
            </p>
          </ChatBubble>
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
