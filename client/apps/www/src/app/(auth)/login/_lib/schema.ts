import { type AuthLogin } from "@/api";
import { string, withSchema } from "@repo/utils/zod";

export const loginSchema = withSchema<AuthLogin>()({
  email: string().min(1, "Email is required").email(),
  password: string().min(1, "Password is required"),
});
