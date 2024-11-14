import { AddressForm } from "./address-form";
import { ContactForm } from "./contact-form";
import { CheckoutPayBtn } from "./pay-btn";
import { PaymentMethodForm } from "./payment-method";

interface Props {
  isMutating: boolean;
}

export const CheckoutLeftSection = (props: Props) => {
  const { isMutating } = props;
  return (
    <div className="p-2 md:p-8">
      <div className="ml-auto flex max-w-xl flex-col gap-8">
        <ContactForm />
        <AddressForm />
        <PaymentMethodForm />
        <CheckoutPayBtn isMutating={isMutating} />
      </div>
    </div>
  );
};
