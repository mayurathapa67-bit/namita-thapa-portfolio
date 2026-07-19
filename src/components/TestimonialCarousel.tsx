"use client";

import { useState, useCallback } from "react";
import type { Testimonial } from "@/lib/types";
import Image from "next/image";

export default function TestimonialCarousel({
  items,
}: {
  items: Testimonial[];
}) {
  const safe = Array.isArray(items) ? items : [];
  const [index, setIndex] = useState(0);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % Math.max(safe.length, 1)),
    [safe.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + safe.length) % Math.max(safe.length, 1)),
    [safe.length],
  );

  if (safe.length === 0) return null;
  const current = safe[index];

  return (
    <div
      className="relative mx-auto max-w-3xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="Reader testimonials"
    >
      <div className="relative min-h-[260px] overflow-hidden rounded-[2rem] card-soft p-8 sm:p-12">
        <div
          key={index}
          className="flex flex-col items-center text-center animate-[fadeIn_0.6s_ease]"
        >
          <div className="relative mb-5 h-16 w-16 overflow-hidden rounded-full ring-2 ring-gold/50">
            <Image
              src={current.avatar}
              alt={current.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <p className="font-story text-xl italic leading-relaxed text-ink sm:text-2xl">
            “{current.quote}”
          </p>
          <p className="mt-5 font-heading text-base font-semibold text-ink">
            {current.name}
          </p>
          <p className="text-sm text-ink-soft">{current.role}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full glass text-ink transition hover:scale-105"
        >
          ‹
        </button>
        <div className="flex gap-2">
          {safe.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-gradient-to-r from-gold to-rose"
                  : "w-2 bg-ink/20"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="Next testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full glass text-ink transition hover:scale-105"
        >
          ›
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
