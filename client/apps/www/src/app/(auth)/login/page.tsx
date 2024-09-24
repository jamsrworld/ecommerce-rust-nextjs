import { AppLogo } from "@/components/app-logo";
import { Button, Divider, Input, Link, Typography } from "@jamsr-ui/react";
import { GoogleIcon } from "@repo/icons/social";
import { type Metadata } from "next";
import NextLink from "next/link";
import { LeftSection } from "../components/left-section";

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
          <form className="flex flex-col justify-center gap-4">
            <Input
              size="lg"
              placeholder="Email Address"
              type="email"
            />
            <Input
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
            >
              Login
            </Button>
            <Divider variant="gradient">OR</Divider>
            <Button
              color="danger"
              variant="outline"
              size="lg"
              startContent={<GoogleIcon />}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
