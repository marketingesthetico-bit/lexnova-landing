import { motion } from "framer-motion";
import LeadForm from "./LeadForm";
import Logo from "./Logo";
import { images } from "../utils/images";

const bullets = [
  "Hasta el 100% de tus deudas canceladas por sentencia judicial",
  "Sabrás en 24h si cumples los requisitos — gratis y sin compromiso",
  "Un único interlocutor durante todo el proceso (no centralitas)",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Hero({ onLeadSuccess }) {
  return (
    <header className="relative bg-white overflow-hidden">
      {/* Capa decorativa: blob verde suave a la izquierda */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(91,164,120,0.22), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 w-[560px] h-[560px] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(91,164,120,0.18), transparent 70%)",
        }}
      />

      <div className="container-narrow relative">
        {/* Header con logo (sin nav, landing cerrada) */}
        <motion.div
          className="pt-6 sm:pt-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <Logo size={44} />
        </motion.div>

        {/* Hero grid */}
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center pt-10 sm:pt-14 pb-14 sm:pb-20">
          {/* Copy + imagen */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="inline-flex items-center gap-2 bg-brand-soft text-brand-dark text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              Consulta gratuita · Respuesta en 24h
            </motion.span>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="font-display font-bold text-navy text-[2.4rem] leading-[1.06] sm:text-[3.1rem] lg:text-[3.55rem] mt-5 text-balance"
            >
              Cancela tus deudas{" "}
              <span className="gradient-text">legalmente</span> y empieza de
              nuevo.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-muted text-lg sm:text-[19px] leading-relaxed mt-5 max-w-xl"
            >
              La Ley de la Segunda Oportunidad permite cancelar hasta el{" "}
              <strong className="text-navy">100% de tus deudas</strong>. Te
              decimos en 24h si tu caso encaja, sin compromiso.
            </motion.p>

            <motion.ul
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mt-8 space-y-3.5"
            >
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-navy text-[16px] sm:text-[17px]"
                >
                  <span className="mt-0.5 inline-flex shrink-0 items-center justify-center w-6 h-6 rounded-full bg-brand">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 6.5l3 3 6-6.5"
                        stroke="#fff"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {b}
                </li>
              ))}
            </motion.ul>

            {/* Imagen humana, solo desktop dentro del bloque de copy */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="hidden lg:block mt-10 relative max-w-md"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-elevated ring-1 ring-brand/15">
                <img
                  src={images.heroCouple}
                  alt="Pareja sonriente que ha cancelado sus deudas"
                  className="w-full h-[260px] object-cover"
                  loading="eager"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/70 to-transparent p-5">
                  <p className="text-white text-sm font-medium">
                    +500 familias han empezado de nuevo con LexNova.
                  </p>
                </div>
              </div>
              {/* Sello flotante */}
              <div className="absolute -top-4 -right-4 bg-white shadow-card rounded-full px-3.5 py-2 flex items-center gap-2 text-xs font-semibold text-navy">
                <span className="text-brand-dark">⚖️</span> Bufete colegiado
              </div>
            </motion.div>
          </motion.div>

          {/* Formulario */}
          <div className="lg:pl-4">
            <LeadForm variant="hero" onSuccess={onLeadSuccess} />
          </div>
        </div>
      </div>
    </header>
  );
}
