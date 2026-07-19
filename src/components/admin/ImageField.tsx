"use client";

import { useState } from "react";

interface ImageRecord {
  url: string;
  publicId?: string;
}

export default function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [library, setLibrary] = useState<ImageRecord[]>([]);
  const [open, setOpen] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const [dragging, setDragging] = useState(false);

  const loadLibrary = async () => {
    const res = await fetch("/api/images", { cache: "no-store" });
    if (res.ok) {
      const data = (await res.json()) as { images: ImageRecord[] };
      setLibrary(data.images ?? []);
    }
  };

  const toggleLibrary = async () => {
    if (!open) await loadLibrary();
    setOpen((v) => !v);
  };

  const upload = async (file: File) => {
    setUploading(true);
    setMsg("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/images", { method: "POST", body: fd });
    const data = (await res.json()) as { image?: ImageRecord; error?: string };
    setUploading(false);
    if (data.image) {
      onChange(data.image.url);
      await loadLibrary();
    } else {
      setMsg(data.error ?? "Upload failed");
    }
  };

  const addByUrl = async () => {
    if (!urlInput.trim()) return;
    const res = await fetch("/api/images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: urlInput.trim() }),
    });
    const data = (await res.json()) as { image?: ImageRecord; error?: string };
    if (data.image) {
      onChange(data.image.url);
      setUrlInput("");
      await loadLibrary();
    } else {
      setMsg(data.error ?? "Could not add URL");
    }
  };

  const remove = async (rec: ImageRecord) => {
    await fetch("/api/images", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: rec.url, publicId: rec.publicId }),
    });
    await loadLibrary();
  };

  return (
    <div>
      <label className="mb-1 block font-heading text-sm text-ink">{label}</label>
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/60 ring-1 ring-ink/10">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-ink-soft">
              —
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <label className="cursor-pointer rounded-full bg-gradient-to-r from-gold to-rose px-3 py-1.5 text-xs font-medium text-ink">
            {uploading ? "Uploading…" : "Upload"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) upload(f);
              }}
            />
          </label>
          <button
            type="button"
            onClick={toggleLibrary}
            className="rounded-full glass px-3 py-1.5 text-xs text-ink-soft hover:text-ink"
          >
            Library
          </button>
          {value ? (
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-full glass px-3 py-1.5 text-xs text-rose hover:text-ink"
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>

      {msg ? <p className="mt-2 text-xs text-rose">{msg}</p> : null}

      {open ? (
        <div className="mt-3 rounded-2xl bg-white/50 p-4">
          <div className="flex gap-2">
            <input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Paste image URL…"
              className="flex-1 rounded-xl border border-ink/10 bg-white/70 px-3 py-2 text-sm text-ink outline-none focus:border-rose"
            />
            <button
              type="button"
              onClick={addByUrl}
              className="rounded-xl bg-ink px-3 py-2 text-xs font-medium text-parchment"
            >
              Add URL
            </button>
          </div>

          <div
            className={`mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5 ${
              dragging ? "ring-2 ring-rose" : ""
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const f = e.dataTransfer.files?.[0];
              if (f) upload(f);
            }}
          >
            {library.map((rec) => (
              <div key={rec.url} className="group relative">
                <button
                  type="button"
                  onClick={() => {
                    onChange(rec.url);
                    setOpen(false);
                  }}
                  className="block aspect-square w-full overflow-hidden rounded-lg ring-1 ring-ink/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rec.url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => remove(rec)}
                  aria-label="Remove image"
                  className="absolute -right-1 -top-1 hidden h-5 w-5 items-center justify-center rounded-full bg-rose text-xs text-white group-hover:flex"
                >
                  ×
                </button>
              </div>
            ))}
            {library.length === 0 ? (
              <p className="col-span-full text-xs text-ink-soft">
                No images yet. Upload or paste a URL above.
              </p>
            ) : null}
          </div>
          <p className="mt-2 text-[11px] text-ink-soft">
            Tip: drag &amp; drop an image anywhere in this grid to upload.
          </p>
        </div>
      ) : null}
    </div>
  );
}
