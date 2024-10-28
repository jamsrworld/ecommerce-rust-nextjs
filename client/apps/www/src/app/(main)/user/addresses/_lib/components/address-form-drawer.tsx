"use client";

import { useDisclosure } from "@jamsr-ui/hooks";
import { Button, Drawer } from "@jamsr-ui/react";
import { useRouter } from "next/navigation";
import { CreateAddressForm } from "./create-address-form";

export const AddressFormDrawer = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose, setIsOpen } = useDisclosure();
  const onSuccess = () => {
    onClose();
    router.refresh();
  };
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
        onOpenChange={setIsOpen}
        className="flex w-full flex-col"
      >
        <div className="my-auto flex flex-col gap-4 p-4">
          <CreateAddressForm onSuccess={onSuccess} />
          <Button
            variant="light"
            disableRipple
            className="underline"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </Drawer>
    </>
  );
};
