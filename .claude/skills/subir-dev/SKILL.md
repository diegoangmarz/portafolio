---
name: subir-dev
description: Commitea los avances en la rama dev (y hace push si hay remoto) — usar cuando el usuario diga "sube los cambios", "commitea", "guarda el avance", "haz commit a dev" o al terminar un bloque de trabajo.
argument-hint: [mensaje de commit opcional]
allowed-tools: Bash(git *), Bash(npm run build*), Bash(npm test*), Bash(cd *)
---

# Subir avances a `dev`

Flujo de ramas del proyecto: **todo se commitea en `dev`**; `prod` solo recibe fast-forwards
(`/promover-prod`) y es la que despliega Vercel. No existe `main`/`master`.

## Estado actual

- Rama: !`git branch --show-current`
- Cambios: !`git status --short`

## Pasos

1. **Verificar rama.** Si no estás en `dev`, detente y avisa.
2. **Revisar qué se va a subir.** `git status` y `git diff` (staged y unstaged). Confirma que:
   - No hay archivos sensibles (`.env`, keystores) ni `.next/`, `node_modules/`.
   - No hay archivos temporales o de prueba (`*.tmp.ts`, capturas) que no deberían ir.
3. **Compilar antes de commitear (obligatorio si hay cambios de código).** Vercel corre el build
   real. Correr `npm run lint && npm run build` en la raíz (Next.js hace el type-check dentro del
   build). Si falla, arreglarlo y volver a correrlo; **no commitear con el build roto**.
   Nota: `next dev`/`next build` regeneran `AGENTS.md`/`CLAUDE.md`; se commitean tal cual.
4. **Stagear.** `git add` de los archivos relevantes (por ruta, no `-A` a ciegas si hay basura).
   Si el usuario pidió subir "todo", `git add -A` está bien tras la revisión.
5. **Commit.** Mensaje en inglés, imperativo, una línea de resumen (≤72 chars) y, si el cambio es
   grande, un cuerpo breve con el porqué. Sigue el estilo del `git log` existente.
   - Si el usuario pasó un mensaje úsalo tal cual: $ARGUMENTS
   - Si el cambio mezcla cosas no relacionadas, propón separarlo en 2+ commits.
   - Añade al final las líneas de atribución que indique el system-reminder de la sesión.
6. **Push (solo si hay remoto).** `git remote -v`; si existe `origin`, `git push origin dev`
   (con `-u` la primera vez). Si no hay remoto, dilo en una línea y no insistas — el roadmap ya
   documenta cómo crearlo cuando el usuario quiera.
7. **Reportar.** Hash corto + mensaje del commit.
