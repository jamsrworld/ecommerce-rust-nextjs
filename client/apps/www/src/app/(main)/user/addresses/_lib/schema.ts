import { type CreateAddressInput } from "@/api";
import { coerceNumber, string, withSchema } from "@repo/utils/zod";
import { literal, number } from "zod";

export const createAddressSchema = withSchema<CreateAddressInput>()({
  city: string().min(1, "City is required"),
  firstName: string().min(1, "First Name is required"),
  fullAddress: string().min(1, "Full Address is required"),
  landmark: string().min(1, "Landmark is required").or(literal("")),
  lastName: string().min(1, "Last Name is required"),
  phoneNumber: string().min(1, "Phone Number is required"),
  postalCode: coerceNumber(number(), "Postal Code is required"),
  state: string().min(1, "State is required"),
});
