'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface Circle {
  id: number
  x:  number
  y:  number
}

interface EraserRevealProps {
  legacy:       React.ReactNode
  updated:      React.ReactNode
  brushRadius?: number
  resetDelay?:  number
}

const MIN_MOVE_DIST = 6
const MAX_CIRCLES   = 300
const FADE_MS       = 400

export default function EraserReveal({
  legacy,
  updated,
  brushRadius = 44,
  resetDelay  = 2000,
}: EraserRevealProps) {
  const [circles,     setCircles]     = useState<Circle[]>([])
  const [isResetting, setIsResetting] = useState(false)
  const [hintVisible, setHintVisible] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const timerA       = useRef<ReturnType<typeof setTimeout> | null>(null) // idle → fade out
  const timerB       = useRef<ReturnType<typeof setTimeout> | null>(null) // fade out → clear + fade in
  const lastPos      = useRef<{ x: number; y: number } | null>(null)
  const idCounter    = useRef(0)
  const maskId       = useRef(`eraser-mask-${Math.random().toString(36).slice(2, 8)}`)

  const clearTimers = useCallback(() => {
    if (timerA.current) { clearTimeout(timerA.current); timerA.current = null }
    if (timerB.current) { clearTimeout(timerB.current); timerB.current = null }
  }, [])

  const scheduleReset = useCallback(() => {
    clearTimers()
    timerA.current = setTimeout(() => {
      setIsResetting(true)
      // After fade completes, clear circles and snap back
      timerB.current = setTimeout(() => {
        lastPos.current = null
        setCircles([])
        setIsResetting(false)
      }, FADE_MS + 50)
    }, resetDelay)
  }, [clearTimers, resetDelay])

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

    clearTimers()
    if (hintVisible) setHintVisible(false)
    // Cancel any in-progress reset
    setIsResetting(false)

    setCircles(prev => {
      if (prev.length >= MAX_CIRCLES) return prev
      return [...prev, { id: idCounter.current++, x: pos.x, y: pos.y }]
    })
    scheduleReset()
  }, [getLocalPos, clearTimers, scheduleReset, hintVisible])

  // ─── ALL pointer events on the container, not the masked layer ───────────────
  // The masked layer has transparent holes where erasing has happened — pointer
  // events fall through those holes to the layer below, causing the "freezing"
  // bug. Listening on the container guarantees we always get events.
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    addCircle(e.clientX, e.clientY)
  }, [addCircle])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    addCircle(e.touches[0].clientX, e.touches[0].clientY)
  }, [addCircle])

  useEffect(() => () => clearTimers(), [clearTimers])

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
      {/* SVG mask defs — fills container so local coordinates match mouse positions */}
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
            {!isResetting && circles.map(c => (
              <circle key={c.id} cx={c.x} cy={c.y} r={brushRadius} fill="black" />
            ))}
          </mask>
        </defs>
      </svg>

      {/* New design — bottom layer, always visible */}
      <div aria-label="Redesigned app">
        {updated}
      </div>

      {/* Legacy design — top layer, erased via SVG mask */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          mask:       `url(#${maskId.current})`,
          WebkitMask: `url(#${maskId.current})`,
          opacity:    isResetting ? 0 : 1,
          transition: isResetting ? `opacity ${FADE_MS}ms ease` : 'none',
        }}
      >
        {legacy}
      </div>

      {/* Hint badge */}
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
    </div>
  )
}
