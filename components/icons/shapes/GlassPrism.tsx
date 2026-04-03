'use client'

import { memo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import type { Group } from 'three'

/**
 * Stacked glass layers — Work section.
 * Three rounded panels stacked vertically with parallax float.
 * Bottom-lit to catch warm glow from below.
 */
const GlassLayers = memo(function GlassLayers(_props: { tintColor?: string }) {
  const groupRef = useRef<Group>(null)
  const layer1 = useRef<Group>(null)
  const layer2 = useRef<Group>(null)
  const layer3 = useRef<Group>(null)

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useFrame(({ clock }) => {
    if (!groupRef.current || prefersReduced) return
    const t = clock.getElapsedTime()

    groupRef.current.rotation.y = t * 0.12

    if (layer1.current) layer1.current.position.y = 0.45 + Math.sin(t * 0.5) * 0.04
    if (layer2.current) layer2.current.position.y = 0.0 + Math.sin(t * 0.5 + 0.8) * 0.03
    if (layer3.current) layer3.current.position.y = -0.45 + Math.sin(t * 0.5 + 1.6) * 0.02
  })

  const panelArgs: [number, number, number] = [1.6, 0.12, 1.6]
  const radius = 0.08

  return (
    <group ref={groupRef} rotation={[0.5, 0.3, 0]} scale={0.75}>
      <group ref={layer1}>
        <RoundedBox args={panelArgs} radius={radius} smoothness={4}>
          <meshPhysicalMaterial
            transmission={0.8}
            roughness={0.03}
            ior={1.5}
            thickness={0.4}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={1.5}
            color="#c898e0"
            transparent
            opacity={0.85}
          />
        </RoundedBox>
      </group>

      <group ref={layer2}>
        <RoundedBox args={panelArgs} radius={radius} smoothness={4}>
          <meshPhysicalMaterial
            transmission={0.75}
            roughness={0.03}
            ior={1.5}
            thickness={0.4}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={1.5}
            color="#a880c8"
            transparent
            opacity={0.88}
          />
        </RoundedBox>
      </group>

      <group ref={layer3}>
        <RoundedBox args={panelArgs} radius={radius} smoothness={4}>
          <meshPhysicalMaterial
            transmission={0.7}
            roughness={0.03}
            ior={1.5}
            thickness={0.4}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={1.5}
            color="#8868b0"
            transparent
            opacity={0.92}
          />
        </RoundedBox>
      </group>
    </group>
  )
})

export default GlassLayers
