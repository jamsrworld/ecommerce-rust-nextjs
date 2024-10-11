"use client";

import {
  Checkbox,
  Input,
  Select,
  SelectItem,
  Typography,
} from "@jamsr-ui/react";

export const AddressForm = () => {
  return (
    <div className="flex flex-col gap-2">
      <Typography
        as="h3"
        variant="h6"
      >
        Shipping Address
      </Typography>
      <div className="grid gap-2">
        <Select size="lg" placeholder="Country/Region">
          <SelectItem value="france">France</SelectItem>
          <SelectItem value="india">India</SelectItem>
          <SelectItem value="spain">Spain</SelectItem>
        </Select>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
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
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
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
        </div>
        <Input
          label="Full Address"
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
      </div>
      <Checkbox
        onCheckedChange={() => {}}
        label="Save my contact details next time"
      />
    </div>
  );
};
