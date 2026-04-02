import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { SKILLS, TOOLS, AI_TOOLS, TIMELINE, EDUCATION, CONTACT } from '@/data/resume'

export const metadata: Metadata = {
  title:       'Experience — Jay Shock, Product Designer',
  description:
    'Skills, tools, and career history. Currently employed, open to senior product design roles and consulting engagements.',
}

export default function ExperiencePage() {
  return (
    <div className="pt-[var(--space-section-md)] pb-[var(--space-section-lg)]">


      {/* =========================================================
          Header — Name, title, status, download CTA
      ========================================================= */}
      <section aria-label="Experience overview">
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <ScrollReveal>
            <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-xs)]">
              Experience
            </p>
            <h1 className="text-h1 text-[var(--color-ink)] mb-[var(--space-stack-sm)]">
              Jay Shock
            </h1>
            <p className="text-body-lg text-[var(--color-text-secondary)] mb-[var(--space-stack-xs)]">
              Product Designer
            </p>
            <p className="text-body-sm text-[var(--color-text-muted)] mb-[var(--space-stack-lg)]">
              Currently employed. Open to the right senior role or consulting engagement. Remote first, open to hybrid.
            </p>
            <div className="flex flex-wrap gap-[var(--space-component-sm)]">
              <Button variant="glass" href="/api/resume">
                Download resume
              </Button>
              <Button variant="secondary" href="/contact">
                Get in touch
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* =========================================================
          Skills by Category
      ========================================================= */}
      <section
        className="py-[var(--space-section-md)]"
        aria-label="Skills"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
            <ScrollReveal>
              <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-xs)]">
                Skills
              </p>
              <h2 className="text-h2 text-[var(--color-ink)] mb-[var(--space-stack-lg)]">
                What I bring.
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-component-md)]">
              {SKILLS.map((skill) => (
                <ScrollReveal key={skill.category}>
                  <div
                    className="rounded-[8px] p-[var(--space-component-lg)]"
                    style={{
                      background: 'var(--color-surface)',
                      border: '0.5px solid var(--color-border)',
                    }}
                  >
                    <p className="text-h4 text-[var(--color-ink)] mb-[var(--space-stack-xs)]">
                      {skill.category}
                    </p>
                    <p className="text-body text-[var(--color-text-secondary)] mb-[var(--space-stack-sm)]">
                      {skill.items}
                    </p>
                    {skill.caseStudy && (
                      <Link
                        href={skill.caseStudy.slug}
                        className="text-ui-md text-[var(--color-text-muted)] hover:text-[var(--color-ink)] transition-colors duration-200"
                      >
                        {skill.caseStudy.label} &rarr;
                      </Link>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================
          Tools
      ========================================================= */}
      <section
        className="py-[var(--space-section-md)]"
        aria-label="Tools"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
            <ScrollReveal>
              <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-xs)]">
                Tools
              </p>
              <h2 className="text-h2 text-[var(--color-ink)] mb-[var(--space-stack-lg)]">
                What I use.
              </h2>
            </ScrollReveal>

            <ScrollReveal>
              <div className="flex flex-wrap gap-[var(--space-component-sm)] mb-[var(--space-stack-lg)]">
                {TOOLS.map((tool) => (
                  <span
                    key={tool}
                    className="text-body-sm"
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      background: 'var(--color-surface)',
                      border: '0.5px solid var(--color-border)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div style={{ maxWidth: 'var(--space-content-max)' }}>
                <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-sm)]">
                  AI tools
                </p>
                <div className="flex flex-wrap gap-[var(--space-component-sm)] mb-[var(--space-stack-md)]">
                  {AI_TOOLS.map((tool) => (
                    <span
                      key={tool}
                      className="text-body-sm"
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: 'var(--color-surface)',
                        border: '0.5px solid var(--color-border)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <p className="text-body text-[var(--color-text-secondary)]">
                  Using AI to summarize and analyze research, manage tasks, improve prototyping speed, and reduce process friction across the team.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* =========================================================
          Experience Timeline
      ========================================================= */}
      <section
        className="py-[var(--space-section-md)]"
        aria-label="Experience timeline"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
            <ScrollReveal>
              <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-xs)]">
                Timeline
              </p>
              <h2 className="text-h2 text-[var(--color-ink)] mb-[var(--space-stack-lg)]">
                Where I have been.
              </h2>
            </ScrollReveal>

            <div className="flex flex-col">
              {TIMELINE.map((job, i) => (
                <ScrollReveal key={job.company}>
                  <div
                    className={i > 0 ? 'border-t border-[var(--color-border)]' : ''}
                    style={{ padding: 'var(--space-stack-lg) 0' }}
                  >
                    <div className="flex flex-col gap-[var(--space-component-sm)] md:flex-row md:gap-[var(--space-7)]">

                      {/* Left column — role metadata */}
                      <div className="md:w-[280px] flex-shrink-0">
                        <p className="text-h4 text-[var(--color-ink)]">
                          {job.role}
                        </p>
                        <p className="text-body-sm text-[var(--color-text-muted)]">
                          {job.company}
                        </p>
                        <p className="text-body-sm text-[var(--color-text-placeholder)]">
                          {job.period}
                        </p>
                      </div>

                      {/* Right column — description + case study link */}
                      <div className="flex-1 flex flex-col gap-[var(--space-stack-sm)]">
                        {job.paragraphs.map((p, j) => (
                          <p
                            key={j}
                            className="text-body text-[var(--color-text-secondary)]"
                          >
                            {p}
                          </p>
                        ))}
                        {job.slug && (
                          <Link
                            href={job.slug}
                            className="text-ui-md text-[var(--color-text-muted)] hover:text-[var(--color-ink)] transition-colors duration-200"
                          >
                            View case study &rarr;
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================
          Education
      ========================================================= */}
      <section
        className="py-[var(--space-section-md)]"
        aria-label="Education"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
            <ScrollReveal>
              <p className="text-label text-[var(--color-text-muted)] mb-[var(--space-stack-xs)]">
                Education
              </p>
              <div className="flex flex-col gap-[var(--space-stack-md)]">
                {EDUCATION.map((ed) => (
                  <div key={ed.label}>
                    <p className="text-h4 text-[var(--color-ink)]">
                      {ed.label}
                    </p>
                    <p className="text-body-sm text-[var(--color-text-muted)]">
                      {ed.institution}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* =========================================================
          Download CTA
      ========================================================= */}
      <section
        className="py-[var(--space-section-lg)]"
        aria-label="Download resume"
      >
        <div className="max-w-layout mx-auto px-[var(--space-page-margin)]">
          <div className="border-t border-[var(--color-border)] pt-[var(--space-section-sm)]">
            <ScrollReveal>
              <p className="text-body-lg text-[var(--color-text-secondary)] mb-[var(--space-stack-lg)]">
                Want the full picture in one document?
              </p>
              <Button variant="glass" href="/api/resume">
                Download resume
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

    </div>
  )
}
