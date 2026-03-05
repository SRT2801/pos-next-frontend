"use client";

import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { logout, getUser } from '@/services/AuthService';
import { useRouter } from 'next/navigation';

export default function AdminNavClient() {
  const router = useRouter();
  const user = getUser();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-surface-dark text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
      <div className="flex items-center space-x-4 sm:space-x-8">
        <Logo />
        <div className="flex space-x-3 sm:space-x-6 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          <Link
            href={'/admin/products'}
            className="hover:text-emerald-400 transition-colors"
          >Productos</Link>

          <Link
            href={'/admin/sales'}
            className="hover:text-emerald-400 transition-colors"
          >Ventas</Link>
        </div>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-6">
        <Link
          href={'/'}
          className="bg-emerald-500 hover:bg-emerald-600 transition-colors px-3 sm:px-5 py-2 rounded-lg font-bold text-xs sm:text-sm shadow-md"
        >Tienda</Link>

        {user && (
          <>
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-xs text-slate-400">Sesión iniciada como</span>
              <span className="text-sm font-medium">{user.email}</span>
            </div>
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
  );
}
