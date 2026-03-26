'use client'

interface SuggestionChipProps {
  label: string
  onClick: () => void
  /** Stagger index for entrance animation delay */
  index: number
}

export default function SuggestionChip({ label, onClick, index }: SuggestionChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="chat-chip-enter"
      style={{
        animationDelay: `${index * 60}ms`,
        padding: '6px 14px',
        borderRadius: '40px',
        border: '0.5px solid var(--color-border-mid)',
        background: 'transparent',
        color: 'var(--color-text-secondary)',
        fontFamily: 'var(--font-outfit), system-ui, sans-serif',
        fontSize: 'var(--text-body-sm-size)',
        fontWeight: 'var(--text-body-sm-weight)',
        lineHeight: 'var(--text-body-sm-line-height)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'border-color 200ms ease, background 200ms ease',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--color-border-strong)'
        e.currentTarget.style.background = 'var(--color-hover-subtle)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--color-border-mid)'
        e.currentTarget.style.background = 'transparent'
      }}
    >
      {label}
    </button>
  )
}
