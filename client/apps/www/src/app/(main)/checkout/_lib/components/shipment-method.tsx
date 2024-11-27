import { Alert, Typography } from "@jamsr-ui/react";

export const ShipmentMethod = () => {
  return (
    <div className="flex flex-col gap-2">
      <Typography
        as="h3"
        variant="h6"
      >
        Method of shipment
      </Typography>
      <div>
        <Alert
          variant="solid"
          icon={null}
          className="border-none font-medium text-foreground-secondary"
        >
          Enter your shipping details to see the shipping methods available.
        </Alert>
      </div>
    </div>
  );
};
