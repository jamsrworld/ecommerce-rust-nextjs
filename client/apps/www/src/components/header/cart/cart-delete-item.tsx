"use client";

import {
  getCartDataQueryKey,
  removeCartItemMutation,
} from "@/client/@tanstack/react-query.gen";
import { Button } from "@jamsr-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  cartId: string;
};

export const CartDeleteItem = (props: Props) => {
  const { cartId } = props;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    ...removeCartItemMutation(),
    onSuccess() {
      void queryClient.invalidateQueries({
        queryKey: getCartDataQueryKey(),
      });
    },
  });

  const handleClick = () => {
    mutation.mutate({
      path: {
        id: cartId,
      },
    });
  };

  return (
    <Button
      isLoading={mutation.isPending}
      onClick={handleClick}
      variant="text"
      color="danger"
      disableRipple
    >
      DELETE
    </Button>
  );
};
