# LexNova — Landing Segunda Oportunidad

Landing page de alta conversión para captar leads de personas con deudas
interesadas en la Ley de la Segunda Oportunidad.

## Stack

- **React 18** + **Vite**
- **Tailwind CSS v3**
- **Framer Motion** (animaciones)
- **React Hook Form** + **Zod** (formulario y validación)
- **Funciones serverless** (`/api`) en Vercel para el flujo de leads
- **Upstash Redis** (almacena leads parciales) + **Upstash QStash** (disparo a 60 min)
- **EmailJS** (envío de leads vía API REST server-side)
- **Vercel** (deploy)

---

## Cómo funciona la captación de leads (importante)

El formulario tiene 2 fases para reducir fricción:

1. **Form base** (Nombre, Teléfono, Email) → al enviarlo:
   - Se guarda el lead parcial en Redis.
   - Se programa un "flush" a los **60 minutos** vía QStash.
   - Se dispara la conversión de Google Ads.
   - Se abre un **wizard** modal.
2. **Wizard** (1 pregunta por pantalla): Deuda aproximada → Nº de acreedores →
   Comunidad autónoma. Cada respuesta se guarda en Redis.

**Envío del email:**
- Si completa el wizard → email **COMPLETO** al instante.
- Si abandona (cierra pestaña incluida) → a los 60 min se envía email
  **PARCIAL** con lo respondido hasta ese momento. El lead nunca se pierde.

---

## 1. Desarrollo local

```bash
pnpm install
pnpm dev
```

Abre `http://localhost:5173`.

Comandos:

| Comando | Descripción |
|---|---|
| `pnpm dev` | Dev server con HMR |
| `pnpm build` | Build de producción a `dist/` |
| `pnpm preview` | Previsualizar el build de producción |

---

## 2. Variables de entorno

Crea un archivo `.env` en la raíz (o configura las variables en Vercel) a
partir de `.env.example`. Hay **dos grupos**:

**Cliente (navegador)** — prefijo `VITE_`:
```env
VITE_GTAG_CONVERSION_ID=AW-XXXXXXXXX/YYYYYYYYYYY
```

**Servidor (funciones `/api`)** — SIN prefijo, nunca llegan al navegador:
```env
EMAILJS_SERVICE_ID=service_XXXXXXX
EMAILJS_TEMPLATE_ID=template_XXXXXXX
EMAILJS_PUBLIC_KEY=XXXXXXXXXXXXXXXX
EMAILJS_PRIVATE_KEY=XXXXXXXXXXXXXXXX
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=XXXXXXXXXXXXXXXX
QSTASH_TOKEN=XXXXXXXXXXXXXXXX
PUBLIC_BASE_URL=https://segundaoportunidad.lexnovas.com
FLUSH_SECRET=cadena-larga-aleatoria
```

> Todas se configuran en **Vercel → Settings → Environment Variables**.
> Las `VITE_` se exponen al navegador; el resto solo viven en el servidor.

### Configurar Upstash (Redis + QStash) — 5 min

