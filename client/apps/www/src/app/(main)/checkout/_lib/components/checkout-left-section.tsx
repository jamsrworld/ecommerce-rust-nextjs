import { AddressForm } from "./address-form";
import { ContactForm } from "./contact-form";
import { PayBtn } from "./pay-btn";
import { PaymentMethodForm } from "./payment-method";

export const CheckoutLeftSection = () => {
  return (
    <div className="p-2 md:p-8">
      <div className="ml-auto flex max-w-xl flex-col gap-8">
        <ContactForm />
        <AddressForm />
        <PaymentMethodForm />
        <PayBtn />
      </div>
    </div>
  );
};
