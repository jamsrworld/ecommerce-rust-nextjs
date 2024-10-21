"use client";

import { useDisclosure } from "@jamsr-ui/hooks";
import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
} from "@jamsr-ui/react";
import { CreateAttributeForm } from "./create-attribute-form";

export const CreateAttribute = () => {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <Button onClick={onOpen}>Create new</Button>
      <Dialog
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DialogContent>
          <DialogHeader>Create Attribute</DialogHeader>
          <DialogBody>
            <CreateAttributeForm onSuccess={onClose} />
          </DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  );
};
