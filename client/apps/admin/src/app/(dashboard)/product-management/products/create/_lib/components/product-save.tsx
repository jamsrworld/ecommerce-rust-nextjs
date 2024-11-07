import { Button } from "@jamsr-ui/react";

type Props = { isMutating: boolean };

export const ProductSave = (props: Props) => {
  const { isMutating } = props;
  return (
    <div className="sticky bottom-1 z-1 flex justify-end gap-2 rounded bg-background/50 p-2 shadow-lg backdrop-blur backdrop-saturate-150">
      <Button
        type="submit"
        variant="outlined"
        color="secondary"
      >
        Preview Product
      </Button>
      <Button
        type="submit"
        color="primary"
        isLoading={isMutating}
      >
        Save Product
      </Button>
    </div>
  );
};
