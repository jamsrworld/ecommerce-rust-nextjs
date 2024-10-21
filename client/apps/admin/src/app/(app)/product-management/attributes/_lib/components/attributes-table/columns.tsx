"use client";

import { type GetAttributesResponse } from "@/client";
import { type ColumnDef } from "@jamsr-ui/react";
import { fDateTime } from "@repo/utils/time";

type Column = GetAttributesResponse[number];

export const columns: ColumnDef<Column>[] = [
  {
    header: "name",
    accessorKey: "name",
  },
  {
    header: "values",
    accessorKey: "values",
    accessorFn: ({ values }) => values.length,
  },
  {
    header: "created At",
    accessorKey: "createdAt",
    cell: ({ row: { original } }) => fDateTime(original.createdAt),
    accessorFn: ({ createdAt }) => new Date(createdAt).getTime(),
    size: 180,
  },
];
