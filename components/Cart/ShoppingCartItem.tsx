import { CartItem } from "@/src/schemas";
import { formatCurrency, getImagePath } from "@/src/utils";
import Image from "next/image";
import { useStore } from "@/src/store";

export default function ShoppingCartItem({ item }: { item: CartItem }) {

    const updateQuantity = useStore(state => state.updateQuantity);
    const removeFromCart = useStore(state => state.removeFromCart);

    return (
        <div className="flex gap-4 group">
            <div className="w-20 h-20 bg-slate-100 rounded-xl flex-shrink-0 overflow-hidden">
                <Image
                    src={getImagePath(item.image)}
                    alt={`Imagen del producto ${item.name}`}
                    width={80}
                    height={80}
                    priority
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm leading-tight mb-1">{item.name}</h4>
                    <button
                        type="button"
                        onClick={() => removeFromCart(item.productId)}
                        className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                        <span className="material-icons-round text-lg">close</span>
                    </button>
                </div>
                <p className="text-primary font-bold text-sm mb-3">{formatCurrency(item.price)}</p>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
                        onClick={() => item.quantity > 1 && updateQuantity(item.productId, item.quantity - 1)}
                    >
                        <span className="material-icons-round text-sm">remove</span>
                    </button>
                    <span className="font-bold">{item.quantity}</span>
                    <button
                        type="button"
                        className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer"
                        onClick={() => item.quantity < item.inventory && updateQuantity(item.productId, item.quantity + 1)}
                    >
                        <span className="material-icons-round text-sm">add</span>
                    </button>
                </div>
            </div>
        </div>
    )
}