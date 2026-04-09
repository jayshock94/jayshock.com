import Link     from 'next/link'

const NAV_LINKS = [
  { label: 'Work',       href: '/work'       },
  { label: 'About',      href: '/about'      },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact',    href: '/contact'    },
] as const

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/in/jay-shock-089605156/',
  },
  { label: 'Read.cv', href: 'https://read.cv' },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-[var(--space-section-lg)]"
      style={{ borderTop: '0.5px solid var(--color-border)' }}
      aria-label="Site footer"
    >
      {/* Main row */}
      <div
        className="
          max-w-layout mx-auto
          px-[var(--space-page-margin)]
          py-[var(--space-component-lg)]
          flex flex-col gap-[var(--space-component-lg)]
          md:flex-row md:items-center md:justify-between
        "
      >
        {/* Left — logo */}
        <Link
          href="/"
          className="hover:opacity-60 transition-opacity duration-200 shrink-0"
          style={{ textDecoration: 'none' }}
          aria-label="Jay Shock — home"
        >
          <span
            style={{
              fontFamily: 'var(--font-outfit), system-ui, sans-serif',
              fontSize: 'var(--text-body-md-size)',
              fontWeight: 500,
              color: 'var(--color-ink)',
              letterSpacing: '-0.01em',
            }}
          >
            Jay Shock
          </span>
        </Link>

        {/* Center — nav links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-[var(--space-component-lg)] gap-y-[var(--space-component-sm)] list-none p-0 m-0">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                    fontSize:   'var(--text-ui-sm-size)',
                    fontWeight: 400,
                    color:      'var(--color-text-muted)',
                    textDecoration: 'none',
                    transition: 'color var(--transition-base)',
                  }}
                  className="hover:text-[var(--color-ink)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right — social links */}
        <nav aria-label="Social links">
          <ul className="flex gap-[var(--space-component-md)] list-none p-0 m-0">
            {SOCIAL_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                    fontSize:   'var(--text-ui-sm-size)',
                    fontWeight: 400,
                    color:      'var(--color-text-muted)',
                    textDecoration: 'none',
                    transition: 'color var(--transition-base)',
                  }}
                  className="hover:text-[var(--color-ink)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Copyright row */}
      <div
        className="
          max-w-layout mx-auto
          px-[var(--space-page-margin)]
          pb-[var(--space-component-lg)]
          text-center
        "
      >
        <span
          className="text-label text-[var(--color-text-muted)]"
          style={{ fontWeight: 300 }}
        >
          &copy; {year} Jay Shock
        </span>
      </div>
    </footer>
  )
}
