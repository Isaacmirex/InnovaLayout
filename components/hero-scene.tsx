"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Environment, Stars, MeshWobbleMaterial } from "@react-three/drei"
import { useRef, Suspense } from "react"
import type { Mesh, Group } from "three"

const C = {
  bg:      "#0B0F1E",
  navy:    "#111827",
  crimson: "#8B1A2A",
  crimson2:"#C13344",
  muted:   "#8090B0",
  bright:  "#C84050",
}

function FloatingCube({ position, scale, speed = 1, color = C.crimson }: {
  position: [number, number, number]; scale: number; speed?: number; color?: string
}) {
  const meshRef = useRef<Mesh>(null)
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.3 * speed
      meshRef.current.rotation.y = clock.elapsedTime * 0.2 * speed
    }
  })
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Box ref={meshRef} args={[1, 1, 1]} position={position} scale={scale}>
        <meshStandardMaterial color={color} wireframe transparent opacity={0.5} />
      </Box>
    </Float>
  )
}

function FloatingTorus({ position, scale, color = C.muted }: {
  position: [number, number, number]; scale: number; color?: string
}) {
  const meshRef = useRef<Mesh>(null)
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.4
      meshRef.current.rotation.z = clock.elapsedTime * 0.2
    }
  })
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <Torus ref={meshRef} args={[1, 0.3, 16, 64]} position={position} scale={scale}>
        <meshStandardMaterial color={color} wireframe transparent opacity={0.4} />
      </Torus>
    </Float>
  )
}

function CrimsonOrb({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null)
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.3
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.2
    }
  })
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[0.35, 32, 32]} position={position}>
        <MeshWobbleMaterial color={C.crimson2} factor={0.3} speed={2} metalness={0.9} roughness={0.1} />
      </Sphere>
    </Float>
  )
}

function MainSphere() {
  const meshRef = useRef<Mesh>(null)
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.12
      meshRef.current.rotation.x = clock.elapsedTime * 0.05
    }
  })
  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.4}>
      <Sphere ref={meshRef} args={[1.8, 128, 128]} position={[0, 0, 0]}>
        <MeshDistortMaterial color={C.crimson} distort={0.35} speed={2.5} roughness={0.2} metalness={0.8} />
      </Sphere>
    </Float>
  )
}

function Rings() {
  const innerRef = useRef<Group>(null)
  const outerRef = useRef<Group>(null)
  useFrame(({ clock }) => {
    if (innerRef.current) { innerRef.current.rotation.y = clock.elapsedTime * 0.15; innerRef.current.rotation.z = clock.elapsedTime * 0.08 }
    if (outerRef.current) { outerRef.current.rotation.y = -clock.elapsedTime * 0.08; outerRef.current.rotation.x = clock.elapsedTime * 0.06 }
  })
  return (
    <>
      <group ref={innerRef}>
        <Torus args={[2.5, 0.02, 8, 120]}>
          <meshStandardMaterial color={C.crimson} transparent opacity={0.35} />
        </Torus>
      </group>
      <group ref={outerRef}>
        <Torus args={[3.5, 0.015, 8, 120]}>
          <meshStandardMaterial color={C.muted} transparent opacity={0.2} />
        </Torus>
      </group>
    </>
  )
}

function GridNetwork() {
  const groupRef = useRef<Group>(null)
  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.elapsedTime * 0.04
  })
  return (
    <group ref={groupRef}>
      {[...Array(16)].map((_, i) => {
        const angle = (i / 16) * Math.PI * 2
        const r = 3.2; const x = Math.cos(angle) * r; const z = Math.sin(angle) * r
        const isCrimson = i % 4 === 0
        return (
          <Float key={i} speed={0.4 + i * 0.05} floatIntensity={0.25}>
            <Box args={[0.04, 0.04, 1.8]} position={[x * 0.5, Math.sin(i * 0.8) * 0.4, z * 0.5]} rotation={[0, angle, Math.PI / 4]}>
              <meshStandardMaterial color={isCrimson ? C.crimson2 : C.crimson} transparent opacity={isCrimson ? 0.65 : 0.3} />
            </Box>
          </Float>
        )
      })}
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color={C.crimson} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={C.navy} />
      <pointLight position={[5, -5, 5]} intensity={0.6} color={C.crimson2} />
      <spotLight position={[0, 12, 0]} angle={0.25} penumbra={1} intensity={0.8} color={C.muted} />
      <Stars radius={80} depth={50} count={2500} factor={3} saturation={0.1} fade speed={0.4} />
      <MainSphere />
      <Rings />
      <GridNetwork />
      <FloatingCube position={[-4, 1.8, -2.5]} scale={0.35} speed={0.8} color={C.crimson} />
      <FloatingCube position={[4, -1.2, -1.5]} scale={0.28} speed={1.1} color={C.muted} />
      <FloatingCube position={[-2.5, -2, 1.5]} scale={0.22} speed={0.65} color={C.navy} />
      <FloatingCube position={[2.5, 2.5, -3.5]} scale={0.32} speed={0.9} color={C.crimson} />
      <FloatingTorus position={[4.5, 0.5, -2.5]} scale={0.28} color={C.muted} />
      <FloatingTorus position={[-4.5, -0.8, -1.5]} scale={0.22} color={C.crimson} />
      <CrimsonOrb position={[3, 2.5, -1]} />
      <CrimsonOrb position={[-3.5, -2, 0.5]} />
      <Environment preset="night" />
    </>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 9], fov: 42 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <Suspense fallback={null}><Scene /></Suspense>
      </Canvas>
    </div>
  )
}
