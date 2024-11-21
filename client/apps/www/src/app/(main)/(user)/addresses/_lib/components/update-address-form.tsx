import { type CreateAddressInput } from "@/client";
import { updateAddressMutation } from "@/client/@tanstack/react-query.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, RHFProvider, Typography } from "@jamsr-ui/react";
import { ArrowLeftIcon } from "@repo/icons/arrow";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createAddressSchema } from "../schema";
import { AddressForm } from "./address-form";

type FormValues = CreateAddressInput;

type Props = {
  onClose?: () => void;
  id: string;
  defaultValues: FormValues;
};

export const UpdateAddressForm = (props: Props) => {
  const { onClose, id, defaultValues } = props;
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
        onSuccess: onClose,
      },
    );
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button
          isIconOnly
          isRounded
          className="md:hidden"
          onClick={onClose}
          tabIndex={-1}
        >
          <ArrowLeftIcon
            width={20}
            height={20}
          />
        </Button>
        <Typography
          as="h1"
          variant="h4"
        >
          Update Address
        </Typography>
      </div>
      <RHFProvider
        methods={methods}
        isPending={mutation.isPending}
        onSubmit={onSubmit}
      >
        <AddressForm
          submitText="Update Address"
          isMutating={mutation.isPending}
        />
      </RHFProvider>
    </div>
  );
};
