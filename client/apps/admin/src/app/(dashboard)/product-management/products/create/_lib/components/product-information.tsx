import {
  Card,
  CardContent,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Switch,
} from "@jamsr-ui/react";

export const ProductInformation = () => {
  return (
    <Card>
      <CardHeader heading="Product Information" />
      <CardContent className="grid grid-cols-2 gap-4">
        <Input
          label="Product Title"
          classNames={{
            base: "col-span-2",
          }}
        />
        <Input label="SKU ID" />
        <Input
          label="Minimum Order"
          mask="number"
          precision={0}
        />
        <Input
          label="Maximum Order"
          mask="number"
          precision={0}
        />
        <Input
          label="Stock"
          mask="number"
          precision={0}
        />
        <Input
          label="Mrp"
          mask="currency"
        />
        <Input
          label="Selling Price"
          mask="currency"
        />
        <Input
          label="Low Stock Warning"
          mask="number"
          precision={0}
        />
        <Select label="Visibility">
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="private">Private</SelectItem>
          <SelectItem value="unlisted">Unlisted</SelectItem>
        </Select>
        <Switch label="Is Refundable" />
      </CardContent>
    </Card>
  );
};
