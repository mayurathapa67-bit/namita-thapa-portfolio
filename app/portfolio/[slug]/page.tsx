import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent, getPortfolioItem } from "@/lib/content";
import StoryHero3D from "@/components/3d/StoryHero3D";
import ReadingProgress from "@/components/ReadingProgress";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioItem(slug);
  if (!item) return { title: "Story not found" };
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: [{ url: item.cover_image }],
    },
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const item = await getPortfolioItem(slug);
  if (!item) notFound();

  const content = await getContent();
  const all = Array.isArray(content.portfolio) ? content.portfolio : [];
  const related = all.filter((p) => p.slug !== slug).slice(0, 3);
  const paragraphs = item.content
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
  const chapters = paragraphs.map((p, i) => ({
    id: `chapter-${i + 1}`,
    label: i === 0 ? "Opening" : `Passage ${i + 1}`,
    text: p,
  }));

  return (
    <div className="relative">
      <ReadingProgress />

      <section className="mx-auto max-w-5xl px-5 pt-12 sm:px-8">
        <Reveal>
          <Link
            href="/portfolio"
            className="text-sm font-medium text-ink-soft transition-colors hover:text-rose"
          >
            ← Back to the collection
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
            <span className="rounded-full bg-ink/70 px-3 py-1 font-medium text-parchment">
              {item.category}
            </span>
            <span>{item.genre}</span>
            <span>·</span>
            <span>{item.published_date}</span>
            <span>·</span>
            <span>{item.read_time} read</span>
          </div>
          <h1 className="mt-4 font-heading text-5xl font-bold leading-tight text-ink sm:text-6xl">
            {item.title}
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <StoryHero3D title={item.title} excerpt={item.excerpt} />
      </section>

      {/* Layout: sticky chapter nav + story */}
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-[200px_1fr]">
        <aside className="hidden lg:block">
          <nav
            aria-label="Chapters"
            className="sticky top-28 space-y-2 text-sm"
          >
            <p className="font-heading text-xs uppercase tracking-widest text-ink-soft">
              Chapters
            </p>
            {chapters.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="block text-ink-soft transition-colors hover:text-rose"
              >
                {c.label}
              </a>
            ))}
          </nav>
        </aside>

        <article className="mx-auto max-w-2xl">
          <p className="font-story text-2xl italic leading-relaxed text-ink-soft sm:text-3xl">
            {item.excerpt}
          </p>
          <div className="mt-8 space-y-8">
            {chapters.map((c, i) => (
              <section key={c.id} id={c.id} className="scroll-mt-28">
                <p className="font-story text-xl leading-[1.9] text-ink sm:text-2xl">
                  {c.text}
                </p>
                {i === Math.floor(chapters.length / 2) ? (
                  <blockquote className="my-10 border-l-4 border-rose/60 pl-6 font-script text-3xl text-ink">
                    “Every story is a door to another world.”
                  </blockquote>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-2">
            {(Array.isArray(item.tags) ? item.tags : []).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-parchment-deep/70 px-3 py-1 text-sm text-ink-soft"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-12 rounded-[1.75rem] card-soft p-8 text-center">
            <p className="font-heading text-xl text-ink">
              Loved this story? Let&apos;s write your own.
            </p>
            <div className="mt-5 flex justify-center">
              <MagneticButton href="/contact" variant="primary">
                Start a conversation
              </MagneticButton>
            </div>
          </div>
        </article>
      </div>

      {/* RELATED */}
      {related.length > 0 ? (
        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
          <Reveal>
            <div className="mb-10 text-center">
              <p className="font-script text-xl text-rose">Keep reading</p>
              <h2 className="font-heading text-4xl font-bold text-ink sm:text-5xl">
                More from the collection
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.1}>
                <Link
                  href={`/portfolio/${r.slug}`}
                  className="group block overflow-hidden rounded-[1.75rem] card-soft transition-transform hover:-translate-y-2"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={r.cover_image}
                      alt={r.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-2xl font-semibold text-ink">
                      {r.title}
                    </h3>
                    <p className="mt-2 font-story text-lg text-ink-soft">
                      {r.excerpt}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
