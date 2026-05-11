import { motion } from "framer-motion";

const Icon = ({ name }) => {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 28 28",
    fill: "none",
    stroke: "#3D7A56",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  switch (name) {
    case "heart":
      return (
        <svg {...common}>
          <path d="M14 24s-9-5.5-9-12a5 5 0 019-3 5 5 0 019 3c0 6.5-9 12-9 12z" />
        </svg>
      );
    case "scale":
      return (
        <svg {...common}>
          <path d="M14 4v20M5 9l-3 8h6l-3-8zM23 9l-3 8h6l-3-8zM6 24h16" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M14 3l9 4v6c0 5.5-3.9 10.5-9 12-5.1-1.5-9-6.5-9-12V7l9-4z" />
          <path d="M10 14l3 3 5-6" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...common}>
          <path d="M3 13l4-4 4 2 3-3 4 2 4-2 3 3v4l-5 5-3-3-2 2-3-3-3 2-2-2v-3z" />
        </svg>
      );
    default:
      return null;
  }
};

const cards = [
  {
    icon: "heart",
    title: "Trato personal y cercano",
    desc: "No eres un número. Hablamos claro, sin tecnicismos, y te escuchamos antes de proponer nada.",
  },
  {
    icon: "scale",
    title: "Especialistas en Segunda Oportunidad",
    desc: "Conocemos la ley al detalle y la aplicamos cada día. Seguridad jurídica real, no marketing.",
  },
  {
    icon: "shield",
    title: "Sin falsas promesas",
    desc: "Si tu caso no encaja, te lo decimos en la primera llamada. Cero pérdidas de tiempo.",
  },
  {
    icon: "handshake",
    title: "Compromiso de principio a fin",
    desc: "Un único interlocutor durante todo el proceso. Estamos contigo hasta la sentencia.",
  },
];

export default function WhyUs() {
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
          <p className="eyebrow mb-3">Por qué confiar en nosotros</p>
          <h2 className="font-display text-3xl sm:text-[2.4rem] text-navy text-balance">
            ¿Por qué <span className="gradient-text">LexNova</span>?
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
        >
          {cards.map((c) => (
            <motion.div
              key={c.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="group bg-brand-tint rounded-2xl p-7 sm:p-8 border border-transparent hover:border-brand/40 shadow-soft hover:shadow-card transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-5 shadow-soft">
                <Icon name={c.icon} />
              </div>
              <h3 className="font-display text-xl text-navy mb-2.5">
                {c.title}
              </h3>
              <p className="text-muted text-[15px] leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
