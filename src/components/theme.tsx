"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Tema claro/oscuro sin dependencias. La clase `.dark` en <html> es la fuente de verdad;
 * `theme-script.ts` la pone antes de pintar (evita el parpadeo) y aquí solo la leemos/cambiamos.
 */
const STORAGE_KEY = "theme";
const EVENT = "themechange";

type Theme = "light" | "dark";

function readTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Sin almacenamiento (modo privado): el tema dura lo que dure la página
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

/** null en el servidor y durante la hidratación; después 'light' | 'dark'. */
export function useTheme() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, readTheme, () => null);
  return { theme, setTheme: applyTheme };
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Nav");
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={t("toggleTheme")}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full p-2 text-fg-muted transition-colors hover:bg-bg-elevated hover:text-fg"
    >
      {theme === null ? (
        <span className="block size-5" />
      ) : isDark ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </button>
  );
}
