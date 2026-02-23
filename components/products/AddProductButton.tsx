"use client";

import { Product } from "@/src/schemas";
import { useStore } from "@/src/store";

export default function AddProductButton({ product }: { product: Product }) {

    const addToCart = useStore(state => state.addToCart);

    return (
        <button
            type="button"
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-full cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={() => addToCart(product)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Agregar
        </button>
    )
}
