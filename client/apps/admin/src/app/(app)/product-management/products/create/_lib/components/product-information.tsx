import {
  Card,
  CardContent,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Switch,
} from "@jamsr-ui/react";

type Props = {};

export const ProductInformation = (props: Props) => {
  return (
    <Card>
      <CardHeader heading="Product Information" />
      <CardContent className="grid grid-cols-2 gap-4">
        <Input label="Product Title" />
        <Input label="SKU ID" />
        <Input label="Minimum Order" />
        <Input label="Maximum Order" />
        <Input label="Stock" />
        <Input label="Mrp" />
        <Input label="Selling Price" />
        <Input label="Low Stock Warning" />
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
