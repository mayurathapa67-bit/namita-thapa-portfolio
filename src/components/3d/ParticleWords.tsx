"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleWordsProps {
  text: string;
  color?: string;
  count?: number;
}

function sampleText(text: string, count: number): Float32Array {
  const canvas = document.createElement("canvas");
  const w = 256;
  const h = 96;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new Float32Array(count * 3);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 40px Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text.slice(0, 14), w / 2, h / 2);

  const data = ctx.getImageData(0, 0, w, h).data;
  const points: number[] = [];
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      const idx = (y * w + x) * 4;
      if (data[idx] > 128) points.push(x, y);
    }
  }
  const out = new Float32Array(count * 3);
  const pairCount = points.length / 2;
  for (let i = 0; i < count; i++) {
    let px: number = w / 2;
    let py: number = h / 2;
    if (pairCount > 0) {
      const pi = (i * 2) % points.length;
      px = points[pi];
      py = points[pi + 1];
    }
    out[i * 3] = (px / w - 0.5) * 8;
    out[i * 3 + 1] = -(py / h - 0.5) * 3;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
  }
  return out;
}

export default function ParticleWords({
  text,
  color = "#ff6b6b",
  count = 1400,
}: ParticleWordsProps) {
  const ref = useRef<THREE.Points>(null);

  const targets = useMemo(() => sampleText(text, count), [text, count]);

  useFrame((state) => {
    const pts = ref.current;
    if (!pts) return;
    pts.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[targets, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.05}
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
