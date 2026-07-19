"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface PageTurnAnimationProps {
  title: string;
  excerpt: string;
}

export default function PageTurnAnimation({
  title,
  excerpt,
}: PageTurnAnimationProps) {
  const cover = useRef<THREE.Group>(null);
  const page = useRef<THREE.Group>(null);
  const [open, setOpen] = useState(false);
  const [flip, setFlip] = useState(false);

  useFrame((_, delta) => {
    if (cover.current) {
      const target = open ? -Math.PI / 2 : 0;
      cover.current.rotation.y += (target - cover.current.rotation.y) * Math.min(1, delta * 5);
    }
    if (page.current) {
      const target = flip ? -Math.PI : 0;
      page.current.rotation.y += (target - page.current.rotation.y) * Math.min(1, delta * 5);
    }
  });

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
      onClick={() => {
        setOpen(true);
        setFlip((f) => !f);
      }}
    >
      {/* Book base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 0.3, 3.2]} />
        <meshStandardMaterial color="#f5ebd3" roughness={0.7} />
      </mesh>
      {/* Cover */}
      <group ref={cover} position={[-1.2, 0.16, 0]}>
        <mesh position={[1.2, 0, 0]}>
          <boxGeometry args={[2.4, 0.08, 3.2]} />
          <meshStandardMaterial color="#ff6b6b" roughness={0.4} />
        </mesh>
        <Text
          position={[1.2, 0.05, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          fontSize={0.22}
          color="#1a1a1a"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
        >
          {title}
        </Text>
      </group>
      {/* Turning page */}
      <group ref={page} position={[-1.2, 0.2, 0]}>
        <mesh position={[1.2, 0, -1.6]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.4, 3.2]} />
          <meshStandardMaterial
            color="#fdf6e3"
            side={THREE.DoubleSide}
            roughness={0.9}
          />
        </mesh>
        <Text
          position={[1.2, 0.01, -1.6]}
          rotation={[Math.PI / 2, 0, 0]}
          fontSize={0.12}
          color="#4a443c"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
        >
          {excerpt.slice(0, 90)}
        </Text>
      </group>
    </group>
  );
}
