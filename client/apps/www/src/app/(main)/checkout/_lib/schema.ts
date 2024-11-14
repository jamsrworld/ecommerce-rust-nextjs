import { PaymentMethod } from "@/client";
import { nativeEnum } from "@repo/utils/zod";
import { object } from "zod";

export const checkoutSchema = object({
  paymentMethod: nativeEnum(PaymentMethod, "Payment Method is required"),
});
