import Link from "next/link";

const FALLBACK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Stories", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-ink/10 bg-parchment-deep/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-heading text-2xl font-bold text-ink">
            Namita<span className="gradient-text">.</span>
          </p>
          <p className="font-script mt-2 text-xl text-ink-soft">
            Stories that come alive.
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            Immersive storyteller &amp; creative writer crafting fiction, poetry,
            and worlds you can step inside. Based between Perth &amp; Kathmandu.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2">
          <p className="font-heading text-sm uppercase tracking-widest text-ink-soft">
            Wander
          </p>
          {FALLBACK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="w-fit text-sm text-ink-soft transition-colors hover:text-rose"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <p className="font-heading text-sm uppercase tracking-widest text-ink-soft">
            Stay in touch
          </p>
          <a
            href="mailto:namita.writer05@gmail.com"
            className="w-fit text-sm text-ink-soft transition-colors hover:text-rose"
          >
            namita.writer05@gmail.com
          </a>
          <a
            href="tel:+61489071554"
            className="w-fit text-sm text-ink-soft transition-colors hover:text-rose"
          >
            +61 489 071 554
          </a>
          <p className="mt-2 text-xs leading-relaxed text-ink-soft">
            Perth, Australia · Kathmandu, Nepal
          </p>
        </div>
      </div>

      <div className="border-t border-ink/10 py-5 text-center">
        <p className="text-xs text-ink-soft">
          © {year} Namita Thapa. Written with care, between two homes.
        </p>
      </div>
    </footer>
  );
}
