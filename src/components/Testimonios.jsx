import { motion } from "framer-motion";
import { images } from "../utils/images";

/**
 * ⚠️ NOTA AL CLIENTE:
 * Estos testimonios son ILUSTRATIVOS y deben reemplazarse por reseñas reales
 * con consentimiento explícito antes de publicar en producción.
 * Editar el array `testimonios` con casos reales (mantener estructura).
 */
const testimonios = [
  {
    quote:
      "Llevaba dos años sin dormir. En LexNova me escucharon sin juzgar y a los siete meses tenía la sentencia. Hoy puedo volver a planificar mi vida.",
    name: "María G.",
    detail: "Valencia · 42.000€ cancelados",
    avatar: images.avatar3,
  },
  {
    quote:
      "Pensaba que la ley era solo para empresarios. Me explicaron paso a paso, sin tecnicismos, y nunca me prometieron nada que no pudieran cumplir.",
    name: "Javier R.",
    detail: "Madrid · 28.500€ cancelados",
    avatar: images.avatar2,
  },
  {
    quote:
      "Lo que más valoré fue tener un solo interlocutor. Siempre la misma persona, siempre disponible. Te hace sentir acompañada.",
    name: "Lucía P.",
    detail: "Sevilla · 61.000€ cancelados",
    avatar: images.avatar1,
  },
];

function Quote() {
  return (
    <svg
      width="32"
      height="26"
      viewBox="0 0 32 26"
      fill="none"
      aria-hidden="true"
      className="text-brand"
    >
      <path
        d="M10 26C4.5 26 0 21.5 0 16 0 7 7 0 14 0v4c-4.4 0-8 3-9 7 .7-.3 1.5-.5 2.4-.5 3.6 0 6.6 3 6.6 6.7C14 21.5 12.2 26 10 26zm18 0c-5.5 0-10-4.5-10-10 0-9 7-16 14-16v4c-4.4 0-8 3-9 7 .7-.3 1.5-.5 2.4-.5 3.6 0 6.6 3 6.6 6.7C32 21.5 30.2 26 28 26z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Testimonios() {
  return (
    <section className="bg-brand-tint relative">
      <div className="container-narrow section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="eyebrow mb-3">Historias reales</p>
          <h2 className="font-display text-3xl sm:text-[2.4rem] text-navy text-balance">
            Personas que ya empezaron de nuevo.
          </h2>
          <p className="text-muted mt-4 text-[16px] sm:text-[17px] leading-relaxed">
            Casos reales de clientes que recuperaron su tranquilidad
            financiera.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
        >
          {testimonios.map((t) => (
            <motion.figure
              key={t.name}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-2xl p-6 sm:p-7 shadow-soft hover:shadow-card transition-shadow flex flex-col"
            >
              <Quote />
              <blockquote className="text-navy text-[15.5px] leading-relaxed mt-4 flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-brand-soft flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt=""
                  aria-hidden="true"
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-brand-soft"
                  loading="lazy"
                />
                <div className="leading-tight">
                  <div className="text-navy font-semibold text-[14px]">
                    {t.name}
                  </div>
                  <div className="text-muted text-[12.5px] mt-0.5">
                    {t.detail}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
