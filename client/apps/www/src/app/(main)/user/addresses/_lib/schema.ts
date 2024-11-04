import { type CreateAddressInput } from "@/client";
import { coerceNumber, string, withSchema } from "@repo/utils/zod";
import { literal, number } from "zod";

export const createAddressSchema = withSchema<CreateAddressInput>()({
  firstName: string()
    .min(1, "First Name is required")
    .max(20, "Maximum 20 characters are allowed"),
  lastName: string()
    .min(1, "Last Name is required")
    .max(20, "Maximum 20 characters are allowed"),
  city: string()
    .min(1, "City is required")
    .max(50, "Maximum 50 characters are allowed"),
  fullAddress: string()
    .min(1, "Full Address is required")
    .max(300, "Maximum 300 characters are allowed"),
  landmark: string()
    .min(1, "Landmark is required")
    .max(200, "Maximum 200 characters are allowed")
    .or(literal("")),
  phoneNumber: string().min(1, "Phone Number is required"),
  postalCode: coerceNumber(number(), "Postal Code is required"),
  state: string()
    .min(1, "State is required")
    .max(50, "Maximum 50 characters are allowed"),
});

createAddressSchema._type satisfies CreateAddressInput;
