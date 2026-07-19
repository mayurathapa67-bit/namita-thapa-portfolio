"use client";

import Scene from "@/components/3d/Scene";
import Carousel3D from "@/components/3d/Carousel3D";
import { OrbitControls } from "@react-three/drei";

export default function Services3D({
  items,
}: {
  items: { label: string; sublabel?: string; color: string }[];
}) {
  const safe = Array.isArray(items) ? items : [];
  return (
    <Scene
      className="h-[320px] w-full"
      cameraPosition={[0, 0, 8]}
      fallback={<div className="h-full w-full rounded-3xl bg-gradient-to-br from-gold/20 to-lavender/20" />}
    >
      <ambientLight intensity={0.9} />
      <pointLight position={[4, 5, 4]} intensity={45} color="#ffd93d" />
      <pointLight position={[-4, -2, 3]} intensity={25} color="#ff6b6b" />
      <Carousel3D items={safe} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Scene>
  );
}
