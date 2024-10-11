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
        Delivery Address
      </Typography>
      <div className="grid gap-2">
        <Select
          size="lg"
          className="placeholder:opacity-50"
        >
          <SelectItem value="france">France</SelectItem>
          <SelectItem value="india">India</SelectItem>
          <SelectItem value="spain">Spain</SelectItem>
        </Select>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
       
          <Input
            placeholder="First Name"
            name="firstName"
            size="lg"
            className="placeholder:opacity-50"
          />
          <Input
            placeholder="Last Name"
            name="lastName"
            size="lg"
            className="placeholder:opacity-50"
          />
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <Input
            placeholder="Postal Code"
            name="postalCode"
            size="lg"
            className="placeholder:opacity-50"
          />
          <Input
            placeholder="City"
            name="city"
            size="lg"
            className="placeholder:opacity-50"
          />
        </div>
        <Input
          placeholder="Address"
          name="address"
          size="lg"
          className="placeholder:opacity-50"
        />
        <Input
          placeholder="Landmark (optional)"
          name="apartment"
          size="lg"
          className="placeholder:opacity-50"
        />
      </div>
      <Checkbox
        onCheckedChange={() => {}}
        label="Save my contact details next time"
      />
    </div>
  );
};
