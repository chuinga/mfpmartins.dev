'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function LogoGeometry(): React.ReactNode {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    // Slow continuous rotation
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    // Subtle floating
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05
  })

  // Create an "M" shape using line segments — inspired by the legacy geometric logo
  const mShape = new THREE.Shape()
  // Outer M path
  mShape.moveTo(-0.8, -0.8)
  mShape.lineTo(-0.8, 0.8)
  mShape.lineTo(-0.3, 0.2)
  mShape.lineTo(0, 0.8)
  mShape.lineTo(0.3, 0.2)
  mShape.lineTo(0.8, 0.8)
  mShape.lineTo(0.8, -0.8)
  mShape.lineTo(0.5, -0.8)
  mShape.lineTo(0.5, 0.2)
  mShape.lineTo(0.3, -0.1)
  mShape.lineTo(0, 0.4)
  mShape.lineTo(-0.3, -0.1)
  mShape.lineTo(-0.5, 0.2)
  mShape.lineTo(-0.5, -0.8)
  mShape.closePath()

  return (
    <group ref={groupRef}>
      {/* Main M shape */}
      <mesh>
        <extrudeGeometry
          args={[
            mShape,
            {
              depth: 0.15,
              bevelEnabled: true,
              bevelThickness: 0.02,
              bevelSize: 0.02,
              bevelSegments: 3,
            },
          ]}
        />
        <meshStandardMaterial
          color="#9ADAE5"
          metalness={0.6}
          roughness={0.3}
          emissive="#2F94BC"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Wireframe overlay for geometric effect */}
      <mesh>
        <extrudeGeometry
          args={[
            mShape,
            {
              depth: 0.15,
              bevelEnabled: true,
              bevelThickness: 0.02,
              bevelSize: 0.02,
              bevelSegments: 3,
            },
          ]}
        />
        <meshBasicMaterial color="#20BDFF" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

export function AnimatedLogo(): React.ReactNode {
  return (
    <div className="w-12 h-12">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[2, 2, 2]} intensity={1} color="#9ADAE5" />
          <pointLight position={[-2, -1, 1]} intensity={0.5} color="#5433FF" />
          <LogoGeometry />
        </Suspense>
      </Canvas>
    </div>
  )
}
