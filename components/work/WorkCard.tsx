import Link from 'next/link'
import type { CaseStudy } from '@/data/types'

interface WorkCardProps {
  caseStudy: CaseStudy
  monochromatic?: boolean
}

function ArrowRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
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

export default function WorkCard({
  caseStudy,
  monochromatic = true,
}: WorkCardProps) {
  const { slug, eyebrow, title, role, cardImpactLine } = caseStudy

  return (
    <article
      className="
        group
        bg-[var(--color-surface)]
        border border-[var(--color-border)]
        rounded-[10px]
        p-[var(--space-component-lg)]
        flex flex-col gap-[var(--space-stack-sm)]
        transition-all duration-200
        hover:border-[var(--color-border-mid)]
        hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)]
      "
    >
      {/* Eyebrow */}
      <span className="text-label text-[var(--color-text-muted)]">
        {eyebrow}
      </span>

      {/* Title */}
      <h3 className="text-h3 text-[var(--color-ink)] mt-[var(--space-stack-xs)]">
        {title}
      </h3>

      {/* Role */}
      <p className="text-body-sm text-[var(--color-text-muted)]">
        {role}
      </p>

      {/* Impact line */}
      <p className="text-body text-[var(--color-text-secondary)] mt-[var(--space-stack-xs)]">
        {cardImpactLine}
      </p>

      {/* CTA */}
      <div className="mt-auto pt-[var(--space-stack-md)]">
        <Link
          href={`/work/${slug}`}
          className="
            inline-flex items-center gap-[var(--space-component-xs)]
            text-ui-md text-[var(--color-accent)]
            hover:text-[var(--color-accent-deep)]
            transition-colors duration-200
            group/link
          "
        >
          View case study
          <span className="transition-transform duration-200 group-hover/link:translate-x-[2px]">
            <ArrowRight />
          </span>
        </Link>
      </div>
    </article>
  )
}
