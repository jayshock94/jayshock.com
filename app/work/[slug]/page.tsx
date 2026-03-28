import type { Metadata } from 'next'
import { notFound }  from 'next/navigation'
import Link          from 'next/link'
import Image         from 'next/image'
import { getCaseStudy, caseStudySlugs } from '@/data/case-studies'
import { generateTokens }  from '@/lib/colorAlgorithm'
import CaseStudyHero       from '@/components/case-study/CaseStudyHero'
import CaseStudyLede       from '@/components/case-study/CaseStudyLede'
import PhaseSection        from '@/components/case-study/PhaseSection'
import PhaseObserver       from '@/components/case-study/PhaseObserver'
import PhaseProgress       from '@/components/case-study/PhaseProgress'
import PhaseDivider        from '@/components/case-study/PhaseDivider'
import MobileLendingHeroImage from '@/components/case-study/MobileLendingHeroImage'
import PainPoints            from '@/components/case-study/PainPoints'
import Constraints           from '@/components/case-study/Constraints'
import KeyFindings         from '@/components/case-study/KeyFindings'
import ResearchMethods     from '@/components/case-study/ResearchMethods'
import CompetitiveGrid     from '@/components/case-study/CompetitiveGrid'
import PhoneFrame          from '@/components/case-study/PhoneFrame'
import PaymentSuccessAnimation from '@/components/case-study/PaymentSuccessAnimation'
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

/* ------------------------------------------------------------------ */
/*  Mobile Lending Management — visual components                     */
/* ------------------------------------------------------------------ */

const MOBILE_LENDING_ROLE_META = [
  { label: 'Role', value: 'Lead UX + Product Design' },
  { label: 'Team', value: '2 supporting designers' },
  { label: 'Scope', value: 'End to end: research through handoff' },
]

const MOBILE_LENDING_ROLE_SUMMARY =
  'Worked across engineering, stakeholders, and product owners to figure out what we could ship within an architecture we couldn\'t rebuild.'

const MOBILE_LENDING_SKILL_CHIPS = [
  { text: 'User Research', barnabyMessage: 'What kind of user research did Jay do on this project?' },
  { text: 'Usability Testing', barnabyMessage: 'How did Jay run usability tests on the lending app?' },
  { text: 'Stakeholder Alignment', barnabyMessage: 'How did Jay align stakeholders on design decisions for this project?' },
  { text: 'UI Design', barnabyMessage: 'What were Jay\'s biggest UI design decisions on the lending app?' },
  { text: 'White-label Systems', barnabyMessage: 'How did Jay handle designing for a white-label product used by multiple lenders?' },
]

const MOBILE_LENDING_TAG_MESSAGES: Record<string, string> = {
  'Mobile': 'Tell me about Jay\'s mobile design experience on this project.',
  'Research': 'What kind of research did Jay do for the lending app redesign?',
  'End to End': 'What does end to end mean for Jay on this project? What did he own?',
}

const MOBILE_LENDING_COMPETITORS = [
  { name: 'Wells Fargo', logo: '/images/competitors/wells-fargo.png', category: 'bank' },
  { name: 'Chase', logo: '/images/competitors/chase.png', category: 'bank' },
  { name: 'Capital One', logo: '/images/competitors/capital-one.png', category: 'fintech' },
  { name: 'Ally', logo: '/images/competitors/ally.png', category: 'fintech' },
  { name: 'PNC', logo: '/images/competitors/pnc.png', category: 'bank' },
  { name: 'USAA', logo: '/images/competitors/usaa.png', category: 'bank' },
  { name: 'Zions Bank', logo: '/images/competitors/zions-bank.png', category: 'bank' },
  { name: 'Mountain America', logo: '/images/competitors/mountain-america.png', category: 'credit-union' },
  { name: 'Deseret First', logo: '/images/competitors/deseret-first.png', category: 'credit-union' },
]

