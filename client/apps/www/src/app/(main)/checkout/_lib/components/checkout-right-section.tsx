import { type CheckoutUserData } from "@/client";
import { CheckoutItems } from "./checkout-items";
import { CheckoutSummary } from "./checkout-summary";
import { DiscountForm } from "./discount-form";

type Props = {
  data: CheckoutUserData;
};

export const CheckoutRightSection = (props: Props) => {
  const {
    data: { items, count, totalAmount },
  } = props;
  return (
    <div className="sticky top-0 bg-background-secondary p-2 md:p-8">
      <div className="mr-auto flex h-full max-h-[90vh] max-w-md flex-col gap-4">
        <CheckoutItems items={items} />
        <DiscountForm />
        <CheckoutSummary
          count={count}
          totalAmount={totalAmount}
        />
      </div>
    </div>
  );
};
