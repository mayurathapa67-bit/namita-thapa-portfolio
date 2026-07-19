import { NextRequest, NextResponse } from "next/server";
import { addSubmission } from "@/lib/submissions";

export const dynamic = "force-dynamic";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  storyIdea?: unknown;
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as ContactPayload | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const name = str(body.name);
  const email = str(body.email);
  const storyIdea = str(body.storyIdea);

  if (!name || !email || !storyIdea) {
    return NextResponse.json(
      { error: "Name, email, and story idea are required." },
      { status: 422 },
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email." },
      { status: 422 },
    );
  }

  await addSubmission({
    name,
    email,
    storyIdea,
  });

  return NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
