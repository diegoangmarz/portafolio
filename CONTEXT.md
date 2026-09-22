# Contexto del proyecto — para retomar en Claude Code

Este archivo explica **cómo está hecho** el portafolio. `ROADMAP.md` dice qué sigue y en qué
orden. Al retomar: `/leer-contexto`.

## Quién es el usuario

**Diego Angulo Marzuca** — Ingeniero en Desarrollo de Tecnología y Software (Universidad Modelo,
Mérida, Yuc.). Pasante Web Developer en SimDataGroup (feb 2025–). Interés: IA y automatización.
Email diegoangmarz@gmail.com · GitHub `diegoangmarz`. El perfil completo está en
`src/data/profile.ts` (es la fuente de verdad del CV dentro del sitio) y en
`../trivia-spin/CONTEXT.md` → "Quién es el usuario".

Repos hermanos en `E:\Diego Cosas\Codigos Diego\`: `trivia-spin/` (proyecto insignia) y
`el-alce-manda/` (segundo juego). Los tres comparten el flujo de trabajo (ramas `dev`/`prod`,
skills `/leer-contexto`, `/subir-dev`, `/promover-prod`, `/actualizar-contexto`) y la regla de
**todo 100 % gratis** (Vercel Hobby, Neon Free).

## Origen y plan (2026-09-21, sesión 1)

El plan viene de `../trivia-spin/CONTEXT.md` → "El plan general": portafolio full-stack + IA con
sitio público (Home / Sobre mí / Proyectos / Blog / Contacto), panel admin propio (CRUD de
proyectos y posts con Prisma + NextAuth), chat «Pregúntale a mi portafolio» con la API de Claude
(context stuffing, sin vector DB) y widget de stats de GitHub. Restricción: MVP en ~1 mes,
velocidad sobre alcance. Estilo: moderno con color de acento.

Decisiones de Diego en la sesión 1 (AskUserQuestion):
- **Bilingüe es + en** desde el inicio (selector en el header; `es` por defecto).
- **Orden**: Fase 1 sitio público con datos en código + deploy → Fase 2 chat Claude + GitHub
  widget → Fase 3 Prisma + admin. Tener algo publicable en días.
- **Base de datos**: Neon (ya tiene cuenta; proyecto nuevo en el free tier) cuando llegue la Fase 3.
- **ANTHROPIC_API_KEY**: todavía no la tiene. El chat se hace con respuesta simulada en dev y se
  conecta cuando exista la clave.
- **No fusionar los juegos en una sola app** (planteado por Diego el 2026-09-21): el portafolio no
  necesita liberar sitios; detalle en los ROADMAP de ambos juegos (fusión de backend como tarea
  futura, hub con selector como idea v2).

## Stack real (versiones instaladas)

- `next` 16.3.5 (App Router, Turbopack, `proxy.ts` en lugar de `middleware.ts`), `react` 19.2.
- `tailwindcss` 4 vía `@tailwindcss/postcss`; sin `tailwind.config` — todo en `globals.css`
  (`@theme inline`, `@custom-variant dark`).
- `next-intl` 4.14 (routing con `pathnames` localizados), `next-themes` (clase `.dark`),
  `framer-motion` 13, `lucide-react` 1.47 (**ya no trae iconos de marcas** → `components/icons.tsx`
  con paths de Simple Icons para GitHub/LinkedIn).
- Node 22, npm 11. `AGENTS.md` y `CLAUDE.md` los genera `next dev`/`next build` (docs de Next 16 en
  `node_modules/next/dist/docs/`); se commitean tal cual.

## Estructura

```
portafolio/
  README.md, CONTEXT.md, ROADMAP.md, .env.example
  .claude/skills/{leer-contexto,subir-dev,promover-prod,actualizar-contexto}/SKILL.md
  next.config.ts               plugin de next-intl (apunta a src/i18n/request.ts) + remotePatterns
  src/
    proxy.ts                   createMiddleware(routing); matcher excluye api/_next/_vercel/archivos
    i18n/routing.ts            locales ['es','en'], defaultLocale 'es', localePrefix 'always',
                               pathnames: /about→/sobre-mi, /projects→/proyectos, /contact→/contacto
    i18n/navigation.ts         Link, redirect, usePathname, useRouter, getPathname tipados
    i18n/request.ts            carga src/messages/{locale}.json
    messages/es.json, en.json  textos de UI por namespace (Meta, Nav, Home, About, Projects, Blog, Contact, Footer, NotFound)
    data/profile.ts            CV; tipo Localized = { es, en }
    data/projects.ts           Project[] (6 proyectos; featured: TriviaSpin, El Alce Manda, Full Stack System)
    lib.ts                     cn() y t(field, locale)
    app/globals.css            tokens: --bg, --bg-elevated, --fg, --fg-muted, --border, --accent (ámbar),
                               --accent-strong, --accent-fg, --accent-soft, --ring; .hero-glow
    app/[locale]/layout.tsx    <html lang> + fuentes Geist + ThemeProvider + NextIntlClientProvider + header/footer;
                               generateStaticParams por locale; metadata desde Meta.*
    app/[locale]/page.tsx      Home: hero, destacados, stack, bloque IA
    app/[locale]/about/        Sobre mí (experiencia, formación, certificaciones, skills, botón CV deshabilitado)
    app/[locale]/projects/     lista con filtro por tipo (ProjectsGrid, cliente) y detalle [slug] (SSG)
    app/[locale]/blog/         vacío con «Próximamente» (Fase 3 lee de la DB)
    app/[locale]/contact/      datos + CopyEmail + ContactForm (abre mailto: prellenado; Fase 3 → API route)
    app/[locale]/[...rest]/    notFound() para rutas desconocidas dentro del locale
    app/[locale]/not-found.tsx
    components/                site-header (nav + menú móvil), site-footer, theme-toggle, locale-switcher,
                               project-card, projects-grid, contact-form, motion (FadeIn/Stagger/FadeInItem),
                               icons, ui/{container,section,badge,button-styles}
