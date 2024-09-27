import { type AuthForgotPassword, type AuthResetPassword } from "@/api";
import { resetPasswordMutation } from "@/api/@tanstack/react-query.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@jamsr-ui/react";
import {
  onRHFInvalid,
  RHFInput,
  RHFOtpInput,
  RHFProvider,
} from "@repo/components/rhf";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "../schema";

type Props = {
  formData: AuthForgotPassword;
  onSuccess: () => void;
};

type FormValues = AuthResetPassword;

export const ResetPasswordForm = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { formData, onSuccess } = props;

  const defaultValues: FormValues = {
    ...formData,
    password: "",
    otp: "" as unknown as FormValues["otp"],
    confirmPassword: "",
  };
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(resetPasswordSchema),
  });

  const { handleSubmit } = methods;

  const mutation = useMutation({
    ...resetPasswordMutation(),
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
  }, onRHFInvalid);

  return (
    <RHFProvider
      methods={methods}
      onSubmit={onSubmit}
      isPending={mutation.isPending}
    >
      <RHFInput<FormValues>
        name="password"
        placeholder="Enter new password"
        isSecuredText
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      <RHFInput<FormValues>
        name="confirmPassword"
        placeholder="Enter new password again"
        isSecuredText
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      <RHFOtpInput<FormValues>
        name="otp"
        placeholder="Enter OTP code"
      />
      <Button
        type="submit"
        color="primary"
        size="lg"
        isLoading={mutation.isPending}
      >
        Set new Password
      </Button>
    </RHFProvider>
  );
};