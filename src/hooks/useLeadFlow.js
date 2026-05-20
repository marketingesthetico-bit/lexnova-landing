// Cliente del flujo de leads (frontend → funciones /api).

export function newLeadId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return (
    "lead_" + Math.random().toString(36).slice(2) + Date.now().toString(36)
  );
}

async function post(url, body) {
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`${url} -> ${r.status}`);
  return r.json();
}

export const startLead = (data) => post("/api/lead/start", data);

export const updateLead = (leadId, field, value) =>
  post("/api/lead/update", { leadId, field, value });

export const completeLead = (leadId) =>
  post("/api/lead/complete", { leadId });
