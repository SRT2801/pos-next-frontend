"use client";

import { useState } from 'react';
import Logo from '@/components/ui/Logo';
import AdminSidebar from '@/components/ui/AdminSidebar';
import { logout, getUser } from '@/services/AuthService';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';

export default function AdminNavClient() {
  const router = useRouter();
  const user = getUser();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <>
      <AdminSidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)} />

      <nav className="bg-surface-dark text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <Button
            icon="pi pi-bars"
            onClick={() => setSidebarVisible(true)}
            rounded
            text
            className="text-white"
            aria-label="Menú"
          />
          <Logo />
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {user && (
            <>
              <span className="hidden sm:block text-xs text-slate-400">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-secondary hover:bg-red-600 transition-colors px-3 sm:px-5 py-2 rounded-lg font-bold text-xs sm:text-sm shadow-md flex items-center gap-1 sm:gap-2 cursor-pointer"
              >
                <span className="material-icons-round text-base">logout</span>
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
