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
  const [hasErased,   setHasErased]   = useState(false)
  const [hintVisible, setHintVisible] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const legacyImg    = useRef<HTMLImageElement | null>(null)
  const canvasReady  = useRef(false)

  // Draw legacy image to fill the canvas — also used by reset
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

  // Preload legacy image
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      legacyImg.current = img
      if (canvasReady.current) drawLegacy()
    }
    img.src = legacySrc
  }, [legacySrc, drawLegacy])

  // Once the updated image loads it sets the container height — size canvas and draw
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

    if (!hasErased)   setHasErased(true)
    if (hintVisible)  setHintVisible(false)
  }, [brushRadius, hasErased, hintVisible])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    eraseAt(e.clientX, e.clientY)
  }, [eraseAt])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    eraseAt(e.touches[0].clientX, e.touches[0].clientY)
  }, [eraseAt])

  const handleReset = useCallback(() => {
    drawLegacy()
    setHasErased(false)
    setHintVisible(true)
  }, [drawLegacy])

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
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchMove}
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
              padding:             '8px 16px',
              background:          'rgba(28,25,23,0.72)',
              color:               'white',
              backdropFilter:      'blur(8px)',
              WebkitBackdropFilter:'blur(8px)',
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
