import { type Product } from "@/client";
import { deleteProductMutation } from "@/client/@tanstack/react-query.gen";
import { Button, Tooltip, useConfirmation } from "@jamsr-ui/react";
import { DeleteIcon } from "@repo/icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = Pick<Product, "title" | "id">;

export const DeleteProductBtn = (props: Props) => {
  const { id, title } = props;
  const { confirm } = useConfirmation();
  const router = useRouter();

  const mutation = useMutation({
    ...deleteProductMutation(),
    onSuccess() {
      router.refresh();
    },
  });

  const handleClick = () => {
    confirm({
      message: `Are you sure you want to delete ${title}?`,
      title: "Delete Product",
      onConfirm: () => {
        mutation.mutate({
          path: {
            id,
          },
        });
      },
    });
  };

  return (
    <Tooltip title="Delete Product">
      <Button
        aria-label="Delete Product"
        onClick={handleClick}
        isIconOnly
        color="danger"
        isLoading={mutation.isPending}
      >
        <DeleteIcon />
      </Button>
    </Tooltip>
  );
};
