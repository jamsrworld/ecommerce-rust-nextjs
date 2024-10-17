/* eslint-disable @typescript-eslint/naming-convention */
import { string as _string, object, type z, type ZodNumber } from "zod";

type Implements<Model> = {
  [key in keyof Model]-?: undefined extends Model[key]
    ? null extends Model[key]
      ? z.ZodNullableType<z.ZodOptionalType<z.ZodType<Model[key]>>>
      : z.ZodOptionalType<z.ZodType<Model[key]>>
    : null extends Model[key]
      ? z.ZodNullableType<z.ZodType<Model[key]>>
      : z.ZodType<Model[key]> | z.ZodEffects<z.ZodString, Model[key], string>;
};

export const string = () => _string().trim();
export const id = () => string().min(24);
export const email = () =>
  string()
    .min(1, "Email Address is required")
    .email("Please enter a valid email address")
    .toLowerCase();

export const coerceNumber = (schema: ZodNumber, message: string) =>
  string().min(1, message).transform(Number).pipe(schema).or(schema);

function schema<Model = never>() {
  return {
    with: <
      Schema extends Implements<Model> & {
        [unknownKey in Exclude<keyof Schema, keyof Model>]: never;
      },
    >(
      schema: Schema
    ) => object(schema),
  };
}

export const withSchema = <T extends Record<string, unknown>>() =>
  schema<T>().with;

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
