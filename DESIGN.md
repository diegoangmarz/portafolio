# DESIGN.md — sistema visual del portafolio

Fuente de verdad para cualquier UI nueva o rediseño. Si algo de aquí choca con el código, gana el
código **y se corrige este archivo**; si hay que salirse del sistema, se anota en §8 con el porqué.
Los tokens viven en `src/app/globals.css` (`:root`, `.dark`, `@theme inline`); los primitivos en
`src/components/ui/`.

## 1. Carácter

"Moderno con acento": fondo neutro casi blanco/casi negro, un solo color vivo (verde) usado con
disciplina, tipografía Geist grande y apretada, tarjetas con borde fino. **No** es minimalista tipo
terminal, ni oscuro-neón de gamer, ni glassmorphism. Quien entra debe leer en 3 segundos: quién,
qué hace, dónde ver los proyectos.

Referentes de tono: sitios de producto de Vercel/Linear (jerarquía y espacio) — sin copiar su
estética monocroma: aquí el verde aparece en cada pantalla.

## 2. Color

Solo estos tokens; nunca colores literales de Tailwind (`text-emerald-500`, `bg-gray-100`) en
componentes. Todo en `oklch`.

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `bg` | `oklch(0.985 0.004 150)` | `oklch(0.17 0.015 260)` | fondo de página |
| `bg-elevated` | blanco | `oklch(0.22 0.015 260)` | tarjetas, header, inputs |
| `fg` | `oklch(0.2 0.02 260)` | `oklch(0.95 0.005 150)` | texto principal |
| `fg-muted` | `oklch(0.48 0.02 260)` | `oklch(0.7 0.015 260)` | texto secundario, metadatos |
| `border` | `oklch(0.9 0.01 260)` | `oklch(0.3 0.015 260)` | bordes de 1 px |
| `accent` | `oklch(0.72 0.19 150)` | `oklch(0.8 0.19 150)` | botón primario, punto del logo, selección |
| `accent-strong` | `oklch(0.5 0.15 150)` | `oklch(0.86 0.17 152)` | texto/links en verde (contraste AA sobre `bg`) |
| `accent-fg` | `oklch(0.2 0.05 150)` | igual | texto **sobre** `accent` |
| `accent-soft` | `oklch(0.95 0.06 150)` | `accent` al 12 % | badges de acento, glow del hero |
| `ring` | `accent` al 50 % | igual | foco |

Reglas:
- Texto verde siempre con `accent-strong`, nunca con `accent` (falla contraste en claro).
- El verde es **acento**, no relleno: máximo un botón primario por vista y un elemento verde por
  tarjeta (la franja superior de 6 px `h-1.5` con el `accent` del proyecto).
- Cada proyecto tiene su propio `accent` en `projects.ts` (oklch, tono distinto al verde del sitio);
  solo se usa en su tarjeta y su página.
- Un segundo tono frío (`oklch(0.75 0.12 200)`) existe únicamente en el glow del hero.
- Tema por clase `.dark` en `<html>` (script antes del primer pintado, ver `theme-script.ts`); ambos
  temas son de primera clase, no hay "modo secundario".

## 3. Tipografía

Geist Sans para todo; Geist Mono para **metadatos**: eyebrows, años, chips de stack, código.

| Rol | Clases | Nota |
|---|---|---|
| Display (hero) | `text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight` | una por sitio |
| H2 de sección | `text-3xl sm:text-4xl font-semibold tracking-tight` | vía `<Section title>` |
| Eyebrow | `font-mono text-xs uppercase tracking-widest text-accent-strong` | encima del H2 |
| Lead | `text-lg sm:text-xl text-fg-muted` | subtítulo del hero |
| Cuerpo | `text-base` / `text-sm leading-relaxed text-fg-muted` en tarjetas | 15 px en tarjeta `sm` |
| Meta | `font-mono text-xs` o `text-[11px]` | años, chips; nunca para contenido |

