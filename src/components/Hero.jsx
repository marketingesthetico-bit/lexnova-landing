import { motion } from "framer-motion";
import LeadForm from "./LeadForm";
import Logo from "./Logo";

const pills = ["100% legal", "Bufete colegiado", "Sin compromiso"];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

/**
 * Blob orgánico decorativo, animado con Framer Motion.
 * Posición y tamaño se controlan con clase Tailwind desde fuera.
 */
function FloatingBlob({ className = "", color = "#5BA478", delay = 0, dur = 14 }) {
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        y: [0, -18, 0],
        rotate: [0, 6, 0],
      }}
      transition={{
        opacity: { duration: 1.2, delay },
        y: { duration: dur, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: dur * 1.3, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <path
        d="M44.3,-58.5C56.6,-49.8,64.5,-34.7,68.4,-18.6C72.3,-2.5,72.2,14.6,64.7,28.6C57.2,42.6,42.3,53.5,26,60.4C9.7,67.3,-7.9,70.2,-23.6,65.5C-39.4,60.8,-53.3,48.5,-61.4,33.4C-69.5,18.3,-71.7,0.4,-67.5,-15.4C-63.4,-31.2,-52.9,-44.9,-39.9,-53.3C-26.9,-61.7,-11.3,-64.7,3.4,-69C18,-73.3,32,-67.1,44.3,-58.5Z"
        transform="translate(100 100)"
        fill={color}
      />
    </motion.svg>
  );
}

export default function Hero({ onLeadStart }) {
  return (
    <header className="relative bg-white overflow-hidden">
      {/* Mesh gradient de fondo */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(at 12% 10%, rgba(91,164,120,0.18) 0%, transparent 50%),
            radial-gradient(at 90% 8%, rgba(232,242,236,0.95) 0%, transparent 55%),
            radial-gradient(at 0% 90%, rgba(91,164,120,0.10) 0%, transparent 50%),
            radial-gradient(at 100% 100%, rgba(232,242,236,0.7) 0%, transparent 55%)
          `,
        }}
      />

      {/* Blob superior — detrás del logo (el pill frosted garantiza
          su legibilidad). Posicionado para NO invadir la zona del H1. */}
      <FloatingBlob
        className="w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] -top-24 sm:-top-40 -left-28 sm:-left-32 opacity-[0.14]"
        color="#5BA478"
        delay={0}
        dur={16}
      />
      <FloatingBlob
        className="w-[320px] h-[320px] top-[42%] -right-28 opacity-[0.12]"
        color="#5BA478"
        delay={1.5}
        dur={18}
      />
      <FloatingBlob
        className="w-[200px] h-[200px] bottom-16 left-[40%] opacity-[0.09]"
        color="#3D7A56"
        delay={3}
        dur={20}
      />

      {/* Dots constelación sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(91,164,120,0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, black 30%, transparent 70%)",
        }}
      />

      <div className="container-narrow relative">
        {/* Logo en pill frosted — siempre legible sobre cualquier fondo */}
        <motion.div
          className="pt-6 sm:pt-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="inline-flex items-center bg-white/80 backdrop-blur-md rounded-2xl px-4 py-2 shadow-[0_6px_20px_-8px_rgba(15,36,51,0.12)] border border-white/60">
            <Logo size={42} />
          </div>
        </motion.div>

        {/* Hero grid */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-center pt-12 sm:pt-16 pb-20 sm:pb-24">
          {/* Copy */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="inline-flex items-center gap-2 bg-white border border-brand/25 shadow-soft text-brand-dark text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
              </span>
              Consulta gratuita · respuesta en 24h
            </motion.span>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="font-display font-bold text-navy text-[2.7rem] leading-[1.02] sm:text-[3.4rem] lg:text-[4rem] mt-5 text-balance"
            >
              Cancela tus deudas.
              <br />
              <span className="gradient-text">Empieza de nuevo.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-muted text-lg sm:text-[19px] leading-relaxed mt-5 max-w-md"
            >
              Te decimos en 24h si la Ley de Segunda Oportunidad puede
              ayudarte. Sin compromiso.
            </motion.p>

            <motion.ul
              variants={fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mt-7 flex flex-wrap gap-2.5"
            >
              {pills.map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center gap-1.5 bg-white border border-brand/25 text-navy text-[13.5px] font-semibold px-3 py-1.5 rounded-full shadow-soft"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="7" cy="7" r="7" fill="#5BA478" />
                    <path
                      d="M3.5 7L6 9.5L10.5 4.5"
                      stroke="#fff"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {p}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Formulario */}
          <div className="lg:pl-4">
            <LeadForm variant="hero" onLeadStart={onLeadStart} />
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="block w-full h-[60px] sm:h-[80px]"
        >
          <path
            d="M0,40 C240,90 480,90 720,55 C960,20 1200,20 1440,55 L1440,90 L0,90 Z"
            fill="#E8F2EC"
          />
          <path
            d="M0,55 C240,100 480,100 720,70 C960,40 1200,40 1440,70 L1440,90 L0,90 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </header>
  );
}
