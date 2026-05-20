import { Client } from "@upstash/qstash";
import { getLead, saveLead } from "../_lib/store.js";

/**
 * Inicia un lead: guarda los datos base en Redis y programa el flush de 60 min
 * vía QStash (se dispara aunque el usuario cierre la pestaña).
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method_not_allowed" });
  }

  try {
    const { leadId, nombre, telefono, email } = req.body || {};
    if (!leadId || !nombre || !telefono || !email) {
      return res.status(400).json({ error: "missing_fields" });
    }

    // Idempotencia: si ya existe, no re-programamos
    const existing = await getLead(leadId);
    if (existing) {
      return res.status(200).json({ ok: true, alreadyStarted: true });
    }

    const lead = {
      nombre,
      telefono,
      email,
      deuda: null,
      acreedores: null,
      comunidad: null,
      estado: "parcial",
      startedAt: Date.now(),
    };
    await saveLead(leadId, lead);

    // Programar flush a los 60 minutos
    const base = process.env.PUBLIC_BASE_URL;
    if (base && process.env.QSTASH_TOKEN) {
      const qstash = new Client({ token: process.env.QSTASH_TOKEN });
      const secret = process.env.FLUSH_SECRET || "";
      await qstash.publishJSON({
        url: `${base}/api/lead/flush?token=${encodeURIComponent(secret)}`,
        body: { leadId },
        delay: 60 * 60, // segundos
        retries: 3,
      });
    } else {
      console.warn(
        "QStash no configurado (falta PUBLIC_BASE_URL o QSTASH_TOKEN): no se programó el flush de 60 min.",
      );
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("lead/start error:", e);
    return res.status(500).json({ error: "server_error" });
  }
}
