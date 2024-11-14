import { Button } from "@jamsr-ui/react";

type Props = {
  isMutating: boolean;
};

export const CheckoutPayBtn = (props: Props) => {
  const { isMutating } = props;
  return (
    <Button
      fullWidth
      size="lg"
      color="primary"
      type="submit"
      isLoading={isMutating}
    >
      Complete Payment
    </Button>
  );
};
