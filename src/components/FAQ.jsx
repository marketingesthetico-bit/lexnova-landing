import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    q: "¿Cuánto cuesta acogerse a la Ley de la Segunda Oportunidad?",
    a: "El estudio inicial de tu caso es totalmente gratuito y sin compromiso. Si decidimos seguir adelante, te presentamos un presupuesto cerrado y financiable, adaptado a tu situación económica. Nunca cobramos nada antes de explicarte con claridad lo que vas a pagar.",
  },
  {
    q: "¿Cuánto tarda el proceso hasta que cancelan mis deudas?",
    a: "La duración media en España es de 6 a 12 meses desde que se inicia el procedimiento. Depende del juzgado, del número de acreedores y de si hay bienes a liquidar. Te informamos del plazo estimado tras analizar tu caso.",
  },
  {
    q: "¿Qué pasa con mi vivienda habitual?",
    a: "En la mayoría de los casos es posible mantener la vivienda habitual si estás al corriente de la hipoteca o si negociamos un acuerdo con el banco. Cada caso es único — te lo evaluamos antes de tomar decisiones.",
  },
  {
    q: "¿Saldrá publicado en algún registro? ¿Afecta a mi historial?",
    a: "El procedimiento se publica en el Boletín Oficial del Estado durante la fase concursal, como exige la ley. Una vez obtienes la exoneración, sales del fichero de morosos (ASNEF, RAI, etc.) y tu historial crediticio se va limpiando. En 5 años tu situación financiera puede volver a la normalidad.",
  },
  {
    q: "Soy autónomo o he tenido una empresa, ¿puedo acogerme?",
    a: "Sí. La Ley de la Segunda Oportunidad cubre tanto a particulares como a autónomos y exempresarios, siempre que se cumplan los requisitos de buena fe procesal. De hecho, un porcentaje muy alto de nuestros casos son autónomos.",
  },
  {
    q: "¿Tengo que ir a juicio? ¿Tendré que declarar?",
    a: "El procedimiento es mayoritariamente escrito y nosotros nos encargamos de todos los trámites con el juzgado. En la mayoría de los casos no es necesaria tu presencia. Si en algún momento se requiere, te acompañaremos personalmente.",
  },
];

function ChevronIcon({ open }) {
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25 }}
      className="shrink-0"
      aria-hidden="true"
    >
      <path
        d="M4 7l5 5 5-5"
        stroke="#3D7A56"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="bg-white">
      <div className="container-narrow section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="eyebrow mb-3">Preguntas frecuentes</p>
          <h2 className="font-display text-3xl sm:text-[2.4rem] text-navy text-balance">
            Lo que más nos preguntan.
          </h2>
          <p className="text-muted mt-4 text-[16px] sm:text-[17px] leading-relaxed">
            Si tu duda no está aquí, escríbenos: te respondemos por teléfono o
            email en menos de 24h.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="max-w-3xl mx-auto space-y-3"
        >
          {faqs.map((f, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.li
                key={f.q}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`rounded-xl border transition-colors ${
                  isOpen
                    ? "bg-brand-tint border-brand/30"
                    : "bg-white border-gray-100 hover:border-brand/25"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5"
                >
                  <span className="font-display text-[17px] sm:text-[18px] text-navy">
                    {f.q}
                  </span>
                  <ChevronIcon open={isOpen} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted text-[15.5px] leading-relaxed px-5 sm:px-6 pb-5 sm:pb-6">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
