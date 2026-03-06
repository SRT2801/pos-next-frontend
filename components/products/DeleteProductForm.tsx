"use client";

import { deleteProduct } from "@/actions/delete-product-action";
import { Product } from "@/src/schemas";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";


type DeleteProductFormProps = {
    productId: Product["id"];
    className?: string;
    children?: React.ReactNode;
};

export default function DeleteProductForm({ productId, className = "", children }: DeleteProductFormProps) {
    const router = useRouter();
    const deleteProductWithId = deleteProduct.bind(null, productId);

    const [state, dispatch, isPending] = useActionState(deleteProductWithId, {
        errors: [],
        success: "",
    });

    useEffect(() => {
        if (state.errors.length) {
            state.errors.forEach((error) => toast.error(error));
        }

        if (state.success) {
            toast.success(state.success);
            router.refresh();
        }
    }, [state, router]);


    return (

        <form action={dispatch}>
            <button
                type="submit"
                disabled={isPending}
                className={`cursor-pointer disabled:opacity-60 ${className}`}
                title="Eliminar"
                aria-label="Eliminar producto"
            >
                {isPending ? <i className="pi pi-spinner pi-spin" /> : (children ?? "Eliminar")}
            </button>

        </form>
    )
}
