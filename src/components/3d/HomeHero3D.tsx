"use client";

import Scene from "@/components/3d/Scene";
import FloatingBooks from "@/components/3d/FloatingBooks";
import ParticleWords from "@/components/3d/ParticleWords";
import FloatingOrbs from "@/components/3d/FloatingOrbs";
import MagicParticles from "@/components/3d/MagicParticles";
import { OrbitControls } from "@react-three/drei";

export default function HomeHero3D({ tagline }: { tagline: string }) {
  return (
    <Scene
      className="absolute inset-0 -z-0 h-full w-full"
      cameraPosition={[0, 0, 9]}
      fallback={
        <div className="h-full w-full bg-gradient-to-br from-gold/20 via-rose/10 to-lavender/20" />
      }
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={50} color="#ffd93d" />
      <pointLight position={[-6, -3, -2]} intensity={30} color="#ff6b6b" />
      <pointLight position={[0, -4, 4]} intensity={20} color="#b8a9c9" />
      <ParticleWords text={tagline} color="#ff6b6b" count={1200} />
      <FloatingBooks titles={["Quiet Hours", "Monsoon", "Small Lights", "River", "Disappearing", "In-Between"]} />
      <FloatingOrbs count={16} spread={9} />
      <MagicParticles count={120} color="#ffd93d" spread={14} size={0.05} />
      <MagicParticles count={60} color="#b8a9c9" spread={12} size={0.04} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Scene>
  );
}
