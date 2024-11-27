"use client";

import { type CreateAddressInput } from "@/client";
import { useDisclosure } from "@jamsr-ui/hooks";
import { Button, Drawer, DrawerBody } from "@jamsr-ui/react";
import { useRouter } from "next/navigation";
import { UpdateAddressForm } from "./update-address-form";

type Props = {
  id: string;
  formData: CreateAddressInput;
};

export const EditAddress = (props: Props) => {
  const { id, formData } = props;
  const router = useRouter();
  const { isOpen, onOpen, onClose, setIsOpen } = useDisclosure();
  const onSuccess = () => {
    router.refresh();
    onClose();
  };
  if (formData.landmark === null) formData.landmark = "";
  return (
    <div>
      <Button
        variant="text"
        onClick={onOpen}
        className="p-0"
        disableRipple
      >
        Edit
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        size="2xl"
        className="flex w-full flex-col"
        closeButton={null}
      >
        {/* <div className="my-auto flex flex-col gap-4 p-4"> */}
        <DrawerBody className="my-auto flex grow-0 flex-col gap-4">
          <UpdateAddressForm
            id={id}
            onClose={onSuccess}
            defaultValues={formData}
          />
          <Button
            color="primary"
            variant="text"
            disableRipple
            className="underline"
            onClick={onClose}
          >
            Cancel
          </Button>
        </DrawerBody>
      </Drawer>
    </div>
  );
};
