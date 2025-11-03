"use client"

import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Mesh } from "three"

const BASE_SPEED = 0.5
const SPEED_INCREMENT = 0.1
const MAX_SPEED = 2.5
const DECAY_RATE = 0.35
const SMOOTHING = 6
const DECAY_GRACE_SECONDS = 0.15

const getTimeSeconds = () =>
  (typeof performance !== "undefined" ? performance.now() : Date.now()) / 1000

export default function RotatingBox() {
  const meshRef = useRef<Mesh>(null)
  const rotationSpeed = useRef(BASE_SPEED)
  const targetSpeed = useRef(BASE_SPEED)
  const lastInputTime = useRef(getTimeSeconds())

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space") return

      event.preventDefault()

      targetSpeed.current = Math.min(
        MAX_SPEED,
        targetSpeed.current + SPEED_INCREMENT
      )
      lastInputTime.current = getTimeSeconds()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useFrame((_, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    const now = getTimeSeconds()
    const secondsSinceInput = now - lastInputTime.current

    if (
      targetSpeed.current > BASE_SPEED &&
      secondsSinceInput > DECAY_GRACE_SECONDS
    ) {
      targetSpeed.current = Math.max(
        BASE_SPEED,
        targetSpeed.current - DECAY_RATE * delta
      )
    }

    const smoothingFactor = Math.min(delta * SMOOTHING, 1)
    rotationSpeed.current +=
      (targetSpeed.current - rotationSpeed.current) * smoothingFactor

    mesh.rotation.x += rotationSpeed.current * delta
    mesh.rotation.y += rotationSpeed.current * delta
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]}/>
      <meshPhysicalMaterial
        color="#3b82f6"
        metalness={1.0}
        roughness={0.1}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
      />
    </mesh>
  )
}
