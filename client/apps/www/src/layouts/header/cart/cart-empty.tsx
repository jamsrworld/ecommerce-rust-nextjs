import { EmptyContent } from "@/components/empty-content";
import { Button } from "@jamsr-ui/react";
import EmptyCartImage from "~/empty-cart.webp";

type Props = {
  onClose: () => void;
};

export const CartEmpty = (props: Props) => {
  const { onClose } = props;
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <EmptyContent
        image={EmptyCartImage}
        heading="Empty Cart"
        subHeading="Add some products to get started"
      />
      <Button
        color="secondary"
        onClick={onClose}
      >
        Continue Shopping
      </Button>
    </div>
  );
};
