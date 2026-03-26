'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface ChatInputProps {
  onSend: (text: string) => void
  isDisabled: boolean
}

/** Rotating placeholder texts. */
const PLACEHOLDERS = [
  'Ask me about Jay...',
  'What do you want to know?',
  'Ask me anything...',
]

export default function ChatInput({ onSend, isDisabled }: ChatInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [placeholder] = useState(() =>
    PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]
  )

  const hasContent = value.trim().length > 0

  /** Auto-resize textarea to fit content, max 4 lines. */
  const adjustHeight = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    // Cap at ~4 lines (approx 80px)
    el.style.height = `${Math.min(el.scrollHeight, 80)}px`
  }, [])

  useEffect(() => {
    adjustHeight()
  }, [value, adjustHeight])

  const handleSend = useCallback(() => {
    const text = value.trim()
    if (!text || isDisabled) return
    onSend(text)
    setValue('')
    // Reset height after clearing
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [value, isDisabled, onSend])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend]
  )

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 'var(--space-component-sm)',
        padding: 'var(--space-component-md)',
        borderTop: '0.5px solid var(--color-border)',
        position: 'relative',
      }}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isDisabled}
        rows={1}
        style={{
          flex: 1,
          resize: 'none',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-outfit), system-ui, sans-serif',
          fontSize: 'var(--text-body-sm-size)',
          fontWeight: 'var(--text-body-sm-weight)',
          lineHeight: '1.6',
          padding: '8px 0',
          overflowY: 'auto',
        }}
      />

      {/* Send button — springs in when text is entered */}
      {hasContent && (
        <button
          type="button"
          onClick={handleSend}
          disabled={isDisabled}
          className="chat-send-enter"
          aria-label="Send message"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: 'none',
            background: 'var(--color-button-primary)',
            color: 'var(--color-button-text)',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'opacity 150ms ease',
            opacity: isDisabled ? 0.5 : 1,
          }}
        >
          {/* Arrow-up icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ transform: 'translateY(-1px)' }}
          >
            <path
              d="M8 13V3M8 3L3 8M8 3L13 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
