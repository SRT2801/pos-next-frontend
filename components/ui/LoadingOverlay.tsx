"use client"

import TruckLoader from "./TruckLoader"

interface LoadingOverlayProps {
    isLoading: boolean
    message?: string
}

export default function LoadingOverlay({ isLoading, message = "Procesando..." }: LoadingOverlayProps) {
    if (!isLoading) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all">
            <div className="flex flex-col items-center gap-6 rounded-2xl bg-white px-14 py-10 shadow-2xl">
                <TruckLoader />
                <p className="text-lg font-semibold text-gray-700">{message}</p>
            </div>
        </div>
    )
}
