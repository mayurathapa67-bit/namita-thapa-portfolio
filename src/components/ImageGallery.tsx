"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
}

export default function ImageGallery({ images }: { images: GalleryImage[] }) {
  const safe = Array.isArray(images) ? images : [];
  const [active, setActive] = useState<number | null>(null);

  if (safe.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {safe.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Open image ${i + 1}`}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl card-soft transition-transform hover:-translate-y-1"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>

      {active !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 p-6 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Close image"
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full glass text-2xl text-ink"
            onClick={() => setActive(null)}
          >
            ×
          </button>
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={safe[active].src}
              alt={safe[active].alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
