import { getAddresses } from "@/client";
import { authedClient } from "@/utils/authed-client";
import { Divider, Typography } from "@jamsr-ui/react";
import { FetchError } from "@repo/components/fetch-error";
import { type Metadata } from "next";
import { AddAddressBtn } from "./_lib/components/address-form-drawer";
import { AddressList } from "./_lib/components/address-list";

export const metadata: Metadata = {
  title: "Addresses",
};

const Page = async () => {
  const fetchClient = await authedClient();
  const response = await getAddresses({
    client: fetchClient,
  });
  if (response.error) return <FetchError error={response.error} />;
  const { data } = response;

  return (
    <div className="flex flex-col">
      <section className="flex flex-col gap-2">
        <Typography
          as="h1"
          variant="h3"
          className="font-normal"
        >
          Saved Addresses
        </Typography>
        <Divider />
      </section>
      <section>
        <AddressList />
        <AddAddressBtn
          addresses={data.length}
          maximumAddresses={5}
        />
      </section>
    </div>
  );
};
export default Page;
