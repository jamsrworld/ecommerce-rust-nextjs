import { Button } from "@jamsr-ui/react";

export const ProductSave = () => {
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
      >
        Save Product
      </Button>
    </div>
  );
};
