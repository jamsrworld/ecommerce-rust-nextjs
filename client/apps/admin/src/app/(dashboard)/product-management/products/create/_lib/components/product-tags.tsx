import { type CreateProductInput } from "@/client";
import { Card, CardContent, CardHeader, RHFTagsInput } from "@jamsr-ui/react";

export const ProductTags = () => {
  return (
    <Card>
      <CardHeader heading="Product Tags" />
      <CardContent>
        <RHFTagsInput<CreateProductInput>
          name="tags"
          placeholder="Enter your tags"
        />
      </CardContent>
    </Card>
  );
};
