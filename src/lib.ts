import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/data/profile";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Resuelve un campo bilingüe al idioma actual. */
export function t(field: Localized, locale: Locale) {
  return field[locale] ?? field.es;
}
