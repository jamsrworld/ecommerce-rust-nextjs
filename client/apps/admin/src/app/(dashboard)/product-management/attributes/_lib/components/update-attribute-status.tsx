import { type AttributeModel } from "@/client";
import { updateAttributeStatusMutation } from "@/client/@tanstack/react-query.gen";
import { Button, Tooltip } from "@jamsr-ui/react";
import { EyeClosedIcon, EyeIcon } from "@repo/icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = Pick<AttributeModel, "id" | "isActive">;

export const UpdateAttributeStatus = (props: Props) => {
  const { id, isActive } = props;
  const router = useRouter();
  const title = isActive ? "Disable" : "Enable";

  const mutation = useMutation({
    ...updateAttributeStatusMutation(),
    onSuccess() {
      router.refresh();
    },
  });
  const handleClick = () => {
    mutation.mutate({
      path: {
        id,
      },
      body: {
        isActive: !isActive,
      },
    });
  };
  return (
    <Tooltip title={title}>
      <Button
        aria-label={isActive ? "Enabled" : "Disabled"}
        onClick={handleClick}
        isLoading={mutation.isPending}
        isIconOnly
        color={!isActive ? "success" : "danger"}
        variant="outlined"
      >
        {isActive ? <EyeClosedIcon /> : <EyeIcon />}
      </Button>
    </Tooltip>
  );
};
