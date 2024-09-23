"use client";

import { Button } from "@jamsr-ui/react";
import { MoonIcon, SunIcon } from "@repo/icons";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setIsDark(isDark);
  }, []);

  const handleToggle = () => {
    const el = document.documentElement;
    el.classList.remove(...["light", "dark"]);
    const newTheme = isDark ? "light" : "dark";
    el.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    setIsDark((prev) => !prev);
  };
  return (
    <Button
      isIconOnly
      onClick={handleToggle}
    >
      {!isDark ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

const script = () => {
  const el = document.documentElement;
  const storageKey = "theme";

  const getSystemTheme = () => {
    return "dark";
    // return window.matchMedia("(prefers-color-scheme: dark)").matches
    //   ? "dark"
    //   : "light";
  };

  const updateDOM = (theme: string) => {
    el.classList.remove(...["light", "dark"]);
    el.classList.add(theme);
  };

  try {
    const defaultTheme = getSystemTheme();
    const themeName = localStorage.getItem(storageKey) ?? defaultTheme;
    updateDOM(themeName);
  } catch (e) {
    console.error(e);
    //
  }
};

export const ThemeScript = () => {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: `(${script.toString()})()` }}
    />
  );
};
