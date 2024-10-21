/* eslint-disable */
import { getAttributes } from "@/client";
import { authedClient } from "@/utils/authed-client";
import { DataTable } from "@jamsr-ui/react";
import { FetchError } from "@repo/components/fetch-error";
import { columns } from "./columns";

export const AttributesTable = async () => {
  const fetchClient = await authedClient();
  const response = await getAttributes({
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
