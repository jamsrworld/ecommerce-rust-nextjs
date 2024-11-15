"use client";

import { type GetProductsResponse } from "@/client";
import { APP_ROUTES } from "@/config/routes";
import {
  Avatar,
  Badge,
  Button,
  Tooltip,
  Typography,
  type ColumnDef,
} from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";
import { EyeIcon } from "@repo/icons";
import { fPrice } from "@repo/utils/number";
import { fDateTime } from "@repo/utils/time";
import { getFileSrc } from "@repo/utils/url";
import { DeleteProductBtn } from "./delete-product-btn";
import { EditProductBtn } from "./edit-product-btn";

type Column = GetProductsResponse[number];

export const columns: ColumnDef<Column>[] = [
  {
    header: "Product Details",
    accessorKey: "title",
    cell: ({
      row: {
        original: { title, images, skuId },
      },
    }) => {
      const thumbnail = images[0]!;
      return (
        <div className="flex items-center gap-2">
          <Avatar
            alt={title}
            placeholder="blur"
            blurDataURL={thumbnail.placeholder}
            width={thumbnail.width}
            height={thumbnail.height}
            src={getFileSrc(thumbnail.url)}
          />
          <div className="flex flex-col gap-1">
            <Typography as="p">{title}</Typography>
            <Typography
              as="p"
              className="text-foreground-secondary"
            >
              SKU ID:{skuId}
            </Typography>
          </div>
        </div>
      );
    },
  },
  {
    header: "Stock",
    accessorKey: "stock",
  },
  {
    header: "Selling Price",
    accessorKey: "price",
    cell: ({ row: { original } }) => fPrice(original.price),
  },
  {
    header: "MRP",
    accessorKey: "mrp",
    cell: ({ row: { original } }) => fPrice(original.mrp),
  },
  {
    header: "Category",
    accessorKey: "category",
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
        <Tooltip title="Preview Product">
          <Button
            aria-label="Preview Product"
            isIconOnly
            as={NextLink}
            href={APP_ROUTES.productManagement.products.view(
              item.id,
              item.slug,
            )}
            target="_blank"
          >
            <EyeIcon />
          </Button>
        </Tooltip>
        <DeleteProductBtn
          title={item.title}
          id={item.id}
        />
      </div>
    ),
  },
];
