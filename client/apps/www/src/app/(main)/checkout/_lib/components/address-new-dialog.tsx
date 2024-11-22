import { CreateAddressForm } from "@/app/(main)/(user)/addresses/_lib/components/create-address-form";
import { useDisclosure } from "@jamsr-ui/hooks";
import { Button, Drawer } from "@jamsr-ui/react";
import { useRouter } from "next/navigation";

export const AddressNewDialog = () => {
  const { isOpen, onOpen, onClose, setIsOpen } = useDisclosure();
  const router = useRouter();
  const onSuccess = () => {
    onClose();
    router.refresh();
  };
  return (
    <>
      <Button
        className="border-2 border-dashed border-divider"
        variant="light"
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
          <CreateAddressForm onClose={onSuccess} />
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
