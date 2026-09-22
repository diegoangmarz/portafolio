# Portafolio — Roadmap y Backlog

> `CONTEXT.md` explica *cómo está hecho*; este archivo explica *qué sigue y en qué orden*.
> Actualizar al cerrar cada sesión (`/actualizar-contexto`).

**Última sesión:** 2026-09-21 (sesión 1)
**Punto exacto donde quedamos:** Fase 1 revisada con Diego en Edge (escritorio, claro y oscuro,
es/en): sitio público bilingüe con Home / Sobre mí / Proyectos (TriviaSpin y El Alce Manda) /
Contacto, acento verde, formulario de contacto real vía `/api/contact` (probado en local en modo
simulado). `npm run lint` y `npm run build` limpios. **Falta**: revisar en ancho de móvil, crear
el repo en GitHub, desplegar en Vercel y conectar Resend.
**Siguiente tarea al retomar:**
1. Revisar en móvil (≤400 px): hero, tarjetas, menú hamburguesa, formulario. Ajustar lo que se rompa.
2. Diego: decidir si "Disponible para nuevas oportunidades" (`Home.available`) se muestra.
   LinkedIn ya está (2026-09-21). Resend: Diego creó la cuenta el 2026-09-21 → poner
   `RESEND_API_KEY` y `CONTACT_TO_EMAIL` en `.env.local` (lo pega él; nunca se commitea) y
   probar el envío real en local. Nota: sin dominio verificado, Resend solo entrega al correo
   de la propia cuenta y desde `onboarding@resend.dev`; para este uso basta.
3. Crear repo **público** `diegoangmarz/portafolio` (decisión de Diego, 2026-09-21), push de `dev`
   y `prod`. **Vercel todavía no** (Diego avisa cuándo); cuando toque: importar con rama de
   producción `prod` y variables `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`.
   Crear `INFRA.md`. Probar el formulario en producción.
4. Endurecer el formulario (pedido por Diego): rate limit compartido con **Upstash Redis** (free)
   y **Cloudflare Turnstile** (free) — ver §3 Alta.

---

## 1. Estado actual

| Pieza | Estado |
|---|---|
| Scaffold Next 16 + Tailwind 4 + TS | Hecho (2026-09-21) |
| i18n es/en con slugs localizados | Hecho (2026-09-21) |
| Tema claro/oscuro + tokens de acento | Hecho (2026-09-21) |
| Home / Sobre mí / Proyectos / Detalle / Contacto / 404 | Hecho (2026-09-21) — revisado en escritorio; falta móvil |
| Datos de perfil y proyectos en código | Hecho (2026-09-21) — falta LinkedIn |
| Formulario de contacto con backend (`/api/contact` + Resend) | Hecho (2026-09-21) — falta `RESEND_API_KEY` |
| Repo GitHub + deploy Vercel | Pendiente |
| Anti-abuso robusto del formulario (Upstash + Turnstile) | Pendiente (hoy: honeypot + límite en memoria) |
| Capturas/imágenes de proyectos | Pendiente (hoy: franja de color por proyecto) |
| CV en PDF descargable | Pendiente (botón deshabilitado en Sobre mí) |
| Chat «Pregúntale a mi portafolio» (Claude) | Pendiente — Fase 2 (sin API key todavía) |
| Widget de stats de GitHub | Pendiente — Fase 2 |
| Prisma + Neon + panel admin + NextAuth | Pendiente — Fase 3 |
| Blog | **Descartado** por Diego (2026-09-21); si vuelve, va en Fase 3 con la DB |

## 2. Plan principal

### Fase 1 — Sitio público desplegado  ← SIGUIENTE (cerrar esta fase)
- [x] Scaffold, i18n, tema, componentes base.
- [x] Páginas con contenido real desde `src/data/`.
- [x] Revisión visual en escritorio (claro + oscuro, es/en) y ajustes de Diego (2026-09-21).
- [x] Formulario de contacto real (`/api/contact` + Resend, honeypot, rate limit básico).
- [ ] Revisión en móvil.
- [ ] Datos que faltan: LinkedIn, texto de disponibilidad.
- [ ] Repo en GitHub (`dev`/`prod`) + Vercel con rama `prod` + variables + `INFRA.md`.
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
- [ ] **Anti-abuso del formulario** (Diego, 2026-09-21: "limitar los envíos por si intentan atacar la
      página"). Hoy: validación + honeypot + 5 envíos/IP/10 min en memoria (en Vercel el contador es
      por instancia, no compartido). Plan: `@upstash/ratelimit` con Upstash Redis (free) para un
      límite global por IP y por día, y Cloudflare Turnstile (free, invisible) verificado en la API
      route. Ambos necesitan cuenta de Diego. El tope de Resend (100/día) acota el peor caso.
- [ ] Revisar contraste del verde en modo claro (`--accent-strong` sobre `--bg`) con una herramienta
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
- **2026-09-21** — Acento **verde** (`oklch(0.72 0.19 150)`; el favorito de Diego, reemplazó al
  ámbar inicial) sobre fondo neutro; estilo "moderno con acento", no minimalista tipo terminal.
  Fuente Geist (viene con create-next-app).
- **2026-09-21** — Solo se muestran proyectos con demo pública accesible (TriviaSpin, El Alce
  Manda). Sin Blog. Sin correo ni ubicación en el sitio; el contacto es solo por formulario
  (+ GitHub/LinkedIn). Puesto actual: desarrollador full-stack de tiempo completo en SimDataGroup,
  sin detalles del producto ni mención de confidencialidad; sin Desafío Latam.
- **2026-09-21** — Tema propio en vez de `next-themes` y cambio de idioma con navegación completa
  (motivo: aviso de React 19 por `<script>` en el árbol; ver `CONTEXT.md` → Gotchas).
- **2026-09-21** — Iconos de marca (GitHub/LinkedIn) inline en `components/icons.tsx`; lucide 1.x ya
  no los incluye.
- **2026-09-21** — No fusionar los juegos en una app para "hacer sitio": Vercel admite muchos
  proyectos y el portafolio no usa Render. Ver ROADMAP de TriviaSpin §5 y de El Alce §7.
- **2026-09-21** — Ramas `dev` (trabajo) y `prod` (deploy, solo ff desde `dev`), como en los
  otros dos repos. `master` de create-next-app se renombró a `dev`.
