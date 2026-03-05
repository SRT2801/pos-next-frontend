"use client";

import { Product } from "@/src/schemas";
import { useStore } from "@/src/store";

export default function AddProductButton({ product }: { product: Product }) {

    const addToCart = useStore(state => state.addToCart);

    return (
        <button
            type="button"
            className="bg-primary hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-1 transition-colors cursor-pointer"
            onClick={() => addToCart(product)}
        >
            <span className="material-icons-round text-lg">add</span>
            Agregar
        </button>
    )
}
