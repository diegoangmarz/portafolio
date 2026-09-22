"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

// true en cliente, false en el servidor/hidratación: evita el desajuste de icono.
const useMounted = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const t = useTranslations("Nav");

  const isDark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      aria-label={t("toggleTheme")}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full p-2 text-fg-muted transition-colors hover:bg-bg-elevated hover:text-fg"
    >
      {mounted ? (
        isDark ? <Sun className="size-5" /> : <Moon className="size-5" />
      ) : (
        <span className="block size-5" />
      )}
    </button>
  );
}
