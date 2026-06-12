// Envío del lead vía API REST de EmailJS (server-side).
// Reutiliza las variables VITE_EMAILJS_* si no existe la versión sin prefijo.
// La PRIVATE KEY nunca lleva prefijo VITE_ (es secreta, no se expone al navegador).
const EMAILJS_SERVICE_ID =
  process.env.EMAILJS_SERVICE_ID || process.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID =
  process.env.EMAILJS_TEMPLATE_ID || process.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY =
  process.env.EMAILJS_PUBLIC_KEY || process.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

const RECEPTOR = "lexnovanewchance@gmail.com";

export async function sendLeadEmail(lead) {
  const templateParams = {
    estado: "COMPLETO ✅",
    from_name: lead.nombre || "—",
    from_phone: lead.telefono || "—",
    from_email: lead.email || "—",
    deuda_aproximada: lead.deuda || "—",
    num_acreedores: lead.acreedores || "—",
    comunidad: lead.comunidad || "—",
    // aliases comunes por compatibilidad de plantilla
    name: lead.nombre || "—",
    phone: lead.telefono || "—",
    email: lead.email || "—",
    to_email: RECEPTOR,
  };

  const resp = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      accessToken: EMAILJS_PRIVATE_KEY,
      template_params: templateParams,
    }),
  });

  if (!resp.ok) {
    const detail = await resp.text().catch(() => "");
    throw new Error(`EmailJS ${resp.status}: ${detail}`);
  }
}
