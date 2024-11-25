import { Button } from "@jamsr-ui/react";
import { SearchIcon } from "@repo/icons";

export const HeaderSearchItem = () => {
  return (
    <Button
      variant="light"
      isIconOnly
    >
      <SearchIcon />
    </Button>
  );
};
