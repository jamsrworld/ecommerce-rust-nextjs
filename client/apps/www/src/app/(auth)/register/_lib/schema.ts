import { type AuthRegister, type AuthRegisterVerify } from "@/client";
import { email, otpCode, string, withSchema } from "@repo/utils/zod";

const baseSchema = withSchema<AuthRegister>()({
  email: email(),
  fullName: string().min(1, "Full Name is required"),
  password: string().min(1, "Password is required"),
  confirmPassword: string().min(1, "Confirm Password is required"),
});

export const registerSchema = baseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  },
);

const registerVerifySchemaBase = withSchema<Pick<AuthRegisterVerify, "code">>()(
  {
    code: otpCode(),
  },
);

export const registerVerifySchema = baseSchema.merge(registerVerifySchemaBase);
