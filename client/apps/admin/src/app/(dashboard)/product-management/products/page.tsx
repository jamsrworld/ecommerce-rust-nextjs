import { Button } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

const Page = () => {
  return (
    <div>
      <Button
        as={NextLink}
        href="/product-management/products/create"
      >
        Add Product
      </Button>
    </div>
  );
};

export default Page;
