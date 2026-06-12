import { sendLeadEmail } from "../_lib/email.js";

// Reglas de cualificación (deben coincidir EXACTAMENTE con el frontend).
const DEUDA_EXCLUIDA = "Menos de 15.000€";
const COMUNIDAD_VALIDA = "Cataluña";

function isQualified(lead) {
  return (
    lead.deuda !== DEUDA_EXCLUIDA && lead.comunidad === COMUNIDAD_VALIDA
  );
}

/**
 * Recibe el lead COMPLETO (base + respuestas del wizard).
 * Solo envía el email si el lead cualifica. Devuelve { qualified } para que
 * el frontend decida si dispara la conversión de Google Ads.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  try {
    const { nombre, telefono, email, deuda, acreedores, comunidad } =
      req.body || {};

    if (!nombre || !telefono || !email || !deuda || !acreedores || !comunidad) {
      return res.status(400).json({ error: "missing_fields" });
    }

    const lead = { nombre, telefono, email, deuda, acreedores, comunidad };

    // Validación de cualificación en el servidor (defensa). Si no cualifica,
    // NO se envía email y NO debe contarse conversión.
    if (!isQualified(lead)) {
      return res.status(200).json({ ok: true, qualified: false });
    }

    await sendLeadEmail(lead);
    return res.status(200).json({ ok: true, qualified: true });
  } catch (e) {
    console.error("lead/submit error:", e);
    return res.status(500).json({ error: "server_error" });
  }
}
