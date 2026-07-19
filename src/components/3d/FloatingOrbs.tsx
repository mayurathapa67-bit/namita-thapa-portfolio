"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Orb {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
}

const PALETTE = ["#ffd93d", "#ff6b6b", "#b8a9c9", "#9caf88", "#ffb088"];

function Sphere({ orb }: { orb: Orb }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = orb.position[1] + Math.sin(t * orb.speed + orb.position[0]) * 0.6;
    ref.current.rotation.x += delta * 0.3;
    ref.current.rotation.y += delta * 0.2;
  });
  return (
    <mesh ref={ref} position={orb.position} scale={orb.scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={orb.color}
        roughness={0.25}
        metalness={0.1}
        emissive={orb.color}
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

export default function FloatingOrbs({
  count = 14,
  spread = 9,
}: {
  count?: number;
  spread?: number;
}) {
  const orbs = useMemo(() => {
    const hash = (n: number) => {
      const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = spread * (0.4 + hash(i + 1) * 0.6);
      return {
        position: [
          Math.cos(angle) * radius,
          (hash(i + 2) - 0.5) * spread,
          Math.sin(angle) * radius - 2,
        ] as [number, number, number],
        color: PALETTE[i % PALETTE.length],
        scale: 0.18 + hash(i + 3) * 0.4,
        speed: 0.3 + hash(i + 4) * 0.6,
      } satisfies Orb;
    });
  }, [count, spread]);

  return (
    <group>
      {orbs.map((o, i) => (
        <Sphere key={i} orb={o} />
      ))}
    </group>
  );
}
