import { type CreateAttributeInputDto } from "@/client";
import { createAttributeMutation } from "@/client/@tanstack/react-query.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, RHFInput, RHFProvider } from "@jamsr-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createAttributeSchema } from "../schema";
import { CreateAttributeValues } from "./create-attribute-values";

type FormValues = CreateAttributeInputDto;

type Props = {
  formData?: FormValues;
  onSuccess: () => void;
};

export const CreateAttributeForm = (props: Props) => {
  const { formData, onSuccess } = props;
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
    ...createAttributeMutation(),
  });
  const onSubmit = handleSubmit((data) => {
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
        Submit
      </Button>
    </RHFProvider>
  );
};
