'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'glass'

interface ButtonProps {
  variant?:  ButtonVariant
  href?:     string
  children:  ReactNode
  className?: string
  type?:     'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?:  () => void
  download?: boolean | string
  target?:   string
  rel?:      string
  'aria-label'?: string
}

const BASE =
  'inline-flex items-center justify-center gap-[var(--space-component-xs)] rounded-[40px] px-[24px] py-[10px] text-ui-md cursor-pointer no-underline transition-all duration-200 select-none min-h-[44px]'

const VARIANTS: Record<ButtonVariant, string> = {
  // Solid dark pill — high-priority actions
  primary:
    'glass-button-primary font-[500] tracking-[0.02em]',
  // Outlined pill — secondary choice, border strong enough to read in both modes
  secondary:
    'bg-transparent text-[var(--color-ink)] font-[400] tracking-[0.02em] [border:0.5px_solid_var(--color-border-mid)] hover:bg-[var(--color-hover-subtle)] hover:[border-color:var(--color-border-strong)] active:scale-[0.98]',
  // Text only — lowest visual weight
  ghost:
    'bg-transparent text-[var(--color-text-muted)] border-none font-[400] hover:text-[var(--color-ink)] active:scale-[0.98]',
  // Frosted glass pill — floating CTAs, nav, overlays
  glass:
    'glass-pill text-[var(--color-ink)] font-[400] tracking-[0.02em]',
}

export default function Button({
  variant = 'primary',
  href,
  children,
  className = '',
  type = 'button',
  disabled,
  onClick,
  download,
  target,
  rel,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('//')
    return (
      <Link
        href={href}
        className={classes}
        download={download}
        target={target ?? (isExternal ? '_blank' : undefined)}
        rel={rel ?? (isExternal ? 'noopener noreferrer' : undefined)}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
