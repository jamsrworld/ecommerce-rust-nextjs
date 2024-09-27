import { Card, CardContent, Link, Typography } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";

type Props = {
  children: React.ReactNode;
};

export const ForgotPasswordSection = (props: Props) => {
  const { children } = props;
  return (
    <Card>
      <CardContent className="flex w-full flex-col gap-4">
        <div className="text-center">
          <Typography
            as="h1"
            variant="h4"
            gutterBottom
          >
            Forgot Password
          </Typography>
          <Typography
            as="p"
            className="text-foreground-secondary"
          >
            Enter your email address to reset your password.
          </Typography>
        </div>
        {children}
        <div className="text-center">
          <Typography as="div">
            Remembered Password?{" "}
            <Link
              as={NextLink}
              href="/login"
            >
              Login
            </Link>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
