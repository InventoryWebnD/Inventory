"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { subscribeTheme, getThemeSnapshot, toggleTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    () => "dark" // Default server snapshot is always dark
  );

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group p-2 rounded-lg text-muted-foreground hover:text-foreground bg-card hover:bg-muted/70 border border-border hover:border-accent/70 transition-all cursor-pointer shadow-hard-xs hover:shadow-hard active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-accent-ink transition-transform duration-500 group-hover:rotate-90" />
      ) : (
        <Moon className="w-4 h-4 text-foreground transition-transform duration-500 group-hover:-rotate-12" />
      )}
    </button>
  );
}
