import type { Metadata } from 'next'
import { notFound }       from 'next/navigation'
import Link               from 'next/link'
import { getCaseStudy, caseStudySlugs, caseStudies } from '@/data/case-studies'
import { generateTokens } from '@/lib/colorAlgorithm'
import CaseStudyHero      from '@/components/case-study/CaseStudyHero'
import PhaseSection       from '@/components/case-study/PhaseSection'
import PhaseObserver      from '@/components/case-study/PhaseObserver'
import PasswordGate       from '@/components/case-study/PasswordGate'
import WorkCard           from '@/components/work/WorkCard'
import Button             from '@/components/ui/Button'

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

  // Generate brand color tokens server-side — never in the browser
  const tokens = generateTokens(cs.brandColorHex)

  // Find the next case study for bottom navigation
  const nextCS = getCaseStudy(cs.nextSlug)

  const content = (
    <>
      {/* Case study hero — brand color zone, phase color not yet active */}
      <CaseStudyHero caseStudy={cs} tokens={tokens} />

      {/* Phase sections — wrapped in observer that shifts ambient color */}
      <PhaseObserver>
        <PhaseSection phase="impact"    content={cs.impact}    />
        <PhaseSection phase="problem"   content={cs.problem}   />
        <PhaseSection phase="discovery" content={cs.discovery} />
        <PhaseSection phase="solution"  content={cs.solution}  />
      </PhaseObserver>

      {/* Next case study + contact CTA */}
      <section
        className="
          py-[var(--space-section-md)]
          bg-[var(--color-canvas)]
        "
        aria-label="What to read next"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div
            className="
              border-t border-[var(--color-border)]
              pt-[var(--space-section-sm)]
              mb-[var(--space-section-sm)]
            "
          >
            <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-md)]">
              Next
            </p>
          </div>

          {/* Next case study card */}
          {nextCS && (
            <div className="max-w-[480px] mb-[var(--space-section-sm)]">
              <WorkCard caseStudy={nextCS} monochromatic />
            </div>
          )}

          {/* Back to all work */}
          <div className="flex flex-wrap items-center gap-[var(--space-component-md)] mb-[var(--space-section-md)]">
            <Link
              href="/work"
              className="
                text-ui-md text-[var(--color-text-muted)]
                hover:text-[var(--color-ink)]
                transition-colors duration-200
              "
            >
              ← Back to all work
            </Link>
          </div>

          {/* Contact CTA */}
          <div
            className="
              border-t border-[var(--color-border)]
              pt-[var(--space-section-sm)]
            "
          >
            <p className="text-body-lg text-[var(--color-text-secondary)] mb-[var(--space-stack-lg)] max-w-content">
              Whether you are looking for a senior product designer or a
              partner for a complex problem, I want to hear about it.
            </p>
            <Button variant="primary" href="/contact">
              Get in touch
            </Button>
          </div>
        </div>
      </section>
    </>
  )

  // Wrap in password gate if protected
  if (cs.isProtected) {
    return (
      <PasswordGate slug={cs.slug} title={cs.title} industry={cs.industry}>
        {content}
      </PasswordGate>
    )
  }

  return content
}
