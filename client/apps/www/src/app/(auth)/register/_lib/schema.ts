import { type AuthRegister } from "@/api";
import { string, withSchema } from "@repo/utils/zod";

export const registerSchema = withSchema<AuthRegister>()({
  fullName: string(),
  email: string().min(1, "Email is required").email(),
  password: string().min(1, "Password is required"),
  confirmPassword: string().min(1, "Password is required"),
});