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
        style={{
          paddingTop:    'clamp(80px, 12vw, 140px)',
          paddingBottom: 'clamp(60px, 8vw, 100px)',
        }}
        id="hero"
        aria-label="Introduction"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">

          {/* Intro line — tucked tight against headline */}
          <p
            className="hero-fade-up text-center md:text-left"
            style={{
              fontFamily: 'var(--font-outfit), system-ui, sans-serif',
              fontSize: 'clamp(14px, 3vw, 18px)',
              fontWeight: 300,
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--space-component-xs)',
              animationDelay: '300ms',
            }}
          >
            Hi there.
          </p>

          {/* Headline — word-by-word reveal, bold words carry the message */}
          <h1
            className="text-display mb-[var(--space-stack-md)] text-center md:text-left"
            style={{ maxWidth: '900px' }}
          >
            <span style={{ fontWeight: 300, color: 'var(--color-text-muted)' }}>
              <span className="hero-word" style={{ animationDelay: '400ms'  }}>I&apos;m </span>
            </span>
            <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>
              <span className="hero-word hero-word--bold">Jay Shock.</span>
            </span>
            <br />
            <span style={{ fontWeight: 300, color: 'var(--color-text-muted)' }}>
              <span className="hero-word" style={{ animationDelay: '500ms'  }}>I </span>
              <span className="hero-word" style={{ animationDelay: '560ms'  }}>make </span>
              <span className="hero-word" style={{ animationDelay: '620ms'  }}>complex </span>
              <span className="hero-word" style={{ animationDelay: '680ms'  }}>products </span>
            </span>
            <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>
              <span className="hero-word hero-word--bold">simple.</span>
            </span>
          </h1>

          {/* Status chips */}
          <div
            className="flex flex-wrap gap-[var(--space-component-sm)] mb-[var(--space-stack-lg)] justify-center md:justify-start hero-fade-up"
            style={{ animationDelay: '900ms' }}
          >
            <span className="chip">
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'var(--color-status-available)',
                  boxShadow: '0 0 6px var(--color-status-available-glow)',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              Open to opportunities
            </span>
            <span className="chip">
              8 years in fintech and enterprise SaaS
            </span>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-[var(--space-component-sm)] items-center justify-center md:justify-start hero-fade-up"
            style={{ animationDelay: '1000ms' }}
          >
            <Button variant="glass" href="/api/resume" download>
              Download resume
            </Button>
            <Button variant="secondary" href="/about">
              More about me
            </Button>
          </div>

        </div>
      </section>


      {/* =========================================================
          Section 02 — Featured Work
      ========================================================= */}
      <section
        id="work"
        className="py-[var(--space-section-sm)]"
        aria-labelledby="work-heading"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">

          <p
            className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-lg)] hero-fade-up"
            id="work-eyebrow"
            style={{ animationDelay: '1200ms' }}
          >
            Selected Work
          </p>

          <h2 id="work-heading" className="sr-only">
            Featured case studies
          </h2>

          <div
            className="
              grid grid-cols-1 gap-[var(--space-component-lg)] items-stretch
            "
          >
            {featured.map((cs, i) => (
              <div
                key={cs.slug}
                className="h-full hero-fade-up"
                style={{ animationDelay: `${1350 + i * 150}ms` }}
              >
                <WorkCard
                  caseStudy={cs}
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
          Section 03 — About
      ========================================================= */}
      <section
        className="py-[var(--space-section-md)]"
        aria-label="About"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <ScrollReveal>
            <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
              <div className="flex flex-col gap-[var(--space-stack-lg)] md:flex-row md:gap-[var(--space-7)]">

                {/* Left — photo */}
                <div className="flex-shrink-0 flex justify-center md:justify-start">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/jay-headshot.png"
                    alt="Jay Shock"
                    className="
                      w-[180px] h-[180px] rounded-full object-cover object-top
                      md:w-[280px] md:h-auto md:aspect-[3/4] md:rounded-[8px]
                    "
                    style={{
                      border: '0.5px solid var(--color-border)',
                    }}
                  />
                </div>

                {/* Right — copy */}
                <div className="flex-1">
                  <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-xs)]">
                    About
                  </p>
                  <h2 className="text-h2 text-[var(--color-ink)] mb-[var(--space-stack-sm)]">
                    I got here by paying attention.
                  </h2>

                  <AboutText />

                  <div className="flex flex-wrap gap-[var(--space-component-sm)]">
                    <Button variant="glass" href="/about">
                      More about me
                    </Button>
                    <Button variant="secondary" href="/experience">
                      View experience
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* =========================================================
          Section 04 — How I Work
      ========================================================= */}
      <section
        className="py-[var(--space-section-md)]"
        id="how-i-work"
        aria-label="How I work"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <ScrollReveal>
            <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
              <HowIWork />
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* =========================================================
          Section 05 — My Toolkit
      ========================================================= */}
      <section
        className="py-[var(--space-section-md)]"
        id="toolkit"
        aria-label="My toolkit"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <ScrollReveal>
            <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
              <Toolkit />
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* =========================================================
          Section 06 — Experience
      ========================================================= */}
      <section
        id="experience"
        className="py-[var(--space-section-md)]"
        aria-label="Experience"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <ScrollReveal>
            <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">

              {/* Header row */}
              <div className="mb-[var(--space-stack-lg)]">
                <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-xs)]">
                  Experience
                </p>
                <h2 className="text-h2 text-[var(--color-ink)] mb-[var(--space-stack-sm)]">
                  Where I have been.
                </h2>
                <Button variant="secondary" href="/experience">
                  Full resume
                </Button>
              </div>

              {/* Timeline */}
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
                ].map((job, i) => (
                  <div
                    key={job.company}
                    className={i > 0 ? 'border-t border-[var(--color-border)]' : ''}
                    style={{ padding: 'var(--space-stack-md) 0' }}
                  >
                    <div className="flex flex-col gap-[var(--space-component-xs)] md:flex-row md:items-baseline md:gap-[var(--space-7)]">

                      {/* Left — role + company + dates */}
                      <div className="md:w-[320px] flex-shrink-0">
                        <p className="text-h4 text-[var(--color-ink)]">
                          {job.role}
                        </p>
                        <p className="text-body-sm text-[var(--color-text-muted)]">
                          {job.company} &middot; {job.period}
                        </p>
                      </div>

                      {/* Right — summary + case study link */}
                      <div className="flex-1">
                        <p className="text-body text-[var(--color-text-secondary)] mb-[var(--space-component-xs)]">
                          {job.summary}
                        </p>
                        {job.slug ? (
                          <Link
                            href={`/work/${job.slug}`}
                            className="
                              text-ui-md text-[var(--color-text-muted)]
                              hover:text-[var(--color-ink)]
                              transition-colors duration-200
                            "
                          >
                            View case study &rarr;
                          </Link>
                        ) : (
                          <span className="text-ui-md text-[var(--color-text-placeholder)]">
                            Case study coming soon
                          </span>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* =========================================================
          Section 06 — Contact (peak-end: last impression)
      ========================================================= */}
      <section
        id="contact"
        className="py-[var(--space-section-lg)]"
        aria-label="Contact"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="border-t border-[var(--color-border)] pt-[var(--space-section-md)]">

            <div className="flex flex-col md:flex-row gap-[var(--space-section-sm)]">

              {/* Left — headline + context */}
              <div className="md:w-[360px] flex-shrink-0">
                <ScrollReveal>
                  <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-xs)]">
                    What&apos;s next
                  </p>
                  <h2 className="text-h1 text-[var(--color-ink)] mb-[var(--space-stack-md)]">
                    Let&apos;s make it simple.
                  </h2>
                  <p className="text-body text-[var(--color-text-secondary)] mb-[var(--space-stack-md)]">
                    If you are building something complex and need someone who will own the problem with you, I want to hear about it.
                  </p>
                  <a
                    href="mailto:hello@jayshock.com"
                    className="text-body hover-ink"
                    style={{
                      color: 'var(--color-ink)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'var(--space-component-sm)',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.6 }}>
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 4L12 13L2 4" />
                    </svg>
                    hello@jayshock.com
                  </a>
                  <div className="mt-[var(--space-stack-md)]">
                    <Button variant="secondary" href="/api/resume">
                      Download resume
                    </Button>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right — form */}
              <div className="flex-1">
                <ScrollReveal>
                  <ContactForm />
                </ScrollReveal>
              </div>

            </div>

          </div>
        </div>
      </section>

    </>
  )
}
