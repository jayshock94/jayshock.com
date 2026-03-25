'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface Circle {
  id: number
  x:  number
  y:  number
}

interface EraserRevealProps {
  legacy:  React.ReactNode
  updated: React.ReactNode
  /** Radius of the eraser brush in px. Default: 44 */
  brushRadius?: number
  /** Ms of idle before reset. Default: 2000 */
  resetDelay?: number
}

const MIN_MOVE_DIST = 6   // minimum px between circles to avoid redundant state updates
const MAX_CIRCLES   = 300 // prevent unbounded growth

export default function EraserReveal({
  legacy,
  updated,
  brushRadius = 44,
  resetDelay  = 2000,
}: EraserRevealProps) {
  const [circles,     setCircles]     = useState<Circle[]>([])
  const [isResetting, setIsResetting] = useState(false)
  const [hintVisible, setHintVisible] = useState(true)

  const containerRef   = useRef<HTMLDivElement>(null)
  const legacyLayerRef = useRef<HTMLDivElement>(null)
  const resetTimer     = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastPos        = useRef<{ x: number; y: number } | null>(null)
  const idCounter      = useRef(0)
  // Stable unique mask id per component instance
  const maskId = useRef(`eraser-mask-${Math.random().toString(36).slice(2, 8)}`)

  const clearResetTimer = useCallback(() => {
    if (resetTimer.current) { clearTimeout(resetTimer.current); resetTimer.current = null }
  }, [])

  const scheduleReset = useCallback(() => {
    clearResetTimer()
    resetTimer.current = setTimeout(() => setIsResetting(true), resetDelay)
  }, [clearResetTimer, resetDelay])

  const handleTransitionEnd = useCallback(() => {
    if (!isResetting) return
    lastPos.current = null
    setCircles([])
    setIsResetting(false)
  }, [isResetting])

  const getLocalPos = useCallback((clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return null
    return { x: clientX - rect.left, y: clientY - rect.top }
  }, [])

  const addCircle = useCallback((clientX: number, clientY: number) => {
    const pos = getLocalPos(clientX, clientY)
    if (!pos) return

    // Throttle by distance
    if (lastPos.current) {
      const dx = pos.x - lastPos.current.x
      const dy = pos.y - lastPos.current.y
      if (Math.sqrt(dx * dx + dy * dy) < MIN_MOVE_DIST) return
    }
    lastPos.current = pos

    clearResetTimer()
    if (hintVisible) setHintVisible(false)
    if (isResetting) setIsResetting(false)

    setCircles(prev => {
      if (prev.length >= MAX_CIRCLES) return prev
      return [...prev, { id: idCounter.current++, x: pos.x, y: pos.y }]
    })
    scheduleReset()
  }, [getLocalPos, clearResetTimer, scheduleReset, hintVisible, isResetting])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    addCircle(e.clientX, e.clientY)
  }, [addCircle])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    addCircle(e.touches[0].clientX, e.touches[0].clientY)
  }, [addCircle])

  useEffect(() => () => clearResetTimer(), [clearResetTimer])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-[16px] select-none"
      style={{ cursor: circles.length > 0 || isResetting ? 'none' : 'crosshair' }}
      role="img"
      aria-label="Interactive before/after comparison. Move your mouse or finger to reveal the redesign."
    >
      {/* SVG defs — absolutely fills container so coordinates match */}
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
            {/* White = show old design, Black circles = erase (reveal new design through) */}
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

      {/* Legacy design — top layer, masked by eraser */}
      <div
        ref={legacyLayerRef}
        aria-hidden="true"
        className="absolute inset-0 transition-opacity"
        style={{
          mask:               `url(#${maskId.current})`,
          WebkitMask:         `url(#${maskId.current})`,
          opacity:            isResetting ? 0 : 1,
          transitionDuration: isResetting ? '400ms' : '0ms',
        }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchMove}
        onTransitionEnd={handleTransitionEnd}
      >
        {legacy}
      </div>

      {/* Hint badge — fades out on first interaction */}
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
          {/* Finger swipe icon for mobile context */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Scratch to reveal the redesign</span>
        </div>
      </div>
    </div>
  )
}
