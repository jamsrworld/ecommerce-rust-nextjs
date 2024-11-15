import { type CreateProductInput } from "@/client";
import { Card, CardContent, CardHeader, RHFEditor } from "@jamsr-ui/react";

export const ProductDescription = () => {
  return (
    <Card>
      <CardHeader
        heading={
          <>
            Product Description
            <span className="text-success">*</span>
          </>
        }
      />
      <CardContent>
        <RHFEditor<CreateProductInput>
          name="description"
          placeholder="Enter product description"
        />
      </CardContent>
    </Card>
  );
};
