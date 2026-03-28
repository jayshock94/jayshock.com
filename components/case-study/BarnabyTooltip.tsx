'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface BarnabyTooltipProps {
  term: string
  definition: string
  accentColor: string
}

/** Small cat ear silhouette — two triangles, clear at 10px. */
function CatEars({ size = 10 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 14"
      fill="currentColor"
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '2px' }}
    >
      <path d="M1 12 L4 2 L7 10 Z" />
      <path d="M9 10 L12 2 L15 12 Z" />
      <ellipse cx="8" cy="12.5" rx="6" ry="2" />
    </svg>
  )
}

export default function BarnabyTooltip({ term, definition, accentColor }: BarnabyTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({})
  const [mounted, setMounted] = useState(false)
  const triggerRef = useRef<HTMLSpanElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Need to know we're client-side for createPortal
  useEffect(() => setMounted(true), [])

  // Calculate tooltip position using fixed positioning
  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight
    const tooltipWidth = Math.min(300, vw - 24)
    const pad = 12

    // Center on the term, clamp to viewport
    let left = rect.left + rect.width / 2 - tooltipWidth / 2
    left = Math.max(pad, Math.min(left, vw - tooltipWidth - pad))

    // Prefer above, fall back to below
    const above = rect.top > 220

    const style: React.CSSProperties = {
      position: 'fixed',
      left: `${left}px`,
      width: `${tooltipWidth}px`,
      zIndex: 50,
    }

    if (above) {
      style.bottom = `${vh - rect.top + 8}px`
    } else {
      style.top = `${rect.bottom + 8}px`
    }

    setTooltipStyle(style)
  }, [])

  // Close on outside click, escape, or scroll
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
    const handleScroll = () => setIsOpen(false)

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClick)
      document.addEventListener('keydown', handleKey)
      window.addEventListener('scroll', handleScroll, { passive: true })
    }, 10)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isOpen])

  const handleClick = useCallback(() => {
    if (!isOpen) updatePosition()
    setIsOpen(prev => !prev)
  }, [isOpen, updatePosition])

  const tooltip = isOpen && mounted ? createPortal(
    <div
      ref={tooltipRef}
      role="tooltip"
      className="barnaby-tooltip-enter"
      style={{
        ...tooltipStyle,
        padding: 'var(--space-component-md)',
        borderRadius: '12px',
        background: 'rgba(30, 30, 28, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '0.5px solid var(--glass-border-mid)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      <p
        style={{
          margin: '0 0 6px 0',
          fontFamily: 'var(--font-outfit), system-ui, sans-serif',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: accentColor,
        }}
      >
        Barnaby says
      </p>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-outfit), system-ui, sans-serif',
          fontSize: '13px',
          fontWeight: 300,
          lineHeight: '1.65',
          color: 'var(--color-text-secondary)',
        }}
      >
        {definition}
      </p>
    </div>,
    document.body,
  ) : null

  return (
    <>
      <span
        ref={triggerRef}
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() } }}
        style={{
          cursor: 'pointer',
          font: 'inherit',
          color: 'inherit',
          borderBottom: `1.5px solid ${accentColor}`,
          paddingBottom: '1px',
          lineHeight: 'inherit',
          transition: 'opacity 150ms',
        }}
        aria-expanded={isOpen}
        aria-label={`Barnaby explains: ${term}`}
      >
        {term}
        <span style={{ opacity: 0.6, color: accentColor }}>
          <CatEars size={10} />
        </span>
      </span>
      {tooltip}
    </>
  )
}
