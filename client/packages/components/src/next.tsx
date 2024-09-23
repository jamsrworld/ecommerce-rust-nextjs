"use client";

import type { LinkProps } from "next/link";
import Link from "next/link";

export const NextLink = (props: LinkProps<unknown>) => (
  <Link
    prefetch
    {...props}
  />
);
