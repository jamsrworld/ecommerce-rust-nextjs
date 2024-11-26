"use client";

import { THEME_LOCAL_STORAGE_KEY } from "@/config/app";
import { Button } from "@jamsr-ui/react";
import { MoonIcon, SunIcon } from "@repo/icons";

export const ThemeSwitcher = () => {
  const handleThemeSwitch = () => {
    const isDarkTheme = document.documentElement.classList.contains("dark");
    const newTheme = isDarkTheme ? "light" : "dark";
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, newTheme);
    document.documentElement.classList.toggle("light");
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Button
      isRounded
      isIconOnly
      onClick={handleThemeSwitch}
      variant="light"
    >
      <MoonIcon
        width={20}
        height={20}
        className="dark:hidden"
      />
      <SunIcon
        width={20}
        height={20}
        className="hidden dark:block"
      />
    </Button>
  );
};
