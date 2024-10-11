import { type Metadata } from "next";
import { CheckoutLeftSection } from "./_lib/components/checkout-left-section";
import { CheckoutRightSection } from "./_lib/components/checkout-right-section";

export const metadata: Metadata = {
  title: "Checkout",
};

const Page = () => {
  return (
    <div className="grid grow grid-cols-1 divide-x md:grid-cols-2">
      <CheckoutLeftSection />
      <CheckoutRightSection />
    </div>
  );
};

export default Page;
