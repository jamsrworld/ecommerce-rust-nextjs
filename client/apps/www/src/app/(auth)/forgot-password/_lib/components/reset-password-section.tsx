import { APP_ROUTES } from "@/config/routes";
import { Card, CardContent, Link, Typography } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";

type Props = {
  children: React.ReactNode;
};

export const ResetPasswordSection = (props: Props) => {
  const { children } = props;
  return (
    <Card className="bg-background">
      <CardContent className="flex w-full flex-col gap-4">
        <Typography
          as="h1"
          variant="h4"
          className="text-center"
        >
          Reset Password
        </Typography>
        {children}
        <Link
          as={NextLink}
          href={APP_ROUTES.login}
          className="text-center"
        >
          Back to Login
        </Link>
      </CardContent>
    </Card>
  );
};
