'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { submitContact, type ContactFormState } from '@/app/actions/contact'
import Button from '@/components/ui/Button'

const INITIAL_STATE: ContactFormState = { status: 'idle' }

const TOPIC_OPTIONS = [
  { value: '',                    label: 'What are you reaching out about?' },
  { value: 'job',                 label: 'Job opportunity'                  },
  { value: 'consulting',          label: 'Consulting inquiry'               },
  { value: 'hello',               label: 'Just saying hello'                },
] as const

const FIELD_CLASS = `
  w-full
  px-[var(--space-component-md)] py-[10px]
  bg-[var(--color-surface)]
  border border-[var(--color-border)]
  rounded-[6px]
  text-ui-md text-[var(--color-ink)]
  placeholder:text-[var(--color-text-placeholder)]
  focus:outline-none focus:border-[var(--color-border-mid)]
  transition-colors duration-200
`

const LABEL_CLASS = `
  text-label text-[var(--color-text-muted)]
  mb-[var(--space-component-xs)] block
`

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      variant="primary"
      disabled={pending}
      className="w-full sm:w-auto justify-center"
    >
      {pending ? 'Sending...' : 'Send it'}
    </Button>
  )
}

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContact, INITIAL_STATE)

  if (state.status === 'success') {
    return (
      <div
        className="
          py-[var(--space-section-sm)]
          flex flex-col gap-[var(--space-stack-sm)]
        "
        role="status"
        aria-live="polite"
      >
        <p className="text-h3 text-[var(--color-ink)]">
          Got it.
        </p>
        <p className="text-body text-[var(--color-text-secondary)]">
          I will be in touch within 48 hours.
        </p>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      noValidate
      className="flex flex-col gap-[var(--space-component-md)]"
    >
      {/* Name */}
      <div className="flex flex-col">
        <label htmlFor="name" className={LABEL_CLASS}>Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          className={FIELD_CLASS}
          required
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className={LABEL_CLASS}>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={FIELD_CLASS}
          required
        />
      </div>

      {/* Topic */}
      <div className="flex flex-col">
        <label htmlFor="topic" className={LABEL_CLASS}>
          What are you reaching out about?
        </label>
        <select
          id="topic"
          name="topic"
          className={`${FIELD_CLASS} appearance-none cursor-pointer`}
          defaultValue=""
          required
        >
          {TOPIC_OPTIONS.map(opt => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.value === ''}
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col">
        <label htmlFor="message" className={LABEL_CLASS}>Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell me what you are working on."
          className={`${FIELD_CLASS} resize-y min-h-[120px]`}
          required
        />
      </div>

      {/* Server-side error */}
      {state.status === 'error' && (
        <p
          className="text-body-sm text-[var(--color-text-muted)]"
          role="alert"
          aria-live="polite"
        >
          {state.message}
        </p>
      )}

      <div className="pt-[var(--space-component-xs)]">
        <SubmitButton />
      </div>
    </form>
  )
}
