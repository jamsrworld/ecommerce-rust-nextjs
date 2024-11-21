import { placeOrderMutation } from "@/client/@tanstack/react-query.gen";
import { APP_ROUTES } from "@/config/routes";
import { Button } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {
  onClose: () => void;
};

export const CartPlaceOrder = (props: Props) => {
  const { onClose } = props;
  const router = useRouter();
  const mutation = useMutation({
    ...placeOrderMutation(),
  });

  const handleClick = () => {
    mutation.mutate(
      {},
      {
        onSuccess() {
          onClose();
          router.push(APP_ROUTES.checkout);
        },
      },
    );
  };
  return (
    <Button
      size="lg"
      fullWidth
      as={NextLink}
      href={APP_ROUTES.checkout}
      color="primary"
      onClick={handleClick}
      isLoading={mutation.isPending}
    >
      Place Order
    </Button>
  );
};
