import { getToken } from "./AuthService";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
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

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.clear();
      document.cookie = "access_token=; path=/; max-age=0";
      window.location.href = "/login";
    }
    throw new Error("Session expired");
  }

  if (!res.ok) throw await res.json();
  return res.json();
}
