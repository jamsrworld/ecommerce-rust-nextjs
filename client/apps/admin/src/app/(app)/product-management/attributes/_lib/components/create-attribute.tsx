"use client";

import { useDisclosure } from "@jamsr-ui/hooks";
import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
} from "@jamsr-ui/react";
import { AddIcon } from "@repo/icons";
import { useRouter } from "next/navigation";
import { CreateAttributeForm } from "./create-attribute-form";

export const CreateAttribute = () => {
  const router = useRouter();
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const onSuccess = () => {
    router.refresh();
    onClose();
  };
  return (
    <div className="flex justify-end">
      <Button
        onClick={onOpen}
        startContent={<AddIcon />}
      >
        Create new
      </Button>
      <Dialog
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DialogContent>
          <DialogHeader>Create Attribute</DialogHeader>
          <DialogBody>
            <CreateAttributeForm onSuccess={onSuccess} />
          </DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  );
};
