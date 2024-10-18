import { Input, Typography } from "@jamsr-ui/react";

export const ContactForm = () => {
  return (
    <div className="flex flex-col gap-2">
      <Typography
        as="h3"
        variant="h6"
      >
        Enter your contact details:
      </Typography>
      <Input
        label="Email Address"
        size="lg"
        variant="outlined"
      />
      <Input
        label="Phone Number"
        size="lg"
        variant="outlined"
      />
    </div>
  );
};
