"use client";

import { type GetProductsResponse } from "@/client";
import { Badge, type ColumnDef } from "@jamsr-ui/react";
import { fDateTime } from "@repo/utils/time";
import { DeleteProductBtn } from "./delete-product-btn";
import { EditProductBtn } from "./edit-product-btn";

type Column = GetProductsResponse[number];

export const columns: ColumnDef<Column>[] = [
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row: { original } }) => fDateTime(original.createdAt),
    accessorFn: ({ createdAt }) => new Date(createdAt).getTime(),
    size: 180,
  },
  {
    header: "Status",
    accessorKey: "isActive",
    cell: ({ row: { original } }) => {
      const { status } = original;
      return <Badge color="success">{status}</Badge>;
    },
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row: { original: item } }) => (
      <div className="flex items-center gap-2">
        <EditProductBtn id={item.id} />
        <DeleteProductBtn
          title={item.title}
          id={item.id}
        />
      </div>
    ),
  },
];
