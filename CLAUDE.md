# ductual-landing

Landing page de Ductual. Astro 6.1 + Cloudflare Pages + Resend Audiences.

## Stack

- **Astro 6.1**: paginas estaticas + API route SSR con opt-in (`export const prerender = false`).
- **@astrojs/cloudflare**: adapter para CF Pages + Workers.
- **Resend Audiences**: captura de emails de la waitlist via API REST (sin SDK, fetch nativo).

## Comandos

- `npm run dev` - servidor de desarrollo en localhost:4321.
- `npm run build` - build de produccion en `dist/`.
- `npm run preview` - previsualizar el build local.

## Variables de entorno

Copiar `.env.example` a `.env.local` y rellenar:

- `RESEND_API_KEY`: API key de Resend (panel Resend -> API Keys).
- `RESEND_AUDIENCE_ID`: ID de la audiencia donde se guardan los emails de la waitlist.

## Deploy

Cloudflare Pages via GitHub Actions (`.github/workflows/deploy.yml`).
Secrets requeridos en GitHub: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`,
`RESEND_API_KEY`, `RESEND_AUDIENCE_ID`.

Instrucciones de setup inicial en `docs/ops/staging-cartagena.md` del repo
ductual-docs (seccion dominio personalizado en CF Pages).

## Convenciones

- Ingles en codigo, castellano en commits y docs.
- Sin librerias de UI. CSS puro en cada componente.
- El copy y diseno son provisionales hasta que se definan brand guidelines en M7.
- La pagina `/privacidad` es un borrador legal: revisar con asesor antes de produccion.
