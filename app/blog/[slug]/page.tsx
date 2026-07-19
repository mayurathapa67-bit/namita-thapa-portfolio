import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getContent } from "@/lib/content";
import ReadingProgress from "@/components/ReadingProgress";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.featured_image }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const content = await getContent();
  const all = Array.isArray(content.blog) ? content.blog : [];
  const related = all.filter((p) => p.slug !== slug).slice(0, 2);
  const paragraphs = post.content
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="relative">
      <ReadingProgress />
      <article className="mx-auto max-w-3xl px-5 pt-12 sm:px-8">
        <Reveal>
          <Link
            href="/blog"
            className="text-sm font-medium text-ink-soft transition-colors hover:text-rose"
          >
            ← Back to musings
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
            <span className="rounded-full bg-ink/70 px-3 py-1 font-medium text-parchment">
              {post.category}
            </span>
            <span>{post.published_date}</span>
            <span>·</span>
            <span>{post.read_time} read</span>
          </div>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-ink sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 font-story text-2xl italic leading-relaxed text-ink-soft">
            {post.excerpt}
          </p>
        </Reveal>
      </article>

      <div className="relative mx-auto mt-10 max-w-4xl px-5 sm:px-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] card-soft">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <article className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
        <div className="space-y-8">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="font-story text-xl leading-[1.9] text-ink sm:text-2xl"
            >
              {p}
            </p>
          ))}
        </div>

        <div className="mt-12 rounded-[1.75rem] card-soft p-8 text-center">
          <p className="font-script text-2xl text-rose">Enjoyed this?</p>
          <p className="mt-2 font-heading text-xl text-ink">
            Let&apos;s write something together.
          </p>
          <div className="mt-5 flex justify-center">
            <MagneticButton href="/contact" variant="primary">
              Start a conversation
            </MagneticButton>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
          <Reveal>
            <div className="mb-10 text-center">
              <p className="font-script text-xl text-rose">Keep reading</p>
              <h2 className="font-heading text-3xl font-bold text-ink sm:text-4xl">
                More musings
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.1}>
                <Link
                  href={`/blog/${r.slug}`}
                  className="group block overflow-hidden rounded-[1.75rem] card-soft transition-transform hover:-translate-y-2"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={r.featured_image}
                      alt={r.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs uppercase tracking-widest text-rose">
                      {r.category}
                    </span>
                    <h3 className="mt-1 font-heading text-2xl font-semibold text-ink">
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
