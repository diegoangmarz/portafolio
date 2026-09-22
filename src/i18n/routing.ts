import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/about": { es: "/sobre-mi", en: "/about" },
    "/projects": { es: "/proyectos", en: "/projects" },
    "/projects/[slug]": { es: "/proyectos/[slug]", en: "/projects/[slug]" },
    "/contact": { es: "/contacto", en: "/contact" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
