import { getLead, saveLead, sendLeadEmail } from "../_lib/store.js";

/**
 * Finaliza el wizard: marca el lead como completado y envía el email completo.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  try {
    const { leadId } = req.body || {};
    if (!leadId) return res.status(400).json({ error: "missing_leadId" });

    const lead = await getLead(leadId);
    if (!lead) return res.status(404).json({ error: "not_found" });

    if (lead.estado === "completado") {
      return res.status(200).json({ ok: true, already: true });
    }

    // Marcar completado ANTES de enviar para evitar carrera con el flush de 60 min
    lead.estado = "completado";
    await saveLead(leadId, lead);

    await sendLeadEmail(lead, "completo");
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("lead/complete error:", e);
    return res.status(500).json({ error: "server_error" });
  }
}
