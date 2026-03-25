import type { Metadata } from 'next'
import Link   from 'next/link'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title:       'Experience — Jay Shock, Product Designer',
  description:
    'Skills, tools, and career history. Currently employed, open to senior product design roles and consulting engagements.',
}

interface SkillGroupProps {
  title:    string
  skills:   string
  caseSlug?: string
  caseLabel?: string
}

function SkillGroup({ title, skills, caseSlug, caseLabel }: SkillGroupProps) {
  return (
    <div className="flex flex-col gap-[var(--space-stack-xs)]">
      <h3 className="text-h4 text-[var(--color-ink)]">{title}</h3>
      <p className="text-body text-[var(--color-text-secondary)]">{skills}</p>
      {caseSlug && (
        <Link
          href={`/work/${caseSlug}`}
          className="
            text-body-sm text-[var(--color-accent)]
            hover:text-[var(--color-accent-deep)]
            transition-colors duration-200
          "
        >
          {caseLabel ?? 'Most demonstrated in this case study'}
        </Link>
      )}
    </div>
  )
}

interface ExperienceRoleProps {
  role:      string
  company:   string
  period:    string
  body:      string
  caseSlug?: string
  caseLabel?: string
}

function ExperienceRole({
  role,
  company,
  period,
  body,
  caseSlug,
  caseLabel,
}: ExperienceRoleProps) {
  return (
    <div
      className="
        border-t border-[var(--color-border)]
        pt-[var(--space-stack-lg)]
        flex flex-col gap-[var(--space-stack-sm)]
      "
    >
      <div className="flex flex-wrap gap-x-[var(--space-component-sm)] gap-y-[2px] items-baseline">
        <span className="text-h4 text-[var(--color-ink)]">{role}</span>
      </div>
      <div className="flex flex-wrap gap-x-[var(--space-component-sm)] gap-y-[2px] items-center">
        <span className="text-body-sm text-[var(--color-text-muted)]">{company}</span>
        <span className="text-body-sm text-[var(--color-text-muted)]" aria-hidden="true">·</span>
        <span className="text-body-sm text-[var(--color-text-muted)]">{period}</span>
      </div>
      <p className="text-body text-[var(--color-text-secondary)]">{body}</p>
      {caseSlug && (
        <Link
          href={`/work/${caseSlug}`}
          className="
            text-ui-md text-[var(--color-accent)]
            hover:text-[var(--color-accent-deep)]
            transition-colors duration-200
          "
        >
          {caseLabel ?? 'View case study'}
        </Link>
      )}
    </div>
  )
}

