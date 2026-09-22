---
name: actualizar-contexto
description: Actualiza CONTEXT.md y ROADMAP.md (y README.md / INFRA.md si aplica) con lo hecho en la sesión — usar al cerrar sesión, al terminar un paso del roadmap, o cuando el usuario diga "actualiza el contexto/roadmap", "cerremos la sesión" o "documenta los avances".
argument-hint: [resumen opcional de lo que se hizo]
---

# Actualizar los documentos de handoff

Estos archivos son la memoria del proyecto entre sesiones. Regla de oro: **actualizarlos al cerrar
cada sesión**.

Si el usuario pasó un resumen: $ARGUMENTS — úsalo como base, pero verifica contra el código y el
`git log` antes de escribirlo.

## Paso 1 — Reconstruir qué cambió

```
git log --oneline -10
git status --short
git diff --stat HEAD
```

Combina eso con lo que sabes de la conversación actual. Si dudas de un detalle técnico (un
nombre de archivo, un script de npm, un id de carta), léelo del código, no lo inventes.

## Paso 2 — `ROADMAP.md` (qué sigue)

- Cabecera: `**Última sesión:**` con la fecha de hoy (YYYY-MM-DD), `**Punto exacto donde
  quedamos:**` y `**Siguiente tarea al retomar:**`.
- Tabla "Estado actual": cambiar filas de `Pendiente` → `Hecho (fecha)` según corresponda.
- Plan principal: marcar `[x]` los ítems terminados; mover la etiqueta `← SIGUIENTE`.
- Backlog: añadir ideas nuevas en la prioridad correcta; quitar las hechas.
- "Decisiones tomadas": añadir cualquier decisión nueva del usuario, con fecha.

## Paso 3 — `CONTEXT.md` (cómo está hecho)

- Actualizar la sección tocada (estructura, cómo funciona el juego, gotchas).
- Añadir una entrada en "Historial de sesiones" con fecha y 3–6 líneas de lo hecho.
- No duplicar lo que ya dice `ROADMAP.md`: aquí va el *cómo*, allá el *qué sigue*.

## Paso 4 — `INFRA.md` (solo si cambió el deploy)

Si la sesión tocó Vercel, Neon, variables de entorno o dominios, actualiza la tabla y los runbooks
de `INFRA.md` (créalo la primera vez copiando la estructura de `../el-alce-manda/INFRA.md`).

## Paso 5 — `README.md` (solo si hace falta)

Tocar únicamente si cambió cómo se corre el proyecto, el stack o la estructura de carpetas.

## Paso 6 — Cerrar

Muestra al usuario un resumen de qué cambiaste en cada archivo y luego **ofrece correr
`/subir-dev`** para dejar docs y código commiteados en `dev`.
