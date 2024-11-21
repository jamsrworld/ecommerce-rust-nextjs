import { getCartData } from "@/client";
import { APP_ROUTES } from "@/config/routes";
import { authedClient } from "@/utils/authed-client";
import { Button } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { CartIcon } from "@repo/icons";
import { HeaderCartDrawer } from "./cart-drawer";

export const HeaderCartBtn = async () => {
  const fetchClient = await authedClient();
  const { data, error } = await getCartData({
    client: fetchClient,
  });
  if (error)
    return (
      <Button
        isIconOnly
        as={NextLink}
        href={APP_ROUTES.login}
        variant="light"
      >
        <CartIcon />
      </Button>
    );
  return <HeaderCartDrawer initialData={data} />;
};
