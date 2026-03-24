import Link     from 'next/link'
import LogoSVG  from '@/components/ui/LogoSVG'

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
          py-[28px]
          flex flex-col gap-[20px]
          md:flex-row md:items-center md:justify-between
        "
      >
        {/* Left — logo */}
        <Link
          href="/"
          className="block w-[80px] text-[var(--color-ink)] hover:opacity-60 transition-opacity duration-200 shrink-0"
          aria-label="Jay Shock — home"
        >
          <LogoSVG />
        </Link>

        {/* Center — nav links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-[24px] gap-y-[8px] list-none p-0 m-0">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                    fontSize:   '12px',
                    fontWeight: 400,
                    color:      'var(--color-text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
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
          <ul className="flex gap-[16px] list-none p-0 m-0">
            {SOCIAL_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-outfit), system-ui, sans-serif',
                    fontSize:   '12px',
                    fontWeight: 400,
                    color:      'var(--color-text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
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
          pb-[24px]
          text-center
        "
      >
        <span
          style={{
            fontFamily: 'var(--font-outfit), system-ui, sans-serif',
            fontSize:   '11px',
            fontWeight: 300,
            color:      'var(--color-text-muted)',
          }}
        >
          &copy; {year} Jay Shock
        </span>
      </div>
    </footer>
  )
}
