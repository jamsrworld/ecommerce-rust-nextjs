"use client";

import { type CreateProductInput } from "@/client";
import { createProductMutation } from "@/client/@tanstack/react-query.gen";
import { RHFProvider } from "@jamsr-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ProductBrand } from "./product-brand";
import { ProductCategory } from "./product-category";
import { ProductDescription } from "./product-description";
import { ProductDetails } from "./product-details";
import { ProductHighlights } from "./product-highlights";
import { ProductImages } from "./product-images";
import { ProductInformation } from "./product-information";
import { ProductSave } from "./product-save";
import { ProductSeo } from "./product-seo";
import { ProductStatus } from "./product-status";
import { ProductTags } from "./product-tags";
import { ProductVideo } from "./product-videos";

export const ProductCreateForm = () => {
  const defaultValues: CreateProductInput = {
    brand: "",
    category: "",
    color: "",
    description: "",
    highlights: [],
    images: [],
    isReturnable: false,
    maximumOrder: 0,
    minimumOrder: 0,
    mrp: 0,
    price: 0,
    seo: {
      description: "",
      keywords: [],
      title: "",
    },
    size: "",
    skuId: "",
    status: "Public",
    stock: 0,
    style: "",
    tags: [],
    title: "",
    video: {
      thumbnail: "",
      url: "",
    },
  };
  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit } = methods;

  const mutation = useMutation({
    ...createProductMutation({}),
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({
      body: data,
    });
  });

  return (
    <RHFProvider
      methods={methods}
      isPending={false}
      onSubmit={onSubmit}
    >
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
          <ProductStatus />
          <ProductCategory />
          <ProductBrand />
        </div>
      </div>
      <ProductSave />
    </RHFProvider>
  );
};
