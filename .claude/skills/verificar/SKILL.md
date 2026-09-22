---
name: verificar
description: Usar antes de commitear o promover a prod en el portafolio, o cuando el usuario diga "verifica", "corre el build", "corre el lint" o "revisa que compile".
argument-hint: [completo]
allowed-tools: Bash(npm *), Bash(git status:*), Bash(git diff:*)
---

# Verificar el portafolio (Next.js)

Un solo paquete en la raíz. Vercel corre el build real y Next hace el type-check dentro de él.

| Comando | Nota |
|---|---|
| `npm run lint` | ESLint (config de Next) |
| `npm run build` | `next build`; obligatorio si hay cambios de código |

`next build` regenera `AGENTS.md`/`CLAUDE.md`; se commitean tal cual, no es un error.

Si algo falla, arréglalo y vuelve a correrlo. Reporta en una línea por comando: ✅/❌ y el error
relevante si lo hubo. **Nunca** digas que pasa sin haber visto la salida.
