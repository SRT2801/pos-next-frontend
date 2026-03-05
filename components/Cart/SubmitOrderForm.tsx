import { submitOrderAction } from "@/actions/submit-order-action"
import { useActionState, useEffect } from "react"
import { useStore } from "@/src/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/services/AuthService";
import LoadingOverlay from "../ui/LoadingOverlay";


export default function SubmitOrderForm() {

    const router = useRouter()
    const total = useStore((state) => state.total)
    const coupon = useStore((state) => state.coupon.name)
    const contents = useStore((state) => state.contents)
    const clearOrder = useStore((state) => state.clearOrder)
    const order = {
        total,
        coupon,
        contents
    }

    const submitOrderWithData = submitOrderAction.bind(null, order)


    const [state, dispatch, isPending] = useActionState(submitOrderWithData, {
        errors: [],
        success: ""
    })

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach((error) => toast.error(error))
        }

        if (state.success) {
            toast.success(state.success)
            clearOrder()
        }
    }, [state.success])

    const handleSubmit = (formData: FormData) => {
        if (!isAuthenticated()) {
            toast.error("Debes iniciar sesión para realizar una compra")
            router.push("/login")
            return
        }
        dispatch(formData)
    }

    return (
        <>
            <LoadingOverlay
                isLoading={isPending}
                message="Realizando compra..."
            />

            <form action={handleSubmit}>

                <input type="submit"
                    className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    value={"Confirmar Compra"}
                    disabled={isPending} />
            </form>
        </>
    )
}
