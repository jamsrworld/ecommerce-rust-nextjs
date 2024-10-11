import { CheckoutItems } from "./checkout-items";
import { CheckoutSummary } from "./checkout-summary";
import { DiscountForm } from "./discount-form";

export const CheckoutRightSection = () => {
  return (
    <div className="sticky top-0 bg-background-secondary p-2 md:p-8">
      <div className="mr-auto flex h-full max-h-[90vh] max-w-md flex-col gap-4">
        <CheckoutItems />
        <DiscountForm />
        <CheckoutSummary />
      </div>
    </div>
  );
};
