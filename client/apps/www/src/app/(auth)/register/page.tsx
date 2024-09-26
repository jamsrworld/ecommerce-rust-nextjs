/* eslint-disable react/no-unescaped-entities */
import { AppLogo } from "@/components/app-logo";
import { Button, Divider, Link, Typography } from "@jamsr-ui/react";
import { type Metadata } from "next";
import NextLink from "next/link";
import { LeftSection } from "../components/left-section";
import { RegisterFormWrapper } from "./_lib/components/register-wrapper";

export const metadata: Metadata = {
  title: "Register",
};

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container mx-auto grid max-w-screen-lg grid-cols-1 gap-8 md:my-8 md:grid-cols-2">
        <LeftSection />
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
          <RegisterFormWrapper />
          <Divider variant="gradient">OR</Divider>
          <Button
            color="danger"
            variant="outline"
            size="lg"
          >
            Continue with Google
          </Button>
          <Typography
            as="p"
            className="text-center"
          >
            Already have an account?{" "}
            <Link
              href="/login"
              as={NextLink}
            >
              Login
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default page;
