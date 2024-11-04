/* eslint-disable @typescript-eslint/naming-convention */
import { string as _string, object, type z, type ZodNumber } from "zod";

export const string = () => _string().trim();
export const cuid = () => string().min(24);
export const email = () =>
  string()
    .min(1, "Email Address is required")
    .email("Please enter a valid email address")
    .toLowerCase();

export const coerceNumber = (schema: ZodNumber, message: string) =>
  string().min(1, message).transform(Number).pipe(schema).or(schema);

export function withSchema<Model>() {
  return <Schema extends { [key in keyof Model]: z.ZodType<unknown> }>(
    schema: Schema
  ) => {
    return object(schema);
  };
}

const MIN_PASSWORD_LENGTH = 8;
const OTP_LENGTH = 4;

export const password = (name: string) =>
  string()
    .min(1, `${name} is required`)
    .min(
      MIN_PASSWORD_LENGTH,
      `${name} must be at least ${MIN_PASSWORD_LENGTH} characters`
    )
    .max(50, `${name} must be at most 50 characters`);

export const otpCode = (name?: string) =>
  string()
    .length(
      OTP_LENGTH,
      `${name ?? "OTP"} must be ${OTP_LENGTH} characters long`
    )
    .transform(Number);
