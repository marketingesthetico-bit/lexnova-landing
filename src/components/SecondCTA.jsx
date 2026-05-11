import { motion } from "framer-motion";
import LeadForm from "./LeadForm";

export default function SecondCTA({ onLeadSuccess }) {
  return (
    <section
      id="form-cta"
      className="bg-navy-gradient noise-bg relative overflow-hidden scroll-mt-4"
    >
      {/* Glow decorativo verde */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 w-[460px] h-[460px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(closest-side, rgba(91,164,120,0.35), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(closest-side, rgba(91,164,120,0.30), transparent 70%)",
        }}
      />

      <div className="container-narrow section-padding relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="eyebrow mb-3"
              style={{ color: "#E8F2EC" }}
            >
              Da el primer paso
            </p>
            <h2 className="font-display text-4xl sm:text-[2.8rem] lg:text-[3.2rem] text-white leading-[1.08] text-balance">
              Tu situación tiene{" "}
              <span className="gradient-text">solución.</span>
            </h2>
            <p className="text-white/80 text-lg mt-5 max-w-lg leading-relaxed">
              La primera consulta es gratuita y sin compromiso. En 24h sabrás
              si la Ley de la Segunda Oportunidad puede cancelar tus deudas.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                "Te llamamos en menos de 24h",
                "Evaluación honesta — si no encaja, te lo decimos",
                "Cero compromiso, cero coste",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 text-white/90 text-[15px]"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 13 13"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 6.5l3 3 6-6.5"
                        stroke="#fff"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          <div>
            <LeadForm variant="cta" onSuccess={onLeadSuccess} />
          </div>
        </div>
      </div>
    </section>
  );
}
