import "server-only";

export interface SessionUser {
  authenticated: boolean;
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (typeof password !== "string") return false;
  return password.length > 0 && password === expected;
}

export function createToken(): string {
  const secret =
    process.env.ADMIN_PASSWORD ?? "namita-portfolio-default-session";
  const base = `${Date.now()}.${secret}`;
  if (typeof Buffer !== "undefined") {
    return Buffer.from(base).toString("base64url");
  }
  return base;
}

export function isValidToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const expected = process.env.ADMIN_PASSWORD ?? "namita-portfolio-default-session";
  try {
    const decoded =
      typeof Buffer !== "undefined"
        ? Buffer.from(token, "base64url").toString("utf-8")
        : token;
    return decoded.endsWith(`.${expected}`);
  } catch {
    return false;
  }
}
