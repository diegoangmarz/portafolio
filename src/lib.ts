import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/data/profile";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Resuelve un campo bilingüe al idioma actual. */
export function t(field: Localized, locale: Locale) {
  return field[locale] ?? field.es;
}

/**
 * URL pública del sitio (solo servidor). Orden: NEXT_PUBLIC_SITE_URL si tiene valor,
 * la URL de producción que expone Vercel, y localhost en desarrollo.
 * Ojo: Vercel puede definir la variable vacía (la "detecta" de .env.example), por eso `||`.
 */
export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
