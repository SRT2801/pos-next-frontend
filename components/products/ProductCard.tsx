import { Product } from "@/src/schemas";
import { formatCurrency, getImagePath, isAvalilable } from "@/src/utils";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

export default function ProductCard({ product }: { product: Product }) {
    const available = isAvalilable(product.inventory);

    return (
        <div
            className='group rounded-2xl bg-white shadow-md hover:shadow-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 border border-gray-100'
        >
            {/* Imagen */}
            <div className={`${!available && "grayscale"} relative overflow-hidden`}>
                <Image
                    src={getImagePath(product.image)}
                    alt={`imagen de producto ${product.name}`}
                    width={400}
                    height={600}
                    priority
                    className="w-full aspect-square object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />

                {/* Overlay gradient en hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badge de stock */}
                {available ? (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                        Stock: {product.inventory}
                    </span>
                ) : (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="-rotate-12 bg-red-600 border-4 border-white px-10 py-3 shadow-xl">
                            <p className="text-white text-2xl font-bold uppercase tracking-widest text-center">Agotado</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Info del producto */}
            <div className="p-4 space-y-3">
                <h3 className="text-base font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors duration-200">
                    {product.name}
                </h3>

                <div className="flex items-end justify-between">
                    <p className="text-2xl font-extrabold text-gray-900">{formatCurrency(product.price)}</p>

                    {available && (
                        <AddProductButton product={product} />
                    )}
                </div>
            </div>
        </div>
    )
}