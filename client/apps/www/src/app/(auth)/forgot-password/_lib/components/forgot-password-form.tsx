import { type AuthForgotPasswordInput } from "@/client";
import { forgotPasswordMutation } from "@/client/@tanstack/react-query.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@jamsr-ui/react";
import { onRHFInvalid, RHFInput, RHFProvider } from "@repo/components/rhf";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema } from "../schema";

type FormValues = AuthForgotPasswordInput;
type Props = {
  onSuccess: (data: FormValues) => void;
};

export const ForgotPasswordForm = (props: Props) => {
  const { onSuccess } = props;

  const defaultValues: FormValues = {
    email: "",
  };
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { handleSubmit } = methods;
  const mutation = useMutation({
    ...forgotPasswordMutation(),
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(
      {
        body: data,
      },
      {
        onSuccess: () => onSuccess(data),
      },
    );
  }, onRHFInvalid);

  return (
    <RHFProvider
      methods={methods}
      onSubmit={onSubmit}
      isPending={mutation.isPending}
    >
      <RHFInput<FormValues>
        name="email"
        placeholder="Enter your email address"
        type="email"
      />
      <Button
        type="submit"
        color="primary"
        isLoading={mutation.isPending}
      >
        Continue
      </Button>
    </RHFProvider>
  );
};
