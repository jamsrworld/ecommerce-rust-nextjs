import { type CreateAttributeInput } from "@/client";
import { string, withSchema } from "@repo/utils/zod";
import { array, object } from "zod";

export const createAttributeSchema = withSchema<CreateAttributeInput>()({
  name: string()
    .min(1, "Name is required")
    .max(50, "Maximum 50 characters are allowed"),
  values: array(
    object({
      value: string()
        .min(1, "Value is required")
        .max(50, "Maximum 50 characters are allowed"),
    }),
  ),
});
