# Portafolio — Roadmap y Backlog

> `CONTEXT.md` explica *cómo está hecho*; este archivo explica *qué sigue y en qué orden*.
> Actualizar al cerrar cada sesión (`/actualizar-contexto`).

**Última sesión:** 2026-09-25 (sesión 2 — solo diseño, **no se tocó código**)
**Punto exacto donde quedamos:** queda diseñada y aprobada la **Fase 1.6** (animaciones con más
intención, fichas sin mención al repo y los dos años corregidos a 2026), en tres tandas con un
commit cada una. Nada implementado todavía: el repo sigue exactamente como lo dejó la sesión 1.
**Siguiente tarea al retomar:** ejecutar la Fase 1.6, tanda por tanda, empezando por las
correcciones (año y repos), que son de minutos. Sigue pendiente lo de la sesión 1 que depende de
Diego (lista abajo).

**Estado anterior — 2026-09-21 (sesión 1):** **Sitio en producción: https://diegoangulo.vercel.app**
(Vercel, rama `prod`, `INFRA.md` creado). Sitio bilingüe con Home / Sobre mí / Proyectos
(TriviaSpin y El Alce Manda) / Contacto, acento verde, formulario real vía `/api/contact` con
plantilla HTML (probado en local con envío real a Gmail). Al cerrar la sesión faltaba que Diego
pegara `RESEND_API_KEY` en Vercel y pulsara Redeploy: hasta entonces el formulario en producción
responde ok pero **no envía** (modo simulado).
**Siguiente tarea al retomar:**
1. Confirmar que `RESEND_API_KEY` está en Vercel (Settings → Environment Variables) y que hubo
   Redeploy; probar el formulario en https://diegoangulo.vercel.app/es/contacto y que llegue el correo.
2. Revisión en el S24+ (Diego): hero, tarjetas, menú hamburguesa, formulario, claro/oscuro.
   Anotar aquí lo que se vea mal y corregirlo.
3. Diego: rotar la API key de Resend (la primera pasó por el chat): borrarla, crear otra, pegarla
   en `.env` local y en Vercel, Redeploy.
4. Fase 1.5 (pulido) cuando Diego quiera; endurecer el formulario (Upstash + Turnstile) — §3 Alta.

---

## 1. Estado actual

