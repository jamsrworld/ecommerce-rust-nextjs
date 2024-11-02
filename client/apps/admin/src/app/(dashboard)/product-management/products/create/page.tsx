import { type Metadata } from "next";
import { ProductDescription } from "./_lib/components/product-description";
import { ProductDetails } from "./_lib/components/product-details";
import { ProductImages } from "./_lib/components/product-images";
import { ProductInformation } from "./_lib/components/product-information";
import { ProductSeo } from "./_lib/components/product-seo";
import { ProductTags } from "./_lib/components/product-tags";

export const metadata: Metadata = {
  title: "Create Product",
};

const page = () => {
  return (
    <div className="grid gap-4">
      <ProductInformation />
      <ProductImages />
      <ProductDetails />
      <ProductDescription />
      <ProductTags />
      <ProductSeo />
    </div>
  );
};

export default page;
