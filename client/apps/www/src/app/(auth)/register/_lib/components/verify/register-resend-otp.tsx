import { Button, Typography } from "@jamsr-ui/react";

export const RegisterResendOtp = () => {
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-1">
        <Typography
          as="p"
          className="text-foreground-secondary"
        >
          Didn't receive the code?
        </Typography>
        <Button
          variant="text"
          className="p-0 uppercase"
          disableRipple
        >
          Resend OTP
        </Button>
      </div>
    </div>
  );
};
