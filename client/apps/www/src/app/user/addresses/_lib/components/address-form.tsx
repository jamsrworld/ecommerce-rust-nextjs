import { type CreateAddressInput } from "@/api";
import { createAddressMutation } from "@/api/@tanstack/react-query.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Typography } from "@jamsr-ui/react";
import { RHFInput, RHFProvider } from "@repo/components/rhf";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createAddressSchema } from "../schema";

type FormValues = CreateAddressInput;

export const AddressForm = () => {
  const defaultValues: FormValues = {
    city: "",
    firstName: "",
    fullAddress: "",
    landmark: "",
    lastName: "",
    phoneNumber: "",
    postalCode: 0,
    state: "",
  };
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(createAddressSchema),
  });
  const { handleSubmit } = methods;
  const mutation = useMutation({
    ...createAddressMutation(),
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({
      body: data,
    });
  });

  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <Typography
        as="h1"
        variant="h4"
      >
        Add New Address
      </Typography>
      <RHFProvider
        methods={methods}
        isPending={mutation.isPending}
        onSubmit={onSubmit}
      >
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
          label="Phone Number"
          name="phoneNumber"
          size="lg"
          labelPlacement="inside"
        />
        <RHFInput<FormValues>
          label="Landmark (optional)"
          name="landmark"
          size="lg"
          labelPlacement="inside"
        />
        <Button
          color="primary"
          fullWidth
          size="lg"
          type="submit"
        >
          Save
        </Button>
        <Button
          color="primary"
          variant="link"
          disableRipple
          className="self-center underline"
        >
          Cancel
        </Button>
      </RHFProvider>
    </div>
  );
};
