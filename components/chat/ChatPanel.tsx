'use client'

import { useRef, useEffect } from 'react'
import type { ChatMessage as ChatMessageType, SuggestionChip as SuggestionChipType } from '@/lib/chatbot/types'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import TypingIndicator from './TypingIndicator'
import SuggestionChip from './SuggestionChip'

interface ChatPanelProps {
  messages: ChatMessageType[]
  isStreaming: boolean
  /** True when waiting for first token (show typing indicator). */
  isWaiting: boolean
  loadingMessage: string | null
  chips: SuggestionChipType[]
  showChips: boolean
  onSendMessage: (text: string) => void
  onSelectChip: (chip: SuggestionChipType) => void
  onClose: () => void
}

export default function ChatPanel({
  messages,
  isStreaming,
  isWaiting,
  loadingMessage,
  chips,
  showChips,
  onSendMessage,
  onSelectChip,
  onClose,
}: ChatPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages, but only if user is near bottom
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 100

    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isWaiting])

  // Lock body scroll on mobile when panel is open
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [])

  return (
    <div
      className="glass-chat-panel chat-panel-enter"
      style={{
        position: 'fixed',
        zIndex: 60,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        // Desktop positioning
        bottom: '88px',
        right: '24px',
        width: 'var(--chat-panel-width)',
        height: 'var(--chat-panel-height)',
        borderRadius: 'var(--chat-panel-radius)',
      }}
    >
      {/* --- Header --- */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-component-md)',
          borderBottom: '0.5px solid var(--color-border)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-component-sm)' }}>
          {/* Mini Weebo avatar */}
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: 'var(--color-button-primary)',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <span
              className="chat-eye"
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--color-button-text)',
                top: '45%',
                left: '28%',
              }}
            />
            <span
              className="chat-eye"
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--color-button-text)',
                top: '45%',
                right: '28%',
                animationDelay: '0.1s',
              }}
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                fontSize: 'var(--text-ui-md-size)',
                fontWeight: 500,
                lineHeight: '1.1',
                color: 'var(--color-text-primary)',
              }}
            >
              Barnaby
            </div>
            <div
              style={{
                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                fontSize: '10px',
                fontWeight: 400,
                lineHeight: '1.3',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.02em',
                marginTop: '2px',
              }}
            >
              Jay&apos;s portfolio assistant
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-muted)',
            transition: 'color 150ms ease, background 150ms ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--color-text-primary)'
            e.currentTarget.style.background = 'var(--color-hover-subtle)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--color-text-muted)'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* --- Messages area --- */}
      <div
        ref={scrollContainerRef}
        className="chat-messages-scroll"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'var(--space-component-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-component-sm)',
        }}
      >
        {messages.map((msg, i) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            isStreaming={isStreaming && i === messages.length - 1 && msg.role === 'assistant'}
          />
        ))}

        {/* Loading message (shown during wait, before first token) */}
        {isWaiting && loadingMessage && (
          <div
            className="chat-message-enter"
            style={{
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-outfit), system-ui, sans-serif',
              fontSize: 'var(--text-body-sm-size)',
              fontWeight: 'var(--text-body-sm-weight)',
              fontStyle: 'italic',
              lineHeight: '1.6',
              padding: '4px 0',
            }}
          >
            {loadingMessage}
          </div>
        )}

        {isWaiting && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* --- Suggestion chips --- */}
      {showChips && chips.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-component-xs)',
            padding: '0 var(--space-component-md) var(--space-component-sm)',
            flexShrink: 0,
          }}
        >
          {chips.map((chip, i) => (
            <SuggestionChip
              key={chip.label}
              label={chip.label}
              onClick={() => onSelectChip(chip)}
              index={i}
            />
          ))}
        </div>
      )}

      {/* --- Input --- */}
      <ChatInput
        onSend={onSendMessage}
        isDisabled={isStreaming || isWaiting}
      />

      {/* Mobile full-screen styles via inline media query workaround */}
      <style>{`
        @media (max-width: 768px) {
          .glass-chat-panel {
            inset: 0 !important;
            width: 100vw !important;
            height: 100dvh !important;
            border-radius: 0 !important;
            bottom: 0 !important;
            right: 0 !important;
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
      `}</style>
    </div>
  )
}
