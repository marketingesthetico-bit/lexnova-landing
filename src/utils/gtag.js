// Dispara el evento de conversión de Google Ads (+ Lead para GA4 y Meta).
// SOLO debe llamarse cuando el lead está cualificado y ha enviado el
// formulario completo (ver App.jsx → handleQualifiedSubmit).
// El ID de conversión real se inyecta por VITE_GTAG_CONVERSION_ID.

const CONVERSION_ID = import.meta.env.VITE_GTAG_CONVERSION_ID;

// ID único por conversión (deduplicación en Google Ads).
function makeTransactionId() {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
  } catch {
    /* fallback abajo */
  }
  return "lead_" + Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export const fireLeadEvent = () => {
  if (typeof window === "undefined") return;

  if (typeof window.gtag !== "function") {
    console.warn(
      "[LexNova] window.gtag no está disponible: revisa el script de gtag en index.html. Conversión NO enviada.",
    );
    return;
  }

  // Sin ID válido no disparamos (evita registrar conversiones a un ID falso).
  if (!CONVERSION_ID || CONVERSION_ID.includes("XXXX")) {
    console.warn(
      "[LexNova] VITE_GTAG_CONVERSION_ID no configurado. Conversión NO enviada.",
    );
  } else {
    const transactionId = makeTransactionId();
    window.gtag("event", "conversion", {
      send_to: CONVERSION_ID,
      transaction_id: transactionId,
    });
    console.info(
      "[LexNova] ✅ Conversión Lead enviada a Google Ads:",
      CONVERSION_ID,
      "(txn:",
      transactionId + ")",
    );
  }

  // Evento estándar Lead para GA4 (si hay GA4 configurado).
  window.gtag("event", "generate_lead", { currency: "EUR", value: 1.0 });

  // Meta Pixel (si está activado en index.html).
  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead");
  }
};
