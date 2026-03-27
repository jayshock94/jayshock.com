'use client'

import { useState, useEffect } from 'react'
import Link     from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Home',       href: '/'           },
  { label: 'Work',       href: '/work'       },
  { label: 'About',      href: '/about'      },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact',    href: '/contact'    },
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

function isLinkActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const close = () => setIsOpen(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <header className="sticky top-0 z-50 md:pt-[12px] md:pb-[8px] md:px-[var(--space-page-margin)]">
        <div className="md:max-w-layout md:mx-auto">
          <div className={`nav-card${isOpen ? ' nav-card--open' : ''}`}>
            <nav
              aria-label="Main navigation"
              className="flex items-center justify-between px-[28px]"
              style={{ height: '80px' }}
            >
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center shrink-0 hover:opacity-70 transition-opacity duration-200"
                style={{ color: 'var(--color-ink)', textDecoration: 'none' }}
                onClick={close}
                aria-label="Jay Shock — home"
              >
                <span
                  style={{
                    fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                    display: 'flex',
                    alignItems: 'baseline',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ fontSize: '16px', fontWeight: 500, color: 'var(--color-ink)', letterSpacing: '-0.01em' }}>
                    Jay Shock
                  </span>
                  <span className="hidden sm:inline" style={{ fontSize: '13px', fontWeight: 300, color: 'var(--color-text-muted)', marginLeft: '8px' }}>
                    <span style={{ color: 'var(--color-text-placeholder)', marginRight: '8px' }}>&mdash;</span>
                    Product Designer
                  </span>
                </span>
              </Link>

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-[4px]">
                {NAV_LINKS.map(link => {
                  const active = isLinkActive(pathname, link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="nav-link text-ui-md tracking-[0.02em] transition-all duration-200"
                      style={{
                        padding: '8px 16px',
                        borderRadius: '999px',
                        color: active ? 'var(--color-ink)' : 'var(--color-text-muted)',
                        background: active ? 'var(--color-hover-subtle)' : 'transparent',
                        border: active ? '0.5px solid var(--glass-border-dark)' : '0.5px solid transparent',
                        textDecoration: 'none',
                        fontWeight: active ? 500 : 400,
                      }}
                      aria-current={active ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>

              {/* Mobile hamburger */}
              <div className="flex md:hidden items-center">
                <button
                  type="button"
                  className="flex items-center justify-center w-[44px] h-[44px] rounded-[8px] text-[var(--color-text-muted)] hover:text-[var(--color-ink)] transition-colors duration-200"
                  onClick={() => setIsOpen(prev => !prev)}
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                  aria-label={isOpen ? 'Close menu' : 'Open menu'}
                  style={{ position: 'relative', zIndex: 61 }}
                >
                  <HamburgerIcon isOpen={isOpen} />
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu overlay */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden mobile-menu-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 49,
            background: 'rgba(22, 22, 22, 0.95)',
            backdropFilter: 'blur(48px) saturate(180%)',
            WebkitBackdropFilter: 'blur(48px) saturate(180%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 'var(--space-page-margin)',
            paddingRight: 'var(--space-page-margin)',
            paddingBottom: 'env(safe-area-inset-bottom)',
            animation: 'mobile-menu-enter 300ms cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-[4px]">
            {NAV_LINKS.map((link, i) => {
              const active = isLinkActive(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="mobile-menu-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                    fontSize: '24px',
                    fontWeight: active ? 600 : 300,
                    letterSpacing: '-0.01em',
                    color: active ? 'var(--color-ink)' : 'var(--color-text-muted)',
                    background: active ? 'var(--color-hover-subtle)' : 'transparent',
                    border: active ? '0.5px solid var(--glass-border-dark)' : '0.5px solid transparent',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    animationDelay: `${i * 50}ms`,
                  }}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Bottom info */}
          <div
            style={{
              position: 'absolute',
              bottom: 'max(32px, env(safe-area-inset-bottom))',
              left: 'var(--space-page-margin)',
              right: 'var(--space-page-margin)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: 300,
                color: 'var(--color-text-placeholder)',
              }}
            >
              hello@jayshock.com
            </p>
          </div>
        </div>
      )}
    </>
  )
}
