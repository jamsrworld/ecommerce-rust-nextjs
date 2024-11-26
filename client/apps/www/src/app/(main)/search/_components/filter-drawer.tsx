"use client";

import { useDisclosure } from "@jamsr-ui/hooks";
import { Button, Drawer } from "@jamsr-ui/react";

export const FilterDrawer = () => {
  const { isOpen, onOpen, setIsOpen } = useDisclosure();
  return (
    <div>
      <Button onClick={onOpen}>Filter & Sort</Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        HIi
      </Drawer>
    </div>
  );
};
