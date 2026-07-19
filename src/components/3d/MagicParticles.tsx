"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MagicParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  spread?: number;
}

export default function MagicParticles({
  count = 80,
  color = "#ffd93d",
  size = 0.06,
  spread = 6,
}: MagicParticlesProps) {
  const ref = useRef<THREE.Points>(null);

  /* eslint-disable react-hooks/purity */
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    return arr;
  }, [count, spread]);

  const speeds = useMemo(
    () => Float32Array.from({ length: count }, () => 0.2 + Math.random() * 0.6),
    [count],
  );
  /* eslint-enable react-hooks/purity */

  useFrame((_, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const pos = pts.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const yi = i * 3 + 1;
      let y = pos.getY(yi) + speeds[i] * delta * 0.3;
      if (y > spread / 2) y = -spread / 2;
      pos.setY(yi, y);
    }
    pos.needsUpdate = true;
    pts.rotation.y += delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
