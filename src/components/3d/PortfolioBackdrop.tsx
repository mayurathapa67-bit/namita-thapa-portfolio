"use client";

import Scene from "@/components/3d/Scene";
import MagicParticles from "@/components/3d/MagicParticles";

export default function PortfolioBackdrop() {
  return (
    <Scene
      className="absolute inset-0 -z-0 h-full w-full opacity-60"
      cameraPosition={[0, 0, 10]}
      fallback={null}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={40} color="#ffd93d" />
      <MagicParticles count={90} color="#ff6b6b" spread={14} size={0.05} />
      <MagicParticles count={60} color="#b8a9c9" spread={12} size={0.04} />
    </Scene>
  );
}
