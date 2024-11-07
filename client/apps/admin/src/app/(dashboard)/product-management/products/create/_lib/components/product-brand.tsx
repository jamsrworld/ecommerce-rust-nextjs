import { type CreateProductInput } from "@/client";
import {
  Card,
  CardContent,
  CardHeader,
  RHFSelect,
  SelectItem,
} from "@jamsr-ui/react";

export const ProductBrand = () => {
  return (
    <Card>
      <CardHeader heading="Product Brand" />
      <CardContent>
        <RHFSelect<CreateProductInput> name="brand">
          <SelectItem value="t-shirt">T-shirt</SelectItem>
          <SelectItem value="pants">Pants</SelectItem>
          <SelectItem value="shoes">Shoes</SelectItem>
          <SelectItem value="jewellery">Jewellery</SelectItem>
          <SelectItem value="accessories">Accessories</SelectItem>
          <SelectItem value="bags">Bags</SelectItem>
          <SelectItem value="watches">Watches</SelectItem>
          <SelectItem value="sunglasses">Sunglasses</SelectItem>
          <SelectItem value="earrings">Earrings</SelectItem>
          <SelectItem value="necklace">Necklace</SelectItem>
          <SelectItem value="ring">Ring</SelectItem>
          <SelectItem value="bracelet">Bracelet</SelectItem>
          <SelectItem value="handbag">Handbag</SelectItem>
          <SelectItem value="other">Other</SelectItem>
          <SelectItem value="all">All</SelectItem>
        </RHFSelect>
      </CardContent>
    </Card>
  );
};
