"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { PortfolioItem, StoryCategory } from "@/lib/types";

const FILTERS: ("All" | StoryCategory)[] = [
  "All",
  "Fiction",
  "Poetry",
  "Non-Fiction",
  "Immersive",
];

export default function PortfolioGallery({
  items,
}: {
  items: PortfolioItem[];
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [tilt, setTilt] = useState<Record<string, { x: number; y: number }>>({});

  const filtered = useMemo(() => {
    const safe = Array.isArray(items) ? items : [];
    return filter === "All"
      ? safe
      : safe.filter((i) => i.category === filter);
  }, [items, filter]);

  const onMove = (slug: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt((t) => ({ ...t, [slug]: { x: py * -8, y: px * 8 } }));
  };

  const onLeave = (slug: string) =>
    setTilt((t) => ({ ...t, [slug]: { x: 0, y: 0 } }));

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              filter === f
                ? "bg-gradient-to-r from-gold to-rose text-ink shadow-md"
                : "glass text-ink-soft hover:text-ink"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-8 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {filtered.map((item) => {
          const t = tilt[item.slug] ?? { x: 0, y: 0 };
          return (
            <Link
              key={item.slug}
              href={`/portfolio/${item.slug}`}
              onMouseMove={(e) => onMove(item.slug, e)}
              onMouseLeave={() => onLeave(item.slug)}
              className="group mb-8 block break-inside-avoid overflow-hidden rounded-[1.75rem] card-soft transition-transform"
              style={{
                transform: `perspective(900px) rotateX(${t.x}deg) rotateY(${t.y}deg)`,
                transition: "transform 0.15s ease-out",
              }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.cover_image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-parchment backdrop-blur">
                  {item.category}
                </span>
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/85 to-transparent p-5 pt-12 text-parchment transition-transform duration-300 group-hover:translate-y-0">
                  <span className="font-heading text-lg font-semibold">
                    Enter Story →
                  </span>
                </span>
              </div>
              <div className="p-6">
                <span className="text-xs uppercase tracking-widest text-rose">
                  {item.genre} · {item.read_time}
                </span>
                <h3 className="mt-1 font-heading text-2xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 font-story text-lg leading-relaxed text-ink-soft">
                  {item.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(Array.isArray(item.tags) ? item.tags : []).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-parchment-deep/70 px-3 py-1 text-xs text-ink-soft"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
