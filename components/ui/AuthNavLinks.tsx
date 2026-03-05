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


  if (!mounted) {
    return (
      <Link href={"/login"} className="bg-primary hover:bg-indigo-700 transition-colors px-3 sm:px-5 py-2 rounded-lg font-bold text-xs sm:text-sm shadow-md text-white">
        <span className="hidden sm:inline">Iniciar Sesión</span>
        <span className="sm:hidden material-icons-round text-base">login</span>
      </Link>
    );
  }

  return (
    <>
      {admin && (
        <Link href={"/admin/products"} className="bg-emerald-500 hover:bg-emerald-600 transition-colors px-3 sm:px-5 py-2 rounded-lg font-bold text-xs sm:text-sm shadow-md text-white">
          <span className="hidden sm:inline">Admin Panel</span>
          <span className="sm:hidden material-icons-round text-base">admin_panel_settings</span>
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
            className="bg-secondary hover:bg-red-600 transition-colors px-3 sm:px-5 py-2 rounded-lg font-bold text-xs sm:text-sm shadow-md flex items-center gap-1 sm:gap-2 text-white"
          >
            <span className="material-icons-round text-base">logout</span>
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>
        </>
      ) : (
        <Link href={"/login"} className="bg-primary hover:bg-indigo-700 transition-colors px-3 sm:px-5 py-2 rounded-lg font-bold text-xs sm:text-sm shadow-md text-white">
          <span className="hidden sm:inline">Iniciar Sesión</span>
          <span className="sm:hidden material-icons-round text-base">login</span>
        </Link>
      )}
    </>
  );
}
