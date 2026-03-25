'use client'

import { useCallback, useRef, useState } from 'react'

interface Circle {
  id: number
  x:  number
  y:  number
}

interface EraserRevealProps {
  legacy:       React.ReactNode
  updated:      React.ReactNode
  brushRadius?: number
}

const MIN_MOVE_DIST = 6
const MAX_CIRCLES   = 300

export default function EraserReveal({
  legacy,
  updated,
  brushRadius = 44,
}: EraserRevealProps) {
  const [circles,     setCircles]     = useState<Circle[]>([])
  const [hintVisible, setHintVisible] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const lastPos      = useRef<{ x: number; y: number } | null>(null)
  const idCounter    = useRef(0)
  const maskId       = useRef(`eraser-mask-${Math.random().toString(36).slice(2, 8)}`)

  const getLocalPos = useCallback((clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return null
    return { x: clientX - rect.left, y: clientY - rect.top }
  }, [])

  const addCircle = useCallback((clientX: number, clientY: number) => {
    const pos = getLocalPos(clientX, clientY)
    if (!pos) return

    if (lastPos.current) {
      const dx = pos.x - lastPos.current.x
      const dy = pos.y - lastPos.current.y
      if (Math.sqrt(dx * dx + dy * dy) < MIN_MOVE_DIST) return
    }
    lastPos.current = pos

    if (hintVisible) setHintVisible(false)

    setCircles(prev => {
      if (prev.length >= MAX_CIRCLES) return prev
      return [...prev, { id: idCounter.current++, x: pos.x, y: pos.y }]
    })
  }, [getLocalPos, hintVisible])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    addCircle(e.clientX, e.clientY)
  }, [addCircle])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    addCircle(e.touches[0].clientX, e.touches[0].clientY)
  }, [addCircle])

  const handleReset = useCallback(() => {
    lastPos.current = null
    setCircles([])
    setHintVisible(true)
  }, [])

  const hasErased = circles.length > 0

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-[16px] select-none"
      style={{ cursor: 'crosshair' }}
      role="img"
      aria-label="Interactive before/after. Move your mouse or finger to reveal the redesign."
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchMove}
    >
      {/* SVG mask defs */}
      <svg
        aria-hidden="true"
        focusable={false}
        style={{
          position:      'absolute',
          top:           0,
          left:          0,
          width:         '100%',
          height:        '100%',
          pointerEvents: 'none',
          overflow:      'visible',
          zIndex:        0,
        }}
      >
        <defs>
          <mask id={maskId.current} maskUnits="userSpaceOnUse">
            <rect width="9999" height="9999" fill="white" />
            {circles.map(c => (
              <circle key={c.id} cx={c.x} cy={c.y} r={brushRadius} fill="black" />
            ))}
          </mask>
        </defs>
      </svg>

      {/* New design — bottom layer */}
      <div aria-label="Redesigned app">
        {updated}
      </div>

      {/* Legacy design — top layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          mask:       `url(#${maskId.current})`,
          WebkitMask: `url(#${maskId.current})`,
        }}
      >
        {legacy}
      </div>

      {/* Hint badge — visible until first scratch */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none transition-opacity duration-500"
        style={{
          paddingBottom: 'var(--space-stack-lg)',
          opacity:       hintVisible ? 1 : 0,
          zIndex:        10,
        }}
      >
        <div
          className="flex items-center gap-[var(--space-component-sm)] text-body-sm rounded-full"
          style={{
            padding:             '8px 16px',
            background:          'rgba(28,25,23,0.72)',
            color:               'white',
            backdropFilter:      'blur(8px)',
            WebkitBackdropFilter:'blur(8px)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Scratch to reveal the redesign</span>
        </div>
      </div>

      {/* Reset button — appears once erasing starts */}
      {hasErased && (
        <button
          type="button"
          onClick={handleReset}
          className="absolute top-[var(--space-component-md)] right-[var(--space-component-md)] text-body-sm rounded-full transition-opacity duration-200 hover:opacity-80"
          style={{
            padding:             '6px 14px',
            background:          'rgba(28,25,23,0.72)',
            color:               'white',
            backdropFilter:      'blur(8px)',
            WebkitBackdropFilter:'blur(8px)',
            border:              'none',
            cursor:              'pointer',
            zIndex:              10,
          }}
          aria-label="Reset to original design"
        >
          Reset
        </button>
      )}
    </div>
  )
}
