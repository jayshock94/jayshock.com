'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

/**
 * Shared idle animation for glass icon shapes.
 * Slow rotation + gentle float. Respects prefers-reduced-motion.
 */
export function useGlassFloat() {
  const meshRef = useRef<Mesh>(null)

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useFrame((_, delta) => {
    if (!meshRef.current || prefersReduced) return
    const t = meshRef.current.rotation.y
    meshRef.current.rotation.y += delta * 0.3
    meshRef.current.position.y = Math.sin(t * 1.2) * 0.06
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.04
  })

  return meshRef
}
