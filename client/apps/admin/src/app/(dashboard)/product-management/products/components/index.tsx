/* eslint-disable */
import { getProducts } from "@/client";
import { authedClient } from "@/utils/authed-client";
import { DataTable } from "@jamsr-ui/react";
import { FetchError } from "@repo/components/fetch-error";
import { columns } from "./columns";

export const ProductsTable = async () => {
  const fetchClient = await authedClient();
  const response = await getProducts({
    client: fetchClient,
  });
  if (response.error) return <FetchError error={response.error} />;
  const data = response.data!;
  return (
    <DataTable
      columns={columns}
      data={data}
      sorting={{ desc: true, id: "createdAt" }}
    />
  );
};
