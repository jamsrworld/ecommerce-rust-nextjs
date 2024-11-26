import {
  Button,
  Drawer,
  type DrawerProps,
  Input,
  Typography,
} from "@jamsr-ui/react";
import { CloseIcon, SearchIcon } from "@repo/icons";
import { ArrowLeftIcon, ArrowRightIcon, ArrowRightSmIcon } from "@repo/icons/arrow";
import { useState } from "react";

const items = [
  "The Mcart Store Evening Events",
  "Find a store",
  "Apple Gift Card",
  "Apple Vision Pro",
  "Apple Trade In",
];

type Props = Required<Pick<DrawerProps, "isOpen" | "onOpenChange">> & {
  onClose: () => void;
};

export const SearchDrawer = (props: Props) => {
  const [value, setValue] = useState("");
  const isEmpty = value.trim() === "";
  const handleClear = () => setValue("");
  const { isOpen, onOpenChange, onClose } = props;
  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      anchor="top"
    >
      <div className="container max-w-screen-lg p-4 md:p-12">
        <Input
          autoFocus
          autoComplete="off"
          type="search"
          placeholder="Search products..."
          classNames={{
            inputWrapper: "border-none",
            input:
              "text-lg font-medium placeholder:text-lg placeholder:text-foreground-secondary",
            startContent: "pl-0",
          }}
          value={value}
          onValueChange={setValue}
          startContent={
            <div className="flex items-center">
              <SearchIcon
                width={28}
                height={28}
                className="text-foreground-secondary max-md:hidden"
              />
              <Button
                variant="light"
                isIconOnly
                onClick={onClose}
                isRounded
                size="sm"
                className="md:hidden"
              >
                <ArrowLeftIcon className="text-foreground-secondary [&>path]:stroke-2" />
              </Button>
            </div>
          }
          endContent={
            isEmpty ? null : (
              <Button
                type="button"
                aria-label="Clear"
                isRounded
                onClick={handleClear}
                isIconOnly
                size="xs"
                className="size-auto !p-1 text-foreground-secondary"
              >
                <CloseIcon
                  width={10}
                  height={10}
                  className="[&>path]:stroke-[4]"
                />
              </Button>
            )
          }
        />
        <div className="mt-6 flex flex-col gap-2">
          <Typography
            className="px-1 text-foreground-secondary"
            as="p"
            variant="caption"
          >
            Quick Links
          </Typography>
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <li
                key={item}
                className="group flex cursor-pointer items-center gap-1 rounded px-1 hover:bg-content2"
              >
                <ArrowRightSmIcon
                  width={20}
                  height={20}
                  className="text-foreground-secondary transition-colors group-hover:text-foreground"
                />
                <Typography
                  as="p"
                  variant="paragraph2"
                >
                  {item}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Drawer>
  );
};
