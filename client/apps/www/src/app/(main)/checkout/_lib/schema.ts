import { PaymentMethod, type ProceedCheckoutInput } from "@/client";
import { nativeEnum, string, withSchema } from "@repo/utils/zod";

export const checkoutSchema = withSchema<ProceedCheckoutInput>()({
  paymentMethod: nativeEnum(PaymentMethod, "Payment Method is required"),
  addressId: string().min(1, "Address is required"),
});
