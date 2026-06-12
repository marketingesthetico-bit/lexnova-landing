// Cliente del flujo de leads (frontend → función /api/lead/submit).

/**
 * Envía el lead completo. El backend valida la cualificación y solo envía
 * email si procede. Devuelve { ok, qualified }.
 */
export async function submitLead(data) {
  try {
    const r = await fetch("/api/lead/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error(`submit -> ${r.status}`);
    return await r.json(); // { ok: true, qualified: boolean }
  } catch (e) {
    console.error("submitLead error:", e);
    return { ok: false, qualified: false, error: e };
  }
}
