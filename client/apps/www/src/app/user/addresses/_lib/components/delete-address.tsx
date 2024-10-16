"use client";

import { deleteAddressMutation } from "@/api/@tanstack/react-query.gen";
import { Button, useConfirmation } from "@jamsr-ui/react";
import { DeleteIcon } from "@repo/icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export const DeleteAddress = (props: Props) => {
  const router = useRouter();
  const { confirm } = useConfirmation();
  const { id } = props;
  const mutation = useMutation({
    ...deleteAddressMutation(),
    onSuccess() {
      router.refresh();
    },
  });
  const handleClick = () => {
    confirm({
      message: "Are you sure you want to delete this address?",
      onConfirm() {
        mutation.mutate({
          path: {
            id,
          },
        });
      },
      title: "Delete Address",
    });
  };
  return (
    <Button
      isIconOnly
      color="danger"
      onClick={handleClick}
      isDisabled={mutation.isPending}
    >
      <DeleteIcon />
    </Button>
  );
};
