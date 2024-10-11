import { Button, Input } from "@jamsr-ui/react";

export const DiscountForm = () => {
  return (
    <div className="flex flex-row items-center gap-1">
      <Input
        placeholder="Coupon Code"
        fullWidth
      />
      <Button>Apply</Button>
    </div>
  );
};
