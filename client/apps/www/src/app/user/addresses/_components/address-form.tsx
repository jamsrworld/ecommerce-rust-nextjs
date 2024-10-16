import { Button, Input, Typography } from "@jamsr-ui/react";

export const AddressForm = () => {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <Typography
        as="h1"
        variant="h4"
      >
        Add New Address
      </Typography>
      <Input
        label="First Name"
        name="firstName"
        size="lg"
        labelPlacement="inside"
      />
      <Input
        label="Last Name"
        name="lastName"
        size="lg"
        labelPlacement="inside"
      />
      <Input
        label="Postal Code"
        name="postalCode"
        size="lg"
        labelPlacement="inside"
      />
      <Input
        label="City"
        name="city"
        size="lg"
        labelPlacement="inside"
      />
      <Input
        label="State"
        name="city"
        size="lg"
        labelPlacement="inside"
      />
      <Input
        label="Full Address"
        name="address"
        size="lg"
        labelPlacement="inside"
      />
      <Input
        label="Phone Number"
        name="address"
        size="lg"
        labelPlacement="inside"
      />
      <Input
        label="Landmark (optional)"
        name="apartment"
        size="lg"
        labelPlacement="inside"
      />
      <Button
        color="primary"
        fullWidth
        size="lg"
      >
        Save
      </Button>
      <Button
        color="primary"
        variant="link"
        disableRipple
        className="self-center underline"
      >
        Cancel
      </Button>
    </div>
  );
};
