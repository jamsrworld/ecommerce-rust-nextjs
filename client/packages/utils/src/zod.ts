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
    .min(1, "Email address is required")
    .email("Please enter a valid email address")
    .toLowerCase();

export const coerceNumber = (schema: ZodNumber, message: string) =>
  string().min(1, message).transform(Number);

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
