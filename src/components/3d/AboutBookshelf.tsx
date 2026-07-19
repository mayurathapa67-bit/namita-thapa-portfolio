"use client";

import Scene from "@/components/3d/Scene";
import Bookshelf3D from "@/components/3d/Bookshelf3D";
import { OrbitControls } from "@react-three/drei";

export default function AboutBookshelf({ books }: { books: { title: string; color?: string }[] }) {
  const palette = ["#ffd93d", "#ff6b6b", "#b8a9c9", "#9caf88", "#1a1a1a", "#f5ebd3"];
  const mapped = (Array.isArray(books) ? books : []).map((b, i) => ({
    title: b.title,
    color: b.color ?? palette[i % palette.length],
  }));
  return (
    <Scene
      className="h-[360px] w-full"
      cameraPosition={[0, 0, 7]}
      fallback={<div className="h-full w-full rounded-3xl bg-gradient-to-br from-sage/30 to-lavender/20" />}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[4, 5, 4]} intensity={45} color="#ffd93d" />
      <Bookshelf3D books={mapped} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </Scene>
  );
}
