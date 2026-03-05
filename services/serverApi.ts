import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export async function serverApiFetch(
  endpoint: string,
  options: RequestInit = {},
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res
      .json()
      .catch(() => ({ message: "Error desconocido" }));
    throw error;
  }

  return res.json();
}
