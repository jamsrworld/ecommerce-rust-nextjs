"use client";

import { type Route } from "next";
import { ProductBrand } from "./product-brand";
import { ProductCategory } from "./product-category";
import { ProductDescription } from "./product-description";
import { ProductDetails } from "./product-details";
import { ProductHighlights } from "./product-highlights";
import { ProductImages } from "./product-images";
import { ProductInformation } from "./product-information";
import { ProductSaveFooter } from "./product-save";
import { ProductSeo } from "./product-seo";
import { ProductStatusCard } from "./product-status";
import { ProductTags } from "./product-tags";
import { ProductVideo } from "./product-videos";

type Props = {
  isMutating: boolean;
  productPreviewUrl?: Route;
};

export const ProductForm = (props: Props) => {
  const { isMutating, productPreviewUrl } = props;
  return (
    <>
      <div className="relative grid grid-cols-12 gap-4">
        <div className="col-span-8 grid gap-4">
          <ProductInformation />
          <ProductImages />
          <ProductVideo />
          <ProductDetails />
          <ProductHighlights />
          <ProductDescription />
          <ProductTags />
          <ProductSeo />
        </div>
        <div className="col-span-4 flex flex-col gap-4">
          <ProductStatusCard />
          <ProductCategory />
          <ProductBrand />
        </div>
      </div>
      <ProductSaveFooter
        isMutating={isMutating}
        productPreviewUrl={productPreviewUrl}
      />
    </>
  );
};
