'use client'

import { memo, useMemo } from 'react'
import { useGlassBreathe } from '../useGlassFloat'
import * as THREE from 'three'

/**
 * Glass speech bubble — Contact section.
 * Rounded rectangle with a small tail.
 * Reads as "message" / "get in touch".
 */
const GlassMessage = memo(function GlassMessage() {
  const groupRef = useGlassBreathe()

  // Create a rounded rectangle shape for extrusion
  const bubbleShape = useMemo(() => {
    const shape = new THREE.Shape()
    const w = 1.4
    const h = 1.0
    const r = 0.25

    // Rounded rectangle
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
          transmission={0.88}
          roughness={0.08}
          ior={1.45}
          thickness={0.4}
          envMapIntensity={1.0}
          color="#b0c8e0"
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Small tail / indicator dot */}
      <mesh position={[-0.35, -0.5, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshPhysicalMaterial
          transmission={0.8}
          roughness={0.1}
          ior={1.4}
          thickness={0.2}
          envMapIntensity={0.8}
          color="#90b0d0"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Smaller dot */}
      <mesh position={[-0.55, -0.7, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshPhysicalMaterial
          transmission={0.75}
          roughness={0.1}
          ior={1.4}
          thickness={0.15}
          envMapIntensity={0.8}
          color="#80a8d4"
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  )
})

export default GlassMessage
