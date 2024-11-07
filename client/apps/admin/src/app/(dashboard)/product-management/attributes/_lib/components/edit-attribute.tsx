import { type CreateAttributeInput } from "@/client";
import { useDisclosure } from "@jamsr-ui/hooks";
import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  Tooltip,
} from "@jamsr-ui/react";
import { EditIcon } from "@repo/icons";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { EditAttributeForm } from "./edit-attribute-form";

type Props = {
  id: string;
  formData: CreateAttributeInput;
};

export const EditAttribute = (props: Props) => {
  const router = useRouter();
  const { id, formData } = props;
  const { isOpen, onClose, onOpen, setIsOpen } = useDisclosure();
  const onSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
    onClose();
  };
  return (
    <>
      <Tooltip title="Edit">
        <Button
          isIconOnly
          onClick={onOpen}
          color="primary"
          variant="outlined"
        >
          <EditIcon />
        </Button>
      </Tooltip>
      <Dialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogContent>
          <DialogHeader>Update Attribute</DialogHeader>
          <DialogBody>
            <EditAttributeForm
              onSuccess={onSuccess}
              formData={formData}
              id={id}
            />
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  );
};
