import { getProduct, type Product } from "@/client";
import { cache } from "react";

export const getProductData = cache(async (id: Product["id"]) => {
  return getProduct({
    path: {
      id,
    },
  });
});
