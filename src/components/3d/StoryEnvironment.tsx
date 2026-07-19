"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import MagicParticles from "./MagicParticles";

interface StoryEnvironmentProps {
  variant?: "library" | "forest" | "ocean";
}

const tints: Record<string, string> = {
  library: "#ffd93d",
  forest: "#9caf88",
  ocean: "#b8a9c9",
};

export default function StoryEnvironment({
  variant = "library",
}: StoryEnvironmentProps) {
  const group = useRef<THREE.Group>(null);
  const color = tints[variant] ?? tints.library;

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 5, 4]} intensity={40} color={color} />
      <pointLight position={[-5, -2, -3]} intensity={20} color="#ff6b6b" />
      <MagicParticles count={120} color={color} spread={12} size={0.05} />
      <MagicParticles count={60} color="#ff6b6b" spread={10} size={0.04} />
    </group>
  );
}
