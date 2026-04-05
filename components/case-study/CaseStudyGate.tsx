'use client'

import { useState, useEffect, useRef, type ReactNode, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'

const SESSION_KEY = 'cs-unlocked'
const SITE_PASSWORD = 'blue-canyon-44'

interface CaseStudyGateProps {
  children: ReactNode
}

export default function CaseStudyGate({ children }: CaseStudyGateProps) {
  const router = useRouter()
  const [unlocked, setUnlocked] = useState<boolean | null>(null)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Check session on mount
  useEffect(() => {
    setUnlocked(sessionStorage.getItem(SESSION_KEY) === '1')
  }, [])

  // Auto-focus input when gate appears
  useEffect(() => {
    if (unlocked === false) {
      inputRef.current?.focus()
    }
  }, [unlocked])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (value.trim().toLowerCase() === SITE_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setUnlocked(true)
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      inputRef.current?.select()
    }
  }

  // Still loading session check — render nothing to avoid flash
  if (unlocked === null) return null

  // Unlocked — render case study
  if (unlocked) return <>{children}</>

  return (
    <>
      {/* Scrim — covers everything including nav and footer */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          padding: 'var(--space-page-margin)',
        }}
      >
        {/* Glass modal */}
        <div
          className={shaking ? 'gate-shake' : ''}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '400px',
            borderRadius: '20px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(48px) saturate(180%)',
            WebkitBackdropFilter: 'blur(48px) saturate(180%)',
            border: '0.5px solid rgba(255, 255, 255, 0.10)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
            padding: 'clamp(32px, 6vw, 48px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-stack-md)',
            animation: 'gate-enter 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* Close button */}
          <button
            type="button"
            aria-label="Go back"
            onClick={() => router.back()}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              transition: 'color 0.2s ease',
              padding: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-ink)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {/* Lock icon */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-text-muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>

          {/* Heading */}
          <h2
            className="text-h2"
            style={{
              color: 'var(--color-ink)',
              textAlign: 'center',
              margin: 0,
            }}
          >
            This work is protected.
          </h2>

          {/* Subtitle */}
          <p
            className="text-body"
            style={{
              color: 'var(--color-text-muted)',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Enter the password to view this case study.
          </p>

          {/* Password form */}
          <form
            onSubmit={handleSubmit}
            style={{
              width: '100%',
              marginTop: 'var(--space-stack-sm)',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
              }}
            >
              <input
                ref={inputRef}
                type="password"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value)
                  if (error) setError(false)
                }}
                placeholder="Enter password"
                autoComplete="off"
                className="text-body"
                style={{
                  width: '100%',
                  padding: '14px 52px 14px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${error ? 'rgba(220, 80, 80, 0.5)' : 'rgba(255,255,255,0.08)'}`,
                  color: 'var(--color-ink)',
                  outline: 'none',
                  fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  if (!error) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
                }}
                onBlur={(e) => {
                  if (!error) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                }}
              />

              {/* Submit arrow */}
              <button
                type="submit"
                aria-label="Submit password"
                style={{
                  position: 'absolute',
                  right: '4px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-muted)',
                  transition: 'color 0.2s ease',
                  padding: 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-ink)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)' }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

            {/* Error message */}
            {error && (
              <p
                className="text-body-sm"
                style={{
                  color: 'rgba(220, 100, 100, 0.9)',
                  marginTop: 'var(--space-stack-xs)',
                  textAlign: 'center',
                }}
              >
                Incorrect password. Try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  )
}
