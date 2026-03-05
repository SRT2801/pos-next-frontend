"use client"

import { useStore } from "@/src/store"
import ShoppingCartItem from "./ShoppingCartItem"
import Amount from "./Amount"
import CouponForm from "./CouponForm"
import SubmitOrderForm from "./SubmitOrderForm"


export default function ShoppingCart() {

  const contents = useStore((state) => state.contents)
  const total = useStore((state) => state.total)
  const discount = useStore((state) => state.discount)

  return (
    <>
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-icons-round text-primary">shopping_cart</span>
          <h2 className="text-xl font-extrabold">Carrito</h2>
        </div>
        <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold">
          {contents.length} Ítems
        </span>
      </div>

      {contents.length ? (
        <>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {contents.map((item, index) => (
              <div key={item.productId}>
                <ShoppingCartItem item={item} />
                {index < contents.length - 1 && (
                  <div className="h-px bg-slate-100 mt-4"></div>
                )}
              </div>
            ))}
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
            <CouponForm />

            <div className="space-y-2 text-sm">
              {discount ? (
                <Amount label="Descuento" amount={discount} discount={true} />
              ) : null}
              <Amount label="Total" amount={total} />
            </div>

            <div className="pt-4 border-t border-slate-200">
              <SubmitOrderForm />
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <span className="material-icons-round text-6xl text-slate-300 mb-4 block">shopping_cart</span>
            <p className="text-slate-500 font-medium">No hay productos en el carrito</p>
          </div>
        </div>
      )}
    </>
  )
}
