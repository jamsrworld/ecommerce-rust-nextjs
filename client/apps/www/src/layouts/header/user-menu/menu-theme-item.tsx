"use client";

import { THEME_LOCAL_STORAGE_KEY } from "@/config/app";
import { MenuItem } from "@jamsr-ui/react";
import { MoonIcon, SunIcon } from "@repo/icons";

export const MenuThemeSwitcher = () => {
  const handleThemeSwitch = () => {
    const isDarkTheme = document.documentElement.classList.contains("dark");
    const newTheme = isDarkTheme ? "light" : "dark";
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, newTheme);
    document.documentElement.classList.toggle("light");
    document.documentElement.classList.toggle("dark");
  };

  const handleOnPress = (e: KeyboardEvent) => {
    console.log("e:->", e);
    // if (e.metaKey && e.altKey) {
    // e.preventDefault();
    handleThemeSwitch();
    // }
  };

  // useKeyPress(["z"], handleOnPress, {
  //   isWindow: true,
  // });

  return (
    <MenuItem
      startContent={
        <div>
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
        </div>
      }
      onClick={handleThemeSwitch}
    >
      Change Appearance
    </MenuItem>
  );
};
