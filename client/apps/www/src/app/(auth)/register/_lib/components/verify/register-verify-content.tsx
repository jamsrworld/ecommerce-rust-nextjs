import { type AuthRegisterInput } from "@/client";
import { AppLogo } from "@/components/app-logo";
import { Card, CardContent, Typography } from "@jamsr-ui/react";
import { RegisterResendOtp } from "./register-resend-otp";
import { RegisterVerifyForm } from "./register-verify-form";

type Props = {
  prevFormData: AuthRegisterInput;
  onSuccess: () => void;
};

export const RegisterVerifyContent = (props: Props) => {
  const { prevFormData, onSuccess } = props;
  const { email } = prevFormData;
  return (
    <div className="container mx-auto grid grid-cols-1 gap-8 md:my-8 md:max-w-md">
      <Card className="bg-background md:p-4">
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-2">
            <AppLogo className="mb-4 inline-block" />
            <Typography
              as="h1"
              variant="h3"
              className="leading-none"
            >
              Email Verification
            </Typography>
            <Typography
              as="p"
              className="mt-2 text-center text-foreground-secondary"
            >
              Enter the 4-digit verification code sent to{" "}
              <span className="font-medium text-foreground">{email}</span>
            </Typography>
          </div>
          <div className="flex flex-col gap-2">
            <RegisterVerifyForm
              onSuccess={onSuccess}
              prevFormData={prevFormData}
            />
            <RegisterResendOtp />
          </div>
          <div>
            <Typography
              as="p"
              className="text-foreground-tertiary"
            >
              If you have not received the OTP, please check your spam.
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
