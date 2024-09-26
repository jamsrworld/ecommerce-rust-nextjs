"use client";

import { client, type AuthLogin } from "@/api";
import { loginMutation } from "@/api/@tanstack/react-query.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Link, Typography } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { RHFInput, RHFProvider } from "@repo/components/rhf";
import { GoogleIcon } from "@repo/icons/social";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { loginSchema } from "../schema";

type FormValues = AuthLogin;

client.setConfig({
  baseUrl: "http://localhost:5003",
});

export const LoginForm = () => {
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
    mutation.mutate({
      body: data,
    });
  });

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
          href="/forgot-password"
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
      <Divider variant="gradient">OR</Divider>
      <Button
        color="danger"
        variant="outline"
        size="lg"
        startContent={<GoogleIcon />}
        disabled={mutation.isPending}
      >
        Continue with Google
      </Button>
      <Typography
        as="p"
        className="text-center"
      >
        Don't have an account?{" "}
        <Link
          href="/register"
          as={NextLink}
        >
          Register
        </Link>
      </Typography>
    </RHFProvider>
  );
};
