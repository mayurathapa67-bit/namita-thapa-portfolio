"use client";

import Scene from "@/components/3d/Scene";
import FloatingOrbs from "@/components/3d/FloatingOrbs";
import MagicParticles from "@/components/3d/MagicParticles";

export default function FloatingOrbsScene() {
  return (
    <Scene
      className="absolute inset-0 h-full w-full opacity-80"
      cameraPosition={[0, 0, 10]}
      fallback={null}
    >
      <ambientLight intensity={0.9} />
      <pointLight position={[4, 4, 5]} intensity={40} color="#ffd93d" />
      <pointLight position={[-5, -3, 3]} intensity={30} color="#ff6b6b" />
      <FloatingOrbs count={18} spread={8} />
      <MagicParticles count={80} color="#b8a9c9" spread={12} size={0.05} />
    </Scene>
  );
}
