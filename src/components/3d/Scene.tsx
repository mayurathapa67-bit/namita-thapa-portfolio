"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, type ReactNode } from "react";

interface SceneProps {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  className?: string;
  fallback?: ReactNode;
  enableOrbit?: boolean;
  dprMax?: number;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function Scene({
  children,
  cameraPosition = [0, 0, 8],
  className = "",
  fallback = null,
  dprMax = 1.5,
}: SceneProps) {
  const [allowed] = useState<boolean>(() => !prefersReducedMotion());

  if (allowed === false) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: cameraPosition, fov: 50 }}
        dpr={[1, dprMax]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop="always"
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
