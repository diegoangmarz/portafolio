# Contexto del proyecto — para retomar en Claude Code

Este archivo explica **cómo está hecho** el portafolio. `ROADMAP.md` dice qué sigue y en qué
orden. Al retomar: `/leer-contexto`.

## Quién es el usuario

**Diego Angulo Marzuca** — Ingeniero en Desarrollo de Tecnología y Software (Universidad Modelo,
Mérida, Yuc.). **Desarrollador full-stack de tiempo completo en SimDataGroup** (entró como pasante en
feb 2025; hace web + PWA, front y back, similar a los juegos; **sin detalles por acuerdo de
confidencialidad**, solo puesto). Interés: IA y automatización.
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
- `next-intl` 4.14 (routing con `pathnames` localizados), `framer-motion` 13, `lucide-react` 1.47
  (**ya no trae iconos de marcas** → `components/icons.tsx` con paths de Simple Icons para
  GitHub/LinkedIn). **Sin `next-themes`**: se quitó porque inyecta un `<script>` en el árbol de
  React y React 19 avisa en consola; el tema es propio (`components/theme.tsx` + `theme-script.ts`).
- Node 22, npm 11. `AGENTS.md` y `CLAUDE.md` los genera `next dev`/`next build` (docs de Next 16 en
  `node_modules/next/dist/docs/`); se commitean tal cual.

## Estructura

```
portafolio/
  README.md, CONTEXT.md, ROADMAP.md, DESIGN.md (sistema visual: tokens, tipografía, espaciado), .env.example
  .claude/skills/{verificar,nuevo-proyecto}/SKILL.md   (las skills de flujo viven en ~/.claude/skills)
  next.config.ts               plugin de next-intl (apunta a src/i18n/request.ts) + remotePatterns
  src/
    proxy.ts                   createMiddleware(routing); matcher excluye api/_next/_vercel/archivos
    i18n/routing.ts            locales ['es','en'], defaultLocale 'es', localePrefix 'always',
                               pathnames: /about→/sobre-mi, /projects→/proyectos, /contact→/contacto
    i18n/navigation.ts         Link, redirect, usePathname, useRouter, getPathname tipados
    i18n/request.ts            carga src/messages/{locale}.json
    messages/es.json, en.json  textos de UI por namespace (Meta, Nav, Home, About, Projects, Contact, Footer, NotFound)
    data/profile.ts            CV; tipo Localized = { es, en }. Sin correo ni ubicación (decisión de Diego)
    data/projects.ts           Project[]: solo TriviaSpin y El Alce Manda (los únicos con demo pública)
    lib.ts                     cn() y t(field, locale)
    app/globals.css            tokens: --bg, --bg-elevated, --fg, --fg-muted, --border, --accent (verde, hue 150),
                               --accent-strong, --accent-fg, --accent-soft, --ring; .hero-glow
    app/[locale]/layout.tsx    <html lang> + <head> con el script del tema + fuentes Geist + NextIntlClientProvider
                               + header/footer; generateStaticParams por locale; metadata desde Meta.*
    app/[locale]/page.tsx      Home: hero, destacados (grid de 2), stack, bloque IA
    app/[locale]/about/        Sobre mí (puesto actual, formación, certificaciones, skills, botón CV deshabilitado)
    app/[locale]/projects/     lista (ProjectsGrid: el filtro por tipo solo aparece si hay >1 tipo) y detalle [slug] (SSG)
    app/[locale]/contact/      GitHub (+ LinkedIn si hay URL) + ContactForm → POST /api/contact
    app/[locale]/[...rest]/    notFound() para rutas desconocidas dentro del locale
    app/[locale]/not-found.tsx
    app/api/contact/route.ts   valida, honeypot, rate limit en memoria (5/IP/10 min) y envía con Resend;
                               sin RESEND_API_KEY imprime el mensaje en la terminal y responde ok (simulado)
    app/api/contact/email.ts   plantilla del correo (text + html con tablas/estilos inline, acento verde,
                               botón "Responder"); todo lo del visitante pasa por escapeHtml
    components/                site-header (nav + menú móvil), site-footer, theme (useTheme + ThemeToggle),
                               theme-script (inline en <head>), locale-switcher (<a> con navegación completa),
                               project-card, projects-grid, contact-form, motion (FadeIn/Stagger/FadeInItem),
                               icons, ui/{container,section,badge,button-styles}
```

## Cómo funciona

