import { NextRequest, NextResponse } from "next/server";
import { isValidToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  if (!isValidToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      {
        error:
          "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to enable uploads.",
      },
      { status: 501 },
    );
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  const dataUri = `data:${file.type || "application/octet-stream"};base64,${base64}`;

  const basic = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file: dataUri, folder: "namita-portfolio" }),
    },
  );

  if (!uploadRes.ok) {
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 502 },
    );
  }

  const result = (await uploadRes.json()) as { secure_url?: string };
  return NextResponse.json(
    { url: result.secure_url },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
