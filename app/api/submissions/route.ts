import { NextRequest, NextResponse } from "next/server";
import { getSubmissions, deleteSubmission } from "@/lib/submissions";
import { isValidToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  if (!isValidToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(
    { submissions: await getSubmissions() },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  if (!isValidToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => null)) as { id?: string } | null;
  if (!body?.id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }
  const ok = await deleteSubmission(body.id);
  return NextResponse.json(
    { ok },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

