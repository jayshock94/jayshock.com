'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

/**
 * Slow breathe animation for glass icon groups.
 * Gentle float + very slow rotation. No constant spinning.
 * Respects prefers-reduced-motion.
 */
export function useGlassBreathe() {
  const groupRef = useRef<Group>(null)
  const startTime = useMemo(() => Math.random() * 100, [])

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useFrame(({ clock }) => {
    if (!groupRef.current || prefersReduced) return
    const t = clock.getElapsedTime() + startTime

    // Very slow Y rotation — full revolution every ~40 seconds
    groupRef.current.rotation.y = t * 0.15

    // Gentle float
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.05

    // Subtle tilt breathing
    groupRef.current.rotation.x = 0.25 + Math.sin(t * 0.4) * 0.03
    groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.02
  })

  return groupRef
}
