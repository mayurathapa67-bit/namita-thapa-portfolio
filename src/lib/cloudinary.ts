import "server-only";

export interface CloudinaryResult {
  url?: string;
  publicId?: string;
  error?: string;
}

function creds() {
  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  };
}

export function cloudinaryConfigured(): boolean {
  const c = creds();
  return Boolean(c.cloudName && c.apiKey && c.apiSecret);
}

export async function uploadToCloudinary(
  dataUri: string,
): Promise<CloudinaryResult> {
  const c = creds();
  if (!c.cloudName || !c.apiKey || !c.apiSecret) {
    return { error: "Cloudinary is not configured." };
  }
  const basic = Buffer.from(`${c.apiKey}:${c.apiSecret}`).toString("base64");
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${c.cloudName}/image/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file: dataUri, folder: "namita-portfolio" }),
    },
  );
  if (!res.ok) return { error: "Upload failed" };
  const data = (await res.json()) as { secure_url?: string; public_id?: string };
  return { url: data.secure_url, publicId: data.public_id };
}

export async function destroyCloudinary(publicId: string): Promise<boolean> {
  const c = creds();
  if (!c.cloudName || !c.apiKey || !c.apiSecret) return false;
  const basic = Buffer.from(`${c.apiKey}:${c.apiSecret}`).toString("base64");
  const params = new URLSearchParams({ public_ids: JSON.stringify([publicId]) });
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${c.cloudName}/resources/image/upload?${params.toString()}`,
    {
      method: "DELETE",
      headers: { Authorization: `Basic ${basic}` },
    },
  );
  return res.ok;
}
