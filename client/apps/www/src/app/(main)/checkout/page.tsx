import { getCheckoutData } from "@/client";
import { authedClient } from "@/utils/authed-client";
import { FetchError } from "@repo/components/fetch-error";
import { type Metadata } from "next";
import { CheckoutForm } from "./_lib/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
};

const Page = async () => {
  const fetchClient = await authedClient();
  const { error, data } = await getCheckoutData({
    client: fetchClient,
  });
  if (error) return <FetchError error={error} />;
  return <CheckoutForm data={data} />;
};

export default Page;
