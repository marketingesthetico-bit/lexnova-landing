import { motion } from "framer-motion";

const items = [
  { label: "Bufete colegiado", icon: "scale" },
  { label: "Confidencialidad RGPD", icon: "lock" },
  { label: "Respuesta en 24h", icon: "clock" },
  { label: "+500 casos resueltos", icon: "check" },
];

const Icon = ({ name }) => {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#3D7A56",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  switch (name) {
    case "scale":
      return (
        <svg {...common}>
          <path d="M12 3v18M4 8l-2 7h6l-2-7zM20 8l-2 7h6l-2-7zM5 21h14" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 018 0v3" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12.5l3 3 5-6" />
        </svg>
      );
    default:
      return null;
  }
};

export default function TrustBar() {
  return (
    <section
      className="relative z-10 bg-white border-y border-brand-soft"
      aria-label="Garantías"
    >
      <div className="container-narrow py-5 sm:py-6">
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {items.map((it) => (
            <motion.li
              key={it.label}
              variants={{
                hidden: { opacity: 0, x: -16 },
                show: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-3 text-navy text-[14px] sm:text-[15px] font-medium"
            >
              <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-soft">
                <Icon name={it.icon} />
              </span>
              <span>{it.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