export default function ExperiencePage() {
  return (
    <div className="pt-[var(--space-section-md)] pb-[var(--space-section-lg)]">
      <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">

        {/* Section 01 — Header */}
        <header className="max-w-content mb-[var(--space-section-sm)]">
          <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-sm)]">
            Experience
          </p>
          <h1 className="text-h1 text-[var(--color-ink)] mb-[var(--space-stack-md)]">
            Jay Shock
          </h1>
          <p className="text-body-lg text-[var(--color-text-secondary)] mb-[var(--space-stack-xs)]">
            Product Designer
          </p>
          <p className="text-body text-[var(--color-text-muted)] mb-[var(--space-stack-lg)]">
            Currently employed. Open to the right senior role or consulting
            engagement. Remote first, open to hybrid.
          </p>
          <p className="text-body-sm text-[var(--color-text-muted)] mb-[var(--space-stack-lg)]">
            <a
              href="mailto:hello@jayshock.com"
              className="hover:text-[var(--color-ink)] transition-colors duration-200"
            >
              hello@jayshock.com
            </a>
            {' · '}
            <a
              href="https://www.linkedin.com/in/jay-shock-089605156/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-ink)] transition-colors duration-200"
            >
              LinkedIn
            </a>
            {' · '}
            <Link
              href="/"
              className="hover:text-[var(--color-ink)] transition-colors duration-200"
            >
              jayshock.com
            </Link>
          </p>

          <Button
            variant="glass"
            href="/api/resume"
            download
            aria-label="Download PDF resume"
          >
            Download Resume
          </Button>
        </header>

        <div className="max-w-content flex flex-col gap-[var(--space-section-sm)]">

          {/* Section 02 — Skills by Category */}
          <section aria-labelledby="skills-heading">
            <div className="border-t border-[var(--color-border)] pt-[var(--space-stack-lg)]">
              <h2
                id="skills-heading"
                className="text-h3 text-[var(--color-ink)] mb-[var(--space-stack-lg)]"
              >
                Skills
              </h2>
              <div className="flex flex-col gap-[var(--space-stack-lg)]">
                <SkillGroup
                  title="Research and Discovery"
                  skills="User interviews, contextual inquiry, usability testing, survey design, synthesis and insight generation."
                  caseSlug="lending-engine-service"
                  caseLabel="Most demonstrated in the GoldPoint lending redesign"
                />
                <SkillGroup
                  title="Systems Thinking"
                  skills="Design systems, token architecture, component libraries, information architecture, cross-product consistency."
                  caseSlug="mobile-lending-management"
                  caseLabel="Most demonstrated in the Caliber Smart design system"
                />
                <SkillGroup
                  title="Product Design"
                  skills="Interaction design, wireframing, prototyping, visual design, responsive design, white-label and dynamic theming."
                  caseSlug="lending-engine-service"
                  caseLabel="Most demonstrated in the GoldPoint lending platform"
                />
                <SkillGroup
                  title="Collaboration"
                  skills="Stakeholder communication, design critiques, developer handoff, cross-functional facilitation, pitching and presenting to leadership."
                  caseLabel="Most demonstrated across all three roles"
                />
              </div>
            </div>
          </section>

          {/* Section 03 — Tools */}
          <section aria-labelledby="tools-heading">
            <div className="border-t border-[var(--color-border)] pt-[var(--space-stack-lg)]">
              <h2
                id="tools-heading"
                className="text-h3 text-[var(--color-ink)] mb-[var(--space-stack-md)]"
              >
                Tools
              </h2>
              <p className="text-body text-[var(--color-text-secondary)] mb-[var(--space-stack-md)]">
                Figma, FigJam, Jira, Azure DevOps, Loom.
              </p>
              <p className="text-body text-[var(--color-text-secondary)]">
                AI tools I use regularly: Claude, ChatGPT, Microsoft Copilot.
                I use them to summarize and analyze research, manage tasks,
                improve prototyping speed, and reduce process friction across
                the team.
              </p>
            </div>
          </section>

          {/* Section 04 — Experience Timeline */}
          <section aria-labelledby="timeline-heading">
            <div className="border-t border-[var(--color-border)] pt-[var(--space-stack-lg)]">
              <h2
                id="timeline-heading"
                className="text-h3 text-[var(--color-ink)] mb-[var(--space-stack-md)]"
              >
                Experience
              </h2>
            </div>

            <ExperienceRole
              role="Product Designer"
              company="Fintech SaaS Company"
              period="2021 to present"
              body="Grew the design team from 3 to 4 designers. Contributing to a design system that spans multiple products and serves clients across the financial industry, each with their own brand guidelines. Led new product work beyond legacy redesigns. Headed the lending management platform redesign from the ground up."
              caseSlug="lending-engine-service"
              caseLabel="View case study"
            />

            <ExperienceRole
              role="UX Designer"
              company="Caliber Smart"
              period="2019 to 2021"
              body="Built the company's first design system from scratch to handle multiple brands and products. Designed the full sales experience for a new solar division, including roof analysis tools, panel placement estimation, and tech assignment flow. Introduced a gamified metrics dashboard that tied rep performance to incentives and leaderboard visibility."
              caseSlug="mobile-lending-management"
              caseLabel="View case study"
            />

            <ExperienceRole
              role="UX Designer"
              company="Dish One"
              period="2017 to 2019"
              body="Identified a gap nobody had named. Sales reps were losing weeks waiting on physical badges and struggling with permit management in the field. Pitched and built a virtual badge system with authentication and permit access. Reps were on doors weeks earlier. Community friction with law enforcement dropped."
              caseSlug="virtual-badge"
              caseLabel="View case study"
            />

            <ExperienceRole
              role="Marketing and Graphic Design"
              company="Various"
              period="2015 to 2017"
              body="Graphic design, video production, and incentive management on a marketing team. Foundation for the visual and storytelling instincts that carried into product work."
            />
          </section>

          {/* Section 05 — Education */}
          <section aria-labelledby="education-heading">
            <div className="border-t border-[var(--color-border)] pt-[var(--space-stack-lg)] flex flex-col gap-[var(--space-stack-lg)]">
              <h2
                id="education-heading"
                className="text-h3 text-[var(--color-ink)]"
              >
                Education
              </h2>

              <div className="flex flex-col gap-[var(--space-stack-sm)]">
                <h3 className="text-h4 text-[var(--color-ink)]">Certifications</h3>
                <ul className="flex flex-col gap-[var(--space-stack-xs)] list-none p-0 m-0">
                  <li className="text-body text-[var(--color-text-secondary)]">Google UX Design Certificate</li>
                  <li className="text-body text-[var(--color-text-secondary)]">Nielsen Norman Group UX Certificate</li>
                  <li className="text-body text-[var(--color-text-secondary)]">WebAIM Web Accessibility Certificate</li>
                </ul>
              </div>

              <div className="flex flex-col gap-[var(--space-stack-sm)]">
                <h3 className="text-h4 text-[var(--color-ink)]">
                  Studied design and videography · 2015 to 2017
                </h3>
                <p className="text-body text-[var(--color-text-secondary)]">
                  Coursework in graphic design, digital media, and video
                  production. Continued through self-directed study and online
                  courses in UX design and front end development.
                </p>
              </div>
            </div>
          </section>

          {/* Section 06 — Download CTA (repeated) */}
          <section aria-label="Resume download">
            <div className="border-t border-[var(--color-border)] pt-[var(--space-stack-lg)]">
              <p className="text-body-lg text-[var(--color-text-secondary)] mb-[var(--space-stack-lg)]">
                Want the full picture in one document?
              </p>
              <Button
                variant="glass"
                href="/api/resume"
                download
                aria-label="Download PDF resume"
              >
                Download Resume
              </Button>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
