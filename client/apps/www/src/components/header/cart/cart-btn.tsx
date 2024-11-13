import { getCartData } from "@/client";
import { FetchError } from "@repo/components/fetch-error";
import { authedClient } from "@/utils/authed-client";
import { HeaderCartDrawer } from "./cart-drawer";

export const HeaderCartBtn = async () => {
  const fetchClient = await authedClient();
  const { data, error } = await getCartData({
    client: fetchClient,
  });
  if (error) return <FetchError error={error} />;
  return <HeaderCartDrawer initialData={data} />;
};
