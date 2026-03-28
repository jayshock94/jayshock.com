'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import CatPaw from './CatPaw'

interface BarnabyTooltipProps {
  term: string
  definition: string
  /** Phase accent color for the paw and underline. */
  accentColor: string
}

export default function BarnabyTooltip({ term, definition, accentColor }: BarnabyTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<'above' | 'below'>('above')
  const triggerRef = useRef<HTMLSpanElement>(null)
  const tooltipRef = useRef<HTMLSpanElement>(null)

  // Position the tooltip above or below based on available space
  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    setPosition(rect.top > 200 ? 'above' : 'below')
  }, [])

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return

    const handleClick = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        tooltipRef.current?.contains(e.target as Node)
      ) return
      setIsOpen(false)
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    // Delay so the opening click doesn't immediately trigger close
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClick)
      document.addEventListener('keydown', handleKey)
    }, 10)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [isOpen])

  const handleClick = useCallback(() => {
    if (!isOpen) updatePosition()
    setIsOpen(prev => !prev)
  }, [isOpen, updatePosition])

  return (
    <span style={{ position: 'relative', display: 'inline' }}>
      {/* Trigger — using span instead of button because this lives inside <p> tags */}
      <span
        ref={triggerRef}
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() } }}
        style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          gap: '3px',
          cursor: 'pointer',
          font: 'inherit',
          color: 'inherit',
          borderBottom: `1.5px dotted ${accentColor}`,
          lineHeight: 'inherit',
          transition: 'opacity 150ms',
        }}
        aria-expanded={isOpen}
        aria-label={`Barnaby explains: ${term}`}
      >
        <span>{term}</span>
        <CatPaw size={12} className="flex-shrink-0" />
      </span>

      {isOpen && (
        <span
          ref={tooltipRef}
          role="tooltip"
          className="barnaby-tooltip-enter"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            ...(position === 'above'
              ? { bottom: 'calc(100% + 12px)' }
              : { top: 'calc(100% + 12px)' }),
            display: 'block',
            width: 'min(320px, 90vw)',
            padding: 'var(--space-component-md)',
            borderRadius: '14px',
            background: 'var(--glass-thin)',
            backdropFilter: 'blur(48px) saturate(180%)',
            WebkitBackdropFilter: 'blur(48px) saturate(180%)',
            border: '0.5px solid var(--glass-border-mid)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            zIndex: 50,
          }}
        >
          {/* Barnaby label */}
          <span
            style={{
              display: 'block',
              marginBottom: '6px',
              fontFamily: 'var(--font-outfit), system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: accentColor,
            }}
          >
            Barnaby says
          </span>

          {/* Definition */}
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-outfit), system-ui, sans-serif',
              fontSize: '13px',
              fontWeight: 300,
              lineHeight: '1.65',
              color: 'var(--color-text-secondary)',
            }}
          >
            {definition}
          </span>

          {/* Tail / arrow */}
          <span
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '10px',
              height: '10px',
              background: 'var(--glass-thin)',
              border: '0.5px solid var(--glass-border-mid)',
              ...(position === 'above'
                ? { bottom: '-5px', borderTop: 'none', borderLeft: 'none' }
                : { top: '-5px', borderBottom: 'none', borderRight: 'none' }),
            }}
          />
        </span>
      )}
    </span>
  )
}
