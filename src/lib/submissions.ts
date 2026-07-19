import "server-only";
import fs from "node:fs";
import path from "node:path";

const SUBMISSIONS_PATH = path.join(process.cwd(), "data", "submissions.json");
const GITHUB_FILE = "data/submissions.json";

function getGitHubConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH ?? "main";
  if (!token || !repo || token.includes("your_") || repo.includes("your_")) {
    return null;
  }
  return { token, repo, branch };
}

export interface Submission {
  id: string;
  name: string;
  email: string;
  storyIdea: string;
  createdAt: string;
}

function readLocal(): Submission[] {
  try {
    if (!fs.existsSync(SUBMISSIONS_PATH)) return [];
    const raw = fs.readFileSync(SUBMISSIONS_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Submission[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(items: Submission[]): void {
  try {
    const dir = path.dirname(SUBMISSIONS_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(SUBMISSIONS_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch {
    // ignore best-effort persistence
  }
}

async function readGitHub(): Promise<Submission[] | null> {
  const cfg = getGitHubConfig();
  if (!cfg) return null;
  try {
    const res = await fetch(
      `https://api.github.com/repos/${cfg.repo}/contents/${GITHUB_FILE}?ref=${cfg.branch}`,
      {
        headers: {
          Authorization: `Bearer ${cfg.token}`,
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
      },
    );
    if (res.status === 404) return [];
    if (!res.ok) return null;
    const data = (await res.json()) as { content?: string; sha?: string };
    if (!data.content) return [];
    const decoded = Buffer.from(data.content, "base64").toString("utf-8");
    const parsed = JSON.parse(decoded);
    return Array.isArray(parsed) ? (parsed as Submission[]) : [];
  } catch {
    return null;
  }
}

async function writeGitHub(
  items: Submission[],
  message: string,
): Promise<boolean> {
  const cfg = getGitHubConfig();
  if (!cfg) return false;
  try {
    const existing = await fetch(
      `https://api.github.com/repos/${cfg.repo}/contents/${GITHUB_FILE}?ref=${cfg.branch}`,
      {
        headers: {
          Authorization: `Bearer ${cfg.token}`,
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
      },
    );
    const sha = existing.ok
      ? ((await existing.json()) as { sha?: string }).sha
      : undefined;
    const res = await fetch(
      `https://api.github.com/repos/${cfg.repo}/contents/${GITHUB_FILE}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${cfg.token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          content: Buffer.from(JSON.stringify(items, null, 2), "utf-8").toString(
            "base64",
          ),
          branch: cfg.branch,
          ...(sha ? { sha } : {}),
        }),
        cache: "no-store",
      },
    );
    return res.ok;
  } catch {
    return false;
  }
}

export async function getSubmissions(): Promise<Submission[]> {
  const fromGitHub = await readGitHub();
  if (fromGitHub) {
    return fromGitHub.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  return readLocal().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addSubmission(
  input: Omit<Submission, "id" | "createdAt">,
): Promise<Submission> {
  const item: Submission = {
    ...input,
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `sub_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    createdAt: new Date().toISOString(),
  };

  const existing = await getSubmissions();
  const all = [...existing, item];

  await writeGitHub(
    all,
    `Add contact submission from ${input.name || "visitor"}`,
  );
  writeLocal(all);
  return item;
}

export async function deleteSubmission(id: string): Promise<boolean> {
  const existing = await getSubmissions();
  const all = existing.filter((s) => s.id !== id);
  if (all.length === existing.length) return false;

  const committed = await writeGitHub(all, `Delete submission ${id}`);
  writeLocal(all);
  return committed || true;
}


