import { type AuthForgotPassword, type AuthResetPassword } from "@/client";
import { email, otpCode, password, withSchema } from "@repo/utils/zod";

export const forgotPasswordSchema = withSchema<AuthForgotPassword>()({
  email: email(),
});

export const resetPasswordSchema = withSchema<AuthResetPassword>()({
  password: password("Password"),
  confirmPassword: password("Confirm Password"),
  email: email(),
  otp: otpCode(),
});
