"use client";

import { motion } from "framer-motion";

interface PullQuoteProps {
  quote: string;
  author?: string;
  className?: string;
}

export default function PullQuote({
  quote,
  author,
  className = "",
}: PullQuoteProps) {
  return (
    <motion.figure
      className={`relative mx-auto max-w-2xl text-center ${className}`}
      initial={{ opacity: 0, scale: 0.96, rotateX: 8 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 800 }}
    >
      <span className="font-script absolute -top-8 left-1/2 -translate-x-1/2 text-7xl text-rose/40">
        “
      </span>
      <blockquote className="font-story text-2xl italic leading-relaxed text-ink sm:text-3xl">
        {quote}
      </blockquote>
      {author ? (
        <figcaption className="mt-4 text-sm uppercase tracking-widest text-ink-soft">
          — {author}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
