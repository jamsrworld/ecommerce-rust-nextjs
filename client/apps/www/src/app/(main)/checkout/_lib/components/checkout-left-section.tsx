import { type CheckoutUserData } from "@/client";
import { AddressSection } from "./address-section";
import { PaymentAction } from "./payment-action";

type Props = Pick<CheckoutUserData, "addresses"> & {
  isMutating: boolean;
  userAccount: React.ReactNode;
};

export const CheckoutLeftSection = (props: Props) => {
  const { isMutating, addresses, userAccount } = props;
  return (
    <div className="p-2 md:p-8">
      <div className="ml-auto flex max-w-xl flex-col gap-8">
        {userAccount}
        <AddressSection addresses={addresses} />
        <PaymentAction
          className="max-md:hidden"
          isMutating={isMutating}
        />
      </div>
    </div>
  );
};
