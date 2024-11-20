import { type CreateAddressInput } from "@/client";
import { Button, RHFInput, UIStylesProvider } from "@jamsr-ui/react";

type FormValues = CreateAddressInput;

type Props = {
  submitText: string;
  isMutating: boolean;
};

export const AddressForm = (props: Props) => {
  const { submitText, isMutating } = props;
  return (
    <UIStylesProvider input={{ size: "lg", variant: "outlined" }}>
      <RHFInput<FormValues>
        label="First Name"
        name="firstName"
      />
      <RHFInput<FormValues>
        label="Last Name"
        name="lastName"
      />
      <RHFInput<FormValues>
        label="Postal Code"
        name="postalCode"
        isNumberInput
        decimalPrecision={0}
        inputMode="numeric"
        maxLength={6}
        minLength={6}
      />
      <RHFInput<FormValues>
        label="City"
        name="city"
      />
      <RHFInput<FormValues>
        label="State"
        name="state"
      />
      <RHFInput<FormValues>
        label="Full Address"
        name="fullAddress"
      />
      <RHFInput<FormValues>
        label="Landmark (optional)"
        name="landmark"
      />
      <RHFInput<FormValues>
        label="Phone Number"
        name="phoneNumber"
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
    </UIStylesProvider>
  );
};
