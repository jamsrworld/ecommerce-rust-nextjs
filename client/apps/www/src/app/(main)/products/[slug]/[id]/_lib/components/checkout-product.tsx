"use client";

import { type Product } from "@/client";
import {
  checkoutProductMutation,
  getCartDataQueryKey,
} from "@/client/@tanstack/react-query.gen";
import { APP_ROUTES } from "@/config/routes";
import { Button } from "@jamsr-ui/react";
import { CheckoutIcon } from "@repo/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = Pick<Product, "id">;

export const CheckoutProduct = (props: Props) => {
  const { id } = props;
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    ...checkoutProductMutation({}),
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: getCartDataQueryKey(),
      });
    },
  });

  const handleClick = () => {
    mutation.mutate(
      {
        path: {
          id,
        },
      },
      {
        onSuccess() {
          router.push(APP_ROUTES.checkout);
        },
      },
    );
  };

  return (
    <Button
      fullWidth
      color="primary"
      variant="outlined"
      size="lg"
      className="rounded-full"
      startContent={<CheckoutIcon />}
      onClick={handleClick}
      isLoading={mutation.isPending}
    >
      Checkout
    </Button>
  );
};
