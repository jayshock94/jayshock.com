'use client'

import { memo } from 'react'
import { useGlassBreathe } from '../useGlassFloat'

/**
 * Glass lens with orbital ring — About section.
 * Bottom-lit warm glow catches the sphere and ring edge.
 */
const GlassLens = memo(function GlassLens() {
  const groupRef = useGlassBreathe()

  return (
    <group ref={groupRef} scale={0.85}>
      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshPhysicalMaterial
          transmission={0.82}
          roughness={0.04}
          ior={1.5}
          thickness={1.2}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.5}
          color="#c8a878"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Orbital ring */}
      <mesh rotation={[1.2, 0, 0.3]}>
        <torusGeometry args={[1.05, 0.06, 16, 64]} />
        <meshPhysicalMaterial
          transmission={0.65}
          roughness={0.03}
          ior={1.4}
          thickness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.8}
          color="#b89868"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  )
})

export default GlassLens
