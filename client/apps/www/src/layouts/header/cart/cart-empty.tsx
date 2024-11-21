import { Button, Typography } from "@jamsr-ui/react";
import Image from "next/image";
import EmptyCatImg from "~/empty-cart.webp";

type Props = {
  onClose: () => void;
};

export const CartEmpty = (props: Props) => {
  const { onClose } = props;
  return (
    <div className="flex grow flex-col items-center justify-center gap-4 text-center">
      <Image
        src={EmptyCatImg}
        alt="empty cart"
        className="size-40"
      />
      <div>
        <Typography
          as="h3"
          variant="h4"
        >
          Empty Cart
        </Typography>
        <Typography
          as="p"
          className="text-foreground-secondary"
          variant="paragraph2"
        >
          Add some products to get started
        </Typography>
      </div>
      <Button
        color="secondary"
        onClick={onClose}
      >
        Continue Shopping
      </Button>
    </div>
  );
};
