"use client";

import { useEffect, useState } from "react";
import { isAuthenticated, isAdmin } from "@/services/AuthService";
import { useRouter } from "next/navigation";

/**
 * Protege rutas que requieren ser admin.
 * Redirige a /login si no autenticado, o a / si no es admin.
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    } else if (!isAdmin()) {
      router.replace("/");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Verificando permisos...</p>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * Protege rutas que requieren estar autenticado (cualquier rol).
 * Redirige a /login si no autenticado.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Verificando sesión...</p>
      </div>
    );
  }

  return <>{children}</>;
}