| Pieza | Estado |
|---|---|
| Scaffold Next 16 + Tailwind 4 + TS | Hecho (2026-09-21) |
| i18n es/en con slugs localizados | Hecho (2026-09-21) |
| Tema claro/oscuro + tokens de acento | Hecho (2026-09-21) |
| Home / Sobre mí / Proyectos / Detalle / Contacto / 404 | Hecho (2026-09-21) — revisado en escritorio; falta móvil (S24+) |
| Datos de perfil y proyectos en código | Hecho (2026-09-21) |
| Formulario de contacto con backend (`/api/contact` + Resend, plantilla HTML) | Hecho (2026-09-21) — probado con envío real |
| Repo GitHub (`diegoangmarz/portafolio`, público) | Hecho (2026-09-21) |
| Deploy Vercel (`prod` → https://diegoangulo.vercel.app) | Hecho (2026-09-21) — falta `RESEND_API_KEY` en Vercel |
| Anti-abuso robusto del formulario (Upstash + Turnstile) | Pendiente (hoy: honeypot + límite en memoria) |
| Capturas/imágenes de proyectos | Pendiente (hoy: franja de color por proyecto) |
| CV en PDF descargable | Pendiente (botón deshabilitado en Sobre mí) |
| Chat «Pregúntale a mi portafolio» (Claude) | Pendiente — Fase 2 (sin API key todavía) |
| Widget de stats de GitHub | Pendiente — Fase 2 |
| Prisma + Neon + panel admin + NextAuth | Pendiente — Fase 3 |
| Blog | **Descartado** por Diego (2026-09-21); si vuelve, va en Fase 3 con la DB |

## 2. Plan principal

### Fase 1 — Sitio público desplegado (casi cerrada)
- [x] Scaffold, i18n, tema, componentes base.
- [x] Páginas con contenido real desde `src/data/`.
- [x] Revisión visual en escritorio (claro + oscuro, es/en) y ajustes de Diego (2026-09-21).
- [x] Formulario de contacto real (`/api/contact` + Resend, honeypot, rate limit básico).
- [x] LinkedIn añadido; etiqueta «Disponible para nuevas oportunidades» eliminada (Diego trabaja,
      no busca; 2026-09-21). Si algún día la quiere, era un `Badge` con punto animado en el hero.
- [x] Repo público en GitHub (`dev`/`prod`).
- [x] Vercel con rama `prod` + variables + `INFRA.md` (2026-09-21). Falta `RESEND_API_KEY` (Diego).
- [ ] Revisión en móvil (S24+) sobre https://diegoangulo.vercel.app.  ← SIGUIENTE

### Fase 1.5 — Pulido para reclutadores (backlog documentado, hacer después del deploy)
Decisión de Diego (2026-09-21): esto queda registrado aquí, no se hace todavía.
- [ ] **Capturas reales** de TriviaSpin y El Alce Manda desde el móvil (PNG, ~1080×2340, 2–3 por
      juego) en `public/projects/<slug>/`; campo `images: string[]` en `Project`; en la tarjeta
      la primera captura sustituye la franja de color, en el detalle una galería horizontal con
      `next/image`. **Movido a la Fase 1.6** (2026-09-25): se hace junto con las animaciones.
- [ ] **CV en PDF** descargable: `public/cv-diego-angulo-es.pdf` (+ `-en.pdf` si quiere) y activar el
      botón de Sobre mí. Opción B: generar el PDF desde `profile.ts` con `@react-pdf/renderer` para
      que nunca se desactualice.
- [ ] **SEO básico**: `app/sitemap.ts` y `app/robots.ts` (Next los genera), `alternates.languages`
      (hreflang es/en) y `canonical` en `generateMetadata` del layout, `opengraph-image.tsx` con
      nombre + título en verde para que LinkedIn/WhatsApp muestren tarjeta al compartir.
- [ ] **Anti-abuso fuerte del formulario**: ver §3 Alta (Upstash + Turnstile).
- [ ] **Contraste del verde** en modo claro con una herramienta de accesibilidad (≥ 4.5:1 en texto).
- [ ] **Analytics gratis** (Vercel Web Analytics en Hobby o Umami): decidir y activar.

### Fase 1.6 — Movimiento y fichas sin repo (diseñado 2026-09-25, **sin implementar**)

Diego pidió más animación sacando ideas —no código— de https://www.sonnymijael.com/, el
portafolio de su mentor. Lo que hace ese sitio, observado en vivo el 2026-09-25: un **cubo de
Rubik 3D** girando como pieza-firma presente en todas las páginas (un `canvas` de three.js
dentro de un Next del pages router; no usa GSAP), **revelados por scroll que entran
desplazándose** en cascada (se ven claramente a mitad de animación), **filas de chips de stack
en marquesina**, un **saludo en píldora** sobre el nombre y una **línea de tiempo «Bio»** de año
+ hecho.

El portafolio ya tiene `framer-motion` y lo usa en tres sitios (`motion.tsx` con un fade-up
genérico, el filtro de la grilla y el menú móvil): hay base, falta intención.

**Tanda 1 — correcciones**
- [ ] `year: 2025` → `2026` en los dos proyectos de `data/projects.ts`. El año estaba mal: el
      primer commit de TriviaSpin es del 2026-09-12 y el de El Alce Manda del 2026-09-14.
- [ ] Quitar **toda** mención al repo: campos `repoUrl` / `repoPrivate` del tipo `Project` y de
      los datos, los bloques que los pintan en `components/project-card.tsx` y en
      `app/[locale]/projects/[slug]/page.tsx`, y las claves `repo` / `repoPrivate` de
      `messages/es.json` y `messages/en.json`. Las fichas quedan solo con «Ver demo».

**Tanda 2 — animación base («notorio pero sobrio»)**
- [ ] `motion.tsx`: variantes con dirección (entrada desde los lados, no solo desde abajo) y
      `useReducedMotion`. Sin ese chequeo, «movimiento notorio» se vuelve un sitio mareante para
      quien tiene activado «reducir movimiento»; el CSS global de hoy no cubre lo que anima
      framer-motion por JS.
- [ ] **Hero en cascada**: píldora de saludo → nombre → tagline → botones. La píldora usa el dato
      real de `profile.ts`: «Full-stack desde Mérida, Yucatán».
- [ ] **Revelados con desplazamiento**: las secciones alternan entrada desde izquierda/derecha en
      vez del mismo fade-up para todo, y las tarjetas entran en cascada más marcada.
- [ ] **Hover con profundidad en las tarjetas**: se elevan, el borde toma el `accent` del proyecto
      y la franja hace un zoom leve. Todo bajo `@media (hover: hover)` para no dejar estados
      pegados en el teléfono.
- [ ] **Transición entre páginas**: fade + desplazamiento corto con `AnimatePresence` por ruta.

**Tanda 3 — las dos ideas que Diego eligió**
- [ ] **Marquesina de stack** en la sección 02 de Home: dos filas deslizándose en direcciones
      opuestas, en bucle, que se pausan al pasar el cursor. Con `prefers-reduced-motion` vuelve a
      la lista estática de hoy.
- [ ] **Capturas reales** (sustituye al ítem equivalente de la Fase 1.5): campo `images` en
      `Project` y `public/projects/<slug>/`. Las saca Claude desde las demos en vivo a ancho de
      teléfono; si no convencen, Diego manda las del S24+.

**Archivos:** `data/projects.ts`, `components/motion.tsx`, `project-card.tsx`,
`projects/[slug]/page.tsx`, `app/[locale]/page.tsx`, `layout.tsx`, `messages/{es,en}.json`, más
dos nuevos (`marquee.tsx`, `page-transition.tsx`).

**Verificación** (el portafolio no tiene tests): `npm run build`, `npm run lint`, revisión a
412 px y en escritorio, y una pasada con «reducir movimiento» activado. Un commit por tanda.

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
- [ ] `loading.tsx` / skeletons cuando haya datos remotos (Fase 2+).

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
- **2026-09-25** — Nivel de animación: **notorio pero sobrio**. Nada de pieza-firma 3D tipo el
  cubo de Rubik del sitio del mentor: cuesta bundle y no dice nada de lo que Diego hace.
- **2026-09-25** — Las fichas de proyecto **no mencionan el repo** (ni botón ni candado «repo
  privado»): solo demo en vivo.
- **2026-09-25** — **El enlace al perfil de GitHub se queda** (hero y footer). Consecuencia
  asumida: TriviaSpin es público en GitHub y queda a un clic desde el perfil; si algún día no se
  quiere visible, se cambia la visibilidad en GitHub, no en el portafolio.
- **2026-09-25** — De las ideas del portafolio del mentor (https://www.sonnymijael.com/) se toman
  la marquesina de stack, el saludo en píldora y las capturas reales. **No** se toma la línea de
  tiempo «Bio». Son ideas, no código: nada se copia de ese sitio.
