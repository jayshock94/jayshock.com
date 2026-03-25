'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface EraserRevealProps {
  /** Path to the legacy (before) image — drawn onto the canvas overlay. */
  legacySrc:    string
  /** Path to the updated (after) image — always visible underneath. */
  updatedSrc:   string
  alt?:         string
  brushRadius?: number
}

export default function EraserReveal({
  legacySrc,
  updatedSrc,
  alt         = 'Before and after comparison',
  brushRadius = 48,
}: EraserRevealProps) {

  // ── Shared ─────────────────────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── Desktop eraser state ───────────────────────────────────────────────────
  const [hasErased,   setHasErased]   = useState(false)
  const [hintVisible, setHintVisible] = useState(true)
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const legacyImg   = useRef<HTMLImageElement | null>(null)
  const canvasReady = useRef(false)

  const drawLegacy = useCallback(() => {
    const canvas = canvasRef.current
    const img    = legacyImg.current
    if (!canvas || !img) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.globalCompositeOperation = 'source-over'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  }, [])

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      legacyImg.current = img
      if (canvasReady.current) drawLegacy()
    }
    img.src = legacySrc
  }, [legacySrc, drawLegacy])

  const handleUpdatedLoad = useCallback(() => {
    const canvas    = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    canvas.width  = container.clientWidth
    canvas.height = container.clientHeight
    canvasReady.current = true
    if (legacyImg.current) drawLegacy()
  }, [drawLegacy])

  const eraseAt = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const ctx  = canvas.getContext('2d')
    if (!ctx) return
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(clientX - rect.left, clientY - rect.top, brushRadius, 0, Math.PI * 2)
    ctx.fill()
    if (!hasErased)  setHasErased(true)
    if (hintVisible) setHintVisible(false)
  }, [brushRadius, hasErased, hintVisible])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    eraseAt(e.clientX, e.clientY)
  }, [eraseAt])

  const handleDesktopTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    eraseAt(e.touches[0].clientX, e.touches[0].clientY)
  }, [eraseAt])

  const handleReset = useCallback(() => {
    drawLegacy()
    setHasErased(false)
    setHintVisible(true)
  }, [drawLegacy])

  // ── Mobile slider state ────────────────────────────────────────────────────
  const [sliderPos,     setSliderPos]     = useState(0.5)
  const [hasInteracted, setHasInteracted] = useState(false)
  const isDragging = useRef(false)

  const handleSliderTouchStart = useCallback(() => {
    isDragging.current = true
  }, [])

  const handleSliderTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return
    const touch = e.touches[0]
    const rect  = containerRef.current.getBoundingClientRect()
    const x     = (touch.clientX - rect.left) / rect.width
    setSliderPos(Math.max(0.02, Math.min(0.98, x)))
    if (!hasInteracted) setHasInteracted(true)
  }, [hasInteracted])

  const handleSliderTouchEnd = useCallback(() => {
    isDragging.current = false
  }, [])

  // ── Mobile render ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div>
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-[16px] select-none"
          onTouchStart={handleSliderTouchStart}
          onTouchMove={handleSliderTouchMove}
          onTouchEnd={handleSliderTouchEnd}
          style={{ touchAction: 'pan-y' }}
          role="img"
          aria-label={alt}
        >
          {/* After — base layer, sets natural height */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={updatedSrc}
            alt=""
            draggable={false}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />

          {/* Before — top layer clipped to left of slider */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${(1 - sliderPos) * 100}% 0 0)` }}
            aria-hidden="true"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={legacySrc}
              alt=""
              draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Divider line + drag handle */}
          <div
            className="absolute top-0 bottom-0 w-[2px] pointer-events-none"
            style={{
              left:       `${sliderPos * 100}%`,
              transform:  'translateX(-50%)',
              background: 'rgba(255,255,255,0.90)',
              boxShadow:  '0 0 8px rgba(0,0,0,0.25)',
            }}
            aria-hidden="true"
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full"
              style={{
                width:     '36px',
                height:    '36px',
                background: '#ffffff',
                boxShadow: '0 2px 12px rgba(0,0,0,0.20)',
              }}
            >
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
                <path
                  d="M1 5h14M4 2L1 5l3 3M12 2l3 3-3 3"
                  stroke="#1C1917"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Before / After labels */}
          <div
            className="absolute text-ui-sm rounded-[4px] px-[8px] py-[4px]"
            style={{
              top:                'var(--space-component-sm)',
              left:               'var(--space-component-sm)',
              background:         'rgba(28,25,23,0.65)',
              color:              '#ffffff',
              backdropFilter:     'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
            aria-hidden="true"
          >
            Before
          </div>
          <div
            className="absolute text-ui-sm rounded-[4px] px-[8px] py-[4px]"
            style={{
              top:                'var(--space-component-sm)',
              right:              'var(--space-component-sm)',
              background:         'rgba(28,25,23,0.65)',
              color:              '#ffffff',
              backdropFilter:     'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
            aria-hidden="true"
          >
            After
          </div>

          {/* Drag hint — fades after first interaction */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none transition-opacity duration-500"
            style={{
              paddingBottom: 'var(--space-stack-lg)',
              opacity:       hasInteracted ? 0 : 1,
            }}
          >
            <div
              className="flex items-center gap-[var(--space-component-sm)] text-body-sm rounded-full"
              style={{
                padding:              '8px 16px',
                background:           'rgba(28,25,23,0.72)',
                color:                '#ffffff',
                backdropFilter:       'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
                <path
                  d="M1 5h14M4 2L1 5l3 3M12 2l3 3-3 3"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Drag to compare</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Desktop render ─────────────────────────────────────────────────────────
  return (
    <div>
      {/* Image container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-[16px] select-none"
        style={{ cursor: 'crosshair' }}
        role="img"
        aria-label={alt}
      >
        {/* Updated design — bottom layer, sets container height */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={updatedSrc}
          alt=""
          draggable={false}
          onLoad={handleUpdatedLoad}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />

        {/* Canvas overlay — legacy image drawn here, erased on interaction */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          onMouseMove={handleMouseMove}
          onTouchMove={handleDesktopTouchMove}
          onTouchStart={handleDesktopTouchMove}
          aria-hidden="true"
        />

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
              padding:              '8px 16px',
              background:           'rgba(28,25,23,0.72)',
              color:                'white',
              backdropFilter:       'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Scratch to reveal the redesign</span>
          </div>
        </div>
      </div>

      {/* Reset — below the image, not overlaid */}
      <div
        className="flex justify-center transition-opacity duration-300"
        style={{ opacity: hasErased ? 1 : 0, pointerEvents: hasErased ? 'auto' : 'none', marginTop: 'var(--space-stack-sm)' }}
      >
        <button
          type="button"
          onClick={handleReset}
          className="text-ui-sm text-[var(--color-text-muted)] hover:text-[var(--color-ink)] transition-colors duration-200"
          aria-label="Reset to original design"
        >
          ↺ Reset
        </button>
      </div>
    </div>
  )
}
