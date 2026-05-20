import { Redis } from "@upstash/redis";

// Cliente Redis (lee UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN del entorno)
export const redis = Redis.fromEnv();

// Los leads parciales se autodestruyen a las 2h (limpieza). El flush ocurre a los 60 min.
const LEAD_TTL_SECONDS = 2 * 60 * 60;

export const leadKey = (id) => `lead:${id}`;

export async function getLead(id) {
  return await redis.get(leadKey(id));
}

export async function saveLead(id, data) {
  await redis.set(leadKey(id), data, { ex: LEAD_TTL_SECONDS });
}

const RECEPTOR = "lexnovanewchance@gmail.com";

// Reutiliza las variables VITE_ ya existentes si no hay versión sin prefijo.
// (En el servidor process.env tiene TODAS las variables, lleven prefijo o no.)
// La PRIVATE KEY nunca lleva prefijo VITE_: es un secreto y no debe exponerse al navegador.
const EMAILJS_SERVICE_ID =
  process.env.EMAILJS_SERVICE_ID || process.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID =
  process.env.EMAILJS_TEMPLATE_ID || process.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY =
  process.env.EMAILJS_PUBLIC_KEY || process.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

/**
 * Envía el email del lead vía API REST de EmailJS (server-side).
 * Reutiliza el servicio y template ya configurados en la cuenta del cliente.
 * @param {object} lead  Datos del lead almacenados en Redis
 * @param {"completo"|"parcial"} tipo
 */
export async function sendLeadEmail(lead, tipo) {
  const sinResponder = "— sin responder";
  const templateParams = {
    estado:
      tipo === "completo"
        ? "COMPLETO ✅"
        : "PARCIAL ⏱️ (el usuario no finalizó en 60 min)",
    from_name: lead.nombre || "—",
    from_phone: lead.telefono || "—",
    from_email: lead.email || "—",
    deuda_aproximada: lead.deuda || sinResponder,
    num_acreedores: lead.acreedores || sinResponder,
    comunidad: lead.comunidad || sinResponder,
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
