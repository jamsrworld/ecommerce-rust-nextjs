import { type CreateAddressInput } from "@/api";
import { coerceNumber, string, withSchema } from "@repo/utils/zod";
import { number } from "zod";

export const createAddressSchema = withSchema<CreateAddressInput>()({
  city: string().min(1, "City is required"),
  firstName: string().min(1, "First name is required"),
  fullAddress: string().min(1, "Full address is required"),
  landmark: string().min(1, "Landmark is required"),
  lastName: string().min(1, "Last name is required"),
  phoneNumber: string().min(1, "Phone number is required"),
  postalCode: coerceNumber(number(), "Postal Code is required"),
  state: string().min(1, "State is required"),
});
