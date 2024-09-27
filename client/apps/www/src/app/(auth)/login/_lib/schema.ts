import { type AuthLogin } from "@/api";
import { email, string, withSchema } from "@repo/utils/zod";

export const loginSchema = withSchema<AuthLogin>()({
  email: email(),
  password: string().min(1, "Password is required"),
});
