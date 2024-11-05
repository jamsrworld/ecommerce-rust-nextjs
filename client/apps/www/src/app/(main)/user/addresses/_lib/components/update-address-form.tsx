import { type CreateAddressInput } from "@/client";
import { updateAddressMutation } from "@/client/@tanstack/react-query.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFProvider, Typography } from "@jamsr-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createAddressSchema } from "../schema";
import { AddressForm } from "./address-form";

type FormValues = CreateAddressInput;

type Props = {
  onSuccess?: () => void;
  id: string;
  defaultValues: FormValues;
};

export const UpdateAddressForm = (props: Props) => {
  const { onSuccess, id, defaultValues } = props;
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(createAddressSchema),
  });
  const { handleSubmit } = methods;
  const mutation = useMutation({
    ...updateAddressMutation(),
  });

  const onSubmit = handleSubmit((data) => {
    // eslint-disable-next-line no-param-reassign
    if (data.landmark === "") data.landmark = null;
    mutation.mutate(
      {
        body: data,
        path: {
          id,
        },
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
        Update Address
      </Typography>
      <RHFProvider
        methods={methods}
        isPending={mutation.isPending}
        onSubmit={onSubmit}
      >
        <AddressForm submitText="Update Address" />
      </RHFProvider>
    </div>
  );
};
