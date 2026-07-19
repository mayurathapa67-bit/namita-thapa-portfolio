import type { Metadata } from "next";
import Image from "next/image";
import { getContent } from "@/lib/content";
import Reveal from "@/components/Reveal";
import PullQuote from "@/components/PullQuote";
import Icon from "@/components/Icon";
import AboutBookshelf from "@/components/3d/AboutBookshelf";
import JourneyScene from "@/components/3d/JourneyScene";
import MagneticButton from "@/components/MagneticButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Story",
  description:
    "The storyteller's journey — a writer between Perth and Kathmandu, crafting fiction, poetry, and immersive narratives.",
};

const hobbyIcons: Record<string, string> = {
  Reading: "book",
  Travel: "compass",
  Nature: "leaf",
  Coffee: "cup",
};

export default async function AboutPage() {
  const content = await getContent();
  const about = content.about;
  const journey = Array.isArray(about.journey) ? about.journey : [];
  const expertise = Array.isArray(about.expertise) ? about.expertise : [];
  const works = Array.isArray(about.published_works) ? about.published_works : [];
  const hobbies = about.personal?.hobbies ?? [];

  return (
    <div className="relative">
      {/* HERO */}
      <section className="mx-auto max-w-4xl px-5 pb-10 pt-16 text-center sm:px-8">
        <Reveal>
          <p className="font-script text-2xl text-rose">The Storyteller&apos;s Journey</p>
          <h1 className="font-heading text-5xl font-bold text-ink sm:text-6xl">
            {about.headline}
          </h1>
        </Reveal>
      </section>

      {/* BIO + PORTRAIT */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 md:grid-cols-2">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] card-soft">
            <Image
              src={about.image}
              alt="Namita Thapa"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="space-y-4">
            {about.bio.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="font-story text-xl leading-relaxed text-ink-soft"
              >
                {para}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* PHILOSOPHY */}
      <section className="relative my-8 overflow-hidden py-20">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <PullQuote quote={about.philosophy} author="Namita Thapa" />
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="mb-6 text-center">
            <p className="font-script text-xl text-rose">A life in chapters</p>
            <h2 className="font-heading text-4xl font-bold text-ink sm:text-5xl">
              The journey so far
            </h2>
          </div>
        </Reveal>
        <JourneyScene years={journey.map((m) => m.year)} />
        <div className="mt-12 space-y-5">
          {journey.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.05}>
              <div className="flex flex-col gap-3 rounded-[1.5rem] card-soft p-7 sm:flex-row sm:items-start sm:gap-8">
                <span className="font-heading text-3xl font-bold gradient-text sm:w-28 sm:shrink-0">
                  {m.year}
                </span>
                <div>
                  <h3 className="font-heading text-2xl font-semibold text-ink">
                    {m.milestone}
                  </h3>
                  <p className="mt-2 font-story text-xl leading-relaxed text-ink-soft">
                    {m.story}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="mb-10 text-center">
            <p className="font-script text-xl text-rose">What I bring</p>
            <h2 className="font-heading text-4xl font-bold text-ink sm:text-5xl">
              Craft &amp; expertise
            </h2>
          </div>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-4">
          {expertise.map((skill, i) => (
            <Reveal key={skill} delay={i * 0.04}>
              <span className="inline-flex items-center gap-2 rounded-full card-soft px-5 py-3 font-heading text-lg text-ink">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-gold to-rose" />
                {skill}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PUBLISHED WORKS */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="mb-8 text-center">
            <p className="font-script text-xl text-rose">On the shelf</p>
            <h2 className="font-heading text-4xl font-bold text-ink sm:text-5xl">
              Published works
            </h2>
          </div>
        </Reveal>
        <AboutBookshelf books={works.map((w) => ({ title: w.title }))} />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <div className="overflow-hidden rounded-[1.5rem] card-soft">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={w.cover}
                    alt={w.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs uppercase tracking-widest text-rose">
                    {w.year}
                  </span>
                  <h3 className="font-heading text-2xl font-semibold text-ink">
                    {w.title}
                  </h3>
                  <p className="mt-2 font-story text-lg leading-relaxed text-ink-soft">
                    {w.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PERSONAL TOUCH */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="mb-10 text-center">
            <p className="font-script text-xl text-rose">Off the page</p>
            <h2 className="font-heading text-4xl font-bold text-ink sm:text-5xl">
              The human behind the words
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(Array.isArray(hobbies) ? hobbies : []).map((h, i) => (
            <Reveal key={h.hobby} delay={i * 0.08}>
              <div className="h-full rounded-[1.5rem] card-soft p-7 text-center transition-transform hover:-translate-y-1.5">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-lavender to-gold text-ink">
                  <Icon name={hobbyIcons[h.hobby] ?? "star"} size={26} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink">
                  {h.hobby}
                </h3>
                <p className="mt-2 font-story text-lg text-ink-soft">{h.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 text-center">
          <MagneticButton href="/contact" variant="primary">
            Work with me
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
