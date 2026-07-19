"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  };

  const cls = `btn-magic ${
    variant === "primary" ? "btn-magic-primary" : "btn-magic-ghost"
  } ${className}`;

  if (href) {
    return (
      <Link
        ref={ref}
        href={href}
        aria-label={ariaLabel}
        className={cls}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cls}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </button>
  );
}
