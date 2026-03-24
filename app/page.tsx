import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import WorkCard from '@/components/work/WorkCard'
import { caseStudies } from '@/data/case-studies'

export const metadata: Metadata = {
  title:       'Jay Shock — Product Designer',
  description:
    'I make complex products feel like they were always simple. 8 plus years in fintech and enterprise SaaS.',
}

// Arrow icon for about teaser link
function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path
        d="M2.5 6.5h8M7 3l3.5 3.5L7 10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function HomePage() {
  // Show the first three case studies — homepage grid
  const featured = caseStudies.slice(0, 3)

  return (
    <>
      {/* =========================================================
          Section 01 — Hero
          Black and white only. No phase color. No accent.
      ========================================================= */}
      <section
        className="
          pt-[var(--space-section-lg)]
          pb-[var(--space-section-md)]
        "
        aria-label="Introduction"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="max-w-content">

            <h1 className="text-display text-[var(--color-ink)] mb-[var(--space-stack-md)]">
              I make complex products feel like they were always simple.
            </h1>

            <p className="text-body-lg text-[var(--color-text-secondary)] mb-[var(--space-stack-lg)]">
              8 plus years in fintech and enterprise SaaS. I work end to end,
              from research to ship. I care about the problem as much as the
              pixels.
            </p>

            <div className="flex flex-wrap gap-[var(--space-component-md)]">
              <Button variant="primary" href="/work">
                View my work
              </Button>
              <Button variant="secondary" href="/api/resume" download>
                Download resume
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          Section 02 — Featured Work
          Monochromatic — no color thumbnails.
      ========================================================= */}
      <section
        id="work"
        className="py-[var(--space-section-md)]"
        aria-labelledby="work-heading"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">

          <p
            className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-md)]"
            id="work-eyebrow"
          >
            Selected Work
          </p>

          <h2
            id="work-heading"
            className="sr-only"
          >
            Featured case studies
          </h2>

          <div
            className="
              grid grid-cols-1 gap-[var(--space-component-lg)]
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {featured.map(cs => (
              <WorkCard key={cs.slug} caseStudy={cs} monochromatic />
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          Section 03 — About Teaser
      ========================================================= */}
      <section
        className="py-[var(--space-section-md)]"
        aria-label="About"
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
              I work at the intersection of business constraints and user
              reality. My job is to hold both until they resolve into something
              that serves everyone. That usually means doing work nobody wants
              to name out loud.
            </p>

            <Link
              href="/about"
              className="
                inline-flex items-center gap-[var(--space-component-xs)]
                text-ui-md text-[var(--color-text-muted)]
                hover:text-[var(--color-ink)]
                transition-colors duration-200
                group
              "
            >
              More about how I work
              <span className="transition-transform duration-200 group-hover:translate-x-[2px]">
                <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          Section 04 — Contact CTA
      ========================================================= */}
      <section
        className="py-[var(--space-section-md)]"
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
