import { APP_ROUTES } from "@/config/routes";
import { Button, Tooltip } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { EditIcon } from "@repo/icons";

type Props = {
  id: string;
};

export const EditProductBtn = (props: Props) => {
  const { id } = props;
  return (
    <Tooltip title="Edit Product">
      <Button
        isIconOnly
        aria-label="Edit Product"
        as={NextLink}
        href={APP_ROUTES.productManagement.products.edit(id)}
      >
        <EditIcon />
      </Button>
    </Tooltip>
  );
};
