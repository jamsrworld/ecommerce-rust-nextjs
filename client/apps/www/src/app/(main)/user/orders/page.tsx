import { Divider, Typography } from "@jamsr-ui/react";
import { type Metadata } from "next";
import { OrdersList } from "./orders-list";

export const metadata: Metadata = {
  title: "Orders",
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
          Orders
        </Typography>
        <Divider />
        <OrdersList />
      </section>
    </div>
  );
};
export default Page;
