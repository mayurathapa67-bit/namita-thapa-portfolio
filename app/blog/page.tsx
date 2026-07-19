import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/lib/content";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Thoughts & Musings",
  description:
    "Essays on writing, creativity, storytelling, and life by Namita Thapa.",
};

export default async function BlogPage() {
  const content = await getContent();
  const posts = Array.isArray(content.blog) ? content.blog : [];
  const categories = Array.from(
    new Set(posts.map((p) => p.category).filter(Boolean)),
  );
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="relative">
      <section className="mx-auto max-w-4xl px-5 pb-8 pt-16 text-center sm:px-8">
        <Reveal>
          <p className="font-script text-2xl text-rose">Thoughts &amp; Musings</p>
          <h1 className="font-heading text-5xl font-bold text-ink sm:text-6xl">
            From the writing desk
          </h1>
        </Reveal>
      </section>

      {categories.length > 0 ? (
        <div className="mx-auto mb-10 flex max-w-5xl flex-wrap justify-center gap-3 px-5 sm:px-8">
          {categories.map((c) => (
            <span
              key={c}
              className="rounded-full glass px-4 py-2 text-sm text-ink-soft"
            >
              {c}
            </span>
          ))}
        </div>
      ) : null}

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        {featured ? (
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group mb-12 grid overflow-hidden rounded-[2rem] card-soft md:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
                <Image
                  src={featured.featured_image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <span className="text-xs uppercase tracking-widest text-rose">
                  {featured.category} · {featured.read_time}
                </span>
                <h2 className="mt-2 font-heading text-3xl font-bold text-ink sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-3 font-story text-xl leading-relaxed text-ink-soft">
                  {featured.excerpt}
                </p>
                <span className="mt-5 inline-block text-sm font-medium text-rose">
                  Read →
                </span>
              </div>
            </Link>
          </Reveal>
        ) : null}

        <div className="columns-1 gap-8 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="group mb-8 block break-inside-avoid overflow-hidden rounded-[1.75rem] card-soft transition-transform hover:-translate-y-1.5"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs uppercase tracking-widest text-rose">
                    {post.category} · {post.read_time}
                  </span>
                  <h3 className="mt-1 font-heading text-2xl font-semibold text-ink">
                    {post.title}
                  </h3>
                  <p className="mt-2 font-story text-lg leading-relaxed text-ink-soft">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <MagneticButton href="/contact" variant="ghost">
            Suggest a topic
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
