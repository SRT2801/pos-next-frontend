"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isAuthenticated, isAdmin, getUser, logout } from "@/services/AuthService";
import { useRouter } from "next/navigation";

export default function AuthNavLinks() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setAuthenticated(isAuthenticated());
    setAdmin(isAdmin());
    setUserEmail(getUser()?.email || null);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // No renderizar hasta que estemos en el cliente para evitar hydration mismatch
  if (!mounted) {
    return (
      <Link href={"/login"} className="bg-primary hover:bg-indigo-700 transition-colors px-5 py-2 rounded-lg font-bold text-sm shadow-md text-white">
        Iniciar Sesión
      </Link>
    );
  }

  return (
    <>
      {admin && (
        <Link href={"/admin/products"} className="bg-emerald-500 hover:bg-emerald-600 transition-colors px-5 py-2 rounded-lg font-bold text-sm shadow-md text-white">
          Admin Panel
        </Link>
      )}

      {authenticated ? (
        <>
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-xs text-slate-400">Sesión iniciada como</span>
            <span className="text-sm font-medium">{userEmail}</span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-secondary hover:bg-red-600 transition-colors px-5 py-2 rounded-lg font-bold text-sm shadow-md flex items-center gap-2 text-white"
          >
            <span className="material-icons-round text-base">logout</span>
            Cerrar Sesión
          </button>
        </>
      ) : (
        <Link href={"/login"} className="bg-primary hover:bg-indigo-700 transition-colors px-5 py-2 rounded-lg font-bold text-sm shadow-md text-white">
          Iniciar Sesión
        </Link>
      )}
    </>
  );
}
