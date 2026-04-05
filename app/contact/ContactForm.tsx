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

const FIELD_CLASS = `
  w-full
  px-[var(--space-component-md)] py-[14px]
  bg-transparent
  border border-[rgba(255,255,255,0.08)]
  rounded-[12px]
  text-body-lg text-[var(--color-ink)]
  placeholder:text-[var(--color-text-muted)]
  focus:outline-none focus:border-[rgba(255,255,255,0.18)]
  transition-all duration-200
`

const LABEL_CLASS = `
  text-label text-[var(--color-text-secondary)]
  mb-[var(--space-component-xs)] block
`

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      variant="glass"
      disabled={pending}
      className="self-start"
    >
      {pending ? 'Sending...' : 'Send it'}
    </Button>
  )
}

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContact, INITIAL_STATE)
  const [topicSelected, setTopicSelected] = useState(false)

  if (state.status === 'success') {
    return (
      <div
        className="rounded-[12px] p-[var(--space-component-lg)]"
        style={{
          background: 'var(--color-surface)',
          border: '0.5px solid var(--color-border)',
        }}
      >
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
    <form action={formAction} className="flex flex-col gap-[var(--space-stack-md)]">

      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-stack-md)]">
        <div>
          <label htmlFor="contact-name" className={LABEL_CLASS}>Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={FIELD_CLASS}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={LABEL_CLASS}>Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={FIELD_CLASS}
          />
        </div>
      </div>

      {/* Topic */}
      <div style={{ position: 'relative' }}>
        <label htmlFor="contact-topic" className={LABEL_CLASS}>Topic</label>
        <select
          id="contact-topic"
          name="topic"
          required
          className={FIELD_CLASS}
          defaultValue=""
          onChange={(e) => setTopicSelected(e.target.value !== '')}
          style={{
            appearance: 'none',
            paddingRight: '40px',
            cursor: 'pointer',
            color: topicSelected ? 'var(--color-ink)' : 'var(--color-text-muted)',
          }}
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
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '14px',
            bottom: '16px',
            pointerEvents: 'none',
            color: 'var(--color-text-muted)',
          }}
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={LABEL_CLASS}>Message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell me what you are working on."
          className={FIELD_CLASS}
          style={{ resize: 'vertical', minHeight: '120px' }}
        />
      </div>

      {/* Error */}
      {state.status === 'error' && (
        <p className="text-body-sm" style={{ color: '#ef4444' }}>
          {state.message}
        </p>
      )}

      {/* Submit */}
      <SubmitButton />
    </form>
  )
}
