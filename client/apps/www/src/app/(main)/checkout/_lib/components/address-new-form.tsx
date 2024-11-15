"use client";

import { Checkbox, Input } from "@jamsr-ui/react";

export const NewAddressForm = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="grid gap-2">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <Input
              label="First Name"
              name="firstName"
              size="lg"
              variant="outlined"
            />
            <Input
              label="Last Name"
              name="lastName"
              size="lg"
              variant="outlined"
            />
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <Input
              label="Postal Code"
              name="postalCode"
              size="lg"
              variant="outlined"
            />
            <Input
              label="City"
              name="city"
              size="lg"
              variant="outlined"
            />
          </div>
          <Input
            label="Full Address"
            name="address"
            size="lg"
            variant="outlined"
          />
          <Input
            label="Landmark (optional)"
            name="apartment"
            size="lg"
            variant="outlined"
          />
        </div>
        <Checkbox
          onCheckedChange={() => {}}
          label="Save my contact details next time"
        />
      </div>
    </div>
  );
};
