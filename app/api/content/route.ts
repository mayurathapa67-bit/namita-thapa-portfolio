import { NextRequest, NextResponse } from "next/server";
import { getContent, writeLocalContent } from "@/lib/content";
import { commitContentToGitHub } from "@/lib/github";
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

  const merged: SiteContent = { ...body };
  const serialized = JSON.stringify(merged, null, 2);

  const result = await commitContentToGitHub(
    serialized,
    "Update site content from admin panel",
  );

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? "Failed to save to GitHub." },
      { status: 502, headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }

  writeLocalContent(body);
  return NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

