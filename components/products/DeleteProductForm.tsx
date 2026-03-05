import { serverApiFetch } from "@/services/serverApi";
import { Product } from "@/src/schemas";
import { revalidatePath } from "next/cache";


export default function DeleteProductForm({ productId }: { productId: Product["id"] }) {

    const handleDeleteProduct = async () => {
        "use server"

        await serverApiFetch(`/products/${productId}`, {
            method: "DELETE",
        });
        revalidatePath("/admin/products")
    }

    return (

        <form action={handleDeleteProduct}>
            <input type="submit" className="text-red-600 hover:text-red-800 cursor-pointer" value={'Eliminar'} />

        </form>
    )
}
