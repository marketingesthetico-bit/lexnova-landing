import { getLead, saveLead, sendLeadEmail } from "../_lib/store.js";

/**
 * Llamado por QStash 60 min después de iniciar el lead.
 * Si el lead no se completó, envía el email con los datos parciales.
 * Protegido con un token compartido (?token=) para que nadie más lo dispare.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  // Seguridad: token compartido
  const token = req.query?.token;
  if (process.env.FLUSH_SECRET && token !== process.env.FLUSH_SECRET) {
    return res.status(401).json({ error: "unauthorized" });
  }

  try {
    const { leadId } = req.body || {};
    if (!leadId) return res.status(400).json({ error: "missing_leadId" });

    const lead = await getLead(leadId);
    // Expirado o limpiado: nada que hacer
    if (!lead) return res.status(200).json({ ok: true, gone: true });

    // Ya completado o ya enviado parcial: no duplicar
    if (lead.estado === "completado" || lead.estado === "enviado_parcial") {
      return res.status(200).json({ ok: true, noop: true });
    }

    // Sigue parcial → enviar email parcial
    lead.estado = "enviado_parcial";
    await saveLead(leadId, lead);
    await sendLeadEmail(lead, "parcial");

    return res.status(200).json({ ok: true, sent: "parcial" });
  } catch (e) {
    console.error("lead/flush error:", e);
    return res.status(500).json({ error: "server_error" });
  }
}
