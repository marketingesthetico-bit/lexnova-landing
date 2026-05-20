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
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: templateParams,
    }),
  });

  if (!resp.ok) {
    const detail = await resp.text().catch(() => "");
    throw new Error(`EmailJS ${resp.status}: ${detail}`);
  }
}
