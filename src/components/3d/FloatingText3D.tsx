"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface FloatingText3DProps {
  text: string;
  color?: string;
  size?: number;
  position?: [number, number, number];
}

export default function FloatingText3D({
  text,
  color = "#1a1a1a",
  size = 0.6,
  position = [0, 0, 0],
}: FloatingText3DProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.1;
    ref.current.rotation.y = Math.sin(t * 0.25) * 0.12;
    ref.current.rotation.z = Math.sin(t * 0.2) * 0.03;
  });

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={size}
        color={color}
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
        textAlign="center"
        outlineWidth={0.01}
        outlineColor="#ffd93d"
      >
        {text}
      </Text>
    </group>
  );
}
