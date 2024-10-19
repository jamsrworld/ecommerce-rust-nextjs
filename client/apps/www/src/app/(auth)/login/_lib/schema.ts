import { type AuthLoginInput } from "@/client";
import { email, string, withSchema } from "@repo/utils/zod";

export const loginSchema = withSchema<AuthLoginInput>()({
  email: email(),
  password: string().min(1, "Password is required"),
});
