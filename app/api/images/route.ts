import { NextRequest, NextResponse } from "next/server";
import { isValidToken } from "@/lib/auth";
import { getImages, addImage, removeImage } from "@/lib/images";
import { uploadToCloudinary, destroyCloudinary, cloudinaryConfigured } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  if (!isValidToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(
    { images: getImages(), cloudinary: cloudinaryConfigured() },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  if (!isValidToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = req.headers.get("content-type") ?? "";

  // Add by URL (JSON payload)
  if (contentType.includes("application/json")) {
    const body = (await req.json().catch(() => null)) as
      | { url?: string }
      | null;
    if (!body?.url) {
      return NextResponse.json({ error: "URL required" }, { status: 400 });
    }
    const record = addImage({
      url: body.url,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json(
      { image: record },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }

  // Multipart form: url or file upload
  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json(
      { error: "Invalid form data" },
      { status: 400 },
    );
  }

  const url = form.get("url");
  if (typeof url === "string" && url.trim()) {
    const record = addImage({
      url: url.trim(),
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json(
      { image: record },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }

  // Upload file
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file or url provided" }, { status: 400 });
  }
  // Validate it's an image
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;
  const result = await uploadToCloudinary(dataUri);
  if (result.error || !result.url) {
    return NextResponse.json(
      { error: result.error ?? "Upload failed" },
      { status: 502 },
    );
  }
  const record = addImage({
    url: result.url,
    publicId: result.publicId,
    createdAt: new Date().toISOString(),
  });
  return NextResponse.json(
    { image: record },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  if (!isValidToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => null)) as
    | { url?: string; publicId?: string }
    | null;
  if (!body?.url) {
    return NextResponse.json({ error: "URL required" }, { status: 400 });
  }
  if (body.publicId) {
    await destroyCloudinary(body.publicId);
  }
  const ok = removeImage(body.url, body.publicId);
  return NextResponse.json(
    { ok },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
