'use client'

import { type ReactNode } from 'react'

interface ChatBubbleProps {
  children: ReactNode
  /** When true, plays the exit animation. */
  dismissing?: boolean
  /** Extra class names on the outer wrapper. */
  className?: string
}

/**
 * Glass speech bubble with a triangular tail pointing toward Barnaby.
 * Uses the `.glass-bubble` treatment from globals.css.
 */
export default function ChatBubble({
  children,
  dismissing = false,
  className = '',
}: ChatBubbleProps) {
  return (
    <div
      className={`${dismissing ? 'chat-bubble-exit' : 'chat-bubble-enter'} ${className}`}
      style={{ position: 'relative' }}
    >
      {/* Bubble body — tail is rendered via ::before / ::after in .glass-bubble */}
      <div
        className="glass-bubble"
        style={{ padding: 'var(--space-component-md)' }}
      >
        {children}
      </div>
    </div>
  )
}
