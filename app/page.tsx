import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/lib/content";
import HomeHero3D from "@/components/3d/HomeHero3D";
import FloatingOrbsScene from "@/components/3d/FloatingOrbsScene";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import PullQuote from "@/components/PullQuote";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Icon from "@/components/Icon";
import type { PortfolioItem, StoryCategory } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Stories That Come Alive",
  description:
    "Namita Thapa — Immersive Storyteller & Creative Writer. Step into a magical library of fiction, poetry, and immersive narratives.",
};

const categoryIcons: Record<StoryCategory, string> = {
  Fiction: "book",
  Poetry: "feather",
  "Non-Fiction": "edit",
  Immersive: "sparkles",
};

export default async function HomePage() {
  const content = await getContent();
  const hero = content.hero;
  const portfolio = Array.isArray(content.portfolio) ? content.portfolio : [];
  const featured = portfolio.slice(0, 3);
  const categories: { label: string; blurb: string; iconKey: StoryCategory }[] = [
    { label: "Fiction & Novels", blurb: "Worlds built one honest sentence at a time.", iconKey: "Fiction" },
    { label: "Poetry & Prose", blurb: "The music underneath ordinary moments.", iconKey: "Poetry" },
    { label: "Creative Non-Fiction", blurb: "True stories, told like they matter — because they do.", iconKey: "Non-Fiction" },
    { label: "Immersive Narratives", blurb: "Stories you step inside rather than simply read.", iconKey: "Immersive" },
  ];

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <HomeHero3D tagline={hero.tagline} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-parchment/30 via-parchment/10 to-parchment" />
        <div className="relative z-10 mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
          <Reveal>
            <p className="font-script mb-3 text-2xl text-rose sm:text-3xl">
              {hero.eyebrow ?? hero.role}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-heading text-5xl font-bold leading-[1.05] text-ink sm:text-7xl">
              {hero.tagline.split(" ").map((w, i) =>
                i === 1 ? (
                  <span key={i} className="gradient-text">
                    {w}{" "}
                  </span>
                ) : (
                  <span key={i}>{w} </span>
                ),
              )}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl font-story text-xl leading-relaxed text-ink-soft sm:text-2xl">
              {hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href="/portfolio" variant="primary">
                {hero.cta_primary} →
              </MagneticButton>
              <MagneticButton href="/contact" variant="ghost">
                {hero.cta_secondary}
              </MagneticButton>
            </div>
          </Reveal>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-ink-soft">
          ↓
        </div>
      </section>

      {/* FEATURED STORIES */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="font-script text-xl text-rose">Featured Stories</p>
            <h2 className="font-heading text-4xl font-bold text-ink sm:text-5xl">
              A few doors worth opening
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {featured.map((item: PortfolioItem, i) => (
            <Reveal key={item.slug} delay={i * 0.1}>
              <Link
                href={`/portfolio/${item.slug}`}
                className="group block overflow-hidden rounded-[1.75rem] card-soft transition-transform hover:-translate-y-2"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.cover_image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-parchment backdrop-blur">
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-story text-lg leading-relaxed text-ink-soft">
                    {item.excerpt}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-rose">
                    Enter story →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <MagneticButton href="/portfolio" variant="ghost">
            View the full collection
          </MagneticButton>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 md:grid-cols-2">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] card-soft">
              <Image
                src={content.about.image}
                alt="Namita Thapa"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              <p className="font-script text-xl text-rose">{content.about.headline}</p>
              <h2 className="font-heading text-4xl font-bold text-ink sm:text-5xl">
                A writer between two homes
              </h2>
              <p className="mt-5 max-w-lg font-story text-xl leading-relaxed text-ink-soft">
                {content.about.bio.split("\n\n")[0]}
              </p>
              <PullQuote
                quote={content.about.philosophy}
                className="mt-8 text-left"
              />
              <div className="mt-8">
                <MagneticButton href="/about" variant="primary">
                  Read my story
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WRITING CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="font-script text-xl text-rose">What I write</p>
            <h2 className="font-heading text-4xl font-bold text-ink sm:text-5xl">
              Four ways into a world
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(Array.isArray(categories) ? categories : []).map((cat, i) => (
            <Reveal key={cat.label} delay={i * 0.08}>
              <div className="group h-full rounded-[1.5rem] card-soft p-7 transition-transform hover:-translate-y-1.5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-rose text-ink">
                  <Icon name={categoryIcons[cat.iconKey] ?? "star"} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink">
                  {cat.label}
                </h3>
                <p className="mt-2 font-story text-lg leading-relaxed text-ink-soft">
                  {cat.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-20">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <Reveal>
            <p className="font-script text-xl text-rose">Kind words</p>
            <h2 className="font-heading text-4xl font-bold text-ink sm:text-5xl">
              Readers &amp; collaborators
            </h2>
          </Reveal>
          <div className="mt-12">
            <TestimonialCarousel items={content.testimonials} />
          </div>
        </div>
      </section>

      {/* FLOATING ORBS BAND */}
      <section className="relative my-8 h-[300px] overflow-hidden rounded-[2.5rem] card-soft">
        <FloatingOrbsScene />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="font-script px-6 text-center text-3xl text-ink drop-shadow-sm sm:text-4xl">
            where every word is a little spark of light
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
        <Reveal>
          <h2 className="font-heading text-4xl font-bold text-ink sm:text-5xl">
            Have a story that needs telling?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-story text-xl text-ink-soft">
            I&apos;m currently accepting new stories and collaborations.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton href="/contact" variant="primary">
              Let&apos;s create together
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
