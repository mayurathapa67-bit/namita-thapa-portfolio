"use client";

import { useEffect, useState, type ReactNode } from "react";
import MagneticButton from "@/components/MagneticButton";
import Icon from "@/components/Icon";
import ImageField from "@/components/admin/ImageField";
import type {
  SiteContent,
  Service,
  PortfolioItem,
  BlogPost,
  Testimonial,
  SocialLink,
  NavLink,
  StoryCategory,
} from "@/lib/types";

const STORY_CATEGORIES: StoryCategory[] = [
  "Fiction",
  "Poetry",
  "Non-Fiction",
  "Immersive",
];

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "brand", label: "Brand & Nav" },
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "stories", label: "Stories" },
  { id: "blog", label: "Blog" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
  { id: "submissions", label: "Submissions" },
] as const;

type TabId = (typeof TABS)[number]["id"];

interface SubmissionItem {
  id: string;
  name: string;
  email: string;
  storyIdea: string;
  createdAt: string;
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [tab, setTab] = useState<TabId>("overview");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetch("/api/auth", { cache: "no-store" });
      const data = (await res.json()) as { authenticated: boolean };
      if (active) setAuthed(data.authenticated);
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!authed) return;
    let active = true;
    (async () => {
      const res = await fetch("/api/content", { cache: "no-store" });
      if (active && res.ok) setContent((await res.json()) as SiteContent);
    })();
    return () => {
      active = false;
    };
  }, [authed]);

  const login = async () => {
    setLoginError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) setAuthed(true);
    else setLoginError("Incorrect password.");
  };

  const logout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setAuthed(false);
  };

  const save = async () => {
    if (!content) return;
    setSaveState("saving");
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaveState(res.ok ? "saved" : "idle");
    if (res.ok) setTimeout(() => setSaveState("idle"), 2500);
  };

  const update = <K extends keyof SiteContent>(
    key: K,
    value: SiteContent[K],
  ) => {
    if (!content) return;
    setContent({ ...content, [key]: value });
  };

  if (authed === null)
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-ink-soft">
        Loading…
      </div>
    );

  if (authed === false)
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-5">
        <div className="w-full max-w-sm rounded-3xl card-soft p-8">
          <p className="font-script text-2xl text-rose">Welcome back</p>
          <h1 className="font-heading text-3xl font-bold text-ink">
            Admin Library
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Password"
            className="mt-5 w-full rounded-2xl border border-ink/10 bg-white/60 px-4 py-3 text-ink outline-none focus:border-rose focus:ring-2 focus:ring-rose/30"
          />
          {loginError ? (
            <p className="mt-2 text-sm text-rose">{loginError}</p>
          ) : null}
          <div className="mt-5">
            <MagneticButton onClick={login} variant="primary">
              Enter
            </MagneticButton>
          </div>
        </div>
      </div>
    );

  if (!content)
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-ink-soft">
        Loading content…
      </div>
    );

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-script text-xl text-rose">The Control Room</p>
          <h1 className="font-heading text-4xl font-bold text-ink">
            Namita&apos;s Admin
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={save}
            className="rounded-full bg-gradient-to-r from-gold to-rose px-5 py-2 text-sm font-medium text-ink shadow-md"
          >
            {saveState === "saving" ? "Saving…" : "Save all changes"}
          </button>
          {saveState === "saved" ? (
            <span className="text-sm text-sage">Saved ✓</span>
          ) : null}
          <button
            type="button"
            onClick={logout}
            className="rounded-full glass px-4 py-2 text-sm text-ink-soft hover:text-rose"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-ink/10 pb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === t.id
                ? "bg-gradient-to-r from-gold to-rose text-ink"
                : "glass text-ink-soft hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        {tab === "overview" ? (
          <OverviewTab content={content} submissions={submissions} />
        ) : null}
        {tab === "brand" ? (
          <BrandEditor content={content} update={update} />
        ) : null}
        {tab === "hero" ? <HeroEditor content={content} update={update} /> : null}
        {tab === "about" ? (
          <AboutEditor content={content} update={update} />
        ) : null}
        {tab === "services" ? (
          <ArrayEditor
            title="Services"
            items={content.services}
            empty={() => ({
              title: "",
              description: "",
              icon: "pen",
              price: "",
              deliverables: [],
            })}
            onChange={(items) => update("services", items)}
            render={(item, set, remove) => (
              <ServiceEditor item={item} set={set} _remove={remove} />
            )}
          />
        ) : null}
        {tab === "stories" ? (
          <ArrayEditor
            title="Stories"
            items={content.portfolio}
            empty={() => ({
              slug: `story-${Date.now()}`,
              title: "",
              category: "Fiction" as const,
              excerpt: "",
              content: "",
              cover_image: "",
              published_date: new Date().toISOString().slice(0, 10),
              read_time: "5 min",
              genre: "",
              tags: [],
            })}
            onChange={(items) => update("portfolio", items)}
            render={(item, set, remove) => (
              <StoryEditor item={item} set={set} _remove={remove} />
            )}
          />
        ) : null}
        {tab === "blog" ? (
          <ArrayEditor
            title="Blog posts"
            items={content.blog}
            empty={() => ({
              slug: `post-${Date.now()}`,
              title: "",
              excerpt: "",
              content: "",
              category: "Writing Tips",
              featured_image: "",
              published_date: new Date().toISOString().slice(0, 10),
              read_time: "4 min",
            })}
            onChange={(items) => update("blog", items)}
            render={(item, set, remove) => (
              <BlogEditor item={item} set={set} _remove={remove} />
            )}
          />
        ) : null}
        {tab === "testimonials" ? (
          <ArrayEditor
            title="Testimonials"
            items={content.testimonials}
            empty={() => ({ quote: "", name: "", role: "", avatar: "" })}
            onChange={(items) => update("testimonials", items)}
            render={(item, set, remove) => (
              <TestimonialEditor item={item} set={set} _remove={remove} />
            )}
          />
        ) : null}
        {tab === "contact" ? (
          <ContactEditor content={content} update={update} />
        ) : null}
        {tab === "submissions" ? (
          <SubmissionsTab
            submissions={submissions}
            setSubmissions={setSubmissions}
          />
        ) : null}
      </div>
    </div>
  );
}

