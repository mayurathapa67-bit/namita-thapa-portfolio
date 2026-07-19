"use client";

import Scene from "@/components/3d/Scene";
import PageTurnAnimation from "@/components/3d/PageTurnAnimation";

export default function StoryHero3D({
  title,
  excerpt,
}: {
  title: string;
  excerpt: string;
}) {
  return (
    <Scene
      className="h-[340px] w-full"
      cameraPosition={[0, 0.5, 7]}
      fallback={
        <div className="flex h-full w-full items-center justify-center rounded-3xl bg-gradient-to-br from-rose/20 to-lavender/20">
          <span className="font-heading text-2xl text-ink">{title}</span>
        </div>
      }
    >
      <ambientLight intensity={0.9} />
      <pointLight position={[3, 4, 5]} intensity={45} color="#ffd93d" />
      <pointLight position={[-4, -2, 2]} intensity={25} color="#ff6b6b" />
      <PageTurnAnimation title={title} excerpt={excerpt} />
    </Scene>
  );
}
