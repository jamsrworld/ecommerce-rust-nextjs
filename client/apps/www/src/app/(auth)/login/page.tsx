import { AppLogo } from "@/components/app-logo";
import { APP_ROUTES } from "@/config/routes";
import { Card, Link, Typography } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { type Metadata } from "next";
import { Suspense } from "react";
import { LeftSection } from "../components/left-section";
import { LoginForm } from "./_lib/components/login-form";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {
  return (
    <Card className="container mx-auto grid max-w-screen-lg grid-cols-1 overflow-hidden rounded-3xl md:my-8 md:grid-cols-2 md:shadow-lg">
      <div className="max-md:hidden">
        <LeftSection />
      </div>
      <div className="flex flex-col justify-center gap-4 md:px-8">
        <div className="space-y-1 text-center">
          <AppLogo className="mb-4 inline-block" />
          <Typography
            as="h1"
            variant="h2"
            className="leading-none"
          >
            Welcome Back
          </Typography>
          <Typography
            as="p"
            className="text-foreground-secondary"
          >
            Please login to your account
          </Typography>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
        <Typography
          as="p"
          className="text-center"
        >
          Don't have an account?{" "}
          <Link
            href={APP_ROUTES.register}
            as={NextLink}
          >
            Register
          </Link>
        </Typography>
      </div>
    </Card>
  );
};

export default Login;
