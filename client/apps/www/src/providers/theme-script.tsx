const script = () => {
  const el = document.documentElement;
  const storageKey = "theme";
  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const updateDOM = (theme: string) => {
    el.classList.remove(...["light", "dark"]);
    el.classList.add(theme);
  };

  try {
    const themeName = localStorage.getItem(storageKey) ?? getSystemTheme();
    updateDOM(themeName);
  } catch (e) {
    console.error(e);
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
