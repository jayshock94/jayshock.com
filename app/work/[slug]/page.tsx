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
import AimHeroImage           from '@/components/case-study/AimHeroImage'
import MobileLendingHeroImage from '@/components/case-study/MobileLendingHeroImage'
import PainPoints            from '@/components/case-study/PainPoints'
import Constraints           from '@/components/case-study/Constraints'
import KeyFindings         from '@/components/case-study/KeyFindings'
import ResearchMethods     from '@/components/case-study/ResearchMethods'
import CompetitiveGrid     from '@/components/case-study/CompetitiveGrid'
import PhoneFrame          from '@/components/case-study/PhoneFrame'
import PaymentSuccessAnimation from '@/components/case-study/PaymentSuccessAnimation'
import FinalAppComposite from '@/components/case-study/FinalAppComposite'
import WorkCard            from '@/components/work/WorkCard'
import AimCardImage           from '@/components/work/AimCardImage'
import MobileLendingCardImage from '@/components/work/MobileLendingCardImage'
import CaliberCardImage       from '@/components/work/CaliberCardImage'
import CaliberDashboard       from '@/components/case-study/caliber/CaliberDashboard'
import CaliberIncentives      from '@/components/case-study/caliber/CaliberIncentives'
import CaliberSolarEstimator  from '@/components/case-study/caliber/CaliberSolarEstimator'
import CaliberTechBooking     from '@/components/case-study/caliber/CaliberTechBooking'
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
  { label: 'Role', value: 'Lead Product Designer' },
  { label: 'Team', value: 'Led 2 supporting designers' },
  { label: 'Scope', value: 'Full redesign: audit, research, design, testing, handoff' },
]

const MOBILE_LENDING_ROLE_SUMMARY =
  'Led the design direction and built every screen. Two supporting designers helped with payment flow models, test sessions, and competitor research. Worked across engineering, stakeholders, and POs.'

const MOBILE_LENDING_SKILL_CHIPS = [
  { text: 'User Research', barnabyMessage: 'What kind of user research did Jay do on this project?' },
  { text: 'Usability Testing', barnabyMessage: 'How did Jay run usability tests on the lending app?' },
  { text: 'Stakeholder Alignment', barnabyMessage: 'How did Jay align stakeholders on design decisions for this project?' },
  { text: 'UI Design', barnabyMessage: 'What were Jay\'s biggest UI design decisions on the lending app?' },
  { text: 'White-label Systems', barnabyMessage: 'How did Jay handle designing for a white-label product used by multiple lenders?' },
]

