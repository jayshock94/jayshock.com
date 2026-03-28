'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface BarnabyTooltipProps {
  term: string
  definition: string
  /** Phase accent color for the icon and underline. */
  accentColor: string
}

/** Small cat ear icon — two triangles, reads clearly at 10-12px. */
function CatEars({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 14"
      fill="currentColor"
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Left ear */}
      <path d="M1 12 L4 2 L7 10 Z" />
      {/* Right ear */}
      <path d="M9 10 L12 2 L15 12 Z" />
      {/* Head curve connecting ears */}
      <ellipse cx="8" cy="12.5" rx="6" ry="2" />
    </svg>
  )
}

export default function BarnabyTooltip({ term, definition, accentColor }: BarnabyTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<'above' | 'below'>('above')
  const [alignStyle, setAlignStyle] = useState<React.CSSProperties>({})
  const triggerRef = useRef<HTMLSpanElement>(null)
  const tooltipRef = useRef<HTMLSpanElement>(null)

  // Position tooltip and keep it within viewport
  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const vw = window.innerWidth

    // Above or below
    setPosition(rect.top > 240 ? 'above' : 'below')

    // Horizontal: default is centered, but clamp to viewport
    const tooltipWidth = Math.min(300, vw * 0.88)
    const centerX = rect.left + rect.width / 2
    const idealLeft = centerX - tooltipWidth / 2
    const idealRight = centerX + tooltipWidth / 2
    const pad = 12

    if (idealLeft < pad) {
      // Would overflow left — align to left edge
      const offsetPx = (tooltipWidth / 2) - centerX + pad
      setAlignStyle({ left: '0', transform: `translateX(${-rect.width / 2 + offsetPx}px)` })
    } else if (idealRight > vw - pad) {
      // Would overflow right — shift left
      const offsetPx = idealRight - (vw - pad)
      setAlignStyle({ left: '50%', transform: `translateX(calc(-50% - ${offsetPx}px))` })
    } else {
      // Fits centered
      setAlignStyle({ left: '50%', transform: 'translateX(-50%)' })
    }
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
      <span
        ref={triggerRef}
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() } }}
        style={{
          display: 'inline',
          cursor: 'pointer',
          font: 'inherit',
          color: 'inherit',
          borderBottom: `1.5px solid ${accentColor}40`,
          lineHeight: 'inherit',
          transition: 'border-color 150ms',
        }}
        aria-expanded={isOpen}
        aria-label={`Barnaby explains: ${term}`}
      >
        {term}
        <span style={{ marginLeft: '3px', opacity: 0.7, color: accentColor }}>
          <CatEars size={11} />
        </span>
      </span>

      {isOpen && (
        <span
          ref={tooltipRef}
          role="tooltip"
          className="barnaby-tooltip-enter"
          style={{
            position: 'absolute',
            ...alignStyle,
            ...(position === 'above'
              ? { bottom: 'calc(100% + 12px)' }
              : { top: 'calc(100% + 12px)' }),
            display: 'block',
            width: 'min(300px, 88vw)',
            padding: 'var(--space-component-md)',
            borderRadius: '12px',
            background: 'var(--glass-thin)',
            backdropFilter: 'blur(48px) saturate(180%)',
            WebkitBackdropFilter: 'blur(48px) saturate(180%)',
            border: '0.5px solid var(--glass-border-mid)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            zIndex: 50,
          }}
        >
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
        </span>
      )}
    </span>
  )
}
