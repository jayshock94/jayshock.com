'use client'

import { useState } from 'react'
import Link     from 'next/link'
import { usePathname } from 'next/navigation'
import Button   from '@/components/ui/Button'
import LogoSVG  from '@/components/ui/LogoSVG'

const NAV_LINKS = [
  { label: 'Work',       href: '/work'       },
  { label: 'About',      href: '/about'      },
  { label: 'Experience', href: '/experience' },
] as const

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
    <header className="sticky top-0 z-50 md:pt-[12px] md:pb-[8px] md:px-[var(--space-page-margin)]">
      <div className="md:max-w-layout md:mx-auto">

        {/* Nav card — full-width bar on mobile, floating glass card on desktop */}
        <div className={`nav-card${isOpen ? ' nav-card--open' : ''}`}>
          {/* Main nav row — 80px height */}
          <nav
            aria-label="Main navigation"
            className="flex items-center justify-between px-[28px]"
            style={{ height: '80px' }}
          >
            {/* Logo + title */}
            <Link
              href="/"
              className="flex items-center gap-[14px] shrink-0 hover:opacity-70 transition-opacity duration-200"
              style={{ color: 'var(--color-ink)', textDecoration: 'none' }}
              onClick={close}
              aria-label="Jay Shock — home"
            >
              <span className="block w-[80px] md:w-[96px]">
                <LogoSVG />
              </span>

            </Link>

            {/* Desktop links + CTA */}
            <div className="hidden md:flex items-center gap-[28px]">
              {NAV_LINKS.map(link => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      relative inline-block text-ui-md tracking-[0.02em]
                      pb-[6px] transition-colors duration-200
                      ${isActive
                        ? 'text-[var(--color-ink)]'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-ink)]'
                      }
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[var(--color-ink)]"
                      />
                    )}
                  </Link>
                )
              })}

              {/* Contact — plain link like other nav items */}
              {(() => {
                const isActive = pathname === '/contact'
                return (
                  <Link
                    href="/contact"
                    className={`
                      relative inline-block text-ui-md tracking-[0.02em]
                      pb-[6px] transition-colors duration-200
                      ${isActive
                        ? 'text-[var(--color-ink)]'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-ink)]'
                      }
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    Contact
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[var(--color-ink)]"
                      />
                    )}
                  </Link>
                )
              })()}
            </div>

            {/* Mobile: hamburger */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                className="flex items-center justify-center w-[44px] h-[44px] rounded-[8px] text-[var(--color-text-muted)] hover:text-[var(--color-ink)] transition-colors duration-200"
                onClick={() => setIsOpen(prev => !prev)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <HamburgerIcon isOpen={isOpen} />
              </button>
            </div>
          </nav>

          {/* Mobile drawer — expands inside the card */}
          {isOpen && (
            <div
              id="mobile-menu"
              className="md:hidden nav-drawer"
            >
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-[2px] p-[10px]"
                style={{ paddingBottom: 'max(10px, env(safe-area-inset-bottom))' }}
              >
                {NAV_LINKS.map(link => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={close}
                      className="flex items-center min-h-[48px] px-[12px] rounded-[10px] transition-colors duration-200 text-ui-md"
                      style={{
                        color:      isActive ? 'var(--color-ink)' : 'var(--color-text-secondary)',
                        background: isActive ? 'var(--color-hover-subtle)' : 'transparent',
                        textDecoration: 'none',
                      }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  )
                })}

                {/* Contact — center aligned, matches nav link style */}
                <Link
                  href="/contact"
                  onClick={close}
                  className="flex items-center min-h-[48px] px-[12px] rounded-[10px] transition-colors duration-200 text-ui-md"
                  style={{
                    color:          pathname === '/contact' ? 'var(--color-ink)' : 'var(--color-text-secondary)',
                    background:     pathname === '/contact' ? 'var(--color-hover-subtle)' : 'transparent',
                    textDecoration: 'none',
                  }}
                  aria-current={pathname === '/contact' ? 'page' : undefined}
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
