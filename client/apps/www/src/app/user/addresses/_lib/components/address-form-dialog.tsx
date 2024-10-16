"use client";

import { useDisclosure } from "@jamsr-ui/hooks";
import { Button, Drawer } from "@jamsr-ui/react";
import { AddressForm } from "./address-form";

export const AddressFormDialog = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        fullWidth
        color="primary"
        size="lg"
        className="rounded-none"
        onClick={onOpen}
      >
        Add a new address
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        className="w-full p-4"
      >
        <AddressForm />
      </Drawer>
    </>
  );
};
