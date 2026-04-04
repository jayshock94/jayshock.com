'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

type ButtonVariant = 'glass' | 'secondary' | 'ghost' | 'solid-white'

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
  'inline-flex items-center justify-center gap-[var(--space-component-sm)] rounded-[40px] px-[16px] py-[10px] text-ui-md cursor-pointer no-underline select-none min-h-[44px]'

const VARIANTS: Record<ButtonVariant, string> = {
  // M3 primary glass pill — dark tint, backdrop blur, drop shadow
  glass:
    'glass-pill text-white font-[500] tracking-[0.1px]',

  // Subtle outlined — secondary actions, no fill
  secondary:
    'btn-secondary bg-transparent text-[var(--color-text-secondary)] font-[400] tracking-[0.02em] [border:0.5px_solid_var(--color-border-mid)]',

  // Text only — tertiary/inline actions
  ghost:
    'btn-ghost bg-transparent text-[var(--color-text-muted)] border-none font-[400] tracking-[0.02em]',

  // White fill — for use on colored/dark backgrounds
  'solid-white':
    'btn-solid-white font-[500] tracking-[0.02em]',
}

export default function Button({
  variant = 'glass',
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
