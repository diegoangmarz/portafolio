# Portafolio — Roadmap y Backlog

> `CONTEXT.md` explica *cómo está hecho*; este archivo explica *qué sigue y en qué orden*.
> Actualizar al cerrar cada sesión (`/actualizar-contexto`).

**Última sesión:** 2026-09-21 (sesión 1)
**Punto exacto donde quedamos:** Fase 1 casi completa en local: sitio público bilingüe con todas
las páginas, tema claro/oscuro, datos del CV y 6 proyectos en código. `npm run lint` y
`npm run build` limpios; rutas localizadas verificadas con curl. **Falta**: revisar el diseño en el
navegador (todavía no se ha visto renderizado), crear el repo en GitHub y desplegar en Vercel.
**Siguiente tarea al retomar:**
1. Abrir `npm run dev` en el navegador y revisar Home/Sobre mí/Proyectos/Contacto en móvil y
   escritorio, claro y oscuro. Ajustar lo que se vea mal (tipografía, espaciados, colores).
2. Diego: rellenar `profile.linkedin`, decidir el `repoUrl` de "Full Stack System" y si "Disponible
   para nuevas oportunidades" se muestra o no (`Home.available`).
3. Crear repo `diegoangmarz/portafolio` (privado o público, decidir), push de `dev` y `prod`,
   importar en Vercel (rama de producción `prod`), `NEXT_PUBLIC_SITE_URL`. Crear `INFRA.md`.

---

## 1. Estado actual

| Pieza | Estado |
|---|---|
| Scaffold Next 16 + Tailwind 4 + TS | Hecho (2026-09-21) |
| i18n es/en con slugs localizados | Hecho (2026-09-21) |
| Tema claro/oscuro + tokens de acento | Hecho (2026-09-21) |
| Home / Sobre mí / Proyectos / Detalle / Blog / Contacto / 404 | Hecho (2026-09-21) — sin revisar en navegador |
| Datos de perfil y proyectos en código | Hecho (2026-09-21) — faltan LinkedIn y repo de Full Stack System |
| Repo GitHub + deploy Vercel | Pendiente |
| Capturas/imágenes de proyectos | Pendiente (hoy: franja de color por proyecto) |
| CV en PDF descargable | Pendiente (botón deshabilitado en Sobre mí) |
| Chat «Pregúntale a mi portafolio» (Claude) | Pendiente — Fase 2 (sin API key todavía) |
| Widget de stats de GitHub | Pendiente — Fase 2 |
| Prisma + Neon + panel admin + NextAuth | Pendiente — Fase 3 |
| Blog con posts reales | Pendiente — Fase 3 (hoy «Próximamente») |
| Formulario de contacto con backend | Pendiente — Fase 3 (hoy abre `mailto:`) |

## 2. Plan principal

### Fase 1 — Sitio público desplegado  ← SIGUIENTE (cerrar esta fase)
- [x] Scaffold, i18n, tema, componentes base.
- [x] Páginas con contenido real desde `src/data/`.
- [ ] Revisión visual en navegador (móvil + escritorio, claro + oscuro) y ajustes.
- [ ] Datos que faltan: LinkedIn, repo de Full Stack System, texto de disponibilidad.
- [ ] Repo en GitHub (`dev`/`prod`) + Vercel con rama `prod` + `INFRA.md`.
- [ ] SEO básico: `sitemap.ts`, `robots.ts`, `alternates.languages` (hreflang) en metadata, OG image.
- [ ] Capturas reales de TriviaSpin y El Alce Manda (móvil) en `public/projects/` y campo `image` en `Project`.
- [ ] CV en PDF en `public/` y activar el botón.

### Fase 2 — IA y GitHub
- [ ] **Chat «Pregúntale a mi portafolio»**: API route `app/api/chat/route.ts` con streaming, system
      prompt construido desde `profile.ts` + `projects.ts` (context stuffing), UI flotante o sección
      en Home. Sin `ANTHROPIC_API_KEY` → modo simulado que responde con datos locales. Leer la skill
      `claude-api` antes de escribir el código (modelo, streaming, límites de tokens, costo).
      Rate limit sencillo por IP y tope de mensajes por sesión para que no cueste dinero.
- [ ] **Widget de GitHub**: `api.github.com/users/diegoangmarz` + repos públicos (estrellas,
      lenguajes, último push), `fetch` con `next: { revalidate: 3600 }`; token opcional para subir el
      límite de la API.
- [ ] Post inaugural del blog (cómo se generó el banco de preguntas de TriviaSpin con Claude).

### Fase 3 — Base de datos y admin
- [ ] Neon (proyecto nuevo) + Prisma: modelos `Project`, `Post`, `Message` (contacto), `User`.
- [ ] Seed desde `src/data/*.ts`; las páginas públicas leen de la DB con `revalidate`.
- [ ] NextAuth (Credentials o GitHub OAuth solo para Diego) + `/admin` con CRUD de proyectos y posts
      (editor Markdown), lista de mensajes de contacto.
- [ ] Formulario de contacto → API route → guarda en DB (+ email con Resend free si se quiere).
- [ ] Blog público con MDX o Markdown renderizado desde la DB.

## 3. Backlog

### Alta
- [ ] Revisar contraste del ámbar en modo claro (`--accent-strong` sobre `--bg`) con una herramienta
      de accesibilidad; ajustar si baja de 4.5:1 en texto.
- [ ] `loading.tsx` / skeletons cuando haya datos remotos (Fase 2+).
- [ ] Analytics gratis (Vercel Analytics Hobby o Umami) — decidir.

### Media
- [ ] Página `/uses` o sección "Herramientas" (opcional).
- [ ] Animación del hero más rica (gradiente animado o partículas ligeras) sin castigar el LCP.
- [ ] Modo impresión del CV desde `/sobre-mi`.

### Baja
- [ ] Dominio propio (cuando haya uno) y redirecciones.
- [ ] Tests (Vitest + Testing Library) para `lib.ts`, `ProjectsGrid` y las rutas del proxy.

## 4. Decisiones tomadas (para no re-discutir)

- **2026-09-21** — Bilingüe es/en desde el inicio; `es` por defecto; slugs localizados
  (`/es/sobre-mi`, `/en/about`).
- **2026-09-21** — Orden: público → IA → DB/admin. Datos en código hasta la Fase 3.
- **2026-09-21** — Neon como PostgreSQL (misma cuenta que TriviaSpin, proyecto aparte).
- **2026-09-21** — Acento ámbar (`oklch(0.72 0.17 60)`) sobre fondo neutro; estilo "moderno con
  acento", no minimalista tipo terminal. Fuente Geist (viene con create-next-app).
- **2026-09-21** — Iconos de marca (GitHub/LinkedIn) inline en `components/icons.tsx`; lucide 1.x ya
  no los incluye.
- **2026-09-21** — No fusionar los juegos en una app para "hacer sitio": Vercel admite muchos
  proyectos y el portafolio no usa Render. Ver ROADMAP de TriviaSpin §5 y de El Alce §7.
- **2026-09-21** — Ramas `dev` (trabajo) y `prod` (deploy, solo ff desde `dev`), como en los
  otros dos repos. `master` de create-next-app se renombró a `dev`.
