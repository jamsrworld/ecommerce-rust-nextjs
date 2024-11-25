"use client";

import { useDisclosure, useKeyPress } from "@jamsr-ui/hooks";
import { Button } from "@jamsr-ui/react";
import { SearchIcon } from "@repo/icons";
import { SearchDrawer } from "./search-drawer";

export const HeaderSearchItem = () => {
  const { isOpen, setIsOpen, onOpen, onClose } = useDisclosure();

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.metaKey) {
      e.preventDefault();
      onOpen();
    }
  };

  useKeyPress("k", onKeyPress, {
    isWindow: true,
  });

  return (
    <>
      <Button
        variant="light"
        isIconOnly
        onClick={onOpen}
      >
        <SearchIcon />
      </Button>
      <SearchDrawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onClose={onClose}
      />
    </>
  );
};
