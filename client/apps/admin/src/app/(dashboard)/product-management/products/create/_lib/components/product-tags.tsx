import { Card, CardContent, CardHeader, Textarea } from "@jamsr-ui/react";

export const ProductTags = () => {
  return (
    <Card>
      <CardHeader heading="Product Tags" />
      <CardContent>
        <Textarea placeholder="Enter your tags" />
      </CardContent>
    </Card>
  );
};
