'use client'

import { useRef, useState, useEffect, ReactNode } from 'react'

/**
 * Wraps a fixed-width mockup and scales it down on smaller viewports
 * so it keeps its tablet proportions instead of reflowing.
 */
export default function ScaledMockup({
  children,
  designWidth = 860,
}: {
  children: ReactNode
  designWidth?: number
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [innerHeight, setInnerHeight] = useState<number | null>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const inner = innerRef.current
    if (!wrap || !inner) return

    const update = () => {
      const available = wrap.clientWidth
      const s = Math.min(1, available / designWidth)
      setScale(s)
      setInnerHeight(inner.scrollHeight)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(wrap)
    ro.observe(inner)
    return () => ro.disconnect()
  }, [designWidth])

  return (
    <div
      ref={wrapRef}
      style={{
        width: '100%',
        overflow: 'hidden',
        height: innerHeight !== null ? innerHeight * scale : 'auto',
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: designWidth,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  )
}
