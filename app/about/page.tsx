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
    role:     'Senior UX Designer',
    years:    '2021 — Present',
    summary:  'Led the lending management platform redesign. Growing a design system that spans multiple products and brands.',
    slug:     '/work/aim',
  },
  {
    company:  'Caliber Smart',
    role:     'Product Designer',
    years:    '2019 — 2021',
    summary:  'Built the first design system from scratch. Designed the full solar sales experience end to end.',
    slug:     '/work/caliber-smart',
  },
  {
    company:  'Dish One',
    role:     'UX Designer',
    years:    '2017 — 2019',
    summary:  'Identified and solved a permit management problem that was costing reps weeks of selling time.',
    slug:     '',
  },
] as const

export default function AboutPage() {
  return (
    <div className="pt-[var(--space-section-xl)] pb-[var(--space-section-xl)]">


      {/* =========================================================
          Section 01 — Who I Am
      ========================================================= */}
      <section
        className="pb-[var(--space-section-xl)]"
        aria-label="Who I am"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="flex flex-col items-center" style={{ gap: 'var(--space-stack-lg)' }}>

            {/* Photo + display heading */}
            <ScrollReveal>
              <div className="flex flex-col items-center">
                <div
                  className="relative rounded-full overflow-hidden w-[140px] h-[140px] md:w-[180px] md:h-[180px]"
                  style={{ border: '0.5px solid var(--color-text-muted)' }}
                >
                  <Image
                    src="/images/jay-headshot.png"
                    alt="Jay Shock"
                    width={320}
                    height={420}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    priority
                  />
                </div>
                <h1 className="text-display text-[var(--color-ink)]" style={{ marginTop: 'var(--space-stack-md)' }}>
                  About me
                </h1>
              </div>
            </ScrollReveal>

            {/* Story */}
            <div
              className="flex flex-col gap-[var(--space-stack-md)] mx-auto"
              style={{ maxWidth: 'var(--space-content-max)' }}
            >
              <ScrollReveal>
                <h2 className="text-h1 text-[var(--color-ink)]">
                  I got here by paying attention.
                </h2>
              </ScrollReveal>
              <ScrollReveal>
                <div>
                  <h3 className="text-h4 text-[var(--color-ink)] mb-[var(--space-stack-xs)]">The early years</h3>
                  <p className="text-body-lg text-[var(--color-text-secondary)]">
                    I have been telling stories since high school. Started with video. Learned Illustrator and Photoshop because my classmates kept asking me to show them how. Studied design and videography in college until a marketing job pulled me out early.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div>
                  <h3 className="text-h4 text-[var(--color-ink)] mb-[var(--space-stack-xs)]">Finding UX</h3>
                  <p className="text-body-lg text-[var(--color-text-secondary)]">
                    On that team I did graphic design, video production, and incentive management. On the side I was helping friends in software development with their projects. That is where I found out UX design was a thing. We started building websites for people. I started taking courses. I got good at it fast.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div>
                  <h3 className="text-h4 text-[var(--color-ink)] mb-[var(--space-stack-xs)]">Going all in</h3>
                  <p className="text-body-lg text-[var(--color-text-secondary)]">
                    When my company&apos;s dev department needed a designer I moved over without looking back. That was 8 plus years ago.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================
          Section 02 — How I Think
      ========================================================= */}
      <section
        className="pb-[var(--space-section-xl)]"
        aria-label="How I think"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
            <div className="mx-auto" style={{ maxWidth: 'var(--space-content-max)' }}>
            <ScrollReveal>
              <h2 className="text-h1 text-[var(--color-ink)] mb-[var(--space-stack-sm)]">
                Complexity does not disappear.
              </h2>
            </ScrollReveal>

            <div
              className="flex flex-col gap-[var(--space-stack-md)] mt-[var(--space-stack-md)]"
            >
              <ScrollReveal>
                <div>
                  <h3 className="text-h4 text-[var(--color-ink)] mb-[var(--space-stack-xs)]">It gets redistributed</h3>
                  <p className="text-body-lg text-[var(--color-text-secondary)]">
                    The designer&apos;s job is to decide who carries it. I make sure it is never the person who just needs to get something done.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div>
                  <h3 className="text-h4 text-[var(--color-ink)] mb-[var(--space-stack-xs)]">Balancing constraints</h3>
                  <p className="text-body-lg text-[var(--color-text-secondary)]">
                    That idea comes from Tesler&apos;s Law and it shapes how I approach every problem. Business constraints are real. User needs are real. My job is to hold both until they resolve into something that serves everyone. That usually means doing work nobody wants to name out loud.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div>
                  <h3 className="text-h4 text-[var(--color-ink)] mb-[var(--space-stack-xs)]">Research is not a phase</h3>
                  <p className="text-body-lg text-[var(--color-text-secondary)]">
                    I do not think of research as a phase. I think of it as how you find out what the problem actually is. Most of the time the stated problem and the real problem are not the same.
                  </p>
                </div>
              </ScrollReveal>
            </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================
          Section 03 — How I Work
      ========================================================= */}
      <section
        className="pb-[var(--space-section-xl)]"
        aria-label="How I work"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
            <div className="mx-auto" style={{ maxWidth: 'var(--space-content-max)' }}>

            <ScrollReveal>
              <h2 className="text-h1 text-[var(--color-ink)] mb-[var(--space-stack-md)]">
                How I work.
              </h2>
            </ScrollReveal>

            {/* Context paragraphs */}
            <div
              className="flex flex-col gap-[var(--space-stack-md)] mb-[var(--space-section-sm)]"
            >
              <ScrollReveal>
                <div>
                  <h3 className="text-h4 text-[var(--color-ink)] mb-[var(--space-stack-xs)]">I work end to end</h3>
                  <p className="text-body-lg text-[var(--color-text-secondary)]">
                    Research, decisions, systems, handoff. I want to be in the room when the constraints get set, not handed a brief after they are.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div>
                  <h3 className="text-h4 text-[var(--color-ink)] mb-[var(--space-stack-xs)]">Close to engineering</h3>
                  <p className="text-body-lg text-[var(--color-text-secondary)]">
                    I want to understand what is hard to build and why. That shapes what I design. A solution that cannot ship is not a solution.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div>
                  <h3 className="text-h4 text-[var(--color-ink)] mb-[var(--space-stack-xs)]">Staying ahead of AI</h3>
                  <p className="text-body-lg text-[var(--color-text-secondary)]">
                    In the last few years I have been focused on staying ahead of AI. Not as a novelty. As a real part of how I work. I use it to manage tasks, summarize and analyze research faster, improve prototyping, and reduce friction in the process for me and the teams I work with. The goal is always the same. Get to better decisions sooner.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div>
                  <h3 className="text-h4 text-[var(--color-ink)] mb-[var(--space-stack-xs)]">Owning the outcome</h3>
                  <p className="text-body-lg text-[var(--color-text-secondary)]">
                    When a project breaks I do not look for someone to blame. I ask what I missed, own my part of it, and fix it. I have shipped features that did not work. I have done research that pointed me in the wrong direction. None of that is unusual. What matters is what you do next.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Interactive HowIWork component */}
            <ScrollReveal>
              <HowIWork />
            </ScrollReveal>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================
          Section 04 — My Toolkit
      ========================================================= */}
      <section
        className="pb-[var(--space-section-xl)]"
        aria-label="My toolkit"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <ScrollReveal>
            <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
              <div className="mx-auto" style={{ maxWidth: 'var(--space-content-max)' }}>
                <Toolkit />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* =========================================================
          Section 05 — Experience Snapshot
      ========================================================= */}
      <section
        className="pb-[var(--space-section-xl)]"
        aria-label="Experience snapshot"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
            <div className="mx-auto" style={{ maxWidth: 'var(--space-content-max)' }}>
            <ScrollReveal>
              <h2 className="text-h1 text-[var(--color-ink)] mb-[var(--space-stack-md)]">
                Where I have been.
              </h2>
            </ScrollReveal>

            <div className="flex flex-col">
              {EXPERIENCE.map((job, i, arr) => (
                <ScrollReveal key={job.company}>
                  {job.slug ? (
                    <Link href={job.slug} className="block" style={{ textDecoration: 'none' }}>
                      <JobRow job={job} i={i} last={i === arr.length - 1} />
                    </Link>
                  ) : (
                    <JobRow job={job} i={i} last={i === arr.length - 1} />
                  )}
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <div className="mt-[var(--space-stack-md)] flex justify-center md:justify-start">
                <Button variant="glass" href="/experience">
                  Full experience and resume
                </Button>
              </div>
            </ScrollReveal>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================
          Section 06 — Contact CTA
      ========================================================= */}
      <section
        className="pb-[var(--space-section-xl)]"
        aria-label="Contact"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
            <ScrollReveal>
              <div className="max-w-content">
                <h2 className="text-h1 text-[var(--color-ink)] mb-[var(--space-stack-sm)]">
                  Let&apos;s work together.
                </h2>
                <p className="text-body-lg text-[var(--color-text-secondary)] mb-[var(--space-stack-md)]">
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

/* Job row — matches homepage experience pattern */
function JobRow({ job, i, last }: { job: typeof EXPERIENCE[number]; i: number; last: boolean }) {
  return (
    <div
      className={i > 0 ? 'border-t border-[var(--color-border)]' : ''}
      style={{ paddingTop: 'var(--space-stack-lg)', paddingBottom: last ? '0' : 'var(--space-stack-lg)' }}
    >
      <div className="flex flex-col gap-[var(--space-component-xs)] md:flex-row md:items-start md:gap-[var(--space-8)]">
        <div className="md:w-[320px] flex-shrink-0">
          <p className="text-h4 text-[var(--color-ink)]">
            {job.role}
          </p>
          <p className="text-body-sm text-[var(--color-text-muted)]">
            {job.company} &middot; {job.years}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-body-lg text-[var(--color-text-secondary)]">
            {job.summary}
          </p>
          {job.slug ? (
            <span
              className="text-ui-md text-[var(--color-text-muted)] block"
              style={{ marginTop: '24px' }}
            >
              View case study &rarr;
            </span>
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
  )
}
