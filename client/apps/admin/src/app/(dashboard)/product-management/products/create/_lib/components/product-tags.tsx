import { Card, CardContent, CardHeader, RHFTagsInput } from "@jamsr-ui/react";
import { type ProductCreateSchema } from "../types";

export const ProductTags = () => {
  return (
    <Card>
      <CardHeader heading="Product Tags" />
      <CardContent>
        <RHFTagsInput<ProductCreateSchema>
          name="tags"
          placeholder="Enter your tags"
        />
      </CardContent>
    </Card>
  );
};
