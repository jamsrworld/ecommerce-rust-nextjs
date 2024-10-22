import {
  Card,
  CardContent,
  CardHeader,
  Input,
  Textarea,
} from "@jamsr-ui/react";

export const ProductSeo = () => {
  return (
    <Card>
      <CardHeader heading="Product Seo" />
      <CardContent className="grid gap-4">
        <Input label="Meta Title" />
        <Textarea label="Meta Description" />
        <Input label="Meta Keywords" />
      </CardContent>
    </Card>
  );
};
