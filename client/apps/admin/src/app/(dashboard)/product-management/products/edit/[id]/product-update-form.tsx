"use client";

import { type Product } from "@/client";
import { updateProductMutation } from "@/client/@tanstack/react-query.gen";
import { APP_ROUTES } from "@/config/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFProvider } from "@jamsr-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ProductForm } from "../../create/_lib/components/product-form";
import { productCreateSchema } from "../../create/_lib/schema";

type Props = {
  formData: Product;
};

export const ProductUpdateForm = (props: Props) => {
  const { formData } = props;
  const router = useRouter();
  const { id } = formData;

  const defaultValues = formData;
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(productCreateSchema),
  });
  const { handleSubmit } = methods;
  const mutation = useMutation({
    ...updateProductMutation({}),
  });

  const onSubmit = handleSubmit(
    (data) => {
      mutation.mutate(
        { path: { id }, body: data },
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

  const productPreviewUrl = APP_ROUTES.productManagement.products.view(
    formData.id,
    formData.slug,
  );
  return (
    <RHFProvider
      methods={methods}
      isPending={false}
      onSubmit={onSubmit}
    >
      <ProductForm
        isMutating={mutation.isPending}
        productPreviewUrl={productPreviewUrl}
      />
    </RHFProvider>
  );
};
