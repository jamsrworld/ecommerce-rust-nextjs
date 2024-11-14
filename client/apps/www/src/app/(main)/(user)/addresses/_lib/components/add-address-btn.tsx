"use client";

import { useDisclosure } from "@jamsr-ui/hooks";
import { Button, Drawer } from "@jamsr-ui/react";
import { useRouter } from "next/navigation";
import { CreateAddressForm } from "./create-address-form";

type Props = {
  addresses: number;
  maximumAddresses: number;
};

export const AddAddressBtn = (props: Props) => {
  const { addresses, maximumAddresses } = props;
  const router = useRouter();
  const { isOpen, onOpen, onClose, setIsOpen } = useDisclosure();
  const onSuccess = () => {
    onClose();
    router.refresh();
  };
  const isDisabled = addresses >= maximumAddresses;
  return (
    <>
      <Button
        fullWidth
        color="primary"
        size="lg"
        className="rounded-none"
        onClick={onOpen}
        isDisabled={isDisabled}
      >
        Add an Address
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className="flex w-full flex-col"
      >
        <div className="my-auto flex flex-col gap-4 p-4">
          <CreateAddressForm onSuccess={onSuccess} />
          <Button
            variant="text"
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
