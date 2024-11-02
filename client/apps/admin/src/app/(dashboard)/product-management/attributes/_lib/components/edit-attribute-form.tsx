import { type CreateAttributeInput } from "@/client";
import { updateAttributeMutation } from "@/client/@tanstack/react-query.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@jamsr-ui/react";
import { RHFInput, RHFProvider } from "@repo/components/rhf";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createAttributeSchema } from "../schema";
import { CreateAttributeValues } from "./create-attribute-values";

type FormValues = CreateAttributeInput;

type Props = {
  id: string;
  formData: FormValues;
  onSuccess: () => void;
};

export const EditAttributeForm = (props: Props) => {
  const { formData, onSuccess, id } = props;
  const defaultValues: FormValues = {
    name: "",
    values: [],
  };
  const methods = useForm({
    defaultValues: formData ?? defaultValues,
    resolver: zodResolver(createAttributeSchema),
  });
  const { handleSubmit } = methods;

  const mutation = useMutation({
    ...updateAttributeMutation(),
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(
      {
        path: {
          id,
        },
        body: data,
      },
      {
        onSuccess,
      },
    );
  });

  return (
    <RHFProvider
      methods={methods}
      onSubmit={onSubmit}
      isPending={mutation.isPending}
    >
      <RHFInput<FormValues>
        name="name"
        label="Name"
      />
      <CreateAttributeValues />
      <Button
        isLoading={mutation.isPending}
        type="submit"
        color="primary"
      >
        Update
      </Button>
    </RHFProvider>
  );
};