1. Crea cuenta en [upstash.com](https://upstash.com) (gratis).
2. **Redis → Create Database** → región Europa (ej. `eu-west-1`).
   Copia **UPSTASH_REDIS_REST_URL** y **UPSTASH_REDIS_REST_TOKEN** (pestaña REST).
3. **QStash** (en el menú lateral) → copia el **QSTASH_TOKEN**.
4. Pega los 3 valores en las env vars de Vercel.

### Activar EmailJS server-side

1. EmailJS → **Account → General** → copia la **Private Key** (además de la Public).
2. EmailJS → **Account → Security** → activa
   **"Allow EmailJS API for non-browser applications"** (necesario para llamar
   desde la función serverless).
3. Pega `EMAILJS_PRIVATE_KEY` (y las demás `EMAILJS_*`) en Vercel.

### Generar FLUSH_SECRET

Cualquier cadena larga aleatoria. Por ejemplo, en terminal:
```bash
openssl rand -hex 24
```
Pégala en `FLUSH_SECRET`. Protege el endpoint `/api/lead/flush`.

> ⚠️ **Desarrollo local:** `pnpm dev` (Vite) NO ejecuta las funciones `/api`.
> En local el wizard se abre en "modo preview" pero no guarda ni envía. Para
> probar el flujo completo en local usa `pnpm dlx vercel dev`, o pruébalo
> directamente en el deploy de Vercel.

---

## 3. Configuración de EmailJS (paso a paso)

1. Crea una cuenta en [emailjs.com](https://www.emailjs.com/).
2. **Email Services** → *Add New Service* → conecta una cuenta **Gmail**.
   Usa la cuenta `lexnovanewchance@gmail.com` (es la receptora de los leads).
   Copia el **Service ID** que se genere.
3. **Email Templates** → *Create New Template*. Usa estas variables en el
   contenido del email (las funciones `/api` las envían con estos nombres):

   - `{{estado}}` — COMPLETO ✅ o PARCIAL ⏱️
   - `{{from_name}}` — nombre del lead
   - `{{from_phone}}` — teléfono
   - `{{from_email}}` — email
   - `{{deuda_aproximada}}` — rango de deuda
   - `{{num_acreedores}}` — número de acreedores
   - `{{comunidad}}` — comunidad autónoma

   Ejemplo de plantilla:

   ```
   Asunto: [{{estado}}] Nuevo lead LexNova — {{from_name}}

   Has recibido una solicitud desde la landing.

   Estado:         {{estado}}
   ─────────────────────────────
   Nombre:         {{from_name}}
   Teléfono:       {{from_phone}}
   Email:          {{from_email}}
   Deuda aprox.:   {{deuda_aproximada}}
   Nº acreedores:  {{num_acreedores}}
   Comunidad:      {{comunidad}}
   ```

   > Si el estado es PARCIAL, los campos no respondidos llegarán como
   > "— sin responder". Eso significa que el usuario no terminó el wizard;
   > aun así tienes su nombre, teléfono y email para contactarle.

   En **To Email** pon `lexnovanewchance@gmail.com`.
   Copia el **Template ID**.

4. **Account → API Keys** → copia la **Public Key**.
5. Pega los tres valores en el `.env` (local) y en Vercel
   (*Project Settings → Environment Variables*).

---

## 4. Google Ads — Conversión de Lead

El evento ya está implementado en `src/utils/gtag.js` y se dispara
automáticamente cuando el formulario se envía con éxito:

```js
window.gtag('event', 'conversion', {
  send_to: 'AW-XXXXXXXXX/YYYYYYYYYYY',
});
```

Pasos para activarlo desde Google Ads:

1. **Google Ads** → *Herramientas y configuración* → **Conversiones** →
   *Nueva conversión* → **Sitio web**.
2. Nombre: `Lead LexNova`.
3. Categoría: **Envío de formulario de contacto**.
4. Valor: opcional (sugerido: 1 EUR por lead, ajustable).
5. Recuento: **Una** (un lead por sesión).
6. Termina la creación y copia el identificador que aparece en la sección
   *Etiqueta de evento* — tiene el formato `AW-XXXXXXXXX/YYYYYYYYYYY`.
7. Pega ese valor completo en `VITE_GTAG_CONVERSION_ID`, tanto en local
   como en Vercel.
8. (Opcional) Sustituye también el `AW-XXXXXXXXX` del `<script>` de
   `index.html` por el ID de tu cuenta de Google Ads para activar el
   `gtag.js` global.

También se dispara el evento `generate_lead` para GA4 y, si activas el Pixel
de Meta comentado en `index.html`, un `Lead` en Facebook.

---

## 5. Deploy en Vercel

Opción A — desde la UI:

1. Sube el repo a GitHub.
2. En Vercel → *Add New Project* → importa el repositorio.
3. Framework Preset: **Vite** (autodetectado).
4. En *Environment Variables* añade las 4 variables del `.env`.
5. *Deploy*.

Opción B — desde la CLI:

```bash
pnpm dlx vercel
pnpm dlx vercel --prod
```

`vercel.json` ya incluye los headers de seguridad y el rewrite para SPA.

---

## 6. Estructura del proyecto

```
lexnova-landing/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ConversionModal.jsx
│   │   ├── Footer.jsx
│   │   ├── ForYouIf.jsx
│   │   ├── Hero.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── LeadForm.jsx
│   │   ├── SecondCTA.jsx
│   │   ├── Stats.jsx
│   │   ├── TrustBar.jsx
│   │   └── WhyUs.jsx
│   ├── hooks/
│   │   └── useFormSubmit.js
│   ├── utils/
│   │   └── gtag.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── vercel.json
├── .env.example
└── package.json
```

---

## 7. Personalización rápida

- **Paleta**: editar variables en `src/index.css` y `tailwind.config.js`.
- **Tipografías**: cargadas desde Google Fonts en `index.html`.
- **Textos**: cada componente expone su copy de forma legible al inicio del
  archivo (arrays `bullets`, `items`, `steps`, `cards`).
- **Logo**: SVG inline en `src/components/Hero.jsx` y `Footer.jsx`. Si el
  cliente facilita un PNG/SVG hospedado, sustituir por `<img />`.
