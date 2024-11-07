import { ProductStatus, type CreateProductInput } from "@/client";
import {
  coerceNumber,
  nativeEnum,
  string,
  withEmptyString,
  withSchema,
  zodImage,
} from "@repo/utils/zod";
import { any, array, boolean, number, record, set } from "zod";

const highlights = withSchema<CreateProductInput["highlights"][number]>()({
  description: withEmptyString(string().min(1, "Description is required")),
  highlight: string().min(1, "Highlight is required"),
});

const video = withSchema<CreateProductInput["video"]>()({
  url: withEmptyString(string().min(1, "Url is required")),
  thumbnail: zodImage("Thumbnail is required"),
});

const seo = withSchema<CreateProductInput["seo"]>()({
  title: withEmptyString(string().min(1, "Title is required")),
  description: withEmptyString(string().min(1, "Description is required")),
  keywords: array(string().min(1, "Keyword is required")),
});

export const productCreateSchema = withSchema<CreateProductInput>()({
  brand: string().min(1, "Brand is required"),
  category: string().min(1, "Category is required"),
  color: string().min(1, "Color is required"),
  description: record(any()),
  highlights: array(highlights),
  images: array(zodImage("Images are required")).min(
    4,
    "Minimum 4 images are required",
  ),
  isReturnable: boolean(),
  maximumOrder: coerceNumber(number().positive(), "Maximum order is required"),
  minimumOrder: coerceNumber(number().positive(), "Maximum order is required"),
  mrp: coerceNumber(number().positive(), "MRP is required"),
  price: coerceNumber(number().positive(), "Price is required"),
  stock: coerceNumber(number().positive(), "Stock is required"),
  size: string().min(1, "Size is required"),
  style: string().min(1, "Style is required"),
  title: string().min(1, "Title is required"),
  status: nativeEnum(ProductStatus, "Status is required"),
  tags: set(string().min(1, "Tag is required")).transform((val) => [...val]),
  skuId: string().min(1, "Sku id is required"),
  video,
  seo,
});

productCreateSchema._type satisfies CreateProductInput;
