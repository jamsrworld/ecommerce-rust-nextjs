import {
  Card,
  CardContent,
  CardHeader,
  Select,
  SelectItem,
} from "@jamsr-ui/react";
import React from "react";

export const ProductCategory = () => {
  return (
    <Card>
      <CardHeader heading="Product Category" />
      <CardContent>
        <Select>
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
        </Select>
      </CardContent>
    </Card>
  );
};
