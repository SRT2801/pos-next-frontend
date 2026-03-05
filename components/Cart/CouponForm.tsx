import { FormEvent } from "react";
import { useStore } from "@/src/store";

export default function CouponForm() {

  const applyCoupon = useStore(state => state.applyCoupon);
  const coupon = useStore(state => state.coupon);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const couponName = formData.get("coupon_name")?.toString()!
    if (!couponName.length) return
    await applyCoupon(couponName);
  }

  return (
    <>
      <div className="pt-3 border-t border-slate-200">
        <p className="text-xs font-bold text-slate-500 uppercase mb-2">Cupón de descuento</p>
        <form
          className="flex gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="Ingresa un cupón"
            name="coupon_name"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-lg transition-colors cursor-pointer"
          >
            Canjear
          </button>
        </form>

        {coupon.message ? (
          <p className={`mt-2 text-center text-xs font-bold ${coupon.percentage ? "text-emerald-600" : "text-red-500"}`}>
            {coupon.message}
          </p>
        ) : null}
      </div>
    </>
  )
}
