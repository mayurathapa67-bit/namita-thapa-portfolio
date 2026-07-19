import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import MagneticButton from "@/components/MagneticButton";
import Services3D from "@/components/3d/Services3D";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Storytelling Services",
  description:
    "Creative writing, immersive storytelling, ghostwriting, content creation, consulting, and workshops by Namita Thapa.",
};

const serviceIcons: Record<string, string> = {
  "Creative Writing": "pen",
  "Immersive Storytelling": "sparkles",
  "Content Creation": "edit",
  Ghostwriting: "feather",
  "Story Consulting": "compass",
  "Writing Workshops": "star",
};

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    blurb: "A warm coffee chat to find the true shape of your story.",
    icon: "cup",
  },
  {
    step: "02",
    title: "Creation",
    blurb: "The writing magic — drafts, worlds, and words that land.",
    icon: "pen",
  },
  {
    step: "03",
    title: "Revision",
    blurb: "Gentle, honest polishing until it sings.",
    icon: "edit",
  },
  {
    step: "04",
    title: "Publication",
    blurb: "We celebrate. Your story, out in the world.",
    icon: "star",
  },
];

const faqs = [
  {
    q: "How do we start working together?",
    a: "Reach out through the contact page with a sentence or two about your story. I'll reply within 24 hours to book a free discovery chat.",
  },
  {
    q: "Do you work with brands as well as individuals?",
    a: "Absolutely. I've written for startups, museums, and memoirists alike — the voice changes, the care doesn't.",
  },
  {
    q: "What if I only have a vague idea?",
    a: "That's the best place to start. Most of my favourite projects began as a feeling, not a brief.",
  },
];

export default async function ServicesPage() {
  const content = await getContent();
  const services = Array.isArray(content.services) ? content.services : [];
  const carouselItems = services.map((s, i) => {
    const palette = ["#ffd93d", "#ff6b6b", "#b8a9c9", "#9caf88", "#1a1a1a", "#f5ebd3"];
    return {
      label: s.title,
      sublabel: s.price,
      color: palette[i % palette.length],
    };
  });

  return (
    <div className="relative">
      <section className="mx-auto max-w-4xl px-5 pb-8 pt-16 text-center sm:px-8">
        <Reveal>
          <p className="font-script text-2xl text-rose">Let&apos;s create a story together</p>
          <h1 className="font-heading text-5xl font-bold text-ink sm:text-6xl">
            Storytelling Services
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-5 sm:px-8">
        <Services3D items={carouselItems} />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-[1.75rem] card-soft p-8 transition-transform hover:-translate-y-2">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-rose text-ink">
                  <Icon name={serviceIcons[s.title] ?? "star"} size={26} />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 font-story text-xl leading-relaxed text-ink-soft">
                  {s.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {(Array.isArray(s.deliverables) ? s.deliverables : []).map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2 text-sm text-ink-soft"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
                      {d}
                    </li>
                  ))}
                </ul>
                {s.price ? (
                  <p className="mt-5 font-heading text-lg text-ink">{s.price}</p>
                ) : null}
                <div className="mt-6">
                  <MagneticButton href="/contact" variant="ghost">
                    Begin the journey
                  </MagneticButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="font-script text-xl text-rose">How it unfolds</p>
            <h2 className="font-heading text-4xl font-bold text-ink sm:text-5xl">
              The process
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08}>
              <div className="relative h-full rounded-[1.5rem] card-soft p-7">
                <span className="font-heading text-5xl font-bold text-gold/70">
                  {p.step}
                </span>
                <div className="my-4 flex h-12 w-12 items-center justify-center rounded-full bg-lavender/40 text-ink">
                  <Icon name={p.icon} size={24} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 font-story text-lg text-ink-soft">{p.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="mb-10 text-center">
            <p className="font-script text-xl text-rose">Good to know</p>
            <h2 className="font-heading text-4xl font-bold text-ink sm:text-5xl">
              Questions, answered
            </h2>
          </div>
        </Reveal>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <details className="group rounded-[1.25rem] card-soft p-6 [&_summary]:cursor-pointer">
                <summary className="flex items-center justify-between font-heading text-lg font-semibold text-ink">
                  {f.q}
                  <span className="ml-4 text-rose transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 font-story text-lg leading-relaxed text-ink-soft">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <MagneticButton href="/contact" variant="primary">
            Let&apos;s begin
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
