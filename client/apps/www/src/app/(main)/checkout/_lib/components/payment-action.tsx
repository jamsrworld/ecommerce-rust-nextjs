import { cn } from "@repo/utils/class-name";
import { CheckoutPayBtn } from "./pay-btn";
import { PaymentMethodSection } from "./payment-method";

type Props = {
  isMutating: boolean;
  className?: string;
};

export const PaymentAction = (props: Props) => {
  const { isMutating, className } = props;
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <PaymentMethodSection />
      <CheckoutPayBtn isMutating={isMutating} />
    </div>
  );
};
