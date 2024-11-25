import { type CheckoutUserData } from "@/client";
import { CheckoutItems } from "./checkout-items";
import { CheckoutSummary } from "./checkout-summary";
import { DiscountForm } from "./discount-form";
import { PaymentAction } from "./payment-action";

type Props = {
  data: CheckoutUserData;
};

export const CheckoutRightSection = (props: Props) => {
  const {
    data: { items, count, totalAmount },
  } = props;
  const isMutating = false;
  return (
    <div className="sticky top-0 bg-content2/40 p-2 md:p-8">
      <div className="mr-auto flex h-full max-w-md flex-col gap-4">
        <CheckoutItems items={items} />
        <DiscountForm />
        <CheckoutSummary
          count={count}
          totalAmount={totalAmount}
        />
        <PaymentAction
          className="md:hidden"
          isMutating={isMutating}
        />
      </div>
    </div>
  );
};
