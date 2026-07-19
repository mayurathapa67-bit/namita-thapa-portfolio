import { NextRequest, NextResponse } from "next/server";
import { getContent, writeLocalContent } from "@/lib/content";
import { isValidToken } from "@/lib/auth";
import type { SiteContent } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  if (!isValidToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => null)) as SiteContent | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  writeLocalContent(body);
  return NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