const MOBILE_LENDING_CRITERIA = [
  'dashboard hierarchy',
  'navigation patterns',
  'payment flows',
  'account details',
]

const MOBILE_LENDING_PAIN_POINTS = [
  {
    title: 'Loans listed by number, not name',
    description: 'Three loans meant three mystery strings of digits. No way to tell which was the car and which was the house.',
  },
  {
    title: 'Autopay buried behind multiple screens',
    description: 'The flow didn\'t match how people think about paying bills. Most borrowers never found it.',
  },
  {
    title: 'Technical labels instead of task-based',
    description: 'Borrowers had to learn the system instead of the system meeting them where they were.',
  },
  {
    title: 'Top tasks weren\'t prioritized',
    description: 'Pay, check balance, see due dates. The things people actually came to do weren\'t surfaced.',
  },
]

const MOBILE_LENDING_CONSTRAINTS = [
  { text: 'No full rebuild', barnabyMessage: 'Why couldn\'t Jay do a full rebuild on the lending app?' },
  { text: 'Shared architecture across lenders', barnabyMessage: 'How did the shared architecture across lenders constrain the design?' },
  { text: 'Fixed launch deadlines', barnabyMessage: 'How did launch deadlines affect design decisions on this project?' },
  { text: 'Every change had to work for all clients', barnabyMessage: 'How did Jay handle designing for multiple lender clients at once?' },
]

const MOBILE_LENDING_FINDINGS = [
  {
    title: 'Survivorship bias in stakeholder assumptions',
    description: 'Frustrated borrowers mentioned the branch locator when they came in. Stakeholders assumed that was the problem. The real issue was they couldn\'t make payments from the app.',
  },
  {
    title: 'The hierarchy gap, not a feature gap',
    description: 'Every competitor had the same features. The difference was which apps surfaced what users actually came to do vs. buried it behind system-level thinking.',
  },
  {
    title: 'Payment perception matters more than payment steps',
    description: 'The flow couldn\'t be shortened. But progress indicators, chunked information, and visual variety changed how long it felt.',
  },
  {
    title: 'Account numbers are meaningless to borrowers',
    description: 'Three loans listed by number meant three mystery strings. Users don\'t memorize account numbers. They remember "the car" and "the house."',
  },
]

const MOBILE_LENDING_METHODS = [
  {
    title: 'Competitive analysis',
    description: '9 apps across banks, credit unions, and fintech lenders. Mapped dashboard hierarchy, navigation, payment flows, and account details.',
  },
  {
    title: 'PO feedback templates',
    description: 'Built structured templates for product owners visiting client sites. Standardized how we gathered feedback from lender teams.',
  },
  {
    title: 'App store reviews',
    description: 'Pulled pain points and friction from reviews of competing products. Identified patterns in what borrowers actually complained about.',
  },
  {
    title: 'Usability testing',
    description: 'Sent prototypes to UserTesting. Participants completed goals while recording sessions. Tracked navigation speed and captured impressions at key steps.',
  },
]

