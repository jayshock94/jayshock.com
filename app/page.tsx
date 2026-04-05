import type { Metadata } from 'next'
import Link from 'next/link'
import Button        from '@/components/ui/Button'
import WorkCard      from '@/components/work/WorkCard'
import AimCardImage           from '@/components/work/AimCardImage'
import MobileLendingCardImage from '@/components/work/MobileLendingCardImage'
import CaliberCardImage from '@/components/work/CaliberCardImage'
import HowIWork      from '@/components/about/HowIWork'
import Toolkit       from '@/components/about/Toolkit'
import AboutText     from '@/components/about/AboutText'
import ContactForm   from '@/app/contact/ContactForm'
import ScrollReveal    from '@/components/ui/ScrollReveal'
import SectionTracker  from '@/components/ui/SectionTracker'
import SectionIcon     from '@/components/icons/SectionIcon'
import { caseStudies } from '@/data/case-studies'

export const metadata: Metadata = {
  title:       'Jay Shock — Product Designer',
  description:
    'I make complex products feel like they were always simple. 8 plus years in fintech and enterprise SaaS.',
}


export default function HomePage() {
  const featured = caseStudies.slice(0, 3)

  return (
    <>
      <SectionTracker />

      {/* =========================================================
          Section 01 — Hero
          Black and white only. No phase color. No accent.
      ========================================================= */}
      <section
        className="px-[var(--space-page-margin)]"
        style={{
          paddingTop:    'clamp(80px, 12vw, 140px)',
          paddingBottom: 'clamp(60px, 8vw, 100px)',
        }}
        id="hero"
        aria-label="Introduction"
      >
        <div
          className="max-w-content mx-auto flex flex-col items-center gap-[24px]"
        >

          {/* Headline — word-by-word reveal, bold words carry the message */}
          <h1
            className="text-center w-full"
            style={{
              fontFamily:   'var(--font-outfit), system-ui, sans-serif',
              fontSize:     'clamp(38px, 7vw, 57px)',
              lineHeight:   '1.12',
              letterSpacing: '-0.25px',
              fontWeight:   400,
            }}
          >
            <span style={{ fontWeight: 300, color: 'var(--color-text-muted)' }}>
              <span className="hero-word" style={{ animationDelay: '300ms' }}>I&apos;m </span>
            </span>
            <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>
              <span className="hero-word hero-word--bold">Jay Shock.</span>
            </span>
            <br />
            <span style={{ fontWeight: 300, color: 'var(--color-text-muted)' }}>
              <span className="hero-word" style={{ animationDelay: '400ms' }}>I </span>
              <span className="hero-word" style={{ animationDelay: '460ms' }}>make </span>
              <span className="hero-word" style={{ animationDelay: '520ms' }}>complex </span>
              <span className="hero-word" style={{ animationDelay: '580ms' }}>products </span>
            </span>
            <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>
              <span className="hero-word hero-word--bold">simple.</span>
            </span>
          </h1>

          {/* Status chips — Figma spec: rounded-8, border-subtle-16, h-32, 14px/500 */}
          <div
            className="flex flex-wrap gap-[8px] items-center justify-center hero-fade-up"
            style={{ animationDelay: '750ms' }}
          >
            {/* Chip 1 — with green availability dot */}
            <span
              style={{
                display:         'inline-flex',
                alignItems:      'center',
                gap:             '8px',
                height:          '32px',
                paddingLeft:     '8px',
                paddingRight:    '16px',
                borderRadius:    '8px',
                border:          '1px solid var(--color-border-subtle-16)',
                background:      'var(--color-surface)',
                fontFamily:      'var(--font-outfit), system-ui, sans-serif',
                fontSize:        '14px',
                fontWeight:      500,
                lineHeight:      '20px',
                letterSpacing:   '0.1px',
                color:           'var(--color-text-muted)',
                whiteSpace:      'nowrap',
              }}
            >
              <span
                style={{
                  width:        '8px',
                  height:       '8px',
                  borderRadius: '50%',
                  background:   'var(--color-status-available)',
                  boxShadow:    '0 0 6px var(--color-status-available-glow)',
                  flexShrink:   0,
                }}
                aria-hidden="true"
              />
              Open to opportunities
            </span>

            {/* Chip 2 — text only */}
            <span
              style={{
                display:       'inline-flex',
                alignItems:    'center',
                height:        '32px',
                paddingLeft:   '16px',
                paddingRight:  '16px',
                borderRadius:  '8px',
                border:        '1px solid var(--color-border-subtle-16)',
                background:    'var(--color-surface)',
                fontFamily:    'var(--font-outfit), system-ui, sans-serif',
                fontSize:      '14px',
                fontWeight:    500,
                lineHeight:    '20px',
                letterSpacing: '0.1px',
                color:         'var(--color-text-muted)',
                whiteSpace:    'nowrap',
              }}
            >
              8 years in fintech and enterprise SaaS
            </span>
          </div>

          {/* CTAs — grid forces equal width regardless of label length */}
          <div
            className="grid grid-cols-2 gap-[8px] hero-fade-up"
            style={{ animationDelay: '900ms' }}
          >
            <Button variant="glass" href="/contact" className="w-full">
              Contact me
            </Button>
            <Button variant="secondary" href="/api/resume" download className="w-full">
              Download resume
            </Button>
          </div>

        </div>
      </section>


      {/* =========================================================
          Section 02 — Featured Work
      ========================================================= */}
      <section
        id="work"
        className="py-[var(--space-section-md)] px-[var(--space-page-margin)]"
        aria-labelledby="work-heading"
      >
        <div className="max-w-content mx-auto">

          <div className="text-center hero-fade-up" style={{ animationDelay: '1200ms' }}>
            <SectionIcon variant="work" glowColor="var(--phase-impact-label)" />
            <h2
              id="work-heading"
              className="text-display"
              style={{ color: 'var(--color-ink)', marginTop: '-14px' }}
            >
              Featured case studies
            </h2>
          </div>

          <div
            className="
              grid grid-cols-1 gap-[var(--space-component-lg)] items-stretch
            "
            style={{ marginTop: 'clamp(40px, 8vw, 70px)' }}
          >
            {featured.map((cs, i) => (
              <div
                key={cs.slug}
                className="h-full hero-fade-up"
                style={{ animationDelay: `${1350 + i * 150}ms` }}
              >
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
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================
          Section 03 — About (includes How I Work as subsection)
      ========================================================= */}
      <section
        aria-label="About"
        className="px-[var(--space-page-margin)]"
        style={{
          paddingTop:    'var(--space-section-md)',
          paddingBottom: 'var(--space-section-md)',
        }}
      >
        <div
          className="mx-auto"
          style={{ maxWidth: 'var(--space-content-max)' }}
        >
          <div className="flex flex-col items-center" style={{ gap: 'clamp(40px, 8vw, 70px)' }}>

            {/* Section header — icon + display heading */}
            <ScrollReveal>
              <div className="text-center">
                <SectionIcon variant="about" glowColor="var(--phase-problem-label)" />
                <p
                  className="text-display"
                  style={{ color: 'var(--color-ink)', marginTop: '-14px' }}
                >
                  About me
                </p>
              </div>
            </ScrollReveal>

            {/* Subsection 1 — I got here by paying attention */}
            <ScrollReveal>
              {/* Photo + copy row */}
              <div className="flex flex-col items-center md:items-start gap-[var(--space-stack-lg)] md:flex-row md:gap-[48px]">

                {/* Photo — mobile: fixed 220×220; desktop: stretches to content column height */}
                <div
                  className="flex-shrink-0 md:self-stretch relative overflow-hidden rounded-full md:rounded-[8px] w-[140px] h-[140px] md:w-[220px] md:min-h-[220px] md:h-auto"
                  style={{ border: '0.5px solid var(--color-text-muted)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/jay-headshot.png"
                    alt="Jay Shock"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col" style={{ gap: '24px' }}>
                  <h2 className="text-h1 text-[var(--color-ink)]">
                    I got here by paying attention.
                  </h2>
                  <AboutText />
                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-[8px] self-center md:self-start" style={{ maxWidth: '320px' }}>
                    <Button variant="glass" href="/contact" className="w-full">
                      Get in touch
                    </Button>
                    <Button variant="secondary" href="/about" className="w-full">
                      More about me
                    </Button>
                  </div>
                </div>

              </div>
            </ScrollReveal>

            {/* Subsection 2 — How I Work */}
            <div id="how-i-work" className="w-full">
              <ScrollReveal>
                <HowIWork />
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          Section 05 — Skills & Experience (Toolkit + Experience under one icon)
      ========================================================= */}
      <section
        className="py-[var(--space-section-md)] px-[var(--space-page-margin)]"
        id="toolkit"
        aria-label="Skills and experience"
      >
        <div className="max-w-content mx-auto">
          <ScrollReveal>
            <div className="text-center">
              <SectionIcon variant="skills" glowColor="var(--phase-discovery-label)" />
              <p className="text-display" style={{ color: 'var(--color-ink)', marginTop: '-14px' }}>
                Experience
              </p>
            </div>
          </ScrollReveal>
          <div style={{ marginTop: 'clamp(40px, 8vw, 70px)' }}>
            <ScrollReveal>
              <Toolkit />
            </ScrollReveal>
          </div>

          {/* Experience — subsection within Skills */}
          <div id="experience" style={{ marginTop: 'clamp(40px, 8vw, 70px)' }}>
            <ScrollReveal>
              <div className="mb-[var(--space-stack-sm)]">
                <h2 className="text-h1 text-[var(--color-ink)] mb-[var(--space-stack-md)]">
                  Where I have been.
                </h2>
                <div className="flex justify-center md:justify-start">
                  <Button variant="glass" href="/experience">
                    Download resume
                  </Button>
                </div>
              </div>

              <div className="flex flex-col">
                {[
                  {
                    role:    'Senior UX Designer',
                    company: 'GoldPoint Systems',
                    period:  '2021 — Present',
                    summary: 'UX and product design across a large portfolio of fintech and lending products. End-to-end ownership from research through handoff.',
                    slug:    'aim',
                  },
                  {
                    role:    'Product Designer',
                    company: 'Caliber Smart',
                    period:  '2019 — 2021',
                    summary: 'Solo designer on a full app rebuild for a D2D sales force. Gamified dashboards, solar estimation tools, and every system reps used to run their day.',
                    slug:    'caliber-smart',
                  },
                  {
                    role:    'UX Designer',
                    company: 'Dish One',
                    period:  '2017 — 2019',
                    summary: 'Identified a gap nobody had named. Pitched and built a virtual badge system that got reps on doors weeks sooner.',
                    slug:    '',
                  },
                ].map((job, i, arr) => (
                  <div
                    key={job.company}
                    className={i > 0 ? 'border-t border-[var(--color-border)]' : ''}
                    style={{ paddingTop: 'var(--space-stack-lg)', paddingBottom: i === arr.length - 1 ? '0' : 'var(--space-stack-lg)' }}
                  >
                    <div className="flex flex-col gap-[var(--space-component-xs)] md:flex-row md:items-start md:gap-[var(--space-8)]">
                      <div className="md:w-[320px] flex-shrink-0">
                        <p className="text-h4 text-[var(--color-ink)]">
                          {job.role}
                        </p>
                        <p className="text-body-sm text-[var(--color-text-muted)]">
                          {job.company} &middot; {job.period}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-body text-[var(--color-text-secondary)]">
                          {job.summary}
                        </p>
                        {job.slug ? (
                          <Link
                            href={`/work/${job.slug}`}
                            className="
                              text-ui-md text-[var(--color-text-muted)]
                              hover:text-[var(--color-ink)]
                              transition-colors duration-200
                              block
                            "
                            style={{ marginTop: '24px' }}
                          >
                            View case study &rarr;
                          </Link>
                        ) : (
                          <span
                            className="text-ui-md text-[var(--color-text-placeholder)] block"
                            style={{ marginTop: '24px' }}
                          >
                            Case study coming soon
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* =========================================================
          Section 06 — Contact (peak-end: last impression)
      ========================================================= */}
      <section
        id="contact"
        className="py-[var(--space-section-md)] px-[var(--space-page-margin)]"
        aria-label="Contact"
      >
        <div className="max-w-content mx-auto flex flex-col gap-[clamp(40px,8vw,70px)]">

          {/* Block 1 — section icon + "Contact" title, centered */}
          <ScrollReveal>
            <div className="text-center">
              <SectionIcon variant="contact" glowColor="var(--phase-solution-label)" />
              <p className="text-display" style={{ color: 'var(--color-ink)', marginTop: '-14px' }}>
                Contact
              </p>
            </div>
          </ScrollReveal>

          {/* Block 2 — intro copy + email + form (one subsection) */}
          <div className="flex flex-col gap-[var(--space-stack-lg)]">
            <ScrollReveal>
              <div className="flex flex-col">
                <h2 className="text-h1 text-[var(--color-ink)]" style={{ marginBottom: 'var(--space-stack-title)' }}>
                  Let&apos;s make it simple together.
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
      </section>

    </>
  )
}
