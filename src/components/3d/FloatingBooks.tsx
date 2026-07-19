"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface FloatingBookProps {
  title: string;
  position: [number, number, number];
  color?: string;
  rotation?: number;
}

function Book({
  title,
  position,
  color = "#ff6b6b",
  rotation = 0,
}: FloatingBookProps) {
  const group = useRef<THREE.Group>(null);
  const cover = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y =
      position[1] + Math.sin(t * 0.8 + position[0]) * 0.12;
    group.current.rotation.y = rotation + Math.sin(t * 0.3 + position[1]) * 0.1;
    if (cover.current) {
      const target = hovered ? -Math.PI / 2.1 : 0;
      cover.current.rotation.y += (target - cover.current.rotation.y) * Math.min(1, delta * 6);
    }
  });

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Pages block */}
      <RoundedBox args={[1.1, 1.5, 0.22]} radius={0.02} smoothness={3}>
        <meshStandardMaterial color="#fdf6e3" />
      </RoundedBox>
      {/* Inner page line hint */}
      <mesh position={[0, 0, 0.12]}>
        <planeGeometry args={[1, 1.35]} />
        <meshStandardMaterial color="#f5ebd3" />
      </mesh>
      {/* Cover that opens */}
      <group ref={cover} position={[0, 0, 0.115]}>
        <RoundedBox
          args={[1.12, 1.54, 0.04]}
          radius={0.02}
          smoothness={3}
          position={[0.56, 0, 0]}
        >
          <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
        </RoundedBox>
        <Text
          position={[0.56, 0, 0.03]}
          rotation={[0, 0, 0]}
          fontSize={0.12}
          maxWidth={0.9}
          textAlign="center"
          color="#1a1a1a"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
      </group>
    </group>
  );
}

interface FloatingBooksProps {
  titles: string[];
}

export default function FloatingBooks({ titles }: FloatingBooksProps) {
  const safe = Array.isArray(titles) ? titles : [];
  const palette = ["#ffd93d", "#ff6b6b", "#b8a9c9", "#9caf88"];
  const layout = safe.slice(0, 6).map((title, i) => {
    const angle = (i / Math.max(safe.length, 1)) * Math.PI * 2;
    const radius = 2.4;
    return {
      title,
      position: [Math.cos(angle) * radius, (i % 2 === 0 ? 0.3 : -0.3), Math.sin(angle) * radius] as [number, number, number],
      color: palette[i % palette.length],
      rotation: angle + Math.PI / 2,
    };
  });

  return (
    <group>
      {layout.map((b, i) => (
        <Book key={`${b.title}-${i}`} {...b} />
      ))}
    </group>
  );
}