export default function CaseStudyPage({ params }: PageProps) {
  const cs = getCaseStudy(params.slug)
  if (!cs) notFound()

  const tokens = generateTokens(cs.brandColorHex)
  const nextCS = getCaseStudy(cs.nextSlug)
  const isMobileLending = cs.slug === 'mobile-lending-management'

  return (
    <>
      {/* Editorial hero */}
      <CaseStudyHero
        caseStudy={cs}
        tokens={tokens}
        heroImageSlot={isMobileLending ? <MobileLendingHeroImage /> : undefined}
        tagMessages={isMobileLending ? MOBILE_LENDING_TAG_MESSAGES : undefined}
      />

      {/* Narrative lede: context + role */}
      <CaseStudyLede
        context={cs.context}
        overview={cs.overview}
        roleMeta={isMobileLending ? MOBILE_LENDING_ROLE_META : undefined}
        roleSummary={isMobileLending ? MOBILE_LENDING_ROLE_SUMMARY : undefined}
      />

      {/* Phase sections with observer, progress, and dividers */}
      <PhaseObserver>
        <PhaseProgress />

        <PhaseSection
          phase="problem"
          phaseNumber={1}
          content={cs.problem}
          glossary={cs.glossary}
          mediaSlot={
            isMobileLending ? (
              <>
                <PainPoints points={MOBILE_LENDING_PAIN_POINTS} />
                <Constraints constraints={MOBILE_LENDING_CONSTRAINTS} />
                <ScrollReveal>
                  <div
                    style={{
                      marginTop: 'var(--space-stack-lg)',
                      marginBottom: 'var(--space-stack-lg)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-stack-md)',
                      alignItems: 'center',
                    }}
                  >
                    {/* Cropped view: just the loan accounts list */}
                    <div
                      style={{
                        width: '100%',
                        maxWidth: '300px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '0.5px solid var(--color-border)',
                        background: '#f5f0ea',
                        position: 'relative',
                      }}
                    >
                      <div style={{
                        width: '100%',
                        overflow: 'hidden',
                        position: 'relative',
                        height: '300px',
                      }}>
                        <Image
                          src="/images/mobile/legacy-accounts.png"
                          alt="Original app account list — loans identified only by account numbers like 1028-000388-09"
                          width={960}
                          height={2747}
                          style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            position: 'absolute',
                            top: '-90%',
                          }}
                        />
                      </div>
                    </div>
                    <p
                      className="text-body-sm"
                      style={{
                        color: 'var(--color-text-muted)',
                        textAlign: 'center',
                        margin: 0,
                        maxWidth: '400px',
                      }}
                    >
                      Loans listed by account number. No names, no icons, no way to tell which is which.
                    </p>

                    {/* Account detail page in phone frame — cropped to phone height */}
                    <div style={{ marginTop: 'var(--space-stack-sm)' }}>
                      <PhoneFrame
                        src="/images/mobile/legacy-account-detail.png"
                        alt="Original account detail page — dense information with no visual hierarchy"
                        caption="The account detail page. Everything a borrower might need, buried in a wall of data."
                        maxWidth={280}
                        cropToPhone
                      />
                    </div>
                  </div>
                </ScrollReveal>
              </>
            ) : undefined
          }
          mediaSlotAfterParagraph={0}
        />

        <PhaseDivider fromPhase="problem" toPhase="discovery" />

        <PhaseSection
          phase="discovery"
          phaseNumber={2}
          content={cs.discovery}
          glossary={cs.glossary}
          mediaSlot={
            isMobileLending ? (
              <>
                <ResearchMethods methods={MOBILE_LENDING_METHODS} />
                <CompetitiveGrid
                  competitors={MOBILE_LENDING_COMPETITORS}
                  criteria={MOBILE_LENDING_CRITERIA}
                />
                <KeyFindings
                  findings={MOBILE_LENDING_FINDINGS}
                  accentColor="var(--phase-discovery-label)"
                  glossary={cs.glossary}
                />
              </>
            ) : undefined
          }
          mediaSlotAfterParagraph={isMobileLending ? 1 : undefined}
        />

        <PhaseDivider fromPhase="discovery" toPhase="solution" />

        <PhaseSection
          phase="solution"
          phaseNumber={3}
          content={cs.solution}
          glossary={cs.glossary}
          mediaSlot={
            isMobileLending ? (
              <ScrollReveal>
                <div style={{ marginTop: 'var(--space-stack-lg)', marginBottom: 'var(--space-stack-lg)' }}>
                  <PhoneFrame
                    src="/images/mobile/redesigned-dashboard.png"
                    alt="Redesigned loan dashboard — each loan showing its name, due date, and amount owed"
                    caption="Home screen loan dashboard. Everything a borrower needs without a single tap."
                  />
                </div>
              </ScrollReveal>
            ) : undefined
          }
          mediaSlotAfterParagraph={isMobileLending ? 1 : undefined}
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
