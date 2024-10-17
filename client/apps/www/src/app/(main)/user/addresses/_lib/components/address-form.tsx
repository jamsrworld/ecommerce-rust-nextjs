import { Button } from "@jamsr-ui/react";
import { RHFInput } from "@repo/components/rhf";
import { type CreateAddressInput } from "@/api";

type FormValues = CreateAddressInput;

type Props = {
  submitText: string;
};

export const AddressForm = (props: Props) => {
  const { submitText } = props;
  return (
    <>
      <RHFInput<FormValues>
        label="First Name"
        name="firstName"
        size="lg"
        labelPlacement="inside"
      />
      <RHFInput<FormValues>
        label="Last Name"
        name="lastName"
        size="lg"
        labelPlacement="inside"
      />
      <RHFInput<FormValues>
        label="Postal Code"
        name="postalCode"
        size="lg"
        labelPlacement="inside"
        mask="number"
        precision={0}
        inputMode="numeric"
      />
      <RHFInput<FormValues>
        label="City"
        name="city"
        size="lg"
        labelPlacement="inside"
      />
      <RHFInput<FormValues>
        label="State"
        name="state"
        size="lg"
        labelPlacement="inside"
      />
      <RHFInput<FormValues>
        label="Full Address"
        name="fullAddress"
        size="lg"
        labelPlacement="inside"
      />
      <RHFInput<FormValues>
        label="Landmark (optional)"
        name="landmark"
        size="lg"
        labelPlacement="inside"
      />
      <RHFInput<FormValues>
        label="Phone Number"
        name="phoneNumber"
        size="lg"
        labelPlacement="inside"
        mask="number"
        precision={0}
        inputMode="numeric"
      />
      <Button
        color="primary"
        fullWidth
        size="lg"
        type="submit"
      >
        {submitText}
      </Button>
    </>
  );
};
