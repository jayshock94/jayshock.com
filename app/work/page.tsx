import type { Metadata } from 'next'
import WorkCard from '@/components/work/WorkCard'
import AimCardImage           from '@/components/work/AimCardImage'
import MobileLendingCardImage from '@/components/work/MobileLendingCardImage'
import { caseStudies } from '@/data/case-studies'

export const metadata: Metadata = {
  title:       'Work — Jay Shock, Product Designer',
  description:
    'Case studies in fintech, enterprise SaaS, and internal tools. End to end product design.',
}

export default function WorkPage() {
  return (
    <div className="pt-[var(--space-section-md)] pb-[var(--space-section-lg)]">
      <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">

        <header className="mb-[var(--space-section-sm)]">
          <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-sm)]">
            Selected Work
          </p>
          <h1 className="text-h1 text-[var(--color-ink)]">
            Three case studies.
          </h1>
          <p className="text-body-lg text-[var(--color-text-secondary)] mt-[var(--space-stack-md)] max-w-content">
            Enterprise SaaS, fintech, and internal tools. Each one is an
            argument — that a complex problem was understood, navigated, and
            solved.
          </p>
        </header>

        <div
          className="
            grid grid-cols-1 gap-[var(--space-component-lg)]
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {caseStudies.map(cs => (
            <WorkCard
              key={cs.slug}
              caseStudy={cs}
              cardImageSlot={
                cs.slug === 'aim' ? <AimCardImage /> :
                cs.slug === 'mobile-lending-management' ? <MobileLendingCardImage /> :
                undefined
              }
            />
          ))}
        </div>

      </div>
    </div>
  )
}
