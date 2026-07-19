import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createToken, isValidToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as
    | { password?: string }
    | null;
  if (!body || typeof body.password !== "string") {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }
  if (!verifyPassword(body.password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  const token = createToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  res.headers.set("Cache-Control", "no-store, max-age=0");
  return res;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  return NextResponse.json(
    { authenticated: isValidToken(token) },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