/* ---------- shared inputs ---------- */

function Card({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl card-soft p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-ink">{title}</h3>
        {action}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block font-heading text-sm text-ink">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-ink/10 bg-white/60 px-4 py-2.5 text-ink outline-none focus:border-rose focus:ring-2 focus:ring-rose/30"
      />
    </div>
  );
}

function LabeledTextarea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="mb-1 block font-heading text-sm text-ink">{label}</label>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none rounded-2xl border border-ink/10 bg-white/60 px-4 py-2.5 font-story text-lg text-ink outline-none focus:border-rose focus:ring-2 focus:ring-rose/30"
      />
    </div>
  );
}

function ListEditor({
  label,
  items,
  placeholder,
  onChange,
}: {
  label: string;
  items: string[];
  placeholder: string;
  onChange: (items: string[]) => void;
}) {
  const setAt = (i: number, v: string) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };
  return (
    <div>
      <label className="mb-1 block font-heading text-sm text-ink">{label}</label>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={it}
              onChange={(e) => setAt(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 rounded-xl border border-ink/10 bg-white/60 px-3 py-2 text-sm text-ink outline-none focus:border-rose"
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="rounded-xl px-3 text-rose"
              aria-label="Remove"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, ""])}
          className="text-sm text-rose hover:underline"
        >
          + Add
        </button>
      </div>
    </div>
  );
}

/* ---------- tabs ---------- */

