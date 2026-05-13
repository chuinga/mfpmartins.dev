'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function InfinityKnot(): React.ReactNode {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.4
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
  })

  return (
    <group ref={groupRef} scale={0.55}>
      {/* Main torus knot — resembles the intertwined infinity shape */}
      <mesh>
        <torusKnotGeometry args={[0.7, 0.15, 128, 16, 2, 3]} />
        <meshStandardMaterial
          color="#5ABED6"
          metalness={0.8}
          roughness={0.15}
          emissive="#2F94BC"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Inner glow ring */}
      <mesh>
        <torusKnotGeometry args={[0.7, 0.08, 128, 8, 2, 3]} />
        <meshBasicMaterial color="#9ADAE5" transparent opacity={0.2} wireframe />
      </mesh>
    </group>
  )
}

export function AnimatedLogo(): React.ReactNode {
  return (
    <div className="w-12 h-12">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 2, 3]} intensity={1.2} color="#9ADAE5" />
          <pointLight position={[-2, -1, 2]} intensity={0.6} color="#20BDFF" />
          <InfinityKnot />
        </Suspense>
      </Canvas>
    </div>
  )
}
