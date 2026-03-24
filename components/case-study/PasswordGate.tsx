'use client'

import { useState, useEffect, type ReactNode, type FormEvent } from 'react'
import { validateCasePassword } from '@/app/actions/password'
import Button from '@/components/ui/Button'

interface PasswordGateProps {
  slug:     string
  title:    string
  industry: string
  children: ReactNode
}

const SESSION_KEY = 'js-unlocked-case-studies'

// Lock icon
function LockIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="text-[var(--color-text-muted)]"
    >
      <rect
        x="6" y="14" width="20" height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M10 14V10a6 6 0 1 1 12 0v4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="16" cy="21" r="1.5" fill="currentColor" />
    </svg>
  )
}

export default function PasswordGate({
  slug,
  title,
  industry,
  children,
}: PasswordGateProps) {
  const [isUnlocked,  setIsUnlocked]  = useState(false)
  const [isChecking,  setIsChecking]  = useState(true)
  const [password,    setPassword]    = useState('')
  const [hasError,    setHasError]    = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Check sessionStorage on mount
  useEffect(() => {
    try {
      const stored: string[] = JSON.parse(
        sessionStorage.getItem(SESSION_KEY) ?? '[]',
      )
      if (stored.includes(slug)) setIsUnlocked(true)
    } catch {
      /* sessionStorage unavailable — stay locked */
    } finally {
      setIsChecking(false)
    }
  }, [slug])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setHasError(false)
    setIsSubmitting(true)

    try {
      const valid = await validateCasePassword(slug, password)
      if (valid) {
        // Store unlocked slug in session
        try {
          const stored: string[] = JSON.parse(
            sessionStorage.getItem(SESSION_KEY) ?? '[]',
          )
          const deduped = stored.includes(slug) ? stored : [...stored, slug]
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(deduped))
        } catch {
          /* ok */
        }
        setIsUnlocked(true)
      } else {
        setHasError(true)
        setPassword('')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // While checking session — render nothing to avoid layout flash
  if (isChecking) {
    return <div className="min-h-screen bg-[var(--color-canvas)]" aria-hidden="true" />
  }

  if (isUnlocked) {
    return <>{children}</>
  }

  // Lock screen
  return (
    <div
      className="
        min-h-[60vh]
        flex flex-col items-center justify-center
        px-[var(--space-page-margin)]
        py-[var(--space-section-lg)]
        text-center
      "
    >
      <div className="w-full max-w-[420px] flex flex-col items-center gap-[var(--space-stack-md)]">
        <LockIcon />

        <div className="flex flex-col gap-[var(--space-stack-sm)]">
          <p className="text-label text-[var(--color-text-muted)]">
            {industry}
          </p>
          <h1 className="text-h2 text-[var(--color-ink)]">
            {title}
          </h1>
        </div>

        <p className="text-body text-[var(--color-text-secondary)] max-w-[360px]">
          This case study contains confidential work. Request access or enter
          the password below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-[var(--space-component-md)]"
          noValidate
        >
          <div className="flex flex-col gap-[var(--space-component-xs)]">
            <label
              htmlFor="case-password"
              className="text-label text-[var(--color-text-muted)] text-left"
            >
              Password
            </label>
            <input
              id="case-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="off"
              className="
                w-full
                px-[var(--space-component-md)] py-[10px]
                bg-[var(--color-surface)]
                border border-[var(--color-border)]
                rounded-[6px]
                text-ui-md text-[var(--color-ink)]
                placeholder:text-[var(--color-text-placeholder)]
                focus:outline-none focus:border-[var(--color-border-mid)]
                transition-colors duration-200
              "
            />
          </div>

          {hasError && (
            <p
              className="text-body-sm text-[var(--color-text-muted)] text-left"
              role="alert"
            >
              That password did not match. Try again or request access.
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || !password}
            className="w-full justify-center"
          >
            {isSubmitting ? 'Checking...' : 'Unlock'}
          </Button>
        </form>

        <p className="text-body-sm text-[var(--color-text-muted)]">
          Need access?{' '}
          <a
            href="mailto:hello@jayshock.com?subject=Case study access request"
            className="text-[var(--color-accent)] hover:text-[var(--color-accent-deep)] transition-colors duration-200"
          >
            Email me
          </a>
          .
        </p>
      </div>
    </div>
  )
}
