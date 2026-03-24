import Link from 'next/link'

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
  // Phase 1 placeholder — add URL before launch
  { label: 'Read.cv', href: 'https://read.cv' },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="border-t border-[var(--color-border)] mt-[var(--space-section-lg)]"
      aria-label="Site footer"
    >
      <div
        className="
          max-w-layout mx-auto
          px-[var(--space-page-margin)]
          py-[var(--space-section-sm)]
          flex flex-col gap-[var(--space-component-md)]
          md:flex-row md:items-center md:justify-between
        "
      >
        {/* Name + nav links */}
        <div className="flex flex-col gap-[var(--space-stack-sm)] md:flex-row md:items-center md:gap-[var(--space-component-lg)]">
          <Link
            href="/"
            className="text-h4 text-[var(--color-ink)] hover:opacity-70 transition-opacity duration-200"
          >
            Jay Shock
          </Link>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-[var(--space-component-md)] gap-y-[var(--space-component-sm)] list-none p-0 m-0">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ui-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Copyright + social */}
        <div className="flex flex-col gap-[var(--space-stack-sm)] md:flex-row md:items-center md:gap-[var(--space-component-lg)]">
          <span className="text-body-sm text-[var(--color-text-muted)]">
            &copy; {year}
          </span>
          <nav aria-label="Social links">
            <ul className="flex gap-[var(--space-component-md)] list-none p-0 m-0">
              {SOCIAL_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
