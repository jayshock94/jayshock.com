import type { Metadata } from 'next'
import ContactForm from './ContactForm'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionIcon from '@/components/icons/SectionIcon'

export const metadata: Metadata = {
  title:       'Contact — Jay Shock, Product Designer',
  description:
    'Get in touch about senior product design roles or consulting engagements.',
}

export default function ContactPage() {
  return (
    <div className="pt-[var(--space-section-xl)] pb-[var(--space-section-xl)]">
      <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">

        {/* Header — icon + display heading */}
        <section className="pb-[var(--space-section-xl)]" aria-label="Contact header">
          <ScrollReveal>
            <div className="text-center">
              <SectionIcon variant="contact" glowColor="var(--phase-solution-label)" />
              <h1 className="text-display" style={{ marginTop: '-14px' }}>
                <span style={{ color: 'var(--color-text-secondary)', fontWeight: 300 }}>Contact</span>{' '}
                <span style={{ color: 'var(--color-ink)' }}>Jay</span>
              </h1>
            </div>
          </ScrollReveal>
        </section>

        {/* Content — section header + intro + form */}
        <div className="mx-auto" style={{ maxWidth: 'var(--space-content-max)' }}>
          <div className="flex flex-col gap-[var(--space-stack-lg)]">
            <ScrollReveal>
              <div className="flex flex-col">
                <h2 className="text-h1" style={{ marginBottom: 'var(--space-stack-title)' }}>
                  <span style={{ color: 'var(--color-text-secondary)', fontWeight: 300 }}>Let&apos;s make it</span>{' '}
                  <span style={{ color: 'var(--color-ink)' }}>simple.</span>
                </h2>
                <p className="text-intro text-[var(--color-text-secondary)] text-center md:text-left" style={{ maxWidth: '700px', marginBottom: 'var(--space-stack-md)' }}>
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
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>

      </div>
    </div>
  )
}
