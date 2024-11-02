/* eslint-disable */
import { getAttributes } from "@/client";
import { authedClient } from "@/utils/authed-client";
import { Card, CardContent, CardHeader, DataTable } from "@jamsr-ui/react";
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
    <Card>
      <CardHeader
        heading="Attribute List"
        endContent={<CreateAttribute />}
      />
      <CardContent>
        <DataTable
          columns={columns}
          data={data}
          sorting={{ desc: true, id: "createdAt" }}
        />
      </CardContent>
    </Card>
  );
};
