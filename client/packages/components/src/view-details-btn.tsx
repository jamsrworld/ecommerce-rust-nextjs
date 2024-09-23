import { Link } from "@jamsr-ui/react";
import { ArrowRight } from "@repo/icons/arrow";
import { NextLink } from "./next";

type Props = {
  href: string;
};

export const ViewDetailsButton = (props: Props) => {
  const { href } = props;
  return (
    <Link
      as={NextLink}
      className="mt-auto flex items-center gap-0.5 text-xs"
      href={href}
    >
      View Details
      <ArrowRight className="size-4" />
    </Link>
  );
};
