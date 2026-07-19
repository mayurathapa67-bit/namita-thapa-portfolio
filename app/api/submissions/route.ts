import { NextRequest, NextResponse } from "next/server";
import { getSubmissions } from "@/lib/submissions";
import { isValidToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  if (!isValidToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(
    { submissions: getSubmissions() },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
