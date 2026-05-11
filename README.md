# LexNova — Landing Segunda Oportunidad

Landing page de alta conversión para captar leads de personas con deudas
interesadas en la Ley de la Segunda Oportunidad.

## Stack

- **React 18** + **Vite**
- **Tailwind CSS v3**
- **Framer Motion** (animaciones)
- **React Hook Form** + **Zod** (formulario y validación)
- **EmailJS** (envío de leads al correo del cliente)
- **Vercel** (deploy)

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
partir de `.env.example`:

```env
VITE_EMAILJS_SERVICE_ID=service_XXXXXXX
VITE_EMAILJS_TEMPLATE_ID=template_XXXXXXX
VITE_EMAILJS_PUBLIC_KEY=XXXXXXXXXXXXXXXX
VITE_GTAG_CONVERSION_ID=AW-XXXXXXXXX/YYYYYYYYYYY
```

> Las variables de entorno deben llevar el prefijo `VITE_` para que Vite las
> exponga al cliente.

---

## 3. Configuración de EmailJS (paso a paso)

1. Crea una cuenta en [emailjs.com](https://www.emailjs.com/).
2. **Email Services** → *Add New Service* → conecta una cuenta **Gmail**.
   Usa la cuenta `lexnovanewchance@gmail.com` (es la receptora de los leads).
   Copia el **Service ID** que se genere.
3. **Email Templates** → *Create New Template*. Usa estas variables en el
   contenido del email (el formulario las envía con estos nombres):

   - `{{from_name}}` — nombre del lead
   - `{{from_phone}}` — teléfono
   - `{{from_email}}` — email

   Ejemplo de plantilla:

   ```
   Asunto: Nuevo lead LexNova — {{from_name}}

   Has recibido una nueva solicitud desde la landing:

   Nombre:     {{from_name}}
   Teléfono:   {{from_phone}}
   Email:      {{from_email}}
   ```

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
