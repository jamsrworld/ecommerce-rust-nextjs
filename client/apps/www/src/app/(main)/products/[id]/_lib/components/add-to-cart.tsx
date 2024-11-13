"use client";

import { type Product } from "@/client";
import { addCartItemMutation, getCartDataQueryKey } from "@/client/@tanstack/react-query.gen";
import { Button } from "@jamsr-ui/react";
import { CartIcon } from "@repo/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = Pick<Product, "id">;

export const AddToCart = (props: Props) => {
  const { id } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...addCartItemMutation({}),
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: getCartDataQueryKey(),
      });
    },
  });

  const handleClick = () => {
    mutation.mutate({
      path: {
        id,
      },
    });
  };

  return (
    <Button
      onClick={handleClick}
      isLoading={mutation.isPending}
      fullWidth
      color="primary"
      variant="solid"
      size="lg"
      className="rounded-full"
      startContent={<CartIcon />}
    >
      Add to Cart
    </Button>
  );
};
