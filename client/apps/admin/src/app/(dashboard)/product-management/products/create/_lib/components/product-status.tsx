import { type CreateProductInput, ProductStatus } from "@/client";
import {
  Card,
  CardContent,
  CardHeader,
  RHFSelect,
  SelectItem,
} from "@jamsr-ui/react";

export const ProductStatusCard = () => {
  return (
    <Card>
      <CardHeader heading="Product Status" />
      <CardContent>
        <RHFSelect<CreateProductInput> name="status">
          {Object.values(ProductStatus).map((item) => (
            <SelectItem
              key={item}
              value={item}
            >
              {item}
            </SelectItem>
          ))}
        </RHFSelect>
      </CardContent>
    </Card>
  );
};
