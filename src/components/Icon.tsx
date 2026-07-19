interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

const paths: Record<string, React.ReactNode> = {
  pen: (
    <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  ),
  sparkles: (
    <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3ZM19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" />
  ),
  edit: (
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
  ),
  feather: (
    <path d="M20.2 3.8a5.5 5.5 0 0 0-7.8 0L3 13.2V21h7.8l9.4-9.4a5.5 5.5 0 0 0 0-7.8ZM16 8 2 22M17.5 7.5 19 9" />
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  star: (
    <path d="M12 2l2.9 6.3 6.8.6-5.1 4.5 1.5 6.6L12 17.3 5.9 20.6l1.5-6.6L2.3 8.9l6.8-.6L12 2Z" />
  ),
  book: (
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
  ),
  leaf: (
    <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 9-4 14-9 14Zm0 0c0-4 1.5-7 5-9" />
  ),
  cup: (
    <path d="M18 8h1a3 3 0 0 1 0 6h-1M3 8h13v6a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm3 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3" />
  ),
};

export default function Icon({ name, className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? paths.star}
    </svg>
  );
}
