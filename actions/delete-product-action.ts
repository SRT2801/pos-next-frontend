"use server";

import { revalidatePath } from "next/cache";
import { serverApiFetch } from "@/services/serverApi";
import { ErrorResponseSchema, Product } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function deleteProduct(
  productId: Product["id"],
  prevState: ActionStateType,
  _formData: FormData,
) {
  try {
    await serverApiFetch(`/products/${productId}`, {
      method: "DELETE",
    });

    revalidatePath("/admin/products");

    return {
      errors: [],
      success: "Producto eliminado exitosamente",
    };
  } catch (error: unknown) {
    const parsedErrors = ErrorResponseSchema.safeParse(error);

    if (parsedErrors.success) {
      return {
        errors: parsedErrors.data.message,
        success: "",
      };
    }

    return {
      errors: prevState.errors.length
        ? prevState.errors
        : ["Error al eliminar el producto"],
      success: "",
    };
  }
}