- Mínimo 14 px para texto que se lee; `text-xs` solo en badges, eyebrows y chips.
- `tracking-tight` en títulos, nunca en cuerpo. Sin `font-bold`: el peso alto es `semibold`.
- Ancho de lectura acotado: `max-w-2xl` en párrafos, `max-w-xl` en el lead del hero.

## 4. Espaciado y layout

- Contenedor único: `Container` = `max-w-6xl px-4 sm:px-6 lg:px-8`.
- Ritmo vertical de secciones: `Section` = `py-16 sm:py-24`; encabezado con `mb-10`.
- Escala interna: 2 → 3 → 4 → 5 → 6 → 8 (`gap-2` chips, `mt-3` subtítulo, `mt-4/5` bloques,
  `mt-8` CTAs, `p-8 sm:p-12` paneles). No introducir valores fuera de la escala de Tailwind.
- Hero: `min-h-[calc(100svh-4rem)]` (100svh menos header de `h-16`), contenido centrado
  verticalmente, fondo `hero-glow`.
- Grid de proyectos: `grid gap-5 md:grid-cols-2`. Un proyecto = una tarjeta; nada de carrusel.
- Header `sticky top-0 h-16`, `bg-bg/80 backdrop-blur`; nav completa desde `md`, botón de menú
  debajo.
- Móvil primero: todo debe funcionar a 360 px de ancho sin scroll horizontal.

## 5. Forma y superficie

| Elemento | Radio | Borde / fondo |
|---|---|---|
| Botones, badges, avatar-dot | `rounded-full` | ver `buttonClass` |
| Chips de stack, inputs | `rounded-md` / `rounded-xl` | `bg-bg` sobre tarjeta, `border-border` |
| Tarjetas | `rounded-2xl` | `border border-border bg-bg-elevated` |
| Paneles grandes (CTA, formulario) | `rounded-3xl` | `p-8 sm:p-12` |

- Sombra solo en hover de tarjeta: `shadow-lg shadow-accent/5`. Sin sombras en reposo.
- Sin gradientes de relleno; el único degradado es el glow radial del hero.
- Bordes siempre de 1 px con `border`; `border-dashed` para "placeholder/próximamente".

## 6. Botones y enlaces

`buttonClass(variant)` en `ui/button-styles.ts`: `primary` (verde sólido), `secondary` (borde,
hover verde), `ghost` (texto muted → fg). Un `primary` por vista. Enlaces en texto:
`text-accent-strong font-medium hover:underline` con flecha/ícono `size-4` opcional.
Foco: outline unificado en `globals.css` (2 px `accent`, offset 2) — no redefinir por componente.

## 7. Movimiento

Helpers en `components/motion.tsx`; no usar `framer-motion` directo en páginas.

- `FadeIn` (0.55 s, `y: 16`, ease `[0.22, 1, 0.36, 1]`, `once`) para secciones y tarjetas.
- `Stagger` + `FadeInItem` (0.08 s entre hijos) para grids.
- Hover: `transition-colors` en botones; tarjeta `-translate-y-0.5` + borde verde. Nada rebota,
  nada gira, nada en loop.
- `prefers-reduced-motion` ya anula animaciones en `globals.css`; cualquier animación nueva debe
  seguir funcionando sin movimiento.

## 8. Excepciones registradas

- *(vacío — anota aquí fecha, dónde y por qué te saliste del sistema)*

## 9. Checklist para UI nueva

1. ¿Usa solo tokens (§2) y primitivos (`Container`, `Section`, `Badge`, `buttonClass`)?
2. ¿Un solo elemento verde protagonista por vista?
3. ¿Se lee a 360 px sin scroll horizontal y con dedos (≥ 44 px de alto en lo tocable)?
4. ¿Funciona en claro y oscuro sin colores literales?
5. ¿Textos en `es` **y** `en` en `messages/*.json` (nada hardcodeado en JSX)?
6. ¿Animación vía `motion.tsx`, y correcta con reduced-motion?
