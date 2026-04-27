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
- **Resend Audiences** via fetch nativo (sin SDK). Dos audiencias
  separadas (en el dashboard de Resend aparecen como "segments", pero
  en la API son audiences distintas con su propio id; el endpoint usa
  `POST /audiences/:id/contacts`):
  - Newsletter ES: `0bc9cf71-4ed9-4967-833b-15075947da32`
  - Newsletter CAT: `f58816f4-f31f-4352-8ace-19fcdc8067d8`
    El endpoint elige por `locale` del body (`es` -> ES, `ca` -> CA).
- **Astro i18n** nativo. `defaultLocale: es`, `locales: [es, ca]`,
  `prefixDefaultLocale: false`. ES en `/`, CA en `/ca/` a nivel de fichero.
- **Routing por hostname** via `functions/_middleware.ts`:
  - `ductual.cat` reescribe internamente `/<path>` -> `/ca/<path>`.
  - Cross-domain: `.cat/privacidad` -> 301 `.es/privacidad` y
    `.es/privacitat` -> 301 `.cat/privacitat`. Path-prefijos
    `.es/ca/*` y `.cat/es/*` redirigen al dominio correcto.
- **GitHub Actions** dispara `wrangler pages deploy dist --branch main`
  en push a main (workflow `.github/workflows/deploy.yml`).

## Estructura

```
ductual-landing/
  src/
    pages/
      index.astro             home ES (locale: es)
      privacidad.astro        politica de privacidad ES (borrador legal)
      ca/
        index.astro           home CA (locale: ca)
        privacitat.astro      politica de privacidad CA (slug catalan)
    components/                Hero, Features, Steps, EmailForm, Faq, Footer, Decor
                               todos reciben prop `t: Dict` desde la pagina
    i18n/
      types.ts                 interfaz Dict (todas las claves user-facing)
      es.ts                    diccionario castellano
      ca.ts                    diccionario catalan
      index.ts                 helper getDict(locale)
    layouts/Base.astro         tokens CSS, fonts, meta tags + html lang/og:locale
                               dinamicos + hreflang ES/CA/x-default
  functions/
    _middleware.ts             routing por hostname: rewrite a /ca/ en .cat,
                               redirects 301 cruzados entre .es y .cat
    api/subscribe.ts           POST /api/subscribe; elige audiencia por locale
                               del body; devuelve codigos de error (no strings)
  public/
    favicon.svg                glifo D italic en circulo salvia
    og-image.png               1200x630 unica para ambos idiomas
    robots.txt                 Disallow: / mientras noindex (hasta M7)
  scripts/
    build-og.mjs               sharp: SVG -> PNG. devDependency, no se usa en CI
    og-source.svg              fuente del og-image
  astro.config.mjs             i18n nativo, sin adapter
  package.json                 deps: astro. devDeps: sharp, wrangler
  .dev.vars                    GITIGNORED. RESEND_API_KEY + RESEND_AUDIENCE_ID
                               + RESEND_AUDIENCE_ID_CA locales
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
RESEND_AUDIENCE_ID_CA=f58816f4-f31f-4352-8ace-19fcdc8067d8
```

**Produccion** (CF Pages -> Settings -> Variables and Secrets -> Production,
tipo Encrypt): las tres variables. Los GitHub secrets `RESEND_*` NO se
usan; en GitHub solo van `CLOUDFLARE_ACCOUNT_ID` y `CLOUDFLARE_API_TOKEN`
para que el workflow autentique a wrangler.

Tras anadir/cambiar variables en CF Pages: Deployments -> ultimo ->
Retry deployment. Solo entran en deploys nuevos.

## Convenciones del repo

- **Idioma del copy publico**: castellano (ES) en `ductual.es` y catalan
  (CA) en `ductual.cat`. Un idioma por dominio. UTF-8. Redirect a `.es`
  desde `.cat` no es opcion (puntCAT). Cross-domain entre `.es` y `.cat`
  con paths del idioma equivocado se 301 al dominio correcto.
- **Slugs**: en ES `/privacidad`, en CA `/privacitat`. Cada idioma usa el
  suyo. El middleware redirige el slug equivocado al dominio correcto.
- **Anadir un string nuevo**: tocar `src/i18n/types.ts` (clave nueva) y
  poblar en `es.ts` y `ca.ts`. No hay validador automatico; revisar a
  mano que ambos dicts tengan la clave (TypeScript lo exige al usar `t`).
- **Idioma de docs internas, commits y este CLAUDE.md**: ASCII, sin
  tildes. Convencion del resto de repos del proyecto.
- **Marca**: "Ductual" con mayuscula inicial en copy publico (es nombre
  propio). Minusculas en URLs y tecnicismos: `ductual.es`, `ductual.cat`,
  `ductual-landing`, `ductual-docs`, `ductual-api`.
- **Datos del responsable RGPD**: Adrian Justino (Developer),
  `ajustinodev@proton.me`. Provisional hasta que la zona `.es` este en
  Cloudflare con Email Routing; entonces se sustituye por
  `privacidad@ductual.es` y `hola@ductual.es` (TODOs en
  `src/pages/privacidad.astro`, `src/pages/ca/privacitat.astro` y
  `src/components/Footer.astro`).
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
- [ ] **Anadir `RESEND_AUDIENCE_ID_CA`** en `.dev.vars` local y en
      CF Pages Production (id `f58816f4-f31f-4352-8ace-19fcdc8067d8`,
      audiencia "Newsletter CAT" ya creada en Resend). Tras anadir en
      CF: retry del ultimo deploy. Smoke: form en `.cat` deja contacto
      en la audiencia CA.
- [ ] **Custom domain `ductual.cat`** en CF Pages -> Custom Domains.
      Solo despues de validar bilingue en preview branch.
- [ ] **Email Routing en `.es`**: cuando la zona este delegada, crear
      `privacidad@ductual.es` y `hola@ductual.es` redirigiendo a
      `ajustinodev@proton.me`. Tras eso, sustituir TODOs en
      `privacidad.astro`, `ca/privacitat.astro` y `Footer.astro`.
- [ ] **Custom domain `ductual.es`** en CF Pages -> Custom Domains.
- [ ] **Revisar traduccion catalana**: el copy CA actual es traduccion
      tecnica, no copywriting. Repasar antes de M7.
- [ ] **Brand guidelines** (M7): copy validado, paleta y tipografia
      definitivas, quitar `noindex` y `robots.txt Disallow`.

## Hecho

- **Bilingue ES/CA** (ADR-042) implementado: Astro i18n nativo,
  diccionarios en `src/i18n/`, middleware en `functions/_middleware.ts`
  con routing por hostname y redirects 301 cruzados, endpoint subscribe
  con seleccion de audiencia por locale.
