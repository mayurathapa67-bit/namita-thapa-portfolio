import "server-only";
import fs from "node:fs";
import path from "node:path";

const IMAGES_PATH = path.join(process.cwd(), "data", "images.json");

export interface ImageRecord {
  url: string;
  publicId?: string;
  createdAt: string;
}

function readAll(): ImageRecord[] {
  try {
    if (!fs.existsSync(IMAGES_PATH)) return [];
    const raw = fs.readFileSync(IMAGES_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ImageRecord[]) : [];
  } catch {
    return [];
  }
}

function writeAll(items: ImageRecord[]): void {
  try {
    const dir = path.dirname(IMAGES_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(IMAGES_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch {
    // ignore
  }
}

export function getImages(): ImageRecord[] {
  return readAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addImage(record: ImageRecord): ImageRecord {
  const all = readAll();
  all.push(record);
  writeAll(all);
  return record;
}

export function removeImage(url: string, publicId?: string): boolean {
  const all = readAll();
  const next = all.filter(
    (img) => img.url !== url && (publicId ? img.publicId !== publicId : true),
  );
  if (next.length === all.length) return false;
  writeAll(next);
  return true;
}
