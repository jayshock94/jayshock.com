import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'
import HowIWork from '@/components/about/HowIWork'
import Toolkit from '@/components/about/Toolkit'

export const metadata: Metadata = {
  title:       'About — Jay Shock, Product Designer',
  description:
    'How I think, how I work, and where I came from. 8 plus years designing complex products in fintech and enterprise SaaS.',
}

const EXPERIENCE = [
  {
    company:  'GoldPoint Systems',
    role:     'Product Designer',
    years:    '2021 to present',
    summary:  'Led the lending management platform redesign. Growing a design system that spans multiple products and brands.',
    slug:     '/work/aim',
  },
  {
    company:  'Caliber Smart',
    role:     'Product Designer',
    years:    '2019 to 2021',
    summary:  'Built the first design system from scratch. Designed the full solar sales experience end to end.',
    slug:     '/work/caliber-smart',
  },
  {
    company:  'Dish One',
    role:     'UX Designer',
    years:    '2017 to 2019',
    summary:  'Identified and solved a permit management problem that was costing reps weeks of selling time.',
    slug:     '',
  },
] as const

export default function AboutPage() {
  return (
    <div className="pt-[var(--space-section-md)] pb-[var(--space-section-lg)]">


      {/* =========================================================
          Section 01 — Who I Am
      ========================================================= */}
      <section
        className="pb-[var(--space-section-lg)]"
        aria-label="Who I am"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <ScrollReveal>
            <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-xs)] text-center">
              About
            </p>
            <h1 className="text-h1 text-[var(--color-ink)] mb-[var(--space-section-sm)] text-center">
              I got here by paying attention.
            </h1>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex flex-col md:flex-row gap-[var(--space-section-sm)]">

              {/* Photo */}
              <div className="flex justify-center md:justify-start shrink-0">
                <Image
                  src="/images/jay-headshot.png"
                  alt="Jay Shock"
                  width={320}
                  height={420}
                  className="
                    w-[200px] h-[200px] rounded-full object-cover object-top
                    md:w-[280px] md:h-auto md:aspect-[3/4] md:rounded-[8px]
                  "
                  style={{ border: '0.5px solid var(--color-border)' }}
                  priority
                />
              </div>

              {/* Story */}
              <div
                className="flex flex-col gap-[var(--space-stack-md)]"
                style={{ maxWidth: 'var(--space-content-max)' }}
              >
                <p className="text-intro" style={{ color: 'var(--color-text-primary)' }}>
                  I have been telling stories since high school. Started with video. Learned Illustrator and Photoshop because my classmates kept asking me to show them how. Studied design and videography in college until a marketing job pulled me out early.
                </p>
                <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                  On that team I did graphic design, video production, and incentive management. On the side I was helping friends in software development with their projects. That is where I found out UX design was a thing. We started building websites for people. I started taking courses. I got good at it fast.
                </p>
                <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                  When my company's dev department needed a designer I moved over without looking back. That was 8 plus years ago.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* =========================================================
          Section 02 — How I Think
      ========================================================= */}
      <section
        className="py-[var(--space-section-md)]"
        aria-label="How I think"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
            <ScrollReveal>
              <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-xs)] text-center">
                How I think
              </p>
              <h2 className="text-h2 text-[var(--color-ink)] mb-[var(--space-stack-lg)] max-w-content mx-auto text-center">
                Complexity does not disappear. It gets redistributed.
              </h2>
            </ScrollReveal>

            <div
              className="flex flex-col gap-[var(--space-stack-md)] mx-auto"
              style={{ maxWidth: 'var(--space-content-max)' }}
            >
              <ScrollReveal>
                <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                  The designer's job is to decide who carries it. I make sure it is never the person who just needs to get something done.
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                  That idea comes from Tesler's Law and it shapes how I approach every problem. Business constraints are real. User needs are real. My job is to hold both until they resolve into something that serves everyone. That usually means doing work nobody wants to name out loud.
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                  I do not think of research as a phase. I think of it as how you find out what the problem actually is. Most of the time the stated problem and the real problem are not the same.
                </p>
              </ScrollReveal>
            </div>
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

            {/* Context paragraphs */}
            <div
              className="flex flex-col gap-[var(--space-stack-md)] mb-[var(--space-section-sm)] mx-auto"
              style={{ maxWidth: 'var(--space-content-max)' }}
            >
              <ScrollReveal>
                <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                  I work end to end. Research, decisions, systems, handoff. I want to be in the room when the constraints get set, not handed a brief after they are. The earlier design is in the conversation the better the product.
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                  I collaborate closely with engineering. I want to understand what is hard to build and why. That shapes what I design. A solution that cannot ship is not a solution.
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                  In the last few years I have been focused on staying ahead of AI. Not as a novelty. As a real part of how I work. I use it to manage tasks, summarize and analyze research faster, improve prototyping, and reduce friction in the process for me and the teams I work with. The goal is always the same. Get to better decisions sooner.
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                  When a project breaks I do not look for someone to blame. I ask what I missed, own my part of it, and fix it. I have shipped features that did not work. I have done research that pointed me in the wrong direction. None of that is unusual. What matters is what you do next.
                </p>
              </ScrollReveal>
            </div>

            {/* Interactive HowIWork component */}
            <ScrollReveal>
              <HowIWork />
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* =========================================================
          Section 04 — My Toolkit
      ========================================================= */}
      <section
        className="py-[var(--space-section-md)]"
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
          Section 05 — Experience Snapshot
      ========================================================= */}
      <section
        className="py-[var(--space-section-md)]"
        aria-label="Experience snapshot"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
            <ScrollReveal>
              <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-xs)] text-center">
                Experience
              </p>
              <h2 className="text-h2 text-[var(--color-ink)] mb-[var(--space-stack-lg)] text-center">
                Where I have been.
              </h2>
            </ScrollReveal>

            <div className="flex flex-col gap-[var(--space-component-md)]">
              {EXPERIENCE.map((job) => {
                const card = (
                  <div
                    className="rounded-[8px] p-[var(--space-component-lg)]"
                    style={{
                      background: 'var(--color-surface)',
                      border: '0.5px solid var(--color-border)',
                      transition: 'border-color 200ms ease',
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-[var(--space-component-xs)] mb-[var(--space-stack-xs)]">
                      <p className="text-h4 text-[var(--color-ink)]">
                        {job.role}
                      </p>
                      <p className="text-body-sm text-[var(--color-text-muted)]">
                        {job.years}
                      </p>
                    </div>
                    <p className="text-body-sm text-[var(--color-text-muted)] mb-[var(--space-stack-xs)]">
                      {job.company}
                    </p>
                    <p className="text-body text-[var(--color-text-secondary)]">
                      {job.summary}
                    </p>
                    {job.slug ? (
                      <span
                        className="text-ui-md inline-flex items-center gap-[var(--space-component-xs)] mt-[var(--space-component-sm)]"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        View case study
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    ) : (
                      <span className="text-ui-md mt-[var(--space-component-sm)]" style={{ color: 'var(--color-text-placeholder)' }}>
                        Case study coming soon
                      </span>
                    )}
                  </div>
                )

                return (
                  <ScrollReveal key={job.company}>
                    {job.slug ? (
                      <Link href={job.slug} className="block" style={{ textDecoration: 'none' }}>
                        {card}
                      </Link>
                    ) : (
                      card
                    )}
                  </ScrollReveal>
                )
              })}
            </div>

            <ScrollReveal>
              <div className="mt-[var(--space-stack-lg)] text-center">
                <Button variant="secondary" href="/experience">
                  Full experience and resume
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* =========================================================
          Section 06 — Contact CTA
      ========================================================= */}
      <section
        className="py-[var(--space-section-lg)]"
        aria-label="Contact"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
            <ScrollReveal>
              <div className="max-w-content mx-auto text-center">
                <p className="text-body-lg text-[var(--color-text-secondary)] mb-[var(--space-stack-lg)]">
                  Open to senior product design roles and consulting engagements. Remote first, open to hybrid.
                </p>
                <Button variant="glass" href="/contact">
                  Get in touch
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

    </div>
  )
}
