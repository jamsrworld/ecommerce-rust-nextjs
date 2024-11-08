import { Button } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { AddIcon } from "@repo/icons";
import { type Metadata } from "next";
import { ProductsTable } from "./components";

export const metadata: Metadata = {
  title: "Products",
};

const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          as={NextLink}
          href="/product-management/products/create"
          startContent={<AddIcon />}
        >
          Add Product
        </Button>
      </div>
      <ProductsTable />
    </div>
  );
};

export default Page;
