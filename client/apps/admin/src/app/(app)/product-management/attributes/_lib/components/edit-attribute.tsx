import { type CreateAttributeInput } from "@/client";
import { useDisclosure } from "@jamsr-ui/hooks";
import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
} from "@jamsr-ui/react";
import { EditAttributeForm } from "./edit-attribute-form";

type Props = {
  id: string;
  formData: CreateAttributeInput;
};

export const EditAttribute = (props: Props) => {
  const { id, formData } = props;
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Edit</Button>
      <Dialog
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DialogContent>
          <DialogHeader>Update Attribute</DialogHeader>
          <DialogBody>
            <EditAttributeForm
              onSuccess={onClose}
              formData={formData}
              id={id}
            />
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  );
};
