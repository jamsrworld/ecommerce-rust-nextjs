import { getProduct, type Product } from "@/client";
import { cache } from "react";

export const getProductData = cache(async (id: Product["id"]) => {
  const { data, error } = await getProduct({
    path: {
      id,
    },
  });
  return { data, error };
});
