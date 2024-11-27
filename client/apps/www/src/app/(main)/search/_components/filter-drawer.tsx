"use client";

import { useDisclosure } from "@jamsr-ui/hooks";
import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  Divider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Typography,
} from "@jamsr-ui/react";

const FilterItem = ({
  heading,
  items,
  isCheckbox,
}: {
  heading: string;
  items: string[];
  isCheckbox?: boolean;
}) => {
  return (
    <div>
      <Accordion>
        <AccordionItem
          heading={heading}
          classNames={{
            base: "p-0",
            heading: "font-semibold uppercase",
          }}
        >
          <div className="flex flex-col gap-4 text-foreground">
            {items.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center gap-1"
                >
                  {isCheckbox && <Checkbox />}
                  <Typography as="p">{item}</Typography>
                </div>
              );
            })}
          </div>
        </AccordionItem>
      </Accordion>
      <Divider />
    </div>
  );
};

export const FilterDrawer = () => {
  const { isOpen, onOpen, setIsOpen } = useDisclosure();
  return (
    <div>
      <Button onClick={onOpen}>Filter & Sort</Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className="flex flex-col"
        isBordered
      >
        <DrawerHeader>Filter & Sort</DrawerHeader>
        <DrawerBody>
          <FilterItem
            heading="Sort By"
            items={[
              "Price (Low - High)",
              "Newest",
              "Top Sellers",
              "Price (High - Low)",
            ]}
          />
          <FilterItem
            heading="Featured"
            items={[
              "First time on discount",
              "Selling fast",
              "Best Seller",
              "Hot deal",
              "Black Friday",
            ]}
          />
          <FilterItem
            heading="Product Type"
            isCheckbox
            items={[
              "Sneakers",
              "Football Boots",
              "T-shirts",
              "Pants",
              "Hats",
              "Suits",
              "Jeans",
              "Hoodies",
              "Shorts",
              "Watches",
              "Jackets",
              "Glasses",
              "Socks",
            ]}
          />
          <FilterItem
            heading="Size"
            isCheckbox
            items={[
              "2XS",
              "XS",
              "S",
              "M",
              "L",
              "XL",
              "2XL",
              "3XL",
              "4XL",
              "5XL",
              "6XL",
            ]}
          />
          <FilterItem
            heading="Color"
            isCheckbox
            items={[
              "Red",
              "Blue",
              "Green",
              "Yellow",
              "Orange",
              "Purple",
              "Pink",
              "Black",
              "White",
              "Grey",
              "Brown",
              "Beige",
              "Gold",
              "Silver",
            ]}
          />
          <FilterItem
            heading="Gender"
            isCheckbox
            items={["Male", "Female", "Kids"]}
          />
          <FilterItem
            isCheckbox
            heading="Brand"
            items={["Performance", "Sportswear"]}
          />
        </DrawerBody>
        <DrawerFooter>
          <Button>Apply</Button>
        </DrawerFooter>
      </Drawer>
    </div>
  );
};
