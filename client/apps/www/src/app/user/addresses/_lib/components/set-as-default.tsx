"use client";

import { Button } from "@jamsr-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { markDefaultAddressMutation } from "@/api/@tanstack/react-query.gen";

type Props = {
  id: string;
};

export const SetAsDefaultAddress = (props: Props) => {
  const router = useRouter();
  const { id } = props;
  const mutation = useMutation({
    ...markDefaultAddressMutation(),
    onSuccess() {
      router.refresh();
    },
  });

  const handleClick = () => {
    mutation.mutate({
      path: {
        id,
      },
    });
  };

  return (
    <Button
      variant="link"
      onClick={handleClick}
      className="p-0"
      disableRipple
    >
      Set as default
    </Button>
  );
};
