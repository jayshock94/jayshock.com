import type { Metadata } from 'next'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title:       'Experience — Jay Shock, Product Designer',
  description:
    'Skills, tools, and career history. Currently employed, open to senior product design roles and consulting engagements.',
}

export default function ExperiencePage() {
  return (
    <div className="pt-[var(--space-section-md)] pb-[var(--space-section-lg)]">
      <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
        <div className="max-w-content flex flex-col items-center text-center" style={{ minHeight: '50vh', justifyContent: 'center' }}>
          <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-xs)]">
            Experience
          </p>
          <h1 className="text-h1 text-[var(--color-ink)] mb-[var(--space-stack-md)]">
            Still being worked on.
          </h1>
          <p className="text-body text-[var(--color-text-secondary)] mb-[var(--space-stack-lg)]">
            This page is getting a redesign. In the meantime, feel free to ask Barnaby anything about my experience.
          </p>
          <Button variant="glass" href="/">
            Back to home
          </Button>
        </div>
      </div>
    </div>
  )
}
