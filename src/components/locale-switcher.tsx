"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { getPathname, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

/**
 * Enlace a la misma página en el otro idioma. Es un <a> normal (navegación completa) a
 * propósito: así el layout raíz no se vuelve a montar en el cliente (evita el aviso de React
 * por el <script> del tema en <head>) y <html lang> queda correcto.
 */
export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const params = useParams();
  const next: Locale = locale === "es" ? "en" : "es";
  const href = getPathname({
    // @ts-expect-error -- pathname y params vienen de la ruta actual, ya validados
    href: { pathname, params },
    locale: next,
  });

  return (
    <a
      href={href}
      hrefLang={next}
      lang={next}
      aria-label={t("switchLocale")}
      title={t("switchLocale")}
      className="rounded-full px-2.5 py-1.5 font-mono text-xs font-semibold uppercase text-fg-muted transition-colors hover:bg-bg-elevated hover:text-fg"
    >
      {next}
    </a>
  );
}
