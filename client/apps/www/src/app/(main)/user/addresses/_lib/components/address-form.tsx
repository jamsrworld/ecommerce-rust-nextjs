import { type CreateAddressInput } from "@/client";
import { Button, RHFInput } from "@jamsr-ui/react";

type FormValues = CreateAddressInput;

type Props = {
  submitText: string;
  isMutating: boolean;
};

export const AddressForm = (props: Props) => {
  const { submitText, isMutating } = props;
  return (
    <>
      <RHFInput<FormValues>
        label="First Name"
        name="firstName"
        size="lg"
        variant="outlined"
      />
      <RHFInput<FormValues>
        label="Last Name"
        name="lastName"
        size="lg"
        variant="outlined"
      />
      <RHFInput<FormValues>
        label="Postal Code"
        name="postalCode"
        size="lg"
        variant="outlined"
        isNumberInput
        decimalPrecision={0}
        inputMode="numeric"
        maxLength={6}
        minLength={6}
      />
      <RHFInput<FormValues>
        label="City"
        name="city"
        size="lg"
        variant="outlined"
      />
      <RHFInput<FormValues>
        label="State"
        name="state"
        size="lg"
        variant="outlined"
      />
      <RHFInput<FormValues>
        label="Full Address"
        name="fullAddress"
        size="lg"
        variant="outlined"
      />
      <RHFInput<FormValues>
        label="Landmark (optional)"
        name="landmark"
        size="lg"
        variant="outlined"
      />
      <RHFInput<FormValues>
        label="Phone Number"
        name="phoneNumber"
        size="lg"
        variant="outlined"
        isNumberInput
        decimalPrecision={0}
        inputMode="numeric"
        maxLength={10}
        minLength={10}
      />
      <Button
        color="primary"
        fullWidth
        size="lg"
        type="submit"
        isLoading={isMutating}
      >
        {submitText}
      </Button>
    </>
  );
};
