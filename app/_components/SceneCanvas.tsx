"use client"

import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import RotatingBox from "./RotatingBox"

type SceneCanvasProps = {
  className?: string
}

export default function SceneCanvas({
  className = "h-screen w-full",
}: SceneCanvasProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Environment preset="city" />
        <RotatingBox />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}
