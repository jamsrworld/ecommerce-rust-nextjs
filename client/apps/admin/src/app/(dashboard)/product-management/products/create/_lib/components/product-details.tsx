import { Card, CardContent, CardHeader, RHFInput } from "@jamsr-ui/react";
import { type ProductCreateSchema } from "../types";

export const ProductDetails = () => {
  return (
    <Card>
      <CardHeader heading="Product Details" />
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <RHFInput<ProductCreateSchema>
          name="details.color"
          label="Color"
        />
        <RHFInput<ProductCreateSchema>
          name="details.color"
          label="Size"
        />
        <RHFInput<ProductCreateSchema>
          name="details.color"
          label="Style"
        />
      </CardContent>
    </Card>
  );
};
