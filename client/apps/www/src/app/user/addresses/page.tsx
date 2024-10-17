import { Divider, Typography } from "@jamsr-ui/react";
import { type Metadata } from "next";
import { AddressFormDrawer } from "./_lib/components/address-form-drawer";
import { AddressList } from "./_lib/components/address-list";

export const metadata: Metadata = {
  title: "Addresses",
};

const Page = () => {
  return (
    <div className="flex flex-col">
      <section className="flex flex-col gap-2">
        <Typography
          as="h1"
          variant="h3"
          className="font-normal"
        >
          Addresses
        </Typography>
        <Divider />
      </section>
      <section>
        <AddressList />
        <AddressFormDrawer />
      </section>
    </div>
  );
};
export default Page;
