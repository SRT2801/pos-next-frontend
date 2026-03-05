"use server";

import {
  ErrorResponseSchema,
  OrderSchema,
  SuccessResponseSchema,
} from "@/src/schemas";
import { serverApiFetch } from "@/services/serverApi";
import { revalidatePath } from "next/cache";

export async function submitOrderAction(
  data: unknown,
  prevState: { errors: string[]; success: string },
  formData: FormData,
) {
  const order = OrderSchema.parse(data);

  try {
    const json = await serverApiFetch("/transactions", {
      method: "POST",
      body: JSON.stringify({ ...order }),
    });

    const success = SuccessResponseSchema.parse(json);
    revalidatePath("/");

    return {
      errors: [],
      success: success.message,
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
      errors: ["Error al realizar la compra"],
      success: "",
    };
  }
}
