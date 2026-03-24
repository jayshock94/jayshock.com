import type { Metadata } from 'next'
import Link from 'next/link'
import Button       from '@/components/ui/Button'
import WorkCard     from '@/components/work/WorkCard'
import ThemeToggle  from '@/components/ui/ThemeToggle'
import HowIWork     from '@/components/about/HowIWork'
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
      {/* =========================================================
          Section 01 — Hero
          Black and white only. No phase color. No accent.
      ========================================================= */}
      <section
        style={{
          paddingTop:    'clamp(80px, 12vw, 140px)',
          paddingBottom: 'clamp(60px, 8vw, 100px)',
        }}
        aria-label="Introduction"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">

          {/* Brand badge — dark mode toggle */}
          <div className="mb-[32px]">
            <ThemeToggle />
          </div>

          {/* Mixed weight headline */}
          <h1
            className="text-display mb-[20px]"
            style={{ maxWidth: '900px' }}
          >
            <span style={{ fontWeight: 300, color: 'var(--color-text-muted)' }}>I make </span>
            <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>complex products </span>
            <span style={{ fontWeight: 300, color: 'var(--color-text-muted)' }}>feel like they were always </span>
            <span style={{ fontWeight: 700, color: 'var(--color-ink)' }}>simple.</span>
          </h1>

          {/* Subline */}
          <p
            className="text-body-lg mb-[36px]"
            style={{
              color:    'var(--color-text-muted)',
              maxWidth: '480px',
            }}
          >
            Product designer with 8 plus years in fintech and enterprise SaaS.
            I work end to end, from research to ship. I care about the problem
            as much as the pixels.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-[12px] items-center">
            <Button variant="primary" href="/api/resume" download>
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
            className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-md)]"
            id="work-eyebrow"
          >
            Selected Work
          </p>

          <h2 id="work-heading" className="sr-only">
            Featured case studies
          </h2>

          <div
            className="
              grid grid-cols-1 gap-[16px] items-stretch
              md:grid-cols-2 md:gap-[20px]
              lg:grid-cols-3
            "
          >
            {featured.map(cs => (
              <WorkCard key={cs.slug} caseStudy={cs} />
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          Section 03 — How I Work
      ========================================================= */}
      <section
        className="py-[var(--space-section-md)]"
        aria-label="How I work"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
            <HowIWork />
          </div>
        </div>
      </section>

      {/* =========================================================
          Section 04 — Contact CTA
      ========================================================= */}
      <section
        className="py-[var(--space-section-sm)]"
        aria-label="Contact"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div
            className="
              max-w-content
              border-t border-[var(--color-border)]
              pt-[var(--space-section-sm)]
            "
          >
            <p className="text-body-lg text-[var(--color-text-secondary)] mb-[var(--space-stack-lg)]">
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
}
