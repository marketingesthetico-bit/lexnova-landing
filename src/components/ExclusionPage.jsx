import { motion } from "framer-motion";
import Logo from "./Logo";

const CONTENIDO = {
  deuda: {
    title: "La Segunda Oportunidad no es tu mejor opción ahora",
    body: "Gracias por confiar en nosotros. Por lo que nos cuentas, tu nivel de deuda es inferior al que justifica acogerse a la Ley de la Segunda Oportunidad: en estos casos el proceso no suele compensar y existen vías más sencillas y económicas para resolverlo.",
    tip: "Nuestro consejo: habla con tu entidad o con un asesor financiero para negociar un plan de pagos adaptado a ti. Es muy probable que puedas reconducir tu situación sin necesidad de un procedimiento judicial.",
  },
  zona: {
    title: "Por ahora no operamos en tu zona",
    body: "Gracias por tu interés. En este momento solo gestionamos casos de la Ley de la Segunda Oportunidad en Cataluña, así que no podríamos acompañarte como te mereces en tu comunidad.",
    tip: "Nuestro consejo: busca un despacho especializado en Segunda Oportunidad de tu zona. Tu caso tiene solución; solo necesitas a alguien cercano que lo lleve.",
  },
};

export default function ExclusionPage({ reason = "deuda", onBack }) {
  const c = CONTENIDO[reason] || CONTENIDO.deuda;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col">
      {/* Fondo suave de marca */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(at 15% 10%, rgba(91,164,120,0.16) 0%, transparent 50%), radial-gradient(at 90% 90%, rgba(232,242,236,0.9) 0%, transparent 55%)",
        }}
      />

      <header className="container-narrow relative pt-6 sm:pt-8">
        <div className="inline-flex items-center bg-white/80 backdrop-blur-md rounded-2xl px-4 py-2 shadow-[0_6px_20px_-8px_rgba(15,36,51,0.12)] border border-white/60">
          <Logo size={42} />
        </div>
      </header>

      <main className="container-narrow relative flex-1 flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl w-full text-center"
        >
          {/* Icono */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-brand-soft flex items-center justify-center">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <circle
                  cx="15"
                  cy="15"
                  r="12.5"
                  stroke="#3D7A56"
                  strokeWidth="1.8"
                />
                <path
                  d="M10 15.5l3.2 3.2L20.5 11"
                  stroke="#3D7A56"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <p className="eyebrow mb-3">Hemos revisado tu caso</p>
          <h1 className="font-display text-3xl sm:text-[2.6rem] text-navy leading-[1.1] text-balance">
            {c.title}
          </h1>

          <p className="text-muted text-[17px] leading-relaxed mt-5">
            {c.body}
          </p>
          <p className="text-navy/80 text-[16px] leading-relaxed mt-4 bg-brand-tint rounded-xl px-5 py-4 border border-brand/15">
            {c.tip}
          </p>

          <p className="text-muted text-[15px] mt-6">
            Te deseamos de corazón un nuevo comienzo. 🌱
          </p>

          <button
            type="button"
            onClick={onBack}
            className="mt-8 inline-flex items-center justify-center gap-2 bg-white text-brand-deep font-semibold px-6 py-3.5 rounded-full shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-200 border border-brand/20"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M10 3L5 8l5 5"
                stroke="#2C5A40"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Volver al inicio
          </button>
        </motion.div>
      </main>

      <footer className="container-narrow relative py-6 text-center text-[13px] text-muted">
        © 2026 LexNova. Todos los derechos reservados.
      </footer>
    </div>
  );
}
