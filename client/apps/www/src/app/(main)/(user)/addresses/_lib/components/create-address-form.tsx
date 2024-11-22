import { type CreateAddressInput } from "@/client";
import { createAddressMutation } from "@/client/@tanstack/react-query.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, RHFProvider, Typography } from "@jamsr-ui/react";
import { ArrowLeftIcon } from "@repo/icons/arrow";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createAddressSchema, type ZodCreateAddressInput } from "../schema";
import { AddressForm } from "./address-form";

type FormValues = ZodCreateAddressInput;

type Props = {
  onClose?: () => void;
};

export const CreateAddressForm = (props: Props) => {
  const { onClose } = props;
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

  const methods = useForm<FormValues, object, CreateAddressInput>({
    defaultValues,
    resolver: zodResolver(createAddressSchema),
    mode: "all",
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
          Add New Address
        </Typography>
      </div>

      <RHFProvider
        methods={methods}
        isPending={mutation.isPending}
        onSubmit={(e) => {
          // to prevent checkout form submission
          e.stopPropagation();
          void onSubmit(e);
        }}
      >
        <AddressForm
          submitText="Add Address"
          isMutating={mutation.isPending}
        />
      </RHFProvider>
    </div>
  );
};
