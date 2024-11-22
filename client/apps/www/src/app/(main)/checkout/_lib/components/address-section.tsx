import { ProceedCheckoutInput, type CheckoutUserData } from "@/client";
import { Radio, RHFRadioGroup, Typography } from "@jamsr-ui/react";
import { AddressNewDialog } from "./address-new-dialog";

type Props = Pick<CheckoutUserData, "addresses">;
export const AddressSection = (props: Props) => {
  const { addresses } = props;
  return (
    <div className="flex flex-col gap-2">
      <Typography
        as="h3"
        variant="h6"
      >
        Shipping Address
      </Typography>
      <RHFRadioGroup<ProceedCheckoutInput>
        name="addressId"
        className="grid gap-2"
      >
        {addresses.map((address, idx) => {
          const {
            firstName,
            lastName,
            postalCode,
            city,
            fullAddress,
            phoneNumber,
            state,
            landmark,
            id,
          } = address;
          return (
            <Radio
              value={id}
              key={idx}
              classNames={{
                base: "border-2 border-divider rounded-xl p-3 m-0 gap-2 flex data-[selected=true]:border-primary ",
              }}
            >
              <div>
                <Typography
                  as="p"
                  variant="paragraph2"
                >
                  {firstName} {lastName}, {fullAddress} ({landmark})
                </Typography>
                <Typography
                  as="p"
                  variant="paragraph2"
                >
                  {phoneNumber}
                </Typography>
                <Typography
                  as="p"
                  variant="paragraph2"
                >
                  {city}, {state} <strong>- {postalCode}</strong>
                </Typography>
              </div>
            </Radio>
          );
        })}
      </RHFRadioGroup>
      <AddressNewDialog />
    </div>
  );
};
