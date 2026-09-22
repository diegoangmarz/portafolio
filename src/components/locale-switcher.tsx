"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Nav");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const next: Locale = locale === "es" ? "en" : "es";

  return (
    <button
      type="button"
      aria-label={t("switchLocale")}
      title={t("switchLocale")}
      onClick={() =>
        router.replace(
          // @ts-expect-error -- pathname y params vienen de la ruta actual, ya validados
          { pathname, params },
          { locale: next },
        )
      }
      className="rounded-full px-2.5 py-1.5 font-mono text-xs font-semibold uppercase text-fg-muted transition-colors hover:bg-bg-elevated hover:text-fg"
    >
      {next}
    </button>
  );
}
