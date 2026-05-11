import { motion } from "framer-motion";

/**
 * Bloque de re-captura intermedio entre las secciones de contenido.
 * No duplica el form — lleva al usuario al SecondCTA (id="form-cta").
 */
export default function MidwayCTA() {
  const scrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById("form-cta");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #3D7A56 0%, #5BA478 60%, #6FB88B 100%)",
      }}
    >
      {/* Decoración: blobs translúcidos */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-[360px] h-[360px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.25), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.18), transparent 70%)",
        }}
      />

      {/* Patrón sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container-narrow relative py-14 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="eyebrow text-white/80 mb-3">
            ¿Listo para empezar?
          </p>
          <h2 className="font-display text-white text-[2.1rem] sm:text-[2.7rem] lg:text-[3rem] leading-[1.08] text-balance">
            60 segundos. 24 horas. <br className="hidden sm:block" />
            <span className="text-white/85">Cero compromiso.</span>
          </h2>
          <p className="text-white/85 text-[17px] sm:text-[18px] leading-relaxed mt-5 max-w-xl mx-auto">
            Cuéntanos tu situación en menos de un minuto. Un especialista te
            llamará en las próximas 24h.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#form-cta"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-deep font-semibold px-7 py-4 rounded-full shadow-elevated hover:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 transition-all duration-200 text-[16px] sm:text-[17px]"
            >
              Solicitar mi consulta gratuita
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 9h10m0 0l-4-4m4 4l-4 4"
                  stroke="#2C5A40"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <div className="text-white/85 text-[13.5px] flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/15">
                🔒
              </span>
              <span>100% confidencial · Datos cifrados</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
