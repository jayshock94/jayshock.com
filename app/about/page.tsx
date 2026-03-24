import type { Metadata } from 'next'
import Link  from 'next/link'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title:       'About — Jay Shock, Product Designer',
  description:
    'How I think, how I work, and where I came from. 8 plus years designing complex products in fintech and enterprise SaaS.',
}

// Arrow for experience snapshot links
function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2.5 6h7M6.5 3l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface ExperienceItemProps {
  company:  string
  role:     string
  period:   string
  summary:  string
  caseSlug?: string
}

function ExperienceItem({
  company,
  role,
  period,
  summary,
  caseSlug,
}: ExperienceItemProps) {
  return (
    <div className="flex flex-col gap-[var(--space-stack-xs)]">
      <div className="flex flex-wrap gap-x-[var(--space-component-sm)] gap-y-[2px] items-baseline">
        <span className="text-h4 text-[var(--color-ink)]">{company}</span>
        <span className="text-body-sm text-[var(--color-text-muted)]">·</span>
        <span className="text-body-sm text-[var(--color-text-muted)]">{role}</span>
        <span className="text-body-sm text-[var(--color-text-muted)]">·</span>
        <span className="text-body-sm text-[var(--color-text-muted)]">{period}</span>
      </div>
      <p className="text-body text-[var(--color-text-secondary)]">{summary}</p>
      {caseSlug && (
        <Link
          href={`/work/${caseSlug}`}
          className="
            inline-flex items-center gap-[var(--space-component-xs)]
            text-ui-md text-[var(--color-accent)]
            hover:text-[var(--color-accent-deep)]
            transition-colors duration-200
            group
          "
        >
          View case study
          <span className="transition-transform duration-200 group-hover:translate-x-[2px]">
            <ArrowRight />
          </span>
        </Link>
      )}
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="pt-[var(--space-section-md)] pb-[var(--space-section-lg)]">
      <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">

        {/* Page header */}
        <header className="mb-[var(--space-section-sm)] max-w-content">
          <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-sm)] text-center md:text-left">
            About
          </p>
          <h1 className="text-h1 text-[var(--color-ink)] text-center md:text-left">
            Jay Shock
          </h1>
        </header>

        <div className="max-w-content flex flex-col gap-[var(--space-section-sm)]">

          {/* Section 01 — Who I Am */}
          <section aria-labelledby="who-i-am">
            <h2
              id="who-i-am"
              className="text-h3 text-[var(--color-ink)] mb-[var(--space-stack-md)] text-center md:text-left"
            >
              Who I am
            </h2>

            {/* Photo placeholder */}
            <div
              className="
                w-full aspect-[4/3] max-w-[480px]
                bg-[var(--color-surface)]
                border border-[var(--color-border)]
                rounded-[8px]
                mb-[var(--space-stack-lg)]
                flex items-center justify-center
              "
              aria-label="Photo — add before launch"
            >
              <p className="text-body-sm text-[var(--color-text-muted)] text-center px-[var(--space-component-lg)]">
                [Photo — studio or workspace context, not a headshot]
              </p>
            </div>

            <div className="flex flex-col gap-[var(--space-stack-md)]">
              <p className="text-body text-[var(--color-text-secondary)]">
                I have been telling stories since high school. Started with
                video. Learned Illustrator and Photoshop because my classmates
                kept asking me to show them how. Studied design and videography
                in college until a marketing job pulled me out early.
              </p>
              <p className="text-body text-[var(--color-text-secondary)]">
                On that team I did graphic design, video production, and
                incentive management. On the side I was helping friends in
                software development with their projects. That is where I found
                out UX design was a thing. We started building websites for
                people. I started taking courses. I got good at it fast.
              </p>
              <p className="text-body text-[var(--color-text-secondary)]">
                When my company&rsquo;s dev department needed a designer I moved
                over without looking back. That was 8 plus years ago.
              </p>
            </div>
          </section>

          <div className="border-t border-[var(--color-border)]" aria-hidden="true" />

          {/* Section 02 — How I Think */}
          <section aria-labelledby="how-i-think">
            <h2
              id="how-i-think"
              className="text-h3 text-[var(--color-ink)] mb-[var(--space-stack-md)] text-center md:text-left"
            >
              How I think
            </h2>
            <div className="flex flex-col gap-[var(--space-stack-md)]">
              <p className="text-body text-[var(--color-text-secondary)]">
                Complexity does not disappear. It gets redistributed. The
                designer&rsquo;s job is to decide who carries it. I make sure
                it is never the person who just needs to get something done.
              </p>
              <p className="text-body text-[var(--color-text-secondary)]">
                That idea comes from Tesler&rsquo;s Law and it shapes how I
                approach every problem. Business constraints are real. User
                needs are real. My job is to hold both until they resolve into
                something that serves everyone. That usually means doing work
                nobody wants to name out loud.
              </p>
              <p className="text-body text-[var(--color-text-secondary)]">
                I do not think of research as a phase. I think of it as how
                you find out what the problem actually is. Most of the time the
                stated problem and the real problem are not the same.
              </p>
            </div>
          </section>

          <div className="border-t border-[var(--color-border)]" aria-hidden="true" />

          {/* Section 03 — How I Work */}
          <section aria-labelledby="how-i-work">
            <h2
              id="how-i-work"
              className="text-h3 text-[var(--color-ink)] mb-[var(--space-stack-md)] text-center md:text-left"
            >
              How I work
            </h2>
            <div className="flex flex-col gap-[var(--space-stack-md)]">
              <p className="text-body text-[var(--color-text-secondary)]">
                I work end to end. Research, decisions, systems, handoff. I
                want to be in the room when the constraints get set, not handed
                a brief after they are. The earlier design is in the
                conversation the better the product.
              </p>
              <p className="text-body text-[var(--color-text-secondary)]">
                I collaborate closely with engineering. I want to understand
                what is hard to build and why. That shapes what I design. A
                solution that cannot ship is not a solution.
              </p>
              <p className="text-body text-[var(--color-text-secondary)]">
                In the last few years I have been focused on staying ahead of
                AI. Not as a novelty. As a real part of how I work. I use it
                to manage tasks, summarize and analyze research faster, improve
                prototyping, and reduce friction in the process for me and the
                teams I work with. The goal is always the same. Get to better
                decisions sooner.
              </p>
              <p className="text-body text-[var(--color-text-secondary)]">
                When a project breaks I do not look for someone to blame. I ask
                what I missed, own my part of it, and fix it. I have shipped
                features that did not work. I have done research that pointed
                me in the wrong direction. None of that is unusual. What
                matters is what you do next.
              </p>
              <p className="text-body text-[var(--color-text-secondary)]">
                I am not just a designer who makes things look good. The
                problem solving, the research, the gap between what the
                business needs and what people actually experience — that is
                the work I want to do.
              </p>
            </div>
          </section>

          <div className="border-t border-[var(--color-border)]" aria-hidden="true" />

          {/* Section 04 — Experience Snapshot */}
          <section aria-labelledby="experience-snapshot">
            <div className="flex items-baseline justify-between gap-[var(--space-component-lg)] mb-[var(--space-stack-md)] flex-wrap">
              <h2
                id="experience-snapshot"
                className="text-h3 text-[var(--color-ink)] text-center md:text-left"
              >
                Experience
              </h2>
              <Link
                href="/experience"
                className="
                  text-ui-md text-[var(--color-text-muted)]
                  hover:text-[var(--color-ink)]
                  transition-colors duration-200
                "
              >
                Full experience and resume
              </Link>
            </div>

            <div className="flex flex-col gap-[var(--space-stack-lg)]">
              <ExperienceItem
                company="GoldPoint Systems (Confidential)"
                role="Product Designer"
                period="2021 to present"
                summary="Led the lending management platform redesign. Growing a design system that spans multiple products and brands."
                caseSlug="lending-engine-service"
              />
              <ExperienceItem
                company="Caliber Smart"
                role="UX Designer"
                period="2019 to 2021"
                summary="Built the first design system from scratch. Designed the full solar sales experience end to end."
                caseSlug="mobile-lending-management"
              />
              <ExperienceItem
                company="Dish One"
                role="UX Designer"
                period="2017 to 2019"
                summary="Identified and solved a permit management problem that was costing reps weeks of selling time."
                caseSlug="virtual-badge"
              />
            </div>
          </section>

          <div className="border-t border-[var(--color-border)]" aria-hidden="true" />

          {/* Section 05 — Contact CTA */}
          <section aria-label="Contact">
            <p className="text-body-lg text-[var(--color-text-secondary)] mb-[var(--space-stack-lg)]">
              Open to senior product design roles and consulting engagements.
              Remote first, open to hybrid.
            </p>
            <Button variant="primary" href="/contact">
              Get in touch
            </Button>
          </section>

        </div>
      </div>
    </div>
  )
}
