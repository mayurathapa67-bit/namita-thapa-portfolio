import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import PortfolioGallery from "@/components/PortfolioGallery";
import PortfolioBackdrop from "@/components/3d/PortfolioBackdrop";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "A 3D gallery of Namita Thapa's stories — fiction, poetry, creative non-fiction, and immersive narratives.",
};

export default async function PortfolioPage() {
  const content = await getContent();
  const items = Array.isArray(content.portfolio) ? content.portfolio : [];

  return (
    <div className="relative">
      <section className="relative overflow-hidden py-20">
        <PortfolioBackdrop />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-parchment/40 to-parchment" />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <p className="font-script text-2xl text-rose">The Collection</p>
            <h1 className="font-heading text-5xl font-bold text-ink sm:text-6xl">
              Stories, floating in space
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-story text-xl text-ink-soft">
              Each book is a world waiting to be opened. Hover to lift it; click
              to step inside.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <PortfolioGallery items={items} />
      </section>
    </div>
  );
}
