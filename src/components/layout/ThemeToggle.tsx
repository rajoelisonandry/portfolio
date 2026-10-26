"use client";

import { MoonIcon, SunIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { applyTheme, getCurrentTheme } from "@/lib/theme";

interface ThemeToggleProps {
  label: string;
  title: string;
  className?: string;
}

/**
 * Stateless toggle: the active theme lives on `<html class="dark">` (set before
 * paint by `themeInitScript`), and CSS picks the matching icon. This avoids any
 * hydration mismatch between server and client.
 */
export function ThemeToggle({ label, title, className }: ThemeToggleProps) {
  const toggle = () =>
    applyTheme(getCurrentTheme() === "dark" ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={title}
      className={cn(
        "rounded-full p-2 transition-colors hover:bg-accent-soft hover:text-accent",
        className,
      )}
    >
      <SunIcon className="hidden size-5 dark:block" />
      <MoonIcon className="size-5 dark:hidden" />
    </button>
  );
}
