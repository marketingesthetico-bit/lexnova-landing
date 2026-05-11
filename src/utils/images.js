/**
 * Imágenes Unsplash curadas para la landing.
 * El cliente puede reemplazarlas por fotografía propia más adelante.
 * Todas son fotos abiertas; se sirven optimizadas vía CDN de Unsplash.
 */

const base = "https://images.unsplash.com";
const params = (w, h) =>
  `?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const images = {
  // Hero — pareja joven sonriente, esperanza
  heroCouple: `${base}/photo-1521791136064-7986c2920216${params(1100, 1200)}`,

  // Empatía — abrazo / asesoría
  empathyHug: `${base}/photo-1529626455594-4ff0802cfb7e${params(800, 900)}`,
  empathyConsult: `${base}/photo-1573496359142-b8d87734a5a2${params(800, 900)}`,

  // Cómo funciona — apretón / acuerdo
  process: `${base}/photo-1556761175-5973dc0f32e7${params(900, 700)}`,

  // Testimonios — avatares
  avatar1: `${base}/photo-1544005313-94ddf0286df2${params(220, 220)}`,
  avatar2: `${base}/photo-1507003211169-0a1dd7228f2d${params(220, 220)}`,
  avatar3: `${base}/photo-1438761681033-6461ffad8d80${params(220, 220)}`,
};
