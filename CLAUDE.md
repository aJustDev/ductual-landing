# ductual-landing

Landing page de [Ductual](https://github.com/aJustDev/ductual-docs)
(coming soon + email capture). Repo independiente del backend
(`ductual-api`) y del SaaS frontend (`ductual-web`).

Reglas globales en `~/.claude/CLAUDE.md` siguen vigentes. Este fichero
aporta lo always-on del repo.

## Fuentes de verdad

- Stack y hosting: [ADR-041](https://github.com/aJustDev/ductual-docs/blob/main/docs/decisions/ADR-041-landing-stack.md)
  (incluye actualizacion 2026-04-26: CF Pages Functions nativas, no adapter).
- Bilingue ES/CA y dominio `.cat`: [ADR-042](https://github.com/aJustDev/ductual-docs/blob/main/docs/decisions/ADR-042-landing-multilingue.md).
- DNS y subdominios: [ADR-040](https://github.com/aJustDev/ductual-docs/blob/main/docs/decisions/ADR-040-dns-y-pre-prod.md).
- Politica privacidad / RGPD: [ADR-024](https://github.com/aJustDev/ductual-docs/blob/main/docs/decisions/ADR-024-dpa-rat-dpia.md)
  (revision legal pendiente; copy actual es borrador).

## Stack

- **Astro 6.1** TypeScript, output static puro (sin adapter).
- **Cloudflare Pages** plan Free, dominio `ductual-landing.pages.dev`
  por defecto. Custom domain `ductual.es` cuando la zona este delegada.
- **Cloudflare Pages Functions** nativas en `functions/` para el endpoint
  dinamico (`/api/subscribe`). NO usamos `@astrojs/cloudflare` adapter:
  v13+ rompe `wrangler pages deploy` porque cambia output a formato
  Workers+Assets.
- **Resend Audiences** via fetch nativo (sin SDK). Audiencia unica
  "General" id `0bc9cf71-4ed9-4967-833b-15075947da32`. Cuando entre el
  i18n CA (ADR-042), se anade segunda audiencia `Waitlist CA`.
- **GitHub Actions** dispara `wrangler pages deploy dist --branch main`
  en push a main (workflow `.github/workflows/deploy.yml`).

## Estructura

```
ductual-landing/
  src/
    pages/
      index.astro             coming soon (Hero + Features + Steps + Form + FAQ + Footer)
      privacidad.astro        politica de privacidad (borrador legal)
    components/                Hero, Features, Steps, EmailForm, Faq, Footer, Decor
    layouts/Base.astro         tokens CSS marfil/salvia, fonts Google, meta tags
  functions/
    api/subscribe.ts           CF Pages Function: POST /api/subscribe
  public/
    favicon.svg                glifo D italic en circulo salvia
    og-image.png               1200x630 generado desde scripts/og-source.svg
    robots.txt                 Disallow: / mientras noindex (hasta M7)
  scripts/
    build-og.mjs               sharp: SVG -> PNG. devDependency, no se usa en CI
    og-source.svg              fuente del og-image
  astro.config.mjs             defineConfig({}) sin adapter
  package.json                 deps: astro. devDeps: sharp, wrangler
  .dev.vars                    GITIGNORED. RESEND_API_KEY + RESEND_AUDIENCE_ID locales
```

## Comandos

- `npm run dev` - Astro dev en :4321. Sin Functions (la API no funciona).
- `npm run dev:pages` - **build + wrangler pages dev en :8788**. Emula
  CF Pages localmente con `.dev.vars`. Usar este para probar el form.
- `npm run build` - genera `dist/`.
- `npm run build:og` - regenera `public/og-image.png` desde el SVG fuente.
  Solo correr local cuando se cambie el copy del og.

Sin hot reload en `dev:pages`: hay que rearrancar tras cambios. Para
iterar CSS/HTML usa `dev`; para probar el form, `dev:pages`.

## Variables de entorno

**Local** (`.dev.vars`, gitignored):

```
RESEND_API_KEY=re_xxx
RESEND_AUDIENCE_ID=0bc9cf71-4ed9-4967-833b-15075947da32
```

**Produccion** (CF Pages -> Settings -> Variables and Secrets -> Production,
tipo Encrypt): mismas dos variables. Los GitHub secrets `RESEND_*` NO se
usan; en GitHub solo van `CLOUDFLARE_ACCOUNT_ID` y `CLOUDFLARE_API_TOKEN`
para que el workflow autentique a wrangler.

Tras anadir/cambiar variables en CF Pages: Deployments -> ultimo ->
Retry deployment. Solo entran en deploys nuevos.

## Convenciones del repo

- **Idioma del copy publico**: castellano con tildes y enes (UTF-8). El
  charset de la pagina ya es UTF-8. Para el dominio `.cat` (ADR-042),
  el copy sera 100% catalan; redirect 302 a `.es` no es opcion (puntCAT).
- **Idioma de docs internas, commits y este CLAUDE.md**: ASCII, sin
  tildes. Convencion del resto de repos del proyecto.
- **Marca**: "Ductual" con mayuscula inicial en copy publico (es nombre
  propio). Minusculas en URLs y tecnicismos: `ductual.es`, `ductual.cat`,
  `ductual-landing`, `ductual-docs`, `ductual-api`.
- **Datos del responsable RGPD**: Adrian Justino (Developer),
  `ajustinodev@proton.me`. Provisional hasta que la zona `.es` este en
  Cloudflare con Email Routing; entonces se sustituye por
  `privacidad@ductual.es` y `hola@ductual.es` (TODOs en
  `src/pages/privacidad.astro` y `src/components/Footer.astro`).
- **API key de Resend filtrada en chat 2026-04-26**: `re_ZWrrS9zF_...`.
  Pendiente de rotar. Tras rotar, actualizar `.dev.vars` local y el
  secret de CF Pages.
- **Diseno (paleta y tipografia)**: provisional hasta brand guidelines
  en M7. Tokens en `src/layouts/Base.astro`:
  - Bg marfil `#f7f4ee`, surface `#ffffff`, text carbon `#1f2620`,
    accent salvia `#5b7a5a`.
  - Display: Instrument Serif (Google Fonts). Body: Inter (Google Fonts).
- **Microcopy de captura**: prometemos "informe periodico del desarrollo
  - alguna encuesta puntual de feedback". NO "sin spam" a secas. La
    politica de privacidad refleja la misma finalidad. Mantener coherencia.

## Estado del coming soon

- `<meta name="robots" content="noindex">` y `robots.txt Disallow: /`
  activos hasta M7. La landing definitiva (con pricing, brand guidelines,
  bilingue) se construye en M7.
- Form de captura operativo en produccion. Idempotencia: si Resend
  devuelve 409 / "already exists", la function tambien responde 200.

## Pendientes operativos

- [ ] **Rotar API key Resend** (la actual se filtro en chat).
- [ ] **Email Routing en `.es`**: cuando la zona este delegada, crear
      `privacidad@ductual.es` y `hola@ductual.es` redirigiendo a
      `ajustinodev@proton.me`. Tras eso, sustituir TODOs en
      `privacidad.astro` y `Footer.astro`.
- [ ] **Custom domain `ductual.es`** en CF Pages -> Custom Domains.
- [ ] **Brand guidelines** (M7): copy validado, paleta y tipografia
      definitivas, quitar `noindex` y `robots.txt Disallow`.
- [ ] **Bilingue ES/CA** (ADR-042): refactor a Astro i18n + middleware
      `functions/_middleware.ts` + traduccion completa al catalan +
      segunda audiencia `Waitlist CA` antes de conectar `ductual.cat`.
