'use client'

import { memo, useMemo } from 'react'
import { useGlassBreathe } from '../useGlassFloat'
import * as THREE from 'three'

/**
 * Glass speech bubble — Contact section.
 * Rounded rectangle with trailing dots, bottom-lit with slate blue warmth.
 */
const GlassMessage = memo(function GlassMessage(_props: { tintColor?: string }) {
  const groupRef = useGlassBreathe()

  const bubbleShape = useMemo(() => {
    const shape = new THREE.Shape()
    const w = 1.4
    const h = 1.0
    const r = 0.25

    shape.moveTo(-w / 2 + r, -h / 2)
    shape.lineTo(w / 2 - r, -h / 2)
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r)
    shape.lineTo(w / 2, h / 2 - r)
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2)
    shape.lineTo(-w / 2 + r, h / 2)
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r)
    shape.lineTo(-w / 2, -h / 2 + r)
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2)

    return shape
  }, [])

  const extrudeSettings = useMemo(() => ({
    depth: 0.3,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.06,
    bevelSegments: 8,
  }), [])

  return (
    <group ref={groupRef} scale={0.8}>
      {/* Main bubble */}
      <mesh position={[0, 0.1, -0.15]}>
        <extrudeGeometry args={[bubbleShape, extrudeSettings]} />
        <meshPhysicalMaterial
          transmission={0.82}
          roughness={0.03}
          ior={1.45}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.5}
          color="#98b8d8"
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Trailing dot */}
      <mesh position={[-0.35, -0.5, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshPhysicalMaterial
          transmission={0.75}
          roughness={0.03}
          ior={1.4}
          thickness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.5}
          color="#80a8d0"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Smaller trailing dot */}
      <mesh position={[-0.55, -0.7, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshPhysicalMaterial
          transmission={0.7}
          roughness={0.03}
          ior={1.4}
          thickness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.5}
          color="#7098c0"
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  )
})

export default GlassMessage
