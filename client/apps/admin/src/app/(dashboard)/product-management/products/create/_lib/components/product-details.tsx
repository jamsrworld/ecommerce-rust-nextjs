import { type CreateProductInput } from "@/client";
import { Card, CardContent, CardHeader, RHFInput } from "@jamsr-ui/react";

type FormValues = CreateProductInput;
export const ProductDetails = () => {
  return (
    <Card>
      <CardHeader
        heading={
          <>
            Product Details
            <span className="text-danger">*</span>
          </>
        }
      />
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <RHFInput<FormValues>
          name="color"
          label="Color"
        />
        <RHFInput<FormValues>
          name="size"
          label="Size"
        />
        <RHFInput<FormValues>
          name="style"
          label="Style"
        />
      </CardContent>
    </Card>
  );
};
