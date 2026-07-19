"use client";

import Scene from "@/components/3d/Scene";
import FloatingText3D from "@/components/3d/FloatingText3D";
import MagicParticles from "@/components/3d/MagicParticles";

export default function JourneyScene({ years }: { years: string[] }) {
  const safe = Array.isArray(years) ? years : [];
  return (
    <Scene
      className="h-[300px] w-full"
      cameraPosition={[0, 1, 9]}
      fallback={<div className="h-full w-full rounded-3xl bg-gradient-to-br from-gold/20 to-lavender/20" />}
    >
      <ambientLight intensity={0.9} />
      <pointLight position={[3, 4, 5]} intensity={50} color="#ff6b6b" />
      {safe.map((y, i) => (
        <FloatingText3D
          key={`${y}-${i}`}
          text={y}
          color="#1a1a1a"
          size={0.7}
          position={[(i - (safe.length - 1) / 2) * 2.4, 0, 0]}
        />
      ))}
      <MagicParticles count={60} color="#ffd93d" spread={14} size={0.04} />
    </Scene>
  );
}
