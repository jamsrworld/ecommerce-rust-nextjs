import { type CheckoutUserData } from "@/client";
import { Typography } from "@jamsr-ui/react";
import { fPrice } from "@repo/utils/number";

type Props = Pick<CheckoutUserData, "count" | "totalAmount">;

export const CheckoutSummary = (props: Props) => {
  const { count, totalAmount } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Typography as="p">Subtotal - {count} items</Typography>
        <Typography as="p">{fPrice(totalAmount)}</Typography>
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
          {fPrice(totalAmount)}
        </Typography>
      </div>
    </div>
  );
};
