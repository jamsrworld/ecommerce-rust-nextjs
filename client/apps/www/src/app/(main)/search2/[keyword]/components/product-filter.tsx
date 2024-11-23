import { Button, Select, SelectItem } from "@jamsr-ui/react";

export const ProductFilter = () => {
  return (
    <div>
      <ul className="flex gap-4">
        <li>
          <Select
            className="rounded-full"
            placeholder="Price"
            classNames={{
              trigger: "rounded-full px-6",
            }}
          >
            <SelectItem value="200">200</SelectItem>
            <SelectItem value="300">300</SelectItem>
          </Select>
        </li>
        <li>
          <Select
            classNames={{
              trigger: "rounded-full px-6",
            }}
            placeholder="Color"
          >
            <SelectItem value="red">Red</SelectItem>
            <SelectItem value="blue">Blue</SelectItem>
          </Select>
        </li>
        <li>
          <Select
            classNames={{
              trigger: "rounded-full px-6",
            }}
            placeholder="Size"
          >
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="blue">Medium</SelectItem>
          </Select>
        </li>
        <li>
          <Select
            classNames={{
              trigger: "rounded-full px-6",
            }}
            placeholder="Collection"
          >
            <SelectItem value="sm">New</SelectItem>
            <SelectItem value="blue">Old</SelectItem>
          </Select>
        </li>
        <li>
          <Select
            classNames={{
              trigger: "rounded-full px-6",
            }}
            placeholder="Style"
          >
            <SelectItem value="sm">Modern</SelectItem>
            <SelectItem value="blue">Gold</SelectItem>
          </Select>
        </li>
        <li>
          <Button isRounded>All Filters</Button>
        </li>
      </ul>
    </div>
  );
};
