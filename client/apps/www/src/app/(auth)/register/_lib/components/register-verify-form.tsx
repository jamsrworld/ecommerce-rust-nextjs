import { type AuthRegister, type AuthRegisterVerify } from "@/api";
import { registerVerifyMutation } from "@/api/@tanstack/react-query.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@jamsr-ui/react";
import { onRHFInvalid, RHFOtpInput, RHFProvider } from "@repo/components/rhf";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { registerVerifySchema } from "../schema";

type FormValues = AuthRegisterVerify;

type Props = {
  prevFormData: AuthRegister;
  onSuccess: () => void;
};

export const RegisterVerifyForm = (props: Props) => {
  const { prevFormData, onSuccess } = props;
  const defaultValues: FormValues = {
    ...prevFormData,
    code: "" as unknown as FormValues["code"],
  };

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(registerVerifySchema),
  });

  const mutation = useMutation({
    ...registerVerifyMutation(),
  });

  const { handleSubmit } = methods;

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
      className="flex flex-col justify-center gap-4"
    >
      <RHFOtpInput<FormValues>
        name="code"
        size="lg"
        placeholder="Enter your otp code"
      />
      <Button
        color="primary"
        variant="solid"
        fullWidth
        size="lg"
        type="submit"
        isLoading={mutation.isPending}
      >
        Verify
      </Button>
    </RHFProvider>
  );
};
