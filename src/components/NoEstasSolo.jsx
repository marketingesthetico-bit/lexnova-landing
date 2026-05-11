import { motion } from "framer-motion";
import { images } from "../utils/images";

export default function NoEstasSolo() {
  return (
    <section className="bg-white">
      <div className="container-narrow section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Mosaico de imágenes */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative h-[440px] sm:h-[500px]"
          >
            {/* Forma decorativa detrás */}
            <div
              aria-hidden="true"
              className="absolute -top-6 -left-6 w-44 h-44 rounded-full bg-brand-soft -z-10"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 right-0 w-32 h-32 rounded-3xl bg-brand/15 -z-10"
            />

            {/* Imagen principal — abrazo / apoyo */}
            <div className="absolute top-0 left-0 w-[72%] h-[68%] rounded-2xl overflow-hidden shadow-elevated ring-1 ring-black/5">
              <img
                src={images.empathyHug}
                alt="Pareja apoyándose, recibiendo consulta sobre sus deudas"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Imagen secundaria — asesoría profesional */}
            <div className="absolute bottom-0 right-0 w-[60%] h-[56%] rounded-2xl overflow-hidden shadow-elevated ring-4 ring-white">
              <img
                src={images.empathyConsult}
                alt="Asesoría legal personalizada con cliente"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Tarjeta flotante con sello */}
            <div className="absolute top-[58%] left-[55%] sm:left-[60%] bg-white rounded-xl shadow-card px-4 py-3 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-brand-soft flex items-center justify-center text-brand-dark text-lg">
                ⚖️
              </span>
              <div className="leading-tight">
                <p className="text-[11px] uppercase tracking-wider text-muted font-semibold">
                  Bufete
                </p>
                <p className="text-[13px] text-navy font-semibold">
                  Colegiado
                </p>
              </div>
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
          >
            <p className="eyebrow mb-3">Nos tienes a tu lado</p>
            <h2 className="font-display text-3xl sm:text-[2.5rem] lg:text-[2.75rem] text-navy text-balance leading-[1.1]">
              Si las deudas no te dejan{" "}
              <span className="gradient-text">dormir,</span> no estás solo.
            </h2>
            <p className="text-muted text-[17px] leading-relaxed mt-5">
              Llegar aquí no significa haber fallado. La vida se complica:
              pérdida de ingresos, una separación, un aval, gastos médicos,
              préstamos que se acumulan.
            </p>
            <p className="text-muted text-[17px] leading-relaxed mt-4">
              La{" "}
              <strong className="text-navy">
                Ley de la Segunda Oportunidad
              </strong>{" "}
              existe precisamente para esto: para que puedas empezar de nuevo,
              con base legal y sin cargar con lo que ya no puedes pagar.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-brand-soft text-brand-dark text-sm font-semibold px-3.5 py-1.5 rounded-full">
                🔒 Confidencialidad absoluta
              </span>
              <span className="inline-flex items-center gap-2 bg-brand-soft text-brand-dark text-sm font-semibold px-3.5 py-1.5 rounded-full">
                💬 Te escuchamos primero
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
