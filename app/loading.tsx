export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-ink/20 border-t-rose" />
      <p className="font-script text-xl text-rose">Turning the page…</p>
    </div>
  );
}
