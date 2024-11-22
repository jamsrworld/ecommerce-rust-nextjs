"use client";

import { type UpdateProfileInput } from "@/client";
import { updateProfileMutation } from "@/client/@tanstack/react-query.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, RHFInput, RHFProvider } from "@jamsr-ui/react";
import { string, withSchema } from "@repo/utils/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type FormValues = UpdateProfileInput;

const schema = withSchema<FormValues>()({
  fullName: string().min(1, "Full Name is required"),
});

type Props = {
  fullName: string;
};

export const ProfileUpdateForm = (props: Props) => {
  const { fullName } = props;
  const defaultValues: FormValues = {
    fullName,
  };
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { handleSubmit } = methods;

  const mutation = useMutation({
    ...updateProfileMutation({}),
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({ body: data });
  });

  return (
    <RHFProvider
      methods={methods}
      onSubmit={onSubmit}
      isPending={mutation.isPending}
    >
      <RHFInput<FormValues>
        name="fullName"
        variant="outlined"
        label="Full Name"
        size="lg"
      />
      <Button
        size="lg"
        color="primary"
        type="submit"
        isLoading={mutation.isPending}
      >
        Update Information
      </Button>
    </RHFProvider>
  );
};
