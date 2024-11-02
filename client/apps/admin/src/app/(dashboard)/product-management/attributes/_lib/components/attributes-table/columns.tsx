"use client";

import { type GetAttributesResponse } from "@/client";
import { Badge, Select, SelectItem, type ColumnDef } from "@jamsr-ui/react";
import { fDateTime } from "@repo/utils/time";
import { DeleteAttribute } from "../delete-attribute";
import { EditAttribute } from "../edit-attribute";
import { UpdateAttributeStatus } from "../update-attribute-status";

type Column = GetAttributesResponse[number];

export const columns: ColumnDef<Column>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Values",
    accessorKey: "values",
    accessorFn: ({ values }) => values.length,
    cell: ({
      row: {
        original: { values },
      },
    }) => {
      return (
        <Select classNames={{ trigger: "md:min-w-[150px]" }}>
          {values.map(({ value }) => (
            <SelectItem
              key={value}
              value={value}
            >
              {value}
            </SelectItem>
          ))}
        </Select>
      );
    },
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
      const {isActive} = original;
      return (
        <Badge color={isActive ? "success" : "danger"}>
          {isActive ? "Enabled" : "Disabled"}
        </Badge>
      );
    },
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row: { original: item } }) => (
      <div className="flex items-center gap-2">
        <UpdateAttributeStatus
          id={item.id}
          isActive={item.isActive}
        />
        <EditAttribute
          formData={item}
          id={item.id}
        />
        <DeleteAttribute id={item.id} />
      </div>
    ),
  },
];
