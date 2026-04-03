'use client'

import { memo } from 'react'
import { useGlassFloat } from '../useGlassFloat'

/** Torus (ring) — Skills section */
const GlassTorus = memo(function GlassTorus() {
  const meshRef = useGlassFloat()

  return (
    <mesh ref={meshRef} rotation={[0.3, 0, 0.15]}>
      <torusGeometry args={[0.8, 0.35, 32, 64]} />
      <meshPhysicalMaterial
        transmission={0.9}
        roughness={0.06}
        ior={1.5}
        thickness={0.5}
        envMapIntensity={1.1}
        color="#c8e8e0"
        transparent
        opacity={0.95}
      />
    </mesh>
  )
})

export default GlassTorus