const MOBILE_LENDING_TAG_MESSAGES: Record<string, string> = {
  'White-Label App': 'What does white-label mean and how did it constrain the mobile lending redesign?',
  '9 App Audit': 'Tell me about the competitive analysis Jay did across 9 lending apps.',
  'Payment Redesign': 'How did Jay redesign the payment flow without changing the architecture?',
  'Usability Tested': 'How did Jay validate the mobile lending redesign with usability testing?',
  'Confetti Moment': 'What is the confetti moment and why did it get so much feedback?',
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

/* ------------------------------------------------------------------ */
/*  Caliber Smart — visual components                                 */
/* ------------------------------------------------------------------ */

const CALIBER_ROLE_META = [
  { label: 'Role', value: 'Product Designer (solo)' },
  { label: 'Team', value: 'Solo designer, cross-functional partners' },
  { label: 'Scope', value: 'Full app rebuild: dashboard, sales flows, solar tools, support' },
]

const CALIBER_ROLE_SUMMARY =
  'Worked with VPs, finance, sales support, marketing, payroll, and reps directly. Research through handoff, every screen.'

const CALIBER_TAG_MESSAGES: Record<string, string> = {
  'D2D Sales': 'What is door-to-door sales and how did it shape the design of the Caliber app?',
  'Gamification': 'How did Jay use gamification to drive rep performance at Caliber Smart?',
  'Solar': 'Tell me about the solar estimation tool Jay designed for Caliber Smart.',
  'Solo Designer': 'What was it like being the only designer on a project this big?',
}

const CALIBER_PAIN_POINTS = [
  {
    title: 'Leaderboard updates came through Vimeo',
    description: 'Leaders sent weekly video links. Reps had to watch a recording just to find out where they stood. No way to check in real time.',
  },
  {
    title: 'Incentives lived on social media',
    description: 'Reps saved screenshots of Instagram posts to track incentive criteria. Manual tracking led to disputes, angry calls, and wasted time.',
  },
  {
    title: 'Payroll day was a warzone',
    description: 'Every two weeks, support lines got slammed. Reps calling about pay discrepancies that were usually their own fault. Wrong direct deposit, missed chargebacks.',
  },
  {
    title: 'Permits were a guessing game',
    description: 'Reps didn\'t know if they needed to visit city hall or apply online. Expired permits sidelined reps for days. Legal fees added up.',
  },
  {
    title: 'Area assignments were verbal',
    description: 'Territories were decided in morning meetings and forgotten by lunch. No map, no record, no way to verify who was assigned where.',
  },
  {
    title: 'Solar estimation was a shot in the dark',
    description: 'Reps had no way to accurately estimate panel count or savings at the door. They were guessing, and bad estimates killed trust.',
  },
]

const CALIBER_CONSTRAINTS = [
  { text: 'Multi-product platform', barnabyMessage: 'How did Jay design one app that worked for solar, TV, internet, and pest control sales?' },
  { text: 'Field-first usage', barnabyMessage: 'How did the fact that reps used this app while literally walking door-to-door affect the design?' },
  { text: 'Recruiting advantage', barnabyMessage: 'How was the app used as a tool to recruit top sales reps from competing companies?' },
]

const CALIBER_METHODS = [
  {
    title: 'Sales support interviews',
    description: 'Worked closest with the support department. Their complaints mirrored the reps\' complaints. Every call they took was a design failure.',
  },
  {
    title: 'Rep surveys',
    description: 'Sent surveys to the sales force asking for pain points and friction. Asked what other companies they\'d worked for did better.',
  },
  {
    title: 'Department interviews',
    description: 'Sat down with payroll, finance, marketing, VPs, regional managers, area managers, and the head of the tech department. Each had a different angle on the same problems.',
  },
  {
    title: 'Pattern analysis',
    description: 'Gathered everything and mapped patterns, friction points, and gaps across departments. The leaderboard insight came from this.',
  },
]

const CALIBER_FINDINGS = [
  {
    title: 'The leaderboard was the engine, not the scoreboard',
    description: 'Incentives were tied to leaderboard position. Resort trips, gear, bonuses. Reps checked it more than anything else. It wasn\'t vanity. It was how they planned their week.',
  },
  {
    title: 'Bad days needed to feel recoverable',
    description: 'A rep having a slow morning shouldn\'t see a zero and give up. The dashboard needed to show potential, not just current state.',
  },
  {
    title: 'Every department was solving the same problem differently',
    description: 'Support, payroll, marketing, and management were all dealing with information that should have been in one place. The app was the fix for all of them.',
  },
  {
    title: 'Solar needed trust at the door',
    description: 'Reps couldn\'t close solar without accurate estimates. Customers needed to see the numbers, and reps needed confidence in what they were selling.',
  },
]

const CALIBER_SKILL_CHIPS = [
  { text: 'User Research', barnabyMessage: 'What kind of user research did Jay do for the Caliber Smart app?' },
  { text: 'Gamification Design', barnabyMessage: 'How did Jay apply gamification principles to the Caliber sales dashboard?' },
  { text: 'UI Design', barnabyMessage: 'What were Jay\'s biggest UI decisions on the Caliber Smart app?' },
  { text: 'Cross-functional Collaboration', barnabyMessage: 'How did Jay work across departments as a solo designer at Caliber?' },
  { text: 'Information Architecture', barnabyMessage: 'How did Jay organize a multi-product sales app with this many features?' },
]

/* ------------------------------------------------------------------ */
/*  AIM — visual components                                           */
/* ------------------------------------------------------------------ */

const AIM_ROLE_META = [
  { label: 'Role', value: 'Senior UX Designer' },
  { label: 'Team', value: '2 designers, 4+ dev teams' },
  { label: 'Scope', value: 'Settings, navigation, queue tiles, comments, integrations' },
]

const AIM_ROLE_SUMMARY =
  'Worked alongside the Lead UX Designer, splitting modules and owning full pages from research through handoff. Direct access to lenders, tellers, and branch managers.'

const AIM_TAG_MESSAGES: Record<string, string> = {
  'Legacy Replacement': 'What was the legacy system AIM replaced and why was it failing?',
  'Field Research': 'What kind of field research did Jay do for AIM? How did he work with lenders?',
  '12 Modules': 'What were the 12 modules Jay designed for AIM?',
  '$10M Impact': 'How did AIM land a $10M contract? What was the business impact?',
}

const AIM_PAIN_POINTS = [
  {
    title: 'Five or more tabs open at all times',
    description: 'Lenders managed loans across separate tools, spreadsheets, and browser tabs. Context was scattered. Errors compounded.',
  },
  {
    title: 'Cross-team handoffs broke constantly',
    description: 'Different teams used different products for each phase of the loan process. Handing work from one team to the next meant switching systems and losing context.',
  },
  {
    title: 'Managers spent hours triaging queues',
    description: 'Leaders came in early just to figure out who should work on what. Sticky notes, spreadsheets, and manual assignment consumed their mornings.',
  },
  {
    title: 'New employees took months to learn SIM',
    description: 'The legacy system had years of Frankenstein add-ons. Experienced people built workarounds. New people had no chance.',
  },
]

const AIM_CONSTRAINTS = [
  { text: 'Multi-client product, single-client funding', barnabyMessage: 'How did Jay balance building for one paying client vs. designing for all future clients?' },
  { text: 'GAIN conference deadlines', barnabyMessage: 'What was the GAIN conference and how did it affect the AIM timeline?' },
  { text: 'Competitor systems locked down', barnabyMessage: 'How did Jay research competitors when their systems were locked down?' },
]

const AIM_METHODS = [
  {
    title: 'Branch visits',
    description: 'Visited branches. Sat with tellers, lenders, and managers while they worked. Studied their workarounds firsthand.',
  },
  {
    title: 'Stakeholder interviews',
    description: 'Interviewed financial leads, branch managers, and POs across multiple products to understand the full lending ecosystem.',
  },
  {
    title: 'Workflow mapping',
    description: 'Documented every tool, spreadsheet, and sticky-note system that lenders used to fill the gaps in existing products.',
  },
  {
    title: 'Product demos',
    description: 'Got demos from similar products. Studied dashboards and data-heavy tools across fintech to identify mental models.',
  },
]

const AIM_FINDINGS = [
  {
    title: 'A hub, not a replacement',
    description: 'Lenders used different products at every phase. They didn\'t need those replaced. They needed one surface that connected into all of them.',
  },
  {
    title: 'The real problem was queue management',
    description: 'It wasn\'t just about seeing loans in one place. Managers were drowning in figuring out who should work on what. That cognitive load was the bottleneck.',
  },
  {
    title: 'Settings had to be foolproof',
    description: 'Every lender, every branch, did things a little differently. The system needed to be deeply customizable without letting anyone break it.',
  },
  {
    title: 'Cross-team context was the missing layer',
    description: 'Loans move through multiple teams. Notes, comments, and history had to travel with the loan so the next person never started cold.',
  },
]

export default function CaseStudyPage({ params }: PageProps) {
  const cs = getCaseStudy(params.slug)
  if (!cs) notFound()

  const tokens = generateTokens(cs.brandColorHex)
  const nextCS = getCaseStudy(cs.nextSlug)
  const isMobileLending = cs.slug === 'mobile-lending-management'
  const isAim = cs.slug === 'aim'
  const isCaliber = cs.slug === 'caliber-smart'

  return (
    <>
      {/* Editorial hero */}
      <CaseStudyHero
        caseStudy={cs}
        tokens={tokens}
        heroImageSlot={
          cs.slug === 'aim' ? <AimHeroImage /> :
          isMobileLending ? <MobileLendingHeroImage /> :
          isCaliber ? (
            <div style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto', height: 'clamp(300px, 38vw, 420px)' }}>
              <CaliberCardImage />
            </div>
          ) :
          undefined
        }
        tagMessages={isAim ? AIM_TAG_MESSAGES : isMobileLending ? MOBILE_LENDING_TAG_MESSAGES : isCaliber ? CALIBER_TAG_MESSAGES : undefined}
      />

      {/* Narrative lede: context + role */}
      <CaseStudyLede
        context={cs.context}
        overview={cs.overview}
        roleMeta={isAim ? AIM_ROLE_META : isMobileLending ? MOBILE_LENDING_ROLE_META : isCaliber ? CALIBER_ROLE_META : undefined}
        roleSummary={isAim ? AIM_ROLE_SUMMARY : isMobileLending ? MOBILE_LENDING_ROLE_SUMMARY : isCaliber ? CALIBER_ROLE_SUMMARY : undefined}
        glossary={cs.glossary}
        accentColor={tokens.label}
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
            isAim ? (
              <>
                <PainPoints points={AIM_PAIN_POINTS} />
                <Constraints constraints={AIM_CONSTRAINTS} />
              </>
            ) : isCaliber ? (
              <>
                <PainPoints points={CALIBER_PAIN_POINTS} />
                <Constraints constraints={CALIBER_CONSTRAINTS} />
              </>
            ) : isMobileLending ? (
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


        <PhaseSection
          phase="discovery"
          phaseNumber={2}
          content={cs.discovery}
          glossary={cs.glossary}
          mediaSlot={
            isAim ? (
              <>
                <ResearchMethods methods={AIM_METHODS} />

                {/* Process artifacts — Figma screenshots */}
                <ScrollReveal>
                  <div style={{ marginTop: 'var(--space-section-sm)', marginBottom: 'var(--space-section-sm)' }}>
                    <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-sm)]">
                      FROM THE FIGMA FILES
                    </p>
                    <div className="grid md:grid-cols-2 gap-[var(--space-component-lg)]">
                      <div>
                        <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                          <Image
                            src="/images/figjam screenshots/AIM/Screenshot 2026-04-01 005615.png"
                            alt="Market research board — competitor dashboard screenshots and analysis"
                            width={1200}
                            height={700}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                          />
                        </div>
                        <p className="text-body-sm text-[var(--color-text-muted)] mt-[var(--space-stack-xs)]">
                          Market research. Every competitor dashboard side by side.
                        </p>
                      </div>
                      <div>
                        <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                          <Image
                            src="/images/figjam screenshots/AIM/Screenshot 2026-04-01 005709.png"
                            alt="Collections flow chart and wireframes — user flow mapping"
                            width={1200}
                            height={700}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                          />
                        </div>
                        <p className="text-body-sm text-[var(--color-text-muted)] mt-[var(--space-stack-xs)]">
                          Collections flow. Every path mapped before a single pixel.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                <KeyFindings
                  findings={AIM_FINDINGS}
                  accentColor="var(--phase-discovery-label)"
                  glossary={cs.glossary}
                />
              </>
            ) : isCaliber ? (
              <>
                <ResearchMethods methods={CALIBER_METHODS} />
                <KeyFindings
                  findings={CALIBER_FINDINGS}
                  accentColor="var(--phase-discovery-label)"
                  glossary={cs.glossary}
                />
              </>
            ) : isMobileLending ? (
              <>
                <ResearchMethods methods={MOBILE_LENDING_METHODS} />
                <CompetitiveGrid
                  competitors={MOBILE_LENDING_COMPETITORS}
                  criteria={MOBILE_LENDING_CRITERIA}
                />

                {/* Process artifacts — Figma screenshots */}
                <ScrollReveal>
                  <div style={{ marginTop: 'var(--space-section-sm)', marginBottom: 'var(--space-section-sm)' }}>
                    <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-sm)]">
                      FROM THE FIGMA FILES
                    </p>
                    <div className="grid md:grid-cols-2 gap-[var(--space-component-lg)]">
                      <div>
                        <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                          <Image
                            src="/images/figjam screenshots/mobile loan app/Dashboard.png"
                            alt="Competitor audit board — 9 lending apps analyzed for hierarchy, navigation, and payment flows"
                            width={1200}
                            height={1600}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                          />
                        </div>
                        <p className="text-body-sm text-[var(--color-text-muted)] mt-[var(--space-stack-xs)]">
                          Competitor audit. Nine apps torn apart to find what borrowers expected.
                        </p>
                      </div>
                      <div>
                        <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                          <Image
                            src="/images/figjam screenshots/mobile loan app/Screenshot 2026-04-01 004906.png"
                            alt="Current vs proposed user flow — flow chart comparison showing simplified navigation paths"
                            width={1200}
                            height={700}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                          />
                        </div>
                        <p className="text-body-sm text-[var(--color-text-muted)] mt-[var(--space-stack-xs)]">
                          Current flow vs proposed. Mapping every path before redesigning a single screen.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                <KeyFindings
                  findings={MOBILE_LENDING_FINDINGS}
                  accentColor="var(--phase-discovery-label)"
                  glossary={cs.glossary}
                />
              </>
            ) : undefined
          }
          mediaSlotAfterParagraph={(isAim || isMobileLending || isCaliber) ? 1 : undefined}
        />


        <PhaseSection
          phase="solution"
          phaseNumber={3}
          content={cs.solution}
          glossary={cs.glossary}
          mediaSlot={
            isCaliber ? (
              <>
                <ScrollReveal>
                  <div style={{ marginTop: 'var(--space-section-sm)', marginBottom: 'var(--space-section-sm)' }}>
                    <CaliberDashboard />
                    <p className="text-body-sm" style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 'var(--space-stack-sm)', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
                      The dashboard. Leaderboard position, key metrics, and estimated pay. Everything a rep checks first.
                    </p>
                  </div>
                </ScrollReveal>
                <ScrollReveal>
                  <div style={{ marginTop: 'var(--space-section-sm)', marginBottom: 'var(--space-section-sm)' }}>
                    <CaliberIncentives />
                    <p className="text-body-sm" style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 'var(--space-stack-sm)', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
                      Incentives. Progress bars replaced social media screenshots and guesswork.
                    </p>
                  </div>
                </ScrollReveal>
                <ScrollReveal>
                  <div style={{ marginTop: 'var(--space-section-sm)', marginBottom: 'var(--space-section-sm)' }}>
                    <div style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '20px',
                      padding: 'var(--space-section-sm) var(--space-component-lg)',
                      maxWidth: '860px',
                      margin: '0 auto',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--space-stack-sm)',
                    }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                      <p className="text-body-sm" style={{ color: 'var(--color-text-muted)', margin: 0, fontWeight: 500 }}>
                        Solar Estimator
                      </p>
                      <p className="text-body-sm" style={{ color: 'var(--color-text-muted)', margin: 0, opacity: 0.7, textAlign: 'center' }}>
                        This screen is under NDA and cannot be shown publicly.
                      </p>
                    </div>
                    <p className="text-body-sm" style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 'var(--space-stack-sm)', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                      The solar estimator. Satellite imagery, panel count, and savings. All at the door.
                    </p>
                  </div>
                </ScrollReveal>
                <ScrollReveal>
                  <div style={{ marginTop: 'var(--space-section-sm)', marginBottom: 'var(--space-section-sm)' }}>
                    <CaliberTechBooking />
                    <p className="text-body-sm" style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 'var(--space-stack-sm)', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
                      Tech booking. Ratings, availability, and a face. Trust before the tech even shows up.
                    </p>
                  </div>
                </ScrollReveal>
              </>
            ) : isMobileLending ? (
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
          mediaSlotAfterParagraph={isCaliber ? 1 : isMobileLending ? 1 : undefined}
        />


        <PhaseSection
          phase="impact"
          phaseNumber={4}
          content={cs.impact}
          glossary={cs.glossary}
          mediaSlot={isMobileLending ? <FinalAppComposite /> : undefined}
          mediaSlotAfterParagraph={isMobileLending ? 1 : undefined}
        />
      </PhaseObserver>

      {/* ── Explorations — directions tried and killed ── */}
      {cs.explorations && cs.explorations.length > 0 && (
        <section
          className="py-[var(--space-section-md)]"
          style={{ background: '#161616' }}
          aria-label="Design explorations"
        >
          <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
            <ScrollReveal>
              <div className="max-w-content">
                <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-sm)]">
                  WHAT I EXPLORED
                </p>
                <h2 className="text-h2 text-[var(--color-ink)] mb-[var(--space-stack-md)]">
                  Directions I tried and killed.
                </h2>
                <p className="text-body text-[var(--color-text-secondary)] mb-[var(--space-section-sm)]">
                  Not everything shipped. These are the ideas I invested in, tested, and
                  ultimately cut because something better emerged from the research.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-[var(--space-component-lg)] max-w-layout">
              {cs.explorations.map((exp, i) => (
                <ScrollReveal key={exp.title} className="md:h-full">
                  <div
                    className="rounded-[var(--space-component-sm)] p-[var(--space-component-lg)] md:h-full"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div
                      className="text-ui-md mb-[var(--space-stack-sm)]"
                      style={{
                        color: 'var(--color-text-muted)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-h4 text-[var(--color-ink)] mb-[var(--space-stack-sm)]">
                      {exp.title}
                    </h3>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      {exp.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Exploration images — rendered below the cards, matching phase image sizing */}
            {cs.explorations.filter(exp => exp.image?.src).map((exp) => (
              <ScrollReveal key={`exp-img-${exp.title}`}>
                <div
                  className="max-w-layout mx-auto"
                  style={{ marginTop: 'var(--space-stack-lg)', marginBottom: 'var(--space-stack-md)' }}
                >
                  <figure className="m-0">
                    <div
                      className="relative w-full rounded-[8px] overflow-hidden border border-[var(--color-border)]"
                      style={{ aspectRatio: exp.image!.aspect === 'portrait' ? '9/18' : '16/9' }}
                    >
                      <Image
                        src={exp.image!.src}
                        alt={exp.image!.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 1200px"
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                      />
                    </div>
                    {exp.image!.caption && (
                      <figcaption className="mt-[var(--space-component-sm)] text-body-sm text-[var(--color-text-muted)] text-center">
                        {exp.image!.caption}
                      </figcaption>
                    )}
                  </figure>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Learnings — what the project taught me ── */}
      {cs.learnings && (
        <section
          className="py-[var(--space-section-sm)]"
          style={{ background: '#161616' }}
          aria-label="What I learned"
        >
          <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
            <ScrollReveal>
              <div className="max-w-content">
                <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-sm)]">
                  WHAT I LEARNED
                </p>
                <p className="text-intro text-[var(--color-text-secondary)]">
                  {cs.learnings}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Bottom navigation — force back to true canvas, no phase bleed */}
      <section
        className="py-[var(--space-section-md)]"
        style={{ background: '#161616' }}
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
                  cardImageSlot={
                    nextCS.slug === 'aim' ? <AimCardImage /> :
                    nextCS.slug === 'mobile-lending-management' ? <MobileLendingCardImage /> :
                    nextCS.slug === 'caliber-smart' ? <CaliberCardImage /> :
                    undefined
                  }
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
