"use client";

import { Button } from "@jamsr-ui/react";
import { MoonIcon } from "@repo/icons";

export const ThemeSwitcher = () => {
  const handleOnClick = () => {
    document.documentElement.classList.toggle("light");
    document.documentElement.classList.toggle("dark");
  };
  return (
    <Button
      variant="light"
      isIconOnly
      onClick={handleOnClick}
    >
      <MoonIcon />
    </Button>
  );
};
