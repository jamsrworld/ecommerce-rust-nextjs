"use client";

import { ProductStatus, type CreateProductInput } from "@/client";
import { createProductMutation } from "@/client/@tanstack/react-query.gen";
import { APP_ROUTES } from "@/config/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFProvider } from "@jamsr-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { productCreateSchema } from "../schema";
import { ProductForm } from "./product-form";

export const ProductCreateForm = () => {
  const router = useRouter();
  const defaultValues: CreateProductInput = {
    brand: "",
    category: "",
    color: "",
    description: {},
    highlights: [],
    images: [],
    isReturnable: false,
    maximumOrder: 10,
    minimumOrder: 1,
    mrp: "",
    price: "",
    seo: {
      description: "",
      keywords: [],
      title: "",
    },
    size: "",
    skuId: "",
    status: ProductStatus.UNLISTED,
    stock: "",
    style: "",
    tags: new Set([]),
    title: "",
    video: {
      thumbnail: {
        height: 0,
        name: "",
        placeholder: "",
        url: "",
        width: 0,
      },
      url: "",
    },
  };
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(productCreateSchema),
  });
  const { handleSubmit } = methods;

  const mutation = useMutation({
    ...createProductMutation({}),
  });

  const onSubmit = handleSubmit(
    (data) => {
      mutation.mutate(
        {
          body: data,
        },
        {
          onSuccess() {
            router.push(APP_ROUTES.productManagement.products.root);
          },
        },
      );
    },
    (e) => {
      console.log("e:->", e);
    },
  );

  return (
    <RHFProvider
      methods={methods}
      isPending={false}
      onSubmit={onSubmit}
    >
      <ProductForm isMutating={mutation.isPending} />
    </RHFProvider>
  );
};