```

## Cómo funciona

- **Idiomas**: el proxy redirige `/` → `/es`, reescribe los slugs localizados (`/es/sobre-mi` →
  ruta interna `/[locale]/about`) y redirige el slug equivocado (`/es/about` → `/es/sobre-mi`).
  En las páginas se usa `Link href="/about"` (interno) y next-intl pone el slug del idioma.
  El `LocaleSwitcher` hace `router.replace({pathname, params}, {locale})` con `useParams()`.
- **Contenido bilingüe de datos** (no de UI): campos `{ es, en }` resueltos con `t(field, locale)`
  de `src/lib.ts`. Los textos de UI van en `messages/*.json` con `useTranslations`/`getTranslations`.
- **Tema**: `next-themes` con `attribute="class"`; los tokens cambian en `.dark`. El
  `ThemeToggle` usa `useSyncExternalStore` para saber si ya montó (evita el desajuste de icono y
  la regla `react-hooks/set-state-in-effect` de ESLint 9 de Next 16).
- **Animaciones**: `components/motion.tsx` envuelve framer-motion en componentes cliente; las
  páginas son server components y solo importan esos wrappers.
- **Todo es estático** (SSG): 25 páginas en el build. No hay API routes todavía.

## Gotchas

- El `matcher` del proxy debe llevar `.*\\..*` (doble barra en el string TS). Con una sola barra
  el regex queda `.*..*` y excluye casi todas las rutas → los slugs localizados dan 404 y `/es/about`
  no redirige. Se detectó en la sesión 1 leyendo `.next/server/functions-config-manifest.json`.
- Tras crear/mover rutas hay que correr `npx next typegen` (o `next build`) para que los tipos
  `PageProps<"/[locale]/…">` existan; si no, `tsc` falla con "does not satisfy the constraint '/'".
- `next start` deja el proceso de node escuchando aunque se mate el shell padre; si el puerto sigue
  ocupado: `netstat -ano | grep :PUERTO` + `taskkill //F //PID`.
- Comandos Bash muy largos (varios heredocs) se truncan en esta terminal → escribir archivos
  grandes con la herramienta Write, uno por uno.

## Historial de sesiones

- **2026-09-21 (s1)** — Scaffold con `create-next-app` (Next 16.3.5). Decisiones de idioma/orden/DB.
  i18n con next-intl y slugs localizados, tema claro/oscuro, tokens de color, datos de perfil y 6
  proyectos, páginas Home/Sobre mí/Proyectos/Detalle/Blog/Contacto, 404, skills de flujo.
  `lint` y `build` limpios; rutas verificadas con curl en `next start`. Sin remoto ni deploy todavía.
