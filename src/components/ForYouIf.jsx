import { motion } from "framer-motion";

const items = [
  "Tienes deudas que no puedes afrontar",
  "Quieres una solución legal y definitiva",
  "Buscas orientación real, no genérica",
  "No sabes por dónde empezar",
];

export default function ForYouIf() {
  return (
    <section className="bg-brand-soft relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[680px] h-[680px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(91,164,120,0.18), transparent 70%)",
        }}
      />
      <div className="container-narrow section-padding relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="eyebrow mb-3">¿Te identificas?</p>
          <h2 className="font-display text-3xl sm:text-[2.4rem] text-navy text-balance">
            Este servicio es para ti si…
          </h2>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="max-w-2xl mx-auto space-y-4 sm:space-y-5"
        >
          {items.map((text) => (
            <motion.li
              key={text}
              variants={{
                hidden: { opacity: 0, x: -16 },
                show: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-4 bg-white border border-brand/15 rounded-xl px-5 py-4 sm:px-6 sm:py-5 shadow-soft"
            >
              <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8.5l3 3 7-7.5"
                    stroke="#fff"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-navy text-[16px] sm:text-[17px] font-medium">
                {text}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
