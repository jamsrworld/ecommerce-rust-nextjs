import { type AuthRegisterInput, type AuthRegisterVerifyInput } from "@/client";
import { registerVerifyMutation } from "@/client/@tanstack/react-query.gen";
import { REDIRECT_AFTER_LOGIN } from "@/config/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, RHFOtpInput, RHFProvider } from "@jamsr-ui/react";
import { onRHFInvalid } from "@repo/components/rhf";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerVerifySchema } from "../../schema";

type FormValues = AuthRegisterVerifyInput;

type Props = {
  prevFormData: AuthRegisterInput;
  onSuccess: () => void;
};

export const RegisterVerifyForm = (props: Props) => {
  const router = useRouter();
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
        onSuccess: () => {
          onSuccess();
          router.push(REDIRECT_AFTER_LOGIN);
        },
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
        placeholder="Enter the OTP"
      />
      <Button
        color="primary"
        variant="solid"
        fullWidth
        size="lg"
        type="submit"
        isLoading={mutation.isPending}
      >
        Verify Account
      </Button>
    </RHFProvider>
  );
};
