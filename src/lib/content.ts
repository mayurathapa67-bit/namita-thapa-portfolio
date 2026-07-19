import "server-only";
import fs from "node:fs";
import path from "node:path";
import { defaultContent } from "./default-content";
import type { SiteContent } from "./types";

const CONTENT_PATH = path.join(process.cwd(), "data", "content.json");

function readLocalFile(): SiteContent {
  try {
    if (!fs.existsSync(CONTENT_PATH)) {
      return defaultContent;
    }
    const raw = fs.readFileSync(CONTENT_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return { ...defaultContent, ...parsed };
  } catch {
    return defaultContent;
  }
}

function isValidContent(value: unknown): value is SiteContent {
  if (value === null || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.nav === "object" &&
    typeof candidate.hero === "object" &&
    typeof candidate.about === "object" &&
    Array.isArray(candidate.services) &&
    Array.isArray(candidate.portfolio) &&
    Array.isArray(candidate.blog) &&
    Array.isArray(candidate.testimonials) &&
    typeof candidate.contact === "object"
  );
}

async function readGitHub(): Promise<SiteContent | null> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH ?? "main";
  if (!token || !repo || token.includes("your_") || repo.includes("your_")) {
    return null;
  }
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/contents/data/content.json?ref=${branch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
        next: { revalidate: 0 },
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { content?: string; encoding?: string };
    if (!data.content) return null;
    const decoded = Buffer.from(data.content, "base64").toString("utf-8");
    const parsed = JSON.parse(decoded) as unknown;
    if (isValidContent(parsed)) return parsed;
    return null;
  } catch {
    return null;
  }
}

export async function getContent(): Promise<SiteContent> {
  const fromGitHub = await readGitHub();
  if (fromGitHub) return fromGitHub;
  return readLocalFile();
}

export async function getPortfolioItem(slug: string) {
  const content = await getContent();
  const items = Array.isArray(content.portfolio) ? content.portfolio : [];
  return items.find((item) => item.slug === slug) ?? null;
}

export async function getBlogPost(slug: string) {
  const content = await getContent();
  const posts = Array.isArray(content.blog) ? content.blog : [];
  return posts.find((post) => post.slug === slug) ?? null;
}

export function writeLocalContent(content: SiteContent): void {
  try {
    const dir = path.dirname(CONTENT_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const merged: SiteContent = { ...defaultContent, ...content };
    fs.writeFileSync(CONTENT_PATH, JSON.stringify(merged, null, 2), "utf-8");
  } catch {
    // Best-effort local persistence; ignore write failures.
  }
}
