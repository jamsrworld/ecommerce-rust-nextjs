import { CheckoutItems } from "./checkout-items";
import { CheckoutSummary } from "./checkout-summary";
import { DiscountForm } from "./discount-form";

export const CheckoutRightSection = () => {
  return (
    <div className="sticky top-0 bg-background-secondary p-2 md:p-8">
      <div className="mr-auto max-w-md">
        <CheckoutItems />
        <DiscountForm />
        <CheckoutSummary />
      </div>
    </div>
  );
};
