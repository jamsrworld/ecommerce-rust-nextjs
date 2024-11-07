import { APP_ROUTES } from "@/config/routes";
import { Button } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { EditIcon } from "@repo/icons";

type Props = {
  id: string;
};

export const EditProductBtn = (props: Props) => {
  const { id } = props;
  return (
    <Button
      isIconOnly
      aria-label="Edit"
      as={NextLink}
      href={APP_ROUTES.productManagement.products.edit(id)}
    >
      <EditIcon />
    </Button>
  );
};
