import { Card, CardContent, CardHeader, Editor } from "@jamsr-ui/react";

export const ProductDescription = () => {
  return (
    <Card>
      <CardHeader heading="Product Description" />
      <CardContent>
        <Editor placeholder="Enter product description" />
      </CardContent>
    </Card>
  );
};
