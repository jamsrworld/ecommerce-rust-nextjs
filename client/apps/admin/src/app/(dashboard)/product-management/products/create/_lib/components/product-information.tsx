import {
  Card,
  CardContent,
  CardHeader,
  RHFInput,
  RHFSwitch,
} from "@jamsr-ui/react";
import { CURRENCY } from "@repo/config/app";
import { type ProductCreateSchema } from "../types";

type FormValues = ProductCreateSchema;

export const ProductInformation = () => {
  return (
    <Card>
      <CardHeader heading="Product Information" />
      <CardContent className="grid grid-cols-2 gap-4">
        <RHFInput<FormValues>
          name="title"
          label="Product Title"
          classNames={{
            base: "col-span-2",
          }}
        />
        <RHFInput<FormValues>
          name="skuID"
          label="SKU ID"
        />
        <RHFInput<FormValues>
          name="stock"
          label="Stock"
          isNumberInput
          decimalPrecision={0}
        />
        <RHFInput<FormValues>
          name="minimumOrder"
          label="Minimum Order"
          isNumberInput
          decimalPrecision={0}
        />
        <RHFInput<FormValues>
          name="maximumOrder"
          label="Maximum Order"
          isNumberInput
          decimalPrecision={0}
        />
        <RHFInput<FormValues>
          name="sellingPrice"
          label="Selling Price"
          isNumberInput
          startContent={CURRENCY}
        />
        <RHFInput<FormValues>
          name="mrp"
          label="Mrp"
          isNumberInput
          startContent={CURRENCY}
        />
        <RHFSwitch<FormValues>
          name="isRefundable"
          label="Is Refundable"
        />
      </CardContent>
    </Card>
  );
};
