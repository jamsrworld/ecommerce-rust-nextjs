import { deleteAttributeMutation } from "@/client/@tanstack/react-query.gen";
import { Button, Tooltip, useConfirmation } from "@jamsr-ui/react";
import { DeleteIcon } from "@repo/icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export const DeleteAttribute = (props: Props) => {
  const { id } = props;
  const { confirm } = useConfirmation();
  const router = useRouter();

  const mutation = useMutation({
    ...deleteAttributeMutation(),
    onSuccess() {
      router.refresh();
    },
  });

  const handleClick = () => {
    confirm({
      message: "Are you sure you want to delete this attribute?",
      title: "Delete Attribute",
      onConfirm: () => {
        mutation.mutate({ path: { id } });
      },
    });
  };
  return (
    <Tooltip title="Delete">
      <Button
        color="danger"
        variant="outlined"
        onClick={handleClick}
        isIconOnly
      >
        <DeleteIcon />
      </Button>
    </Tooltip>
  );
};
