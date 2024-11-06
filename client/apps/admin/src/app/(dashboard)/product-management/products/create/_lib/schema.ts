import { type CreateProductInput } from "@/client";
import { coerceNumber, string, withSchema } from "@repo/utils/zod";
import { any, array, boolean, number, record } from "zod";

export const productCreateSchema = withSchema<CreateProductInput>()({
  brand: string().min(1, "Brand is required"),
  category: string().min(1, "Category is required"),
  color: string().min(1, "Color is required"),
  description: record(any()),
  highlights: array(
    withSchema<CreateProductInput["highlights"][number]>()({
      description: string().min(1, "Description is required"),
      highlight: string().min(1, "Highlight is required"),
    }),
  ),
  images: string().min(1, "Images is required"),
  isReturnable: boolean(),
  maximumOrder: coerceNumber(number().positive(), "Maximum order is required"),
  minimumOrder: coerceNumber(number().positive(), "Maximum order is required"),
  mrp: coerceNumber(number().positive(), "MRP is required"),
  price: coerceNumber(number().positive(), "Price is required"),
  size: string().min(1, "Size is required"),
  style: string().min(1, "Style is required"),
  title: string().min(1, "Title is required"),
  status: string().min(1, "Status is required"),
  tags: string().min(1, "Tags is required"),
  seo: string().min(1, "Seo is required"),
  skuId: string().min(1, "Sku id is required"),
  stock: string().min(1, "Stock is required"),
  video: string().min(1, "Video is required"),
});
