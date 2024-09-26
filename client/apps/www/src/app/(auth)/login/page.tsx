import { AppLogo } from "@/components/app-logo";
import { Typography } from "@jamsr-ui/react";
import { type Metadata } from "next";
import { LeftSection } from "../components/left-section";
import { LoginForm } from "./_lib/components/login-form";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background-secondary">
      <div className="container mx-auto grid max-w-screen-lg grid-cols-1 overflow-hidden rounded-3xl border-2 border-primary bg-background md:my-8 md:grid-cols-2">
        <LeftSection />
        <div className="flex flex-col justify-center gap-4 px-8">
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
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
