"use server";

import { cookies } from "next/headers";

export async function uploadImage(formData: FormData): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const url = `${process.env.API_URL}/products/upload-image`;

  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Error subiendo imagen");
  }

  const image = await res.json();
  return image.url;
}
