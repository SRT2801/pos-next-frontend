'use client';

import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { logout, getUser } from '@/services/AuthService';

interface AdminSidebarProps {
    visible: boolean;
    onHide: () => void;
}

export default function AdminSidebar({ visible, onHide }: AdminSidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const user = getUser();

    const handleLogout = () => {
        logout();
        router.push('/login');
        onHide();
    };

    const isActive = (path: string) => pathname.startsWith(path);
    const [productosOpen, setProductosOpen] = useState(() => pathname.startsWith('/admin/products'));

    return (
        <Sidebar
            visible={visible}
            onHide={onHide}
            className="w-72"
            header={
                <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                    POS<span className="text-emerald-500">.next</span>
                </span>
            }
        >
            <div className="flex flex-col h-full">
                {/* Menú */}
                <div className="flex-1 overflow-y-auto py-4">
                    <div className="px-2 mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Administración
                        </span>
                    </div>
                    <ul className="space-y-1">
                        {/* Productos con submenú */}
                        <li>
                            <button
                                onClick={() => setProductosOpen(!productosOpen)}
                                className={`p-ripple flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors no-underline w-full cursor-pointer ${isActive('/admin/products')
                                        ? 'bg-emerald-500 text-white shadow-md'
                                        : 'text-slate-700 hover:bg-slate-100'
                                    }`}
                            >
                                <i className="pi pi-box text-base"></i>
                                <span>Productos</span>
                                <i className={`pi pi-chevron-down ml-auto text-xs transition-transform duration-200 ${productosOpen ? 'rotate-180' : ''}`}></i>
                                <Ripple />
                            </button>
                            <ul className={`overflow-hidden transition-all duration-300 ${productosOpen ? 'max-h-40 mt-1' : 'max-h-0'}`}>
                                <li>
                                    <Link
                                        href="/admin/products"
                                        onClick={() => onHide()}
                                        className="p-ripple flex items-center gap-3 pl-10 pr-3 py-2 rounded-lg text-sm transition-colors no-underline text-slate-600 hover:bg-slate-100"
                                    >
                                        <i className="pi pi-list text-xs"></i>
                                        <span>Ver Productos</span>
                                        <Ripple />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/products/new"
                                        onClick={() => onHide()}
                                        className="p-ripple flex items-center gap-3 pl-10 pr-3 py-2 rounded-lg text-sm transition-colors no-underline text-slate-600 hover:bg-slate-100"
                                    >
                                        <i className="pi pi-plus text-xs"></i>
                                        <span>Crear Producto</span>
                                        <Ripple />
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {/* Ventas */}
                        <li>
                            <Link
                                href="/admin/sales"
                                onClick={() => onHide()}
                                className={`p-ripple flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors no-underline ${isActive('/admin/sales')
                                        ? 'bg-emerald-500 text-white shadow-md'
                                        : 'text-slate-700 hover:bg-slate-100'
                                    }`}
                            >
                                <i className="pi pi-chart-line text-base"></i>
                                <span>Ventas</span>
                                <Ripple />
                            </Link>
                        </li>

                        {/* Ir a la Tienda */}
                        <li>
                            <Link
                                href="/"
                                onClick={() => onHide()}
                                className="p-ripple flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors no-underline text-slate-700 hover:bg-slate-100"
                            >
                                <i className="pi pi-shopping-cart text-base"></i>
                                <span>Ir a la Tienda</span>
                                <Ripple />
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Footer - Usuario */}
                {user && (
                    <div className="border-t border-slate-200 pt-4">
                        <div className="flex items-center gap-3 mb-3 px-1">
                            <Avatar
                                icon="pi pi-user"
                                shape="circle"
                                className="bg-emerald-500 text-white"
                                style={{ width: '2.5rem', height: '2.5rem' }}
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-slate-800">{user.email}</span>
                                <span className="text-xs text-slate-400">Administrador</span>
                            </div>
                        </div>
                        <Button
                            onClick={handleLogout}
                            icon="pi pi-sign-out"
                            label="Cerrar Sesión"
                            className="w-full"
                            severity="danger"
                            outlined
                            size="small"
                        />
                    </div>
                )}
            </div>
        </Sidebar>
    );
}
