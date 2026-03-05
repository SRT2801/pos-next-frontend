"use server";

import { serverApiFetch } from "@/services/serverApi";
import { ErrorResponseSchema, ProductFormSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function addProduct(
  prevState: ActionStateType,
  formData: FormData,
) {
  console.log("desde addProductAction");

  const product = ProductFormSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    image: formData.get("image"),
    inventory: formData.get("inventory"),
    categoryId: formData.get("categoryId"),
  });

  if (!product.success) {
    return {
      errors: product.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  try {
    await serverApiFetch("/products", {
      method: "POST",
      body: JSON.stringify(product.data),
    });

    return {
      errors: [],
      success: "Producto agregado exitosamente",
    };
  } catch (error: any) {
    if (error?.message) {
      const errors = ErrorResponseSchema.safeParse(error);
      if (errors.success) {
        return {
          errors: errors.data.message.map((issue) => issue),
          success: "",
        };
      }
    }
    return {
      errors: ["Error al agregar el producto"],
      success: "",
    };
  }
}
