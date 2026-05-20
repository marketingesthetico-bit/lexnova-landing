import { getLead, saveLead } from "../_lib/store.js";

const ALLOWED = ["deuda", "acreedores", "comunidad"];

/**
 * Actualiza una respuesta del wizard en el lead parcial.
 * Se llama tras cada pregunta, así el email parcial (si hay abandono)
 * incluye todo lo respondido hasta ese punto.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  try {
    const { leadId, field, value } = req.body || {};
    if (!leadId || !ALLOWED.includes(field)) {
      return res.status(400).json({ error: "invalid_request" });
    }

    const lead = await getLead(leadId);
    if (!lead) return res.status(404).json({ error: "not_found" });

    // Si ya se cerró/envió, no tocar
    if (lead.estado === "completado" || lead.estado === "enviado_parcial") {
      return res.status(200).json({ ok: true, locked: true });
    }

    lead[field] = value;
    await saveLead(leadId, lead);
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("lead/update error:", e);
    return res.status(500).json({ error: "server_error" });
  }
}
