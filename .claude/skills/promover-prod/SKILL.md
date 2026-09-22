---
name: promover-prod
description: Promueve el checkpoint actual de dev a prod con merge fast-forward — SOLO cuando el usuario lo pide explícitamente ("promueve a prod", "esto es un checkpoint", "pásalo a prod").
disable-model-invocation: true
allowed-tools: Bash(git *), Bash(npm *)
---

# Promover checkpoint `dev` → `prod`

`prod` es la rama que se despliega (Vercel/Render apuntarán aquí). Solo recibe estados
funcionales y probados, siempre por **fast-forward** desde `dev`. Nunca se commitea en `prod`
directamente ni se hace merge con commit de merge.

## Estado actual

- Rama: !`git branch --show-current`
- Pendiente de commitear: !`git status --short`
- Commits que se promoverían: !`git log --oneline prod..dev`

## Pre-checks (abortar si falla alguno)

1. Working tree limpio. Si hay cambios sin commitear, detente y sugiere `/subir-dev` primero.
2. `dev` está por delante de `prod` (`git log --oneline prod..dev` no vacío). Si está vacío,
   no hay nada que promover.
3. `prod` es ancestro de `dev`: `git merge-base --is-ancestor prod dev`. Si no lo es, el
   ff-only va a fallar — **no fuerces nada**, avisa al usuario y para.
4. Pregunta al usuario si quiere correr los tests antes (`npm run lint && npm run build`). Si él dice que ya probó, salta esto.

## Promoción

```
git checkout prod
git merge --ff-only dev
git checkout dev
```

Si el usuario lo pide, etiqueta el checkpoint: `git tag -a vX.Y -m "..."` sobre `prod`.

## Push (solo si hay remoto)

`git remote -v`; si existe `origin`: `git push origin prod` (y `git push origin --tags` si
se creó tag). Si no hay remoto, menciónalo en una línea.

## Reportar

Muestra `git log --oneline -1 prod` y confirma que volviste a `dev`. Sugiere anotar el
checkpoint en la cabecera de `ROADMAP.md` con `/actualizar-contexto` si no está registrado.
