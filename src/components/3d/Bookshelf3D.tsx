"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

interface ShelfBook {
  title: string;
  color: string;
}

function ShelfBookMesh({
  book,
  position,
}: {
  book: ShelfBook;
  position: [number, number, number];
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const targetY = hovered ? position[1] + 0.35 : position[1];
    ref.current.position.y += (targetY - ref.current.position.y) * Math.min(1, delta * 8);
    const targetZ = hovered ? position[2] + 0.5 : position[2];
    ref.current.position.z += (targetZ - ref.current.position.z) * Math.min(1, delta * 8);
    ref.current.rotation.y = hovered ? -0.4 : 0;
  });

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <RoundedBox args={[0.45, 1.4, 0.5]} radius={0.02} smoothness={3}>
        <meshStandardMaterial color={book.color} roughness={0.5} />
      </RoundedBox>
      <Text
        position={[0, 0, 0.26]}
        rotation={[0, 0, Math.PI / 2]}
        fontSize={0.08}
        maxWidth={1.2}
        color="#1a1a1a"
        anchorX="center"
        anchorY="middle"
      >
        {book.title}
      </Text>
    </group>
  );
}

export default function Bookshelf3D({ books }: { books: ShelfBook[] }) {
  const safe = Array.isArray(books) ? books : [];
  const palette = ["#ffd93d", "#ff6b6b", "#b8a9c9", "#9caf88", "#1a1a1a", "#f5ebd3"];
  const shelfY = -1;

  return (
    <group>
      {/* Shelf plank */}
      <mesh position={[0, shelfY - 0.05, 0]}>
        <boxGeometry args={[5, 0.2, 1.2]} />
        <meshStandardMaterial color="#9caf88" roughness={0.8} />
      </mesh>
      {safe.map((b, i) => (
        <ShelfBookMesh
          key={`${b.title}-${i}`}
          book={{ title: b.title, color: b.color ?? palette[i % palette.length] }}
          position={[-2 + i * 0.8, shelfY + 0.75, 0]}
        />
      ))}
    </group>
  );
}
