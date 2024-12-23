import { ContinueWithGoogle } from "@/app/(auth)/components/continue-with-google";
import { LeftSection } from "@/app/(auth)/components/left-section";
import { type AuthRegisterInput } from "@/client";
import { AppLogo } from "@/components/app-logo";
import { APP_ROUTES } from "@/config/routes";
import { Divider, Link, Typography } from "@jamsr-ui/react";
import NextLink from "next/link";
import { Suspense } from "react";
import { RegisterForm } from "./register-form";

type Props = {
  onSuccess: (data: AuthRegisterInput) => void;
};

export const RegisterContent = (props: Props) => {
  const { onSuccess } = props;
  return (
    <div className="container mx-auto grid max-w-screen-lg grid-cols-1 gap-8 md:my-8 md:grid-cols-2">
      <div className="max-md:hidden">
        <LeftSection />
      </div>
      <div className="flex flex-col justify-center gap-4">
        <div className="space-y-1 text-center">
          <AppLogo className="mb-4 inline-block" />
          <Typography
            as="h1"
            variant="h2"
            className="leading-none"
          >
            Create account
          </Typography>
          <Typography
            as="p"
            className="text-foreground-secondary"
          >
            Please enter your details
          </Typography>
        </div>
        <RegisterForm onSuccess={onSuccess} />
        <Divider variant="gradient">OR</Divider>
        <Suspense>
          <ContinueWithGoogle />
        </Suspense>
        <Typography
          as="p"
          className="text-center"
        >
          Already have an account?{" "}
          <Link
            href={APP_ROUTES.login}
            as={NextLink}
          >
            Login
          </Link>
        </Typography>
      </div>
    </div>
  );
};
