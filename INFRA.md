# Infraestructura — Portafolio

Todo en planes gratuitos. Sin backend aparte: Next.js en Vercel (páginas estáticas + API route
`/api/contact`), correo por Resend. Sin base de datos todavía (Fase 3: Neon).

## Piezas

| Pieza | Servicio / plan | Identificador | URL |
|---|---|---|---|
| Código | GitHub (público) | `diegoangmarz/portafolio` | https://github.com/diegoangmarz/portafolio |
| Sitio | Vercel · Hobby | proyecto `portafolio`, cuenta `diego-ang-marz` | **https://diegoangulo.vercel.app** |
| Sitio (dominio original) | Vercel | redirige 307 al anterior | https://portafolio-mu-seven-52.vercel.app |
| Correo del formulario | Resend · Free (100/día, 3 000/mes) | API key `portafolio` (Sending access) | https://resend.com/api-keys |

Accesos directos:
- Vercel proyecto: https://vercel.com/diego-ang-marz/portafolio
- Vercel deployments: https://vercel.com/diego-ang-marz/portafolio/deployments
- Vercel env vars: https://vercel.com/diego-ang-marz/portafolio/settings/environment-variables
- Vercel rama de producción: https://vercel.com/diego-ang-marz/portafolio/settings/environments/production
- Vercel dominios: https://vercel.com/diego-ang-marz/portafolio/settings/domains
- App Vercel en GitHub (acceso a repos): https://github.com/settings/installations

## Deploy

Todo sale de la rama **`prod`** (auto-deploy en Vercel al hacer push). Flujo: trabajar en `dev` →
`/subir-dev` → `/promover-prod` (ff-only + push). Los push a `dev` generan *Preview deployments*
(URL temporal) sin tocar producción.

- Preset Next.js, root `./`, comando `npm run build`. Next 16 hace el type-check dentro del build.
- Variables de entorno (Production):
  - `NEXT_PUBLIC_SITE_URL` = `https://diegoangulo.vercel.app` (tipo *Config*; Vercel no acepta
    `NEXT_PUBLIC_*` como *Secret*). Si falta o está vacía, `src/lib.ts` → `siteUrl()` cae a
    `VERCEL_PROJECT_PRODUCTION_URL` y luego a localhost.
  - `CONTACT_TO_EMAIL` = correo de Diego (tipo *Config*).
  - `RESEND_API_KEY` (tipo *Secret*; la pega Diego, nunca pasa por el chat ni por git).
  - Opcional `CONTACT_FROM_EMAIL` (por defecto `Portafolio <onboarding@resend.dev>`).
- Tras cambiar variables hay que **Redeploy** (Deployments → ⋯ → Redeploy) para que apliquen.

## Resend

- Sin dominio verificado solo se puede enviar **al correo de la propia cuenta** y desde
  `onboarding@resend.dev`. Para este formulario basta. Si algún día hay dominio propio, se
  verifica en Resend → Domains y se cambia `CONTACT_FROM_EMAIL`.
- Rotar clave: API Keys → ⋯ → Delete → Create API key (`portafolio`, Sending access) → pegar en
  `.env` local y en Vercel → Redeploy.
- Límite: 100 correos/día. El rate limit de `/api/contact` (5/IP/10 min) y el honeypot reducen
  abuso; endurecer con Upstash + Turnstile está en `ROADMAP.md` §3 Alta.

## Verificar producción desde la terminal

```bash
curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}\n' https://diegoangulo.vercel.app/      # 307 -> /es
curl -s https://diegoangulo.vercel.app/es | grep -o '<title>[^<]*'                                # título en español
curl -s -o /dev/null -w '%{http_code}\n' https://diegoangulo.vercel.app/en/about                  # 200
curl -s -o /dev/null -w '%{http_code}\n' https://diegoangulo.vercel.app/es/proyectos/triviaspin   # 200
git log --oneline -1 origin/prod                                                                  # lo que debería estar desplegado
```

Para saber si Vercel ya sirve el último build: buscar un texto nuevo en el HTML de producción.

## Problemas conocidos

- **Build falla con `TypeError: Invalid URL` en `generateMetadata`** (2026-09-21): Vercel importó
  `NEXT_PUBLIC_SITE_URL` desde `.env.example` con valor vacío. Resuelto en código con `siteUrl()`
  (`||` en vez de `??`); la variable se recreó con valor real.
- **"To link a GitHub repository, you need to install the GitHub integration first"**: la app
  Vercel en GitHub está en modo "solo repos seleccionados"; añadir el repo en
  https://github.com/settings/installations → Vercel → Configure (pide contraseña: lo hace Diego).
- **Rollback**: Vercel → Deployments → ⋯ del deploy bueno → *Promote to Production* / *Rollback*.

## Historial

- 2026-09-21 — Repo público creado, primer deploy (falló por la URL vacía), fix, rama de
  producción cambiada a `prod`, dominio `diegoangulo.vercel.app`, variables `NEXT_PUBLIC_SITE_URL`
  y `CONTACT_TO_EMAIL`. Pendiente al cerrar: `RESEND_API_KEY` en Vercel + Redeploy (Diego).
