'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from '@/components/ui/Button'

const NAV_LINKS = [
  { label: 'Work',       href: '/work'       },
  { label: 'About',      href: '/about'      },
  { label: 'Experience', href: '/experience' },
] as const

// Lock icon SVG — inline, no library
function LockIcon() {
  return null // placeholder, only used in case study context
}

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      {isOpen ? (
        <>
          <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="4" x2="4"  y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="3" y1="6"  x2="17" y2="6"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const close = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-50">
      <nav
        className="glass-nav"
        aria-label="Main navigation"
      >
        {/* Desktop nav bar */}
        <div
          className="
            flex items-center justify-between
            h-[52px]
            px-[var(--space-page-margin)]
            max-w-layout mx-auto
          "
        >
          {/* Logo / Name */}
          <Link
            href="/"
            className="text-h4 text-[var(--color-ink)] hover:opacity-70 transition-opacity duration-200 shrink-0"
            onClick={close}
          >
            Jay Shock
          </Link>

          {/* Desktop links */}
          <div
            className="hidden md:flex items-center gap-[var(--space-component-lg)]"
            role="list"
          >
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    text-ui-md transition-colors duration-200
                    ${isActive
                      ? 'text-[var(--color-ink)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              )
            })}
            <Button
              variant="primary"
              href="/contact"
              className="ml-[var(--space-component-sm)]"
            >
              Contact
            </Button>
          </div>

          {/* Mobile: Contact CTA always visible + hamburger */}
          <div className="flex md:hidden items-center gap-[var(--space-component-sm)]">
            <Button variant="primary" href="/contact" onClick={close}>
              Contact
            </Button>
            <button
              type="button"
              className="
                flex items-center justify-center
                w-[44px] h-[44px]
                text-[var(--color-text-muted)]
                hover:text-[var(--color-ink)]
                transition-colors duration-200
                rounded-[6px]
              "
              onClick={() => setIsOpen(prev => !prev)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <HamburgerIcon isOpen={isOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="
            md:hidden
            bg-[var(--color-surface-glass)]
            backdrop-blur-glass-nav
            border-b border-[var(--color-border)]
          "
        >
          <nav
            aria-label="Mobile navigation"
            className="
              max-w-layout mx-auto
              px-[var(--space-page-margin)]
              py-[var(--space-component-md)]
              flex flex-col gap-[4px]
            "
          >
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className={`
                    text-ui-md px-[var(--space-component-sm)] py-[12px]
                    rounded-[6px] transition-colors duration-200
                    ${isActive
                      ? 'text-[var(--color-ink)] bg-[var(--color-surface)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)]'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
