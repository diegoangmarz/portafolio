---
name: nuevo-proyecto
description: Usar cuando el usuario quiera añadir, editar o quitar un proyecto del portafolio ("agrega el proyecto X", "mete El Alce Manda", "actualiza la tarjeta de TriviaSpin").
argument-hint: <nombre o ruta del repo del proyecto> [datos extra]
disable-model-invocation: true
allowed-tools: Read, Bash(git log:*), Bash(ls *), Bash(cat *), Bash(npm run lint*), Bash(npm run build*)
---

# Añadir un proyecto al portafolio

Los proyectos son datos, no páginas: viven en `src/data/projects.ts` (array `projects`) y las
páginas `/proyectos` y `/proyectos/[slug]` se generan solas. Todo texto visible es bilingüe
`{ es, en }` (tipo `Localized` de `src/data/profile.ts`).

Proyecto a añadir: $ARGUMENTS

## 1. Reunir los datos (no inventar)

Si el argumento es una ruta a un repo local (p. ej. `../el-alce-manda`), lee su `README.md`,
`CONTEXT.md` y `package.json` para sacar stack, año (`git log --reverse --format=%ad --date=short | head -1`),
URL de demo (en `INFRA.md` si existe) y repo. Si es solo un nombre, pregunta lo que falte
**en una sola tanda**: demo, repo (¿privado?), stack, 1 frase de resumen, 3–5 highlights.

Regla del portafolio (ROADMAP.md): solo entran proyectos **con demo pública**. Si no la tiene,
avisa y para.

## 2. Escribir la entrada

Copia la forma de una entrada existente de `projects.ts` y completa **todos** los campos:

| Campo | Regla |
|---|---|
| `slug` | kebab-case, único, sin acentos; es la URL |
| `kind` | uno de `ProjectKind`; si necesitas uno nuevo, añádelo al tipo **y** a `kind.*` en `src/messages/es.json` y `en.json` |
| `year`, `featured` | `featured: true` solo si el usuario lo dice |
| `summary` | 1 frase por idioma, ≤ 160 caracteres |
| `description` | 2 párrafos por idioma separados por `\n\n`; el segundo explica arquitectura |
| `highlights` | 3–5, cada uno `{ es, en }`, empezando por sustantivo o verbo |
| `stack` | nombres tal como los escribe el proyecto (React, Nest.js, Socket.IO…) |
| `accent` | color `oklch(...)` distinto a los ya usados |
| `liveUrl` / `repoUrl` / `repoPrivate` | `repoPrivate: true` si el repo no es público |

Escribe el inglés como lo escribiría un desarrollador nativo, no como traducción literal.

## 3. Verificar

`npm run lint && npm run build` (o la skill `verificar`). El build falla si el slug se repite o
falta una clave de `kind` en un idioma. Luego pide al usuario que revise `/es/proyectos/<slug>`
y `/en/projects/<slug>` en `npm run dev`.

Termina ofreciendo `/subir-dev`.
