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
        placeholder="Email Address"
        size="lg"
        className="placeholder:opacity-50"
      />
      <Input
        placeholder="Phone Number"
        size="lg"
        className="placeholder:opacity-50"
      />
    </div>
  );
};
