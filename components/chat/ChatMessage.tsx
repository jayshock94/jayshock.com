'use client'

import { useRouter } from 'next/navigation'
import type { ChatMessage as ChatMessageType } from '@/lib/chatbot/types'

interface ChatMessageProps {
  message: ChatMessageType
  /** True while this message is still being streamed. */
  isStreaming?: boolean
  /** Close the chat panel (called before navigation). */
  onClose?: () => void
}

/** Detect navigation suggestions in bot responses and return a link. */
function detectNavigation(content: string): { label: string; path: string } | null {
  const lower = content.toLowerCase()

  if (lower.includes('contact page') || lower.includes('reach out') || lower.includes('ask him directly')) {
    return { label: 'Go to contact page', path: '/contact' }
  }
  if (lower.includes('case study') || lower.includes('case studies')) {
    return { label: 'View case studies', path: '/work' }
  }
  if (lower.includes('resume') || lower.includes('experience page')) {
    return { label: 'View experience', path: '/experience' }
  }
  if (lower.includes('about page')) {
    return { label: 'Go to about page', path: '/about' }
  }

  return null
}

export default function ChatMessage({ message, isStreaming, onClose }: ChatMessageProps) {
  const router = useRouter()
  const isBot = message.role === 'assistant'

  const navigation = isBot && !isStreaming ? detectNavigation(message.content) : null

  return (
    <div
      className="chat-message-enter"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isBot ? 'flex-start' : 'flex-end',
        padding: '2px 0',
        gap: '6px',
      }}
    >
      {isBot ? (
        // Bot message — plain text on glass surface, no background
        <>
          {/* Persistent fun fact from loading state */}
          {message.loadingFact && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 0',
                maxWidth: 'var(--chat-bubble-max-width)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-placeholder)',
                  flexShrink: 0,
                }}
              >
                psst:
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'var(--color-text-placeholder)',
                  lineHeight: '1.4',
                }}
              >
                {message.loadingFact}
              </span>
            </div>
          )}
          <div
            style={{
              maxWidth: 'var(--chat-bubble-max-width)',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-outfit), system-ui, sans-serif',
              fontSize: 'var(--text-body-sm-size)',
              fontWeight: 'var(--text-body-sm-weight)',
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {message.content}
            {isStreaming && (
              <span
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '14px',
                  background: 'var(--color-text-muted)',
                  marginLeft: '2px',
                  verticalAlign: 'text-bottom',
                  animation: 'chat-typing-pulse 1s ease-in-out infinite',
                }}
              />
            )}
          </div>

          {/* Navigation action button */}
          {navigation && (
            <button
              type="button"
              onClick={() => {
                onClose?.()
                router.push(navigation.path)
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 16px',
                minHeight: '44px',
                borderRadius: '40px',
                border: '0.5px solid var(--color-border-mid)',
                background: 'transparent',
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                fontSize: 'var(--text-body-sm-size)',
                fontWeight: 400,
                cursor: 'pointer',
                transition: 'border-color 200ms ease, background 200ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-border-strong)'
                e.currentTarget.style.background = 'var(--color-hover-subtle)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border-mid)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {navigation.label}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </>
      ) : (
        // User message — dark filled pill
        <div
          style={{
            maxWidth: 'var(--chat-bubble-max-width)',
            padding: '10px 16px',
            borderRadius: '18px 18px 4px 18px',
            background: 'var(--color-button-primary)',
            color: 'var(--color-button-text)',
            fontFamily: 'var(--font-outfit), system-ui, sans-serif',
            fontSize: 'var(--text-body-sm-size)',
            fontWeight: 'var(--text-body-weight)',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {message.content}
        </div>
      )}
    </div>
  )
}
