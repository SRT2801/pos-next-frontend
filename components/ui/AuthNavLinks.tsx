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
      <Link href={"/login"} className="font-bold p-2 rounded bg-indigo-500 text-white py-2 px-6">
        Iniciar Sesión
      </Link>
    );
  }

  return (
    <>
      {admin && (
        <Link href={"/admin/products"} className="font-bold p-2 rounded bg-green-400 py-2 px-10">
          Administración Panel
        </Link>
      )}

      {authenticated ? (
        <>
          <span className="text-gray-300 text-sm">{userEmail}</span>
          <button
            onClick={handleLogout}
            className="font-bold p-2 rounded bg-red-500 hover:bg-red-600 text-white py-2 px-6 transition-colors"
          >
            Cerrar Sesión
          </button>
        </>
      ) : (
        <Link href={"/login"} className="font-bold p-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 transition-colors">
          Iniciar Sesión
        </Link>
      )}
    </>
  );
}
