import type { Metadata } from 'next'
import WorkCard from '@/components/work/WorkCard'
import AimCardImage           from '@/components/work/AimCardImage'
import MobileLendingCardImage from '@/components/work/MobileLendingCardImage'
import CaliberCardImage       from '@/components/work/CaliberCardImage'
import SectionIcon            from '@/components/icons/SectionIcon'
import ScrollReveal           from '@/components/ui/ScrollReveal'
import { caseStudies } from '@/data/case-studies'

export const metadata: Metadata = {
  title:       'Work — Jay Shock, Product Designer',
  description:
    'Case studies in fintech, enterprise SaaS, and internal tools. End to end product design.',
}

export default function WorkPage() {
  return (
    <div className="py-[var(--space-section-md)] px-[var(--space-page-margin)]">
      <div className="max-w-content mx-auto flex flex-col gap-[var(--space-subsection-gap)]">

        <ScrollReveal>
          <div className="text-center">
            <SectionIcon variant="work" glowColor="var(--phase-impact-label)" />
            <h1
              className="text-display"
              style={{ color: 'var(--color-ink)', marginTop: '-14px' }}
            >
              Featured case studies
            </h1>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-[var(--space-component-lg)]">
          {caseStudies.map((cs, i) => (
            <ScrollReveal key={cs.slug}>
              <WorkCard
                caseStudy={cs}
                imagePosition={i % 2 === 0 ? 'right' : 'left'}
                cardImageSlot={
                  cs.slug === 'aim' ? <AimCardImage /> :
                  cs.slug === 'mobile-lending-management' ? <MobileLendingCardImage /> :
                  cs.slug === 'caliber-smart' ? <CaliberCardImage /> :
                  undefined
                }
              />
            </ScrollReveal>
          ))}

          {/* Placeholder for upcoming case studies */}
          <ScrollReveal>
          <div
            style={{
              borderRadius:         'var(--radius-lg)',
              border:               '0.5px solid var(--color-border)',
              background:           'var(--color-hover-subtle)',
              padding:              'var(--space-7) var(--space-5)',
              textAlign:            'center',
              display:              'flex',
              flexDirection:        'column',
              alignItems:           'center',
              gap:                  'var(--space-component-sm)',
            }}
          >
            <p
              style={{
                fontSize:      'var(--text-h4-size)',
                fontWeight:    'var(--text-h4-weight)',
                lineHeight:    'var(--text-h4-line-height)',
                color:         'var(--color-ink)',
                margin:        0,
              }}
            >
              More case studies on the way.
            </p>
            <p
              style={{
                fontSize:      'var(--text-body-md-size)',
                fontWeight:    'var(--text-body-md-weight)',
                lineHeight:    'var(--text-body-md-line-height)',
                color:         'var(--color-text-muted)',
                margin:        0,
              }}
            >
              Jay is currently writing up additional work. Check back soon.
            </p>
          </div>
          </ScrollReveal>
        </div>

      </div>
    </div>
  )
}
