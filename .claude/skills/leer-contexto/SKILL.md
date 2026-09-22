---
name: leer-contexto
description: Lee README.md, CONTEXT.md, ROADMAP.md e INFRA.md para retomar el proyecto — usar al inicio de cada sesión o cuando el usuario pida "ponte en contexto", "lee el backlog", "en qué quedamos" o "qué sigue".
allowed-tools: Read, Bash(git status:*), Bash(git log:*), Bash(git branch:*)
---

# Leer contexto del proyecto

Los archivos de handoff viven en la raíz del repo. Léelos **completos y en este orden**:

1. `README.md` — qué es el proyecto y cómo se corre.
2. `CONTEXT.md` — *cómo está hecho*: arquitectura, decisiones, gotchas, historial de sesiones.
3. `ROADMAP.md` — *qué sigue*: punto exacto donde quedamos, siguiente tarea, backlog priorizado.
4. `INFRA.md` — solo si la sesión va a tocar deploy/variables (existe cuando el sitio ya está
   desplegado).

Después revisa el estado real del repo para detectar desfases entre los docs y el código:

```
git branch --show-current
git status --short
git log --oneline -5 dev
```

## Qué reportar al usuario

Un resumen corto en español (no repitas los archivos enteros):

- **Última sesión y punto exacto** según la cabecera de `ROADMAP.md`.
- **Siguiente tarea** (la sección marcada `← SIGUIENTE` en el plan principal).
- **Estado de git**: rama actual, si hay cambios sin commitear, si hay remoto.
- **Alertas**: si el `git log` muestra trabajo que los docs no mencionan, o si hay cambios sin
  commitear, dilo — probablemente la sesión anterior cerró sin correr `/actualizar-contexto`.

Termina preguntando si arrancamos con la siguiente tarea del roadmap o con otra cosa.
No modifiques ningún archivo en esta skill; para eso está `/actualizar-contexto`.
