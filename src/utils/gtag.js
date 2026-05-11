// Dispara evento de conversión Google Ads + Lead estándar para GA4
// El ID de conversión real se inyecta por VITE_GTAG_CONVERSION_ID en .env

export const fireLeadEvent = () => {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to:
        import.meta.env.VITE_GTAG_CONVERSION_ID ||
        "AW-XXXXXXXXX/YYYYYYYYYYY",
    });

    // Evento estándar Lead para GA4
    window.gtag("event", "generate_lead", {
      currency: "EUR",
      value: 1.0,
    });
  }

  // Meta Pixel (si está activado en index.html)
  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead");
  }
};
