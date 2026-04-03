'use client'

import { memo } from 'react'
import { useGlassBreathe } from '../useGlassFloat'

/**
 * Glass lens with orbital ring — About section.
 * Reads as "perspective" / "looking deeper".
 */
const GlassLens = memo(function GlassLens() {
  const groupRef = useGlassBreathe()

  return (
    <group ref={groupRef} scale={0.85}>
      {/* Core sphere — frosted glass lens */}
      <mesh>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshPhysicalMaterial
          transmission={0.88}
          roughness={0.15}
          ior={1.5}
          thickness={1.0}
          envMapIntensity={0.8}
          color="#dcc8a8"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Orbital ring */}
      <mesh rotation={[1.2, 0, 0.3]}>
        <torusGeometry args={[1.05, 0.06, 16, 64]} />
        <meshPhysicalMaterial
          transmission={0.7}
          roughness={0.1}
          ior={1.4}
          thickness={0.2}
          envMapIntensity={1.0}
          color="#c8aa80"
          transparent
          opacity={0.75}
        />
      </mesh>
    </group>
  )
})

export default GlassLens
