import { Divider, Typography } from "@jamsr-ui/react";
import { asNumber } from "@repo/utils/number";
import { type Metadata } from "next";
import { Suspense } from "react";
import { OrdersList } from "./orders-list";

export const metadata: Metadata = {
  title: "Orders",
};

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const Page = async (props: Props) => {
  const searchParams = await props.searchParams;
  const page = asNumber(searchParams.page);
  return (
    <section className="flex flex-col gap-2">
      <Typography
        as="h1"
        variant="h3"
        className="font-normal"
      >
        Orders
      </Typography>
      <Divider />
      <Suspense>
        <OrdersList page={page} />
      </Suspense>
    </section>
  );
};
export default Page;
