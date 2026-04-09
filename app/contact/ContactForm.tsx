'use client'

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { submitContact, type ContactFormState } from '@/app/actions/contact'
import Button from '@/components/ui/Button'

const INITIAL_STATE: ContactFormState = { status: 'idle' }

const TOPIC_OPTIONS = [
  { value: '',            label: 'What are you reaching out about?' },
  { value: 'job',         label: 'Job opportunity'                  },
  { value: 'consulting',  label: 'Consulting inquiry'               },
  { value: 'hello',       label: 'Just saying hello'                },
] as const

/* M3 outlined text field — 56px height, 4px radius, 16px padding */
const FIELD_STYLE: React.CSSProperties = {
  width: '100%',
  height: '56px',
  padding: 'var(--space-component-xs) var(--space-component-md)',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--color-surface-elevated)',
  border: '1px solid var(--color-border-mid)',
  color: 'var(--color-ink)',
  outline: 'none',
  fontFamily: 'var(--font-outfit), system-ui, sans-serif',
  fontSize: 'var(--text-body-md-size)',
  fontWeight: 400,
  lineHeight: 'var(--text-body-md-line-height)',
  letterSpacing: 'var(--text-body-md-tracking)',
  transition: 'border-color var(--transition-base)',
  boxSizing: 'border-box' as const,
}

/* M3 label — 12px/500 medium, outline-variant color */
const LABEL_STYLE: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-outfit), system-ui, sans-serif',
  fontSize: 'var(--text-ui-sm-size)',
  fontWeight: 500,
  lineHeight: 'var(--text-ui-sm-line-height)',
  letterSpacing: 'var(--text-ui-sm-tracking)',
  color: 'var(--color-text-muted)',
  marginBottom: 'var(--space-component-xs)',
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      variant="glass"
      disabled={pending}
      className="self-start"
    >
      {pending ? 'Sending...' : 'Send to Jay'}
    </Button>
  )
}

function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = 'var(--color-border-strong)'
}

function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = 'var(--color-border-mid)'
}

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContact, INITIAL_STATE)
  const [topicSelected, setTopicSelected] = useState(false)

  /* Glass card — matches CaseStudyGate modal */
  const cardStyle: React.CSSProperties = {
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    background: 'linear-gradient(180deg, var(--glass-ultra-thin) 0%, var(--color-hover-subtle) 50%, transparent 100%), var(--color-hover-subtle)',
    backdropFilter: 'blur(48px) saturate(180%)',
    WebkitBackdropFilter: 'blur(48px) saturate(180%)',
    border: '0.5px solid var(--color-border)',
    boxShadow: '0 2px 24px var(--shadow-surface-color), inset 0 1px 0 var(--glass-ultra-thin)',
    padding: 'var(--space-component-lg)',
  }

  if (state.status === 'success') {
    return (
      <div style={cardStyle}>
        <p className="text-h4 text-[var(--color-ink)] mb-[var(--space-stack-xs)]">
          Got it.
        </p>
        <p className="text-body text-[var(--color-text-secondary)] mb-[var(--space-stack-md)]">
          I will be in touch within 48 hours.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="text-ui-md hover-ink"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
          }}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div style={cardStyle}>
      <form action={formAction} className="flex flex-col gap-[var(--space-stack-md)]">

        {/* Name + Email — stacked on mobile, side by side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-stack-md)]">
          <div>
            <label htmlFor="contact-name" style={LABEL_STYLE}>Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              autoComplete="name"
              className="contact-field"
              style={FIELD_STYLE}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div>
            <label htmlFor="contact-email" style={LABEL_STYLE}>Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
              className="contact-field"
              style={FIELD_STYLE}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>

        {/* Topic */}
        <div>
          <label htmlFor="contact-topic" style={LABEL_STYLE}>Topic</label>
          <div style={{ position: 'relative' }}>
            <select
              id="contact-topic"
              name="topic"
              required
              defaultValue=""
              onChange={(e) => setTopicSelected(e.target.value !== '')}
              style={{
                ...FIELD_STYLE,
                appearance: 'none',
                paddingRight: 'var(--space-7)',
                cursor: 'pointer',
                color: topicSelected ? 'var(--color-ink)' : 'var(--color-text-muted)',
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {TOPIC_OPTIONS.map(opt => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.value === ''}
                  hidden={opt.value === ''}
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <svg
              width="20" height="20" viewBox="0 0 24 24" fill="none"
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: 'var(--space-component-md)',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                color: 'var(--color-text-muted)',
              }}
            >
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="contact-message" style={LABEL_STYLE}>Message</label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            placeholder="Tell me what you are working on."
            className="contact-field"
            style={{
              ...FIELD_STYLE,
              height: '117px',
              resize: 'vertical',
              paddingTop: 'var(--space-component-md)',
              paddingBottom: 'var(--space-component-md)',
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>

        {/* Error */}
        {state.status === 'error' && (
          <p style={{ ...LABEL_STYLE, color: 'var(--color-status-error)' }}>
            {state.message}
          </p>
        )}

        {/* Submit — left aligned like M3 reference */}
        <SubmitButton />
      </form>
    </div>
  )
}
