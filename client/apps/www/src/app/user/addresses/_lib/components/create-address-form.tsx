import { type CreateAddressInput } from "@/api";
import { createAddressMutation } from "@/api/@tanstack/react-query.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@jamsr-ui/react";
import { RHFProvider } from "@repo/components/rhf";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createAddressSchema } from "../schema";
import { AddressForm } from "./address-form";

type FormValues = CreateAddressInput;

type Props = {
  onSuccess?: () => void;
};

export const CreateAddressForm = (props: Props) => {
  const { onSuccess } = props;
  const defaultValues: FormValues = {
    city: "",
    firstName: "",
    fullAddress: "",
    landmark: "",
    lastName: "",
    phoneNumber: "",
    postalCode: "",
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
    // eslint-disable-next-line no-param-reassign
    if (data.landmark === "") data.landmark = null;
    mutation.mutate(
      {
        body: data,
      },
      {
        onSuccess,
      },
    );
  });

  return (
    <div className="flex flex-col gap-4">
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
        <AddressForm submitText="Create Address" />
      </RHFProvider>
    </div>
  );
};
