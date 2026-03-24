import Link from 'next/link'
import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

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
  'inline-flex items-center justify-center gap-[var(--space-component-xs)] rounded-[6px] px-[20px] py-[8px] text-ui-md cursor-pointer no-underline transition-all duration-200 select-none min-h-[36px]'

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'glass-button-primary font-[var(--text-ui-md-weight)]',
  secondary:
    'bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-mid)] hover:bg-[var(--color-surface)] font-[var(--text-ui-md-weight)]',
  ghost:
    'bg-transparent text-[var(--color-text-muted)] border-none hover:text-[var(--color-text-primary)] font-[var(--text-ui-md-weight)]',
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
