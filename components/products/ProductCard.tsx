import { Product } from "@/src/schemas";
import { formatCurrency, getImagePath, isAvalilable } from "@/src/utils";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

export default function ProductCard({ product }: { product: Product }) {
    const available = isAvalilable(product.inventory);

    return (
        <div className="bg-surface-light rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-primary/20 group">
            <div className={`${!available && "grayscale"} relative bg-slate-100 rounded-xl overflow-hidden aspect-square mb-4`}>
                {available ? (
                    <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-black px-2 py-1 rounded-md z-10">
                        STOCK: {product.inventory}
                    </span>
                ) : (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                        <div className="-rotate-12 bg-red-600 border-4 border-white px-10 py-3 shadow-xl">
                            <p className="text-white text-2xl font-bold uppercase tracking-widest text-center">Agotado</p>
                        </div>
                    </div>
                )}
                <Image
                    src={getImagePath(product.image)}
                    alt={`imagen de producto ${product.name}`}
                    width={400}
                    height={400}
                    priority
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            <h3 className="font-bold text-lg mb-1 text-slate-900 line-clamp-2 leading-tight">
                {product.name}
            </h3>

            <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-extrabold">{formatCurrency(product.price)}</span>
                {available && (
                    <AddProductButton product={product} />
                )}
            </div>
        </div>
    )
}