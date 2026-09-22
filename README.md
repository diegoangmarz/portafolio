# Portafolio — Diego Angulo

Sitio personal full-stack + IA: proyectos, sobre mí, blog y contacto, en español e inglés.
Más adelante: chat «Pregúntale a mi portafolio» con la API de Claude, widget de GitHub y panel
admin con Prisma + NextAuth.

```
Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
Tailwind CSS v4 + Framer Motion + lucide-react
next-intl (rutas /es y /en con slugs localizados) + next-themes (claro/oscuro)
```

## Correr en local

Requisitos: Node 22+, npm 11+.

```bash
npm install
npm run dev          # → http://localhost:3000  (redirige a /es)
npm run lint         # eslint
npm run build        # build de producción (incluye type-check)
npm start            # sirve el build
```

`/` redirige al idioma por defecto (`es`). Rutas: `/es`, `/es/sobre-mi`, `/es/proyectos`,
`/es/proyectos/[slug]`, `/es/blog`, `/es/contacto` y sus equivalentes `/en/about`,
`/en/projects`, `/en/contact`.

## Dónde está cada cosa

- `src/data/profile.ts` — datos del CV (nombre, título, experiencia, skills). Campos bilingües `{ es, en }`.
- `src/data/projects.ts` — proyectos (slug, resumen, descripción, stack, enlaces). Fase 3: migra a Prisma.
- `src/messages/{es,en}.json` — textos de interfaz.
- `src/i18n/routing.ts` — idiomas y slugs localizados; `src/proxy.ts` — middleware de next-intl.
- `src/app/[locale]/…` — páginas; `src/components/` — UI.
- `src/app/globals.css` — tokens de color (acento ámbar) para claro/oscuro.

Ver `CONTEXT.md` (cómo está hecho) y `ROADMAP.md` (qué sigue).
