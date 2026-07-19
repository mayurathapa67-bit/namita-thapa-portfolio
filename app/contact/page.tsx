import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Start a Conversation",
  description:
    "Let's write together. Get in touch with Namita Thapa for creative writing, storytelling, and collaborations.",
};

const socialIcons: Record<string, string> = {
  Instagram: "star",
  Goodreads: "book",
  LinkedIn: "compass",
  Substack: "feather",
};

export default async function ContactPage() {
  const content = await getContent();
  const contact = content.contact;
  const socials = Array.isArray(contact.socials) ? contact.socials : [];

  return (
    <div className="relative">
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-16 sm:px-8">
        <Reveal>
          <div className="text-center">
            <p className="font-script text-2xl text-rose">Let&apos;s write together</p>
            <h1 className="font-heading text-5xl font-bold text-ink sm:text-6xl">
              Start a conversation
            </h1>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-rose text-ink">
                  <Icon name="pen" size={20} />
                </div>
                <div>
                  <p className="font-heading text-sm uppercase tracking-widest text-ink-soft">
                    Email
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-story text-xl text-ink transition-colors hover:text-rose"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-lavender to-gold text-ink">
                  <Icon name="compass" size={20} />
                </div>
                <div>
                  <p className="font-heading text-sm uppercase tracking-widest text-ink-soft">
                    Phone
                  </p>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="font-story text-xl text-ink transition-colors hover:text-rose"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sage to-lavender text-ink">
                  <Icon name="leaf" size={20} />
                </div>
                <div>
                  <p className="font-heading text-sm uppercase tracking-widest text-ink-soft">
                    Based in
                  </p>
                  <p className="font-story text-xl text-ink">{contact.location}</p>
                </div>
              </div>

              <div className="rounded-2xl bg-sage/15 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-sage" />
                  </span>
                  <p className="font-story text-lg text-ink">
                    {contact.availability}
                  </p>
                </div>
              </div>

              {socials.length > 0 ? (
                <div>
                  <p className="font-heading text-sm uppercase tracking-widest text-ink-soft">
                    Find me
                  </p>
                  <div className="mt-3 flex gap-3">
                    {socials.map((s) => (
                      <a
                        key={s.platform}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.platform}
                        className="flex h-11 w-11 items-center justify-center rounded-full glass text-ink transition-transform hover:-translate-y-1 hover:text-rose"
                      >
                        <Icon name={socialIcons[s.platform] ?? "star"} size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-[2rem] card-soft p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
