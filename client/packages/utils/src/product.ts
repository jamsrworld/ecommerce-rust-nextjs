export const getProductThumbnail = <T extends Record<string, unknown>>(
  product: T[]
): T => {
  return product[0]!;
};
