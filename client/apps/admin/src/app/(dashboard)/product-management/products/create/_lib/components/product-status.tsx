import {
  Card,
  CardContent,
  CardHeader,
  RHFSelect,
  SelectItem,
} from "@jamsr-ui/react";
import { type ProductCreateSchema } from "../types";

export const ProductStatus = () => {
  return (
    <Card>
      <CardHeader heading="Product Status" />
      <CardContent>
        <RHFSelect<ProductCreateSchema> name="visibility">
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="private">Private</SelectItem>
          <SelectItem value="unlisted">Unlisted</SelectItem>
        </RHFSelect>
      </CardContent>
    </Card>
  );
};
