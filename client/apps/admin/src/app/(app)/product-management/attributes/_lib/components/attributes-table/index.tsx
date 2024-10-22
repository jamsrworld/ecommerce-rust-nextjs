/* eslint-disable */
import { getAttributes } from "@/client";
import { authedClient } from "@/utils/authed-client";
import { DataTable, Typography } from "@jamsr-ui/react";
import { FetchError } from "@repo/components/fetch-error";
import { CreateAttribute } from "../create-attribute";
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
      topContent={
        <div className="flex items-center justify-between">
          <Typography
            variant="h6"
            as="h1"
          >
            Attribute List
          </Typography>
          <CreateAttribute />
        </div>
      }
      columns={columns}
      data={data}
      sorting={{ desc: true, id: "createdAt" }}
    />
  );
};
