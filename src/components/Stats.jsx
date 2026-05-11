import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function useCountUp(target, { duration = 1.8, start = false } = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [target, duration, start]);

  return value;
}

function Stat({ value, prefix = "+", suffix = "", label, format }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const counted = useCountUp(value, { start: inView, duration: 2 });

  const display = format
    ? format(Math.floor(counted))
    : Math.floor(counted).toString();

  return (
    <div ref={ref} className="text-center px-4 py-2">
      <div className="font-display font-bold text-white text-[3rem] sm:text-[3.4rem] leading-none tabular-nums">
        <span className="text-brand">{prefix}</span>
        {display}
        <span className="text-brand">{suffix}</span>
      </div>
      <p className="text-white/70 mt-3 text-[15px] sm:text-base tracking-wide">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-navy noise-bg relative overflow-hidden">
      {/* Glow decorativo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 30%, rgba(91,164,120,0.35) 0%, transparent 45%), radial-gradient(circle at 85% 70%, rgba(91,164,120,0.25) 0%, transparent 45%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="container-narrow relative py-14 sm:py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="py-8 md:py-0">
            <Stat value={10} label="Años de experiencia" />
          </div>
          <div className="py-8 md:py-0">
            <Stat value={500} label="Nuevos inicios logrados" />
          </div>
          <div className="py-8 md:py-0">
            <Stat
              value={500000}
              suffix="€"
              label="Ahorrados a familias"
              format={(n) => n.toLocaleString("es-ES")}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
