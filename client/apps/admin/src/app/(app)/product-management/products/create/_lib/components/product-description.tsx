import { Card, CardContent, CardHeader, Textarea } from "@jamsr-ui/react";

export const ProductDescription = () => {
  return (
    <Card>
      <CardHeader heading="Product Description" />
      <CardContent>
        <Textarea placeholder="Enter product description" />
      </CardContent>
    </Card>
  );
};
