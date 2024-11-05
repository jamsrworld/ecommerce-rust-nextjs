import {
  Card,
  CardContent,
  CardHeader,
  RHFInput,
  RHFTagsInput,
  RHFTextarea
} from "@jamsr-ui/react";
import { type ProductCreateSchema } from "../types";

type FormValues = ProductCreateSchema;

export const ProductSeo = () => {
  return (
    <Card>
      <CardHeader heading="Product Seo" />
      <CardContent className="grid gap-4">
        <RHFInput<FormValues>
          name="seo.title"
          label="Meta Title"
        />
        <RHFTextarea<FormValues>
          name="seo.description"
          label="Meta Description"
        />
        <RHFTagsInput<FormValues>
          name="seo.keywords"
          label="Meta Keywords"
        />
      </CardContent>
    </Card>
  );
};
