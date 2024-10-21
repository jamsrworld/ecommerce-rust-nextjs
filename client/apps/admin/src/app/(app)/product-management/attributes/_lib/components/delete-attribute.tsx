import { deleteAttributeMutation } from "@/client/@tanstack/react-query.gen";
import { Button, useConfirmation } from "@jamsr-ui/react";
import { useMutation } from "@tanstack/react-query";

type Props = {
  id: string;
};

export const DeleteAttribute = (props: Props) => {
  const { id } = props;
  const { confirm } = useConfirmation();

  const mutation = useMutation({
    ...deleteAttributeMutation(),
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
  return <Button onClick={handleClick}>Delete</Button>;
};
