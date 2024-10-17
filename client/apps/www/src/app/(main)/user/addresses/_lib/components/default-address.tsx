"use client";

import { Typography } from "@jamsr-ui/react";
import { m } from "framer-motion";

export const DefaultAddress = () => {
  return (
    <m.div layoutId="default_address">
      <Typography
        as="p"
        className="text-success"
      >
        Default Address
      </Typography>
    </m.div>
  );
};
