import { Typography } from "@jamsr-ui/react";

export const CheckoutSummary = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Typography as="p">Subtotal - 3 items</Typography>
        <Typography as="p">$407,00</Typography>
      </div>
      <div className="flex justify-between">
        <Typography as="p">Shipping</Typography>
        <Typography
          as="p"
          className="text-foreground-secondary"
        >
          Free
        </Typography>
      </div>
      <div>
        <div className="flex justify-between">
          <Typography
            variant="h6"
            as="p"
          >
            Total
          </Typography>
          <Typography
            as="p"
            variant="h5"
          >
            $407,00
          </Typography>
        </div>
      </div>
    </div>
  );
};
