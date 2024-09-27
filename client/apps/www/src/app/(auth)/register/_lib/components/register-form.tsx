"use client";

import { type AuthRegister } from "@/api";
import { registerMutation } from "@/api/@tanstack/react-query.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@jamsr-ui/react";
import { RHFInput, RHFProvider } from "@repo/components/rhf";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schema";

type FormValues = AuthRegister;
type Props = {
  onSuccess: (data: FormValues) => void;
};

export const RegisterForm = (props: Props) => {
  const { onSuccess } = props;
  const defaultValues: FormValues = {
    fullName: "",
    confirmPassword: "",
    email: "",
    password: "",
  };
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    ...registerMutation(),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(
      {
        body: data,
      },
      {
        onSuccess() {
          onSuccess(data);
        },
      },
    );
  });

  return (
    <RHFProvider
      methods={methods}
      onSubmit={onSubmit}
      isPending={mutation.isPending}
      className="flex flex-col justify-center gap-4"
    >
      <RHFInput<FormValues>
        name="fullName"
        size="lg"
        placeholder="Full Name"
      />
      <RHFInput<FormValues>
        name="email"
        size="lg"
        placeholder="Email Address"
        type="email"
      />
      <RHFInput<FormValues>
        name="password"
        size="lg"
        placeholder="Password"
        isSecuredText
      />
      <RHFInput<FormValues>
        name="confirmPassword"
        size="lg"
        placeholder="Confirm Password"
        isSecuredText
      />
      <Button
        color="primary"
        variant="solid"
        fullWidth
        size="lg"
        type="submit"
        isLoading={mutation.isPending}
      >
        Register
      </Button>
    </RHFProvider>
  );
};