- **Idiomas**: el proxy redirige `/` → `/es`, reescribe los slugs localizados (`/es/sobre-mi` →
  ruta interna `/[locale]/about`) y redirige el slug equivocado (`/es/about` → `/es/sobre-mi`).
  En las páginas se usa `Link href="/about"` (interno) y next-intl pone el slug del idioma.
  El `LocaleSwitcher` es un `<a href>` construido con `getPathname({href:{pathname, params}, locale})`
  → navegación completa a propósito (ver Gotchas).
- **Contenido bilingüe de datos** (no de UI): campos `{ es, en }` resueltos con `t(field, locale)`
  de `src/lib.ts`. Los textos de UI van en `messages/*.json` con `useTranslations`/`getTranslations`.
- **Tema**: la clase `.dark` en `<html>` es la fuente de verdad. `theme-script.ts` (inline en
  `<head>`, antes de pintar) la pone según `localStorage.theme` o `prefers-color-scheme`;
  `components/theme.tsx` expone `useTheme()` (con `useSyncExternalStore`, devuelve `null` hasta
  hidratar) y `ThemeToggle`. Los tokens cambian en `.dark`.
- **Animaciones**: `components/motion.tsx` envuelve framer-motion en componentes cliente; las
  páginas son server components y solo importan esos wrappers. Con la pestaña en segundo plano
  (p. ej. capturas desde la extensión) `whileInView` tarda en disparar: esperar 2 s antes de capturar.
- **Páginas estáticas** (SSG) + una API route dinámica (`/api/contact`).
- **Formulario de contacto**: `ContactForm` hace `fetch('/api/contact')`; éxito → mensaje con check.
  Producción necesita `RESEND_API_KEY` + `CONTACT_TO_EMAIL` en Vercel (Resend free: 100/día,
  3 000/mes). En local Diego las tiene en `.env` (ignorado). Probado el 2026-09-21: llega a Gmail
  con la plantilla HTML. Ojo: `curl` desde la terminal de Windows manda el JSON sin UTF-8 y la
  `ñ` llega como `?`; para probar acentos usar el formulario o `python -c` con `urllib`.

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
- **Aviso "Encountered a script tag while rendering React component"**: React 19 lo lanza cuando
  crea un `<script>` en el cliente. Con `next-themes` salía siempre; con nuestro script inline en
  `<head>` solo saldría si el layout `[locale]` se volviera a montar en el cliente (cambio de
  idioma con `router.replace`). Por eso el `LocaleSwitcher` es un `<a>` con navegación completa.
  `next/script` con `beforeInteractive` también renderiza un `<script>` en el árbol: no sirve.
- El dev server se arranca con `npm run dev -- -p 3210` (el 3000 lo usan los juegos); si la tarea
  en segundo plano "falla" nada más arrancar suele ser el puerto ocupado por un `next` anterior.

## Historial de sesiones

- **2026-09-25 (s2)** — Sesión de diseño, **sin una línea de código**. Se recorrió en vivo el
  portafolio del mentor de Diego (https://www.sonnymijael.com/) para sacar ideas, no código, y
  quedó diseñada la **Fase 1.6** del roadmap: animaciones «notorio pero sobrio», fichas sin
  mención al repo y el año de los dos proyectos corregido a 2026 (el primer commit de TriviaSpin
  es del 2026-09-12 y el de El Alce Manda del 2026-09-14, así que el 2025 que había era falso).
  Las decisiones de Diego —nivel de animación, qué ideas se toman, que el enlace al perfil de
  GitHub se queda— están en `ROADMAP.md` §4, y el plan por tandas con archivos y verificación en
  `ROADMAP.md` → Fase 1.6.
- **2026-09-21 (s1)** — Scaffold con `create-next-app` (Next 16.3.5). Decisiones de idioma/orden/DB.
  i18n con next-intl y slugs localizados, tema claro/oscuro, tokens de color, datos de perfil,
  páginas Home/Sobre mí/Proyectos/Detalle/Contacto, 404, skills de flujo. Revisión en Edge con
  Diego: acento **verde** (era ámbar), fuera `next-themes` (aviso de React), fuera Blog, fuera los
  proyectos sin demo pública (quedan TriviaSpin y El Alce Manda), fuera correo/ubicación/Desafío
  Latam, puesto actual = full-stack tiempo completo en SimDataGroup. Formulario de contacto real
  vía `/api/contact` (Resend; simulado sin clave) con plantilla HTML, probado con envío real a
  Gmail. Repo público `diegoangmarz/portafolio` creado desde Edge (sin `gh`), `dev` y `prod`
  subidos. Desplegado en Vercel: **https://diegoangulo.vercel.app** (rama `prod`; ver `INFRA.md`).
  Otra sesión añadió `DESIGN.md` (sistema visual) en `dev` a las 21:40.
