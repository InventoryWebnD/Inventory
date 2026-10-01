const THEME_KEY = "webnd_theme";
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export function subscribeTheme(callback: () => void): () => void {
  listeners.add(callback);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === THEME_KEY) {
      notify();
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }
  return () => {
    listeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

export function getThemeSnapshot(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function toggleTheme(): void {
  if (typeof window === "undefined") return;
  const current = getThemeSnapshot();
  const nextTheme = current === "dark" ? "light" : "dark";

  try {
    localStorage.setItem(THEME_KEY, nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    notify();
  } catch (e) {
    console.error("Failed to toggle theme in localStorage:", e);
  }
}
