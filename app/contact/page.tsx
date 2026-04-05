import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title:       'Contact — Jay Shock, Product Designer',
  description:
    'Get in touch about senior product design roles or consulting engagements.',
}

export default function ContactPage() {
  return (
    <div className="pt-[var(--space-section-md)] pb-[var(--space-section-lg)]">
      <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
        <div className="max-w-content mx-auto flex flex-col gap-[var(--space-stack-lg)]">

          <header>
            <h1 className="text-h1 text-[var(--color-ink)] mb-[var(--space-stack-title)]">
              Get in touch
            </h1>
            <p className="text-body-lg text-[var(--color-text-secondary)] mb-[var(--space-stack-sm)]">
              I want to hear about whatever complex system, product, or problem we could be working on.
            </p>
            <p className="text-body-lg text-[var(--color-text-muted)]">
              Prefer email?{' '}
              <a
                href="mailto:hello@jayshock.com"
                className="hover-ink"
                style={{ color: 'var(--color-text-secondary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                hello@jayshock.com
              </a>
            </p>
          </header>

          <ContactForm />

        </div>
      </div>
    </div>
  )
}
