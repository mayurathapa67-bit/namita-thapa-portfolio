"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

const FALLBACK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Stories", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

interface NavLinkItem {
  label: string;
  href: string;
}

interface LogoData {
  text?: string;
  image?: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const mounted = useIsClient();
  const [links, setLinks] = useState<NavLinkItem[]>(FALLBACK_LINKS);
  const [logo, setLogo] = useState<LogoData>({ text: "Namita" });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/content", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (
          active &&
          data?.nav?.links &&
          Array.isArray(data.nav.links) &&
          data.nav.links.length > 0
        ) {
          setLinks(data.nav.links as NavLinkItem[]);
        }
        if (active && data?.nav?.logo) {
          const l = data.nav.logo as LogoData;
          setLogo({ text: l.text ?? "Namita", image: l.image ?? "" });
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    const onScroll = () => setScrolled(window.scrollY > 24);
    (async () => {
      if (active) onScroll();
    })();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      active = false;
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const activeLinks = mounted ? links : FALLBACK_LINKS;
  const activeLogo = mounted ? logo : { text: "Namita" as const };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-sm" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-xl font-bold tracking-tight text-ink sm:text-2xl"
        >
          {activeLogo.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={activeLogo.image}
              alt={activeLogo.text || "Namita Thapa"}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-gold/50"
            />
          ) : null}
          <span>
            {activeLogo.text || "Namita"}
            <span className="gradient-text">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {activeLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`group relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-ink"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-gold via-rose to-lavender transition-transform duration-300 group-hover:scale-x-100 ${
                    isActive(link.href) ? "scale-x-100" : ""
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="btn-magic btn-magic-primary hidden text-sm md:inline-flex"
        >
          Start a Story
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full glass md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-ink transition-transform ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 bg-ink transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 bg-ink transition-transform ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        className={`overflow-hidden transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 pb-5">
          {activeLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-base font-medium ${
                  isActive(link.href)
                    ? "bg-white/60 text-ink"
                    : "text-ink-soft hover:bg-white/40"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-2">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-magic btn-magic-primary w-full"
            >
              Start a Story
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
