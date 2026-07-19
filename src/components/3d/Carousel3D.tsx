"use client";

import { useRef, useState, useEffect } from "react";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface CarouselItem {
  label: string;
  sublabel?: string;
  color: string;
}

export default function Carousel3D({ items }: { items: CarouselItem[] }) {
  const safe = Array.isArray(items) ? items : [];
  const group = useRef<THREE.Group>(null);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      if (auto && group.current) {
        group.current.rotation.y -= (Math.PI * 2) / Math.max(safe.length, 1) / 30;
      }
    }, 33);
    return () => clearInterval(t);
  }, [auto, safe.length]);

  const radius = 3;

  return (
    <group
      onPointerOver={() => setAuto(false)}
      onPointerOut={() => setAuto(true)}
    >
      <group ref={group}>
        {safe.map((item, i) => {
          const angle = (i / Math.max(safe.length, 1)) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          return (
            <group key={`${item.label}-${i}`} position={[x, 0, z]} rotation={[0, -angle, 0]}>
              <RoundedBox args={[1.6, 2.2, 0.15]} radius={0.06} smoothness={4}>
                <meshStandardMaterial color={item.color} roughness={0.4} />
              </RoundedBox>
              <Text
                position={[0, 0.4, 0.09]}
                fontSize={0.18}
                color="#1a1a1a"
                anchorX="center"
                anchorY="middle"
                maxWidth={1.3}
                textAlign="center"
              >
                {item.label}
              </Text>
              {item.sublabel ? (
                <Text
                  position={[0, -0.4, 0.09]}
                  fontSize={0.1}
                  color="#4a443c"
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={1.3}
                  textAlign="center"
                >
                  {item.sublabel}
                </Text>
              ) : null}
            </group>
          );
        })}
      </group>
    </group>
  );
}
