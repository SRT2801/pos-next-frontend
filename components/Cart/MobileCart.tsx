"use client"

import { useState, useEffect } from "react"
import { useStore } from "@/src/store"
import ShoppingCart from "./ShoppingCart"

export default function MobileCart() {
    const [open, setOpen] = useState(false)
    const contents = useStore((state) => state.contents)
    const itemCount = contents.length

    // Close drawer when pressing Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false)
        }
        if (open) {
            document.addEventListener("keydown", handleEsc)
            document.body.style.overflow = "hidden"
        }
        return () => {
            document.removeEventListener("keydown", handleEsc)
            document.body.style.overflow = ""
        }
    }, [open])

    return (
        <div className="lg:hidden">
            {/* Floating cart button */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 z-40 bg-primary hover:bg-indigo-700 text-white w-14 h-14 rounded-full shadow-lg shadow-primary/30 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
            >
                <span className="material-icons-round text-2xl">shopping_cart</span>
                {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
                        {itemCount}
                    </span>
                )}
            </button>

            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-full max-w-100 bg-surface-light shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Close button */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 z-10 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                    <span className="material-icons-round text-2xl">close</span>
                </button>

                <ShoppingCart />
            </div>
        </div>
    )
}
