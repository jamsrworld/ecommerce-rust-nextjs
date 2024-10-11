import { Button, Input } from "@jamsr-ui/react";

export const DiscountForm = () => {
  return (
    <div className="flex flex-row items-center gap-1">
      <Input
        placeholder="Discount code or gift card"
        classNames={{
          base: "w-full",
        }}
        className="placeholder:opacity-50"
      />
      <Button>Validate</Button>
    </div>
  );
};
