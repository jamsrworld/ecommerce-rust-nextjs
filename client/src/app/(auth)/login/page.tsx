/* eslint-disable react/no-unescaped-entities */
import { AppLogo } from "@/components/app-logo";
import { Button, Divider, Input, Link, Typography } from "@jamsr-ui/react";
import NextLink from "next/link";
import { LeftSection } from "../components/left-section";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container md:my-8 gap-8 max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2">
        <LeftSection />
        <div className="flex flex-col justify-center gap-4">
          <div className="space-y-1">
            <AppLogo className="mb-4 inline-block" />
            <Typography
              as="h1"
              variant="h2"
              className="leading-none font-opensans"
            >
              Welcome Back
            </Typography>
            <Typography as="p" className="text-foreground-secondary">
              Please login to your account
            </Typography>
          </div>
          <form className="flex flex-col justify-center gap-4">
            <Input size="lg" placeholder="Email Address" />
            <Input size="lg" placeholder="Password" isSecuredText />
            <Button color="primary" variant="solid" fullWidth size="lg">
              Login
            </Button>
            <Divider variant="gradient">OR</Divider>
            <Button color="danger" variant="outline" size="lg">
              Continue with Google
            </Button>
            <Typography as="p" className="text-center">
              Don't have an account?{" "}
              <Link href="/register" as={NextLink}>
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
