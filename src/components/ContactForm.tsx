"use client";

import { useState } from "react";
import MagneticButton from "@/components/MagneticButton";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      storyIdea: String(data.get("storyIdea") ?? ""),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Something went wrong");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Could not send your message. Please email me directly.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" placeholder="Jane Reader" required />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-heading text-sm text-ink">
          Your story idea
        </label>
        <textarea
          name="storyIdea"
          rows={6}
          required
          placeholder="Tell me a little about the story you'd like to tell…"
          className="w-full resize-none rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 font-story text-lg text-ink outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/30"
        />
      </div>

      <div className="pt-2">
        <MagneticButton type="submit" variant="primary">
          {status === "sending" ? "Sending…" : "Send your story ✦"}
        </MagneticButton>
      </div>

      {status === "sent" ? (
        <p className="rounded-2xl bg-sage/20 px-4 py-3 text-sm text-ink">
          Thank you — your message is on its way. I&apos;ll reply within 24 hours.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="rounded-2xl bg-rose/15 px-4 py-3 text-sm text-ink">
          {error}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block font-heading text-sm text-ink">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-ink outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/30"
      />
    </div>
  );
}
