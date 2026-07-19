import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <p className="font-script text-3xl text-rose">A story untold</p>
      <h1 className="mt-2 font-heading text-6xl font-bold text-ink">404</h1>
      <p className="mt-4 max-w-md font-story text-xl text-ink-soft">
        This page wandered off between the chapters. Let&apos;s find your way
        back to the library.
      </p>
      <Link
        href="/"
        className="btn-magic btn-magic-primary mt-8"
      >
        Return home
      </Link>
    </div>
  );
}
