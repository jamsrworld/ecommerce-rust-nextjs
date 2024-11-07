/* eslint-disable @typescript-eslint/naming-convention */
import {
  string as _string,
  type EnumLike,
  literal,
  number,
  object,
  type RawCreateParams,
  type z,
  nativeEnum as zodNativeEnum,
  type ZodNumber,
  type ZodSchema,
} from "zod";

const MIN_PASSWORD_LENGTH = 8;
const OTP_LENGTH = 4;

export const withEmptyString = <T extends ZodSchema>(schema: T) =>
  schema.or(literal(""));
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

export const createZodError = (message: string): RawCreateParams => ({
  errorMap: (issue) => {
    switch (issue.code) {
      case "invalid_enum_value":
        return {
          message,
        };
      default:
        return {
          message,
        };
    }
  },
});

export const nativeEnum = <T extends EnumLike>(params: T, message: string) => {
  return zodNativeEnum(params, createZodError(message));
};

export const zodImage = (message: string, isOptional = false) =>
  object({
    name: string().default(""),
    width: number().default(0),
    height: number().default(0),
    placeholder: string().default(""),
    url: string().default(""),
  }).refine((item) => (isOptional ? true : item.url.length > 1), {
    message,
  });

export const zodFile = (message: string) =>
  object({
    name: string().default(""),
    size: number().default(0),
    url: string().default(""),
  }).refine((item) => item.url.length > 1, {
    message,
  });
