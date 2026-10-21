export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
const DARK_CLASS = "dark";

/**
 * Inline script executed before first paint to apply the persisted (or system)
 * theme, preventing a flash of the wrong color scheme.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.classList.toggle(${JSON.stringify(
  DARK_CLASS,
)},t==="dark")}catch(e){}})()`;

export function getCurrentTheme(): Theme {
  return document.documentElement.classList.contains(DARK_CLASS)
    ? "dark"
    : "light";
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle(DARK_CLASS, theme === "dark");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies): theme still applies.
  }
}
