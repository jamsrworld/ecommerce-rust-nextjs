"use client";

import { ContinueWithGoogle } from "@/app/(auth)/components/continue-with-google";
import { type AuthLoginInput } from "@/client";
import { loginMutation } from "@/client/@tanstack/react-query.gen";
import { REDIRECT_AFTER_LOGIN } from "@/config/app";
import { APP_ROUTES } from "@/config/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Link, RHFInput, RHFProvider } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { onRHFInvalid } from "@repo/components/rhf";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginSchema } from "../schema";

type FormValues = AuthLoginInput;

export const LoginForm = () => {
  const router = useRouter();
  const defaultValues: FormValues = {
    email: "adityah1357908642@gmail.com",
    password: "admin790",
  };
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    ...loginMutation(),
  });

  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(
      {
        body: data,
      },
      {
        onSuccess: () => router.replace(REDIRECT_AFTER_LOGIN),
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
      <div className="text-right">
        <Link
          as={NextLink}
          href={APP_ROUTES.forgotPassword}
        >
          Forgot Password?
        </Link>
      </div>
      <Button
        color="primary"
        variant="solid"
        fullWidth
        size="lg"
        type="submit"
        isLoading={mutation.isPending}
      >
        Login
      </Button>
      <Divider
        variant="gradient"
        className="font-medium"
        classNames={{
          divider: "h-0.5",
        }}
      >
        OR
      </Divider>
      <ContinueWithGoogle isMutating={mutation.isPending} />
    </RHFProvider>
  );
};
