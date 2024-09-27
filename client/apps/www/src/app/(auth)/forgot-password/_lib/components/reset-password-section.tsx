import { Card, CardContent } from "@jamsr-ui/react";

type Props = {
  children: React.ReactNode;
};

export const ResetPasswordSection = (props: Props) => {
  const { children } = props;
  return (
    <Card>
      <CardContent className="flex w-full flex-col gap-4">
        {children}
      </CardContent>
    </Card>
  );
};
