import "server-only";
import fs from "node:fs";
import path from "node:path";

const SUBMISSIONS_PATH = path.join(process.cwd(), "data", "submissions.json");

export interface Submission {
  id: string;
  name: string;
  email: string;
  storyIdea: string;
  createdAt: string;
}

function readAll(): Submission[] {
  try {
    if (!fs.existsSync(SUBMISSIONS_PATH)) return [];
    const raw = fs.readFileSync(SUBMISSIONS_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Submission[]) : [];
  } catch {
    return [];
  }
}

function writeAll(items: Submission[]): void {
  try {
    const dir = path.dirname(SUBMISSIONS_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(SUBMISSIONS_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch {
    // ignore best-effort persistence
  }
}

export function getSubmissions(): Submission[] {
  return readAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addSubmission(input: Omit<Submission, "id" | "createdAt">): Submission {
  const item: Submission = {
    ...input,
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `sub_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    createdAt: new Date().toISOString(),
  };
  const all = readAll();
  all.push(item);
  writeAll(all);
  return item;
}
