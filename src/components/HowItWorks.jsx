import { motion } from "framer-motion";
import { images } from "../utils/images";

const steps = [
  {
    n: "01",
    title: "Cuéntanos tu situación",
    desc: "Consulta gratuita y confidencial. Te escuchamos sin juicios.",
  },
  {
    n: "02",
    title: "Analizamos tu caso",
    desc: "En 24h confirmamos si cumples los requisitos de la ley.",
  },
  {
    n: "03",
    title: "Iniciamos el proceso legal",
    desc: "Nos encargamos de todos los trámites con los juzgados.",
  },
  {
    n: "04",
    title: "Cancelación de deudas",
    desc: "Sentencia judicial. Empiezas de nuevo, sin cargas.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-brand-tint relative">
      <div className="container-narrow section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="eyebrow mb-3">El proceso</p>
          <h2 className="font-display text-3xl sm:text-[2.4rem] text-navy text-balance">
            Un camino claro, paso a paso.
          </h2>
          <p className="text-muted mt-4 text-[16px] sm:text-[17px] leading-relaxed">
            Sin sorpresas ni letra pequeña. Te explicamos qué pasa en cada
            momento.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          {/* Pasos */}
          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.13 } },
            }}
            className="relative space-y-6"
          >
            {/* Línea conectora vertical */}
            <div
              aria-hidden="true"
              className="absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-brand/40 via-brand/30 to-transparent"
            />

            {steps.map((s) => (
              <motion.li
                key={s.n}
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  show: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="relative flex gap-5 bg-white rounded-2xl p-5 sm:p-6 shadow-soft hover:shadow-card transition-shadow"
              >
                <div className="shrink-0 relative">
                  <div className="w-14 h-14 rounded-full bg-brand text-white font-display font-bold text-lg flex items-center justify-center shadow-brand">
                    {s.n}
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="font-display text-xl text-navy mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-muted text-[15px] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          {/* Imagen lateral */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="hidden lg:block relative"
          >
            <div
              aria-hidden="true"
              className="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-brand/15 -z-10"
            />
            <div className="relative rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={images.process}
                alt="Especialista de LexNova — tu interlocutor único en el proceso"
                className="w-full h-[520px] object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent p-6">
                <p className="text-white text-[15px] leading-relaxed">
                  <strong>Un único interlocutor</strong> en todo el proceso.
                  Cero centralitas.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
