import type { Metadata } from 'next'
import { notFound }  from 'next/navigation'
import Link          from 'next/link'
import { getCaseStudy, caseStudySlugs } from '@/data/case-studies'
import { generateTokens }  from '@/lib/colorAlgorithm'
import CaseStudyHero       from '@/components/case-study/CaseStudyHero'
import CaseStudyLede       from '@/components/case-study/CaseStudyLede'
import PhaseSection        from '@/components/case-study/PhaseSection'
import PhaseObserver       from '@/components/case-study/PhaseObserver'
import PhaseProgress       from '@/components/case-study/PhaseProgress'
import PhaseDivider        from '@/components/case-study/PhaseDivider'
import EraserReveal           from '@/components/case-study/EraserReveal'
import MobileLendingHeroImage from '@/components/case-study/MobileLendingHeroImage'
import WorkCard            from '@/components/work/WorkCard'
import MobileLendingCardImage from '@/components/work/MobileLendingCardImage'
import ScrollReveal        from '@/components/ui/ScrollReveal'
import Button              from '@/components/ui/Button'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return caseStudySlugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cs = getCaseStudy(params.slug)
  if (!cs) return {}
  return {
    title:       `${cs.title} — Jay Shock, Product Designer`,
    description: `${cs.cardImpactLine} ${cs.industry}. ${cs.role}.`,
  }
}

export default function CaseStudyPage({ params }: PageProps) {
  const cs = getCaseStudy(params.slug)
  if (!cs) notFound()

  const tokens = generateTokens(cs.brandColorHex)
  const nextCS = getCaseStudy(cs.nextSlug)

  return (
    <>
      {/* Editorial hero */}
      <CaseStudyHero
        caseStudy={cs}
        tokens={tokens}
        heroImageSlot={cs.slug === 'mobile-lending-management' ? <MobileLendingHeroImage /> : undefined}
      />

      {/* Narrative lede: context + role */}
      <CaseStudyLede context={cs.context} overview={cs.overview} />

      {/* Phase sections with observer, progress, and dividers */}
      <PhaseObserver>
        <PhaseProgress />

        <PhaseSection
          phase="problem"
          phaseNumber={1}
          content={cs.problem}
          glossary={cs.glossary}
          mediaSlot={
            cs.slug === 'mobile-lending-management' ? (
              <div className="max-w-[320px] mx-auto">
                <EraserReveal
                  legacySrc="/images/mobile/gac%20legacy.png"
                  updatedSrc="/images/mobile/gac%20new.png"
                  alt="Before and after: legacy GoldPoint app vs redesigned Lendmark app"
                />
              </div>
            ) : undefined
          }
          mediaSlotAfterParagraph={cs.slug === 'mobile-lending-management' ? 1 : undefined}
        />

        <PhaseDivider fromPhase="problem" toPhase="discovery" />

        <PhaseSection
          phase="discovery"
          phaseNumber={2}
          content={cs.discovery}
          glossary={cs.glossary}
        />

        <PhaseDivider fromPhase="discovery" toPhase="solution" />

        <PhaseSection
          phase="solution"
          phaseNumber={3}
          content={cs.solution}
          glossary={cs.glossary}
        />

        <PhaseDivider fromPhase="solution" toPhase="impact" />

        <PhaseSection
          phase="impact"
          phaseNumber={4}
          content={cs.impact}
          glossary={cs.glossary}
        />
      </PhaseObserver>

      {/* Bottom navigation */}
      <section
        className="py-[var(--space-section-md)] bg-[var(--color-canvas)]"
        aria-label="What to read next"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <ScrollReveal>
            <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)] mb-[var(--space-section-sm)]">
              <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-md)]">
                Next
              </p>
            </div>

            {nextCS && (
              <div className="max-w-[480px] mb-[var(--space-section-sm)]">
                <WorkCard
                  caseStudy={nextCS}
                  cardImageSlot={nextCS.slug === 'mobile-lending-management' ? <MobileLendingCardImage /> : undefined}
                />
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-[var(--space-component-md)] mb-[var(--space-section-md)]">
              <Link
                href="/work"
                className="text-ui-md text-[var(--color-text-muted)] hover:text-[var(--color-ink)] transition-colors duration-200"
              >
                ← Back to all work
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
              <p className="text-body-lg text-[var(--color-text-secondary)] mb-[var(--space-stack-lg)] max-w-content">
                Whether you are looking for a senior product designer or a
                partner for a complex problem, I want to hear about it.
              </p>
              <Button variant="glass" href="/contact">
                Get in touch
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
