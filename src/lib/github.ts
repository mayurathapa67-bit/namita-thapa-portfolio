import "server-only";

const CONTENT_PATH = "data/content.json";

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH ?? "main";
  if (!token || !repo || token.includes("your_") || repo.includes("your_")) {
    return null;
  }
  return { token, repo, branch };
}

export function githubConfigured(): boolean {
  return getConfig() !== null;
}

export async function getGitHubFileSha(): Promise<string | null> {
  const cfg = getConfig();
  if (!cfg) return null;
  try {
    const res = await fetch(
      `https://api.github.com/repos/${cfg.repo}/contents/${CONTENT_PATH}?ref=${cfg.branch}`,
      {
        headers: {
          Authorization: `Bearer ${cfg.token}`,
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { sha?: string };
    return data.sha ?? null;
  } catch {
    return null;
  }
}

export async function commitContentToGitHub(
  content: string,
  message: string,
): Promise<{ ok: boolean; error?: string }> {
  const cfg = getConfig();
  if (!cfg) {
    return { ok: false, error: "GitHub is not configured." };
  }
  const sha = await getGitHubFileSha();
  try {
    const res = await fetch(
      `https://api.github.com/repos/${cfg.repo}/contents/${CONTENT_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${cfg.token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          content: Buffer.from(content, "utf-8").toString("base64"),
          branch: cfg.branch,
          ...(sha ? { sha } : {}),
        }),
        cache: "no-store",
      },
    );
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `GitHub commit failed (${res.status}): ${text}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}
