import { Divider, Typography } from "@jamsr-ui/react";
import { type Metadata } from "next";
import { AddressFormDialog } from "./_components/address-form-dialog";

export const metadata: Metadata = {
  title: "Addresses",
};

const Page = () => {
  return (
    <div>
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
        <AddressFormDialog />
      </section>
    </div>
  );
};
export default Page;
