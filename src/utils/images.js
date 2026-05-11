/**
 * Rutas de imágenes de la landing.
 *
 * Las imágenes locales viven en /public/imagenes/ y se sirven en la raíz
 * (por ej. /imagenes/asesoria-confianza.png). Los avatares de testimonios
 * pendientes de aportar son URLs Unsplash provisionales — pídelos al cliente
 * y reemplaza por archivos locales cuando estén disponibles.
 */

const unsplash = (id, w, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const images = {
  // NoEstasSolo
  empathyHug: "/imagenes/asesoria-confianza.png", // pareja + asesor
  empathyConsult: "/imagenes/equipo-bufete.jpg", // equipo del bufete

  // HowItWorks
  process: "/imagenes/abogado-especialista.png", // un único interlocutor

  // Reservado por si reintroducimos imagen en Hero más adelante
  heroCouple: "/imagenes/asesoria-confianza.png",

  // Testimonios — María G. es del cliente; el resto provisional
  avatar1: unsplash("1544005313-94ddf0286df2", 220, 220), // Lucía P.
  avatar2: unsplash("1507003211169-0a1dd7228f2d", 220, 220), // Javier R.
  avatar3: "/imagenes/testimonio-maria.webp", // María G. ✓
};
