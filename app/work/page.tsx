import type { Metadata } from 'next'
import WorkCard from '@/components/work/WorkCard'
import AimCardImage           from '@/components/work/AimCardImage'
import MobileLendingCardImage from '@/components/work/MobileLendingCardImage'
import CaliberCardImage       from '@/components/work/CaliberCardImage'
import SectionIcon            from '@/components/icons/SectionIcon'
import { caseStudies } from '@/data/case-studies'

export const metadata: Metadata = {
  title:       'Work — Jay Shock, Product Designer',
  description:
    'Case studies in fintech, enterprise SaaS, and internal tools. End to end product design.',
}

export default function WorkPage() {
  return (
    <div className="py-[var(--space-section-md)] px-[var(--space-page-margin)]">
      <div className="max-w-content mx-auto flex flex-col gap-[70px]">

        <div className="text-center">
          <SectionIcon variant="work" glowColor="var(--phase-impact-label)" />
          <h1
            className="text-display"
            style={{ color: 'var(--color-ink)', marginTop: '-14px' }}
          >
            Featured case studies
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-[var(--space-component-lg)]">
          {caseStudies.map((cs, i) => (
            <WorkCard
              key={cs.slug}
              caseStudy={cs}
              imagePosition={i % 2 === 0 ? 'right' : 'left'}
              cardImageSlot={
                cs.slug === 'aim' ? <AimCardImage /> :
                cs.slug === 'mobile-lending-management' ? <MobileLendingCardImage /> :
                cs.slug === 'caliber-smart' ? <CaliberCardImage /> :
                undefined
              }
            />
          ))}

          {/* Placeholder for upcoming case studies */}
          <div
            style={{
              borderRadius:         '16px',
              border:               '0.5px solid rgba(255,255,255,0.08)',
              background:           'rgba(255,255,255,0.02)',
              padding:              '48px 24px',
              textAlign:            'center',
              display:              'flex',
              flexDirection:        'column',
              alignItems:           'center',
              gap:                  '8px',
            }}
          >
            <p
              style={{
                fontFamily:    'var(--font-outfit), system-ui, sans-serif',
                fontSize:      '22px',
                fontWeight:    500,
                lineHeight:    '28px',
                color:         'var(--color-ink)',
                margin:        0,
              }}
            >
              More case studies on the way.
            </p>
            <p
              style={{
                fontFamily:    'var(--font-outfit), system-ui, sans-serif',
                fontSize:      '16px',
                fontWeight:    400,
                lineHeight:    '24px',
                color:         'var(--color-text-muted)',
                margin:        0,
              }}
            >
              Jay is currently writing up additional work. Check back soon.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