function OverviewTab({
  content,
  submissions,
}: {
  content: SiteContent;
  submissions: SubmissionItem[];
}) {
  const stats = [
    { label: "Stories", value: content.portfolio.length, icon: "book" },
    { label: "Blog posts", value: content.blog.length, icon: "edit" },
    { label: "Services", value: content.services.length, icon: "star" },
    { label: "Testimonials", value: content.testimonials.length, icon: "feather" },
    { label: "Submissions", value: submissions.length, icon: "cup" },
  ];
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-2xl card-soft p-6">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold to-rose text-ink">
            <Icon name={s.icon} size={20} />
          </div>
          <p className="font-heading text-3xl font-bold text-ink">{s.value}</p>
          <p className="mt-1 text-sm text-ink-soft">{s.label}</p>
        </div>
      ))}
      <div className="rounded-2xl card-soft p-6 sm:col-span-2 lg:col-span-3">
        <p className="text-sm text-ink-soft">
          Edit every section using the tabs above. Changes are saved when you
          click <strong>Save all changes</strong>. Images can be uploaded,
          added by URL, picked from the library, or removed.
        </p>
      </div>
    </div>
  );
}

/* ---------- brand & nav ---------- */

function BrandEditor({
  content,
  update,
}: {
  content: SiteContent;
  update: <K extends keyof SiteContent>(k: K, v: SiteContent[K]) => void;
}) {
  const nav = content.nav;
  const setNav = (partial: Partial<typeof nav>) =>
    update("nav", { ...nav, ...partial });

  const setLink = (i: number, partial: Partial<NavLink>) => {
    const links = nav.links.map((l, j) => (j === i ? { ...l, ...partial } : l));
    setNav({ links });
  };

  return (
    <>
      <Card title="Logo">
        <LabeledInput
          label="Logo text"
          value={nav.logo.text}
          onChange={(v) => setNav({ logo: { ...nav.logo, text: v } })}
        />
        <ImageField
          label="Logo image (optional)"
          value={nav.logo.image ?? ""}
          onChange={(url) => setNav({ logo: { ...nav.logo, image: url } })}
        />
      </Card>
      <Card
        title="Navigation links"
        action={
          <button
            type="button"
            onClick={() =>
              setNav({ links: [...nav.links, { label: "New", href: "/" }] })
            }
            className="text-sm text-rose hover:underline"
          >
            + Add link
          </button>
        }
      >
        <div className="space-y-2">
          {nav.links.map((l, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={l.label}
                onChange={(e) => setLink(i, { label: e.target.value })}
                placeholder="Label"
                className="w-1/2 rounded-xl border border-ink/10 bg-white/60 px-3 py-2 text-sm text-ink outline-none focus:border-rose"
              />
              <input
                value={l.href}
                onChange={(e) => setLink(i, { href: e.target.value })}
                placeholder="/path"
                className="flex-1 rounded-xl border border-ink/10 bg-white/60 px-3 py-2 text-sm text-ink outline-none focus:border-rose"
              />
              <button
                type="button"
                onClick={() =>
                  setNav({ links: nav.links.filter((_, j) => j !== i) })
                }
                className="rounded-xl px-3 text-rose"
                aria-label="Remove link"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

/* ---------- hero ---------- */

function HeroEditor({
  content,
  update,
}: {
  content: SiteContent;
  update: <K extends keyof SiteContent>(k: K, v: SiteContent[K]) => void;
}) {
  const hero = content.hero;
  const setHero = (partial: Partial<typeof hero>) =>
    update("hero", { ...hero, ...partial });
  return (
    <Card title="Hero">
      <LabeledInput
        label="Role / eyebrow"
        value={hero.eyebrow ?? ""}
        onChange={(v) => setHero({ eyebrow: v })}
      />
      <LabeledInput
        label="Tagline"
        value={hero.tagline}
        onChange={(v) => setHero({ tagline: v })}
      />
      <LabeledTextarea
        label="Subtitle"
        value={hero.subtitle}
        onChange={(v) => setHero({ subtitle: v })}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <LabeledInput
          label="Primary CTA"
          value={hero.cta_primary}
          onChange={(v) => setHero({ cta_primary: v })}
        />
        <LabeledInput
          label="Secondary CTA"
          value={hero.cta_secondary}
          onChange={(v) => setHero({ cta_secondary: v })}
        />
      </div>
      <ImageField
        label="Hero image"
        value={hero.image}
        onChange={(url) => setHero({ image: url })}
      />
    </Card>
  );
}

/* ---------- about ---------- */

function AboutEditor({
  content,
  update,
}: {
  content: SiteContent;
  update: <K extends keyof SiteContent>(k: K, v: SiteContent[K]) => void;
}) {
  const about = content.about;
  const setAbout = (partial: Partial<typeof about>) =>
    update("about", { ...about, ...partial });
  return (
    <>
      <Card title="About intro">
        <LabeledInput
          label="Headline"
          value={about.headline}
          onChange={(v) => setAbout({ headline: v })}
        />
        <LabeledTextarea
          label="Biography"
          value={about.bio}
          rows={6}
          onChange={(v) => setAbout({ bio: v })}
        />
        <LabeledTextarea
          label="Philosophy"
          value={about.philosophy}
          onChange={(v) => setAbout({ philosophy: v })}
        />
        <ImageField
          label="Portrait photo"
          value={about.image}
          onChange={(url) => setAbout({ image: url })}
        />
      </Card>
      <Card title="Expertise (tags)">
        <ListEditor
          label="Tags"
          items={about.expertise}
          placeholder="e.g. Creative Writing"
          onChange={(items) => setAbout({ expertise: items })}
        />
      </Card>
      <Card title="Photo gallery">
        <ListEditor
          label="Gallery image URLs"
          items={about.gallery ?? []}
          placeholder="https://…"
          onChange={(items) => setAbout({ gallery: items })}
        />
      </Card>
    </>
  );
}

/* ---------- generic array editor ---------- */

function ArrayEditor<T>({
  title,
  items,
  empty,
  onChange,
  render,
}: {
  title: string;
  items: T[];
  empty: () => T;
  onChange: (items: T[]) => void;
  render: (item: T, set: (v: T) => void, remove: () => void) => ReactNode;
}) {
  const setAt = (i: number, v: T) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };
  return (
    <Card
      title={title}
      action={
        <button
          type="button"
          onClick={() => onChange([...items, empty()])}
          className="text-sm text-rose hover:underline"
        >
          + Add {title.toLowerCase().replace(/s$/, "")}
        </button>
      }
    >
      <div className="space-y-6">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border border-ink/10 bg-white/40 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-ink-soft">
                #{i + 1}
              </span>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="text-sm text-rose hover:underline"
              >
                Remove
              </button>
            </div>
            {render(
              item,
              (v) => setAt(i, v),
              () => onChange(items.filter((_, j) => j !== i)),
            )}
          </div>
        ))}
        {items.length === 0 ? (
          <p className="text-sm text-ink-soft">No items yet.</p>
        ) : null}
      </div>
    </Card>
  );
}

/* ---------- item editors ---------- */

function ServiceEditor({
  item,
  set,
  _remove,
}: {
  item: Service;
  set: (v: Service) => void;
  _remove: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <LabeledInput
          label="Title"
          value={item.title}
          onChange={(v) => set({ ...item, title: v })}
        />
        <LabeledInput
          label="Price"
          value={item.price}
          onChange={(v) => set({ ...item, price: v })}
        />
      </div>
      <LabeledTextarea
        label="Description"
        value={item.description}
        onChange={(v) => set({ ...item, description: v })}
      />
      <LabeledInput
        label="Icon"
        value={item.icon}
        onChange={(v) => set({ ...item, icon: v })}
      />
      <ListEditor
        label="Deliverables"
        items={item.deliverables}
        placeholder="e.g. Two rounds of revisions"
        onChange={(items) => set({ ...item, deliverables: items })}
      />
    </div>
  );
}

function StoryEditor({
  item,
  set,
  _remove,
}: {
  item: PortfolioItem;
  set: (v: PortfolioItem) => void;
  _remove: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <LabeledInput
          label="Title"
          value={item.title}
          onChange={(v) => set({ ...item, title: v })}
        />
        <LabeledInput
          label="Slug"
          value={item.slug}
          onChange={(v) => set({ ...item, slug: v })}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="mb-1 block font-heading text-sm text-ink">
            Category
          </label>
          <select
            value={item.category}
            onChange={(e) =>
              set({ ...item, category: e.target.value as StoryCategory })
            }
            className="w-full rounded-2xl border border-ink/10 bg-white/60 px-4 py-2.5 text-ink outline-none focus:border-rose"
          >
            {STORY_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <LabeledInput
          label="Genre"
          value={item.genre}
          onChange={(v) => set({ ...item, genre: v })}
        />
        <LabeledInput
          label="Read time"
          value={item.read_time}
          onChange={(v) => set({ ...item, read_time: v })}
        />
      </div>
      <LabeledInput
        label="Excerpt"
        value={item.excerpt}
        onChange={(v) => set({ ...item, excerpt: v })}
      />
      <LabeledTextarea
        label="Content (use blank lines for paragraphs)"
        value={item.content}
        rows={5}
        onChange={(v) => set({ ...item, content: v })}
      />
      <ImageField
        label="Cover image"
        value={item.cover_image}
        onChange={(url) => set({ ...item, cover_image: url })}
      />
      <ListEditor
        label="Tags"
        items={item.tags}
        placeholder="e.g. fiction"
        onChange={(items) => set({ ...item, tags: items })}
      />
    </div>
  );
}

function BlogEditor({
  item,
  set,
  _remove,
}: {
  item: BlogPost;
  set: (v: BlogPost) => void;
  _remove: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <LabeledInput
          label="Title"
          value={item.title}
          onChange={(v) => set({ ...item, title: v })}
        />
        <LabeledInput
          label="Slug"
          value={item.slug}
          onChange={(v) => set({ ...item, slug: v })}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <LabeledInput
          label="Category"
          value={item.category}
          onChange={(v) => set({ ...item, category: v })}
        />
        <LabeledInput
          label="Read time"
          value={item.read_time}
          onChange={(v) => set({ ...item, read_time: v })}
        />
        <LabeledInput
          label="Date"
          value={item.published_date}
          onChange={(v) => set({ ...item, published_date: v })}
        />
      </div>
      <LabeledInput
        label="Excerpt"
        value={item.excerpt}
        onChange={(v) => set({ ...item, excerpt: v })}
      />
      <LabeledTextarea
        label="Content (use blank lines for paragraphs)"
        value={item.content}
        rows={5}
        onChange={(v) => set({ ...item, content: v })}
      />
      <ImageField
        label="Featured image"
        value={item.featured_image}
        onChange={(url) => set({ ...item, featured_image: url })}
      />
    </div>
  );
}

function TestimonialEditor({
  item,
  set,
  _remove,
}: {
  item: Testimonial;
  set: (v: Testimonial) => void;
  _remove: () => void;
}) {
  return (
    <div className="space-y-3">
      <LabeledTextarea
        label="Quote"
        value={item.quote}
        onChange={(v) => set({ ...item, quote: v })}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <LabeledInput
          label="Name"
          value={item.name}
          onChange={(v) => set({ ...item, name: v })}
        />
        <LabeledInput
          label="Role"
          value={item.role}
          onChange={(v) => set({ ...item, role: v })}
        />
      </div>
      <ImageField
        label="Avatar"
        value={item.avatar}
        onChange={(url) => set({ ...item, avatar: url })}
      />
    </div>
  );
}

/* ---------- contact ---------- */

function ContactEditor({
  content,
  update,
}: {
  content: SiteContent;
  update: <K extends keyof SiteContent>(k: K, v: SiteContent[K]) => void;
}) {
  const contact = content.contact;
  const setContact = (partial: Partial<typeof contact>) =>
    update("contact", { ...contact, ...partial });

  const setSocial = (i: number, partial: Partial<SocialLink>) => {
    const socials = contact.socials.map((s, j) =>
      j === i ? { ...s, ...partial } : s,
    );
    setContact({ socials });
  };

  return (
    <>
      <Card title="Contact details">
        <LabeledInput
          label="Email"
          value={contact.email}
          onChange={(v) => setContact({ email: v })}
        />
        <LabeledInput
          label="Phone"
          value={contact.phone}
          onChange={(v) => setContact({ phone: v })}
        />
        <LabeledInput
          label="Location"
          value={contact.location}
          onChange={(v) => setContact({ location: v })}
        />
        <LabeledInput
          label="Availability"
          value={contact.availability}
          onChange={(v) => setContact({ availability: v })}
        />
        <LabeledInput
          label="Eyebrow"
          value={contact.eyebrow ?? ""}
          onChange={(v) => setContact({ eyebrow: v })}
        />
        <LabeledTextarea
          label="Intro paragraph"
          value={contact.intro ?? ""}
          onChange={(v) => setContact({ intro: v })}
        />
        <ImageField
          label="Contact photo"
          value={contact.photo ?? ""}
          onChange={(url) => setContact({ photo: url })}
        />
      </Card>
      <Card
        title="Social links"
        action={
          <button
            type="button"
            onClick={() =>
              setContact({
                socials: [...contact.socials, { platform: "New", url: "" }],
              })
            }
            className="text-sm text-rose hover:underline"
          >
            + Add
          </button>
        }
      >
        <div className="space-y-2">
          {contact.socials.map((s, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={s.platform}
                onChange={(e) => setSocial(i, { platform: e.target.value })}
                placeholder="Platform"
                className="w-1/3 rounded-xl border border-ink/10 bg-white/60 px-3 py-2 text-sm text-ink outline-none focus:border-rose"
              />
              <input
                value={s.url}
                onChange={(e) => setSocial(i, { url: e.target.value })}
                placeholder="https://…"
                className="flex-1 rounded-xl border border-ink/10 bg-white/60 px-3 py-2 text-sm text-ink outline-none focus:border-rose"
              />
              <button
                type="button"
                onClick={() =>
                  setContact({
                    socials: contact.socials.filter((_, j) => j !== i),
                  })
                }
                className="rounded-xl px-3 text-rose"
                aria-label="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

/* ---------- submissions ---------- */

function SubmissionsTab({
  submissions,
  setSubmissions,
}: {
  submissions: SubmissionItem[];
  setSubmissions: (s: SubmissionItem[]) => void;
}) {
  const [live, setLive] = useState(true);

  useEffect(() => {
    if (!live) return;
    const fetchSubs = async () => {
      const r = await fetch("/api/submissions", { cache: "no-store" });
      if (r.ok) {
        const data = (await r.json()) as { submissions: SubmissionItem[] };
        if (Array.isArray(data.submissions)) setSubmissions(data.submissions);
      }
    };
    fetchSubs();
    const id = setInterval(fetchSubs, 8000);
    return () => clearInterval(id);
  }, [live, setSubmissions]);

  return (
    <div className="rounded-2xl card-soft p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-semibold text-ink">
          Submissions
        </h2>
        <button
          type="button"
          onClick={() => setLive((l) => !l)}
          className="flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-ink-soft"
        >
          <span
            className={`h-2 w-2 rounded-full ${live ? "bg-sage animate-pulse" : "bg-ink/30"}`}
          />
          {live ? "Live" : "Paused"}
        </button>
      </div>
      {submissions.length === 0 ? (
        <p className="mt-4 text-sm text-ink-soft">
          No submissions yet. They&apos;ll appear here the moment someone reaches
          out.
        </p>
      ) : (
        <ul className="mt-5 space-y-4">
           {submissions.map((s) => (
            <li key={s.id} className="rounded-xl bg-white/50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-heading text-ink">{s.name}</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-ink-soft">
                    {new Date(s.createdAt).toLocaleString()}
                  </span>
                  <button
                    type="button"
                    onClick={async () => {
                      await fetch("/api/submissions", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: s.id }),
                      });
                      setSubmissions(submissions.filter((x) => x.id !== s.id));
                    }}
                    className="text-xs text-rose hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-ink-soft">{s.email}</p>
              <p className="mt-2 font-story text-lg text-ink">{s.storyIdea}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
