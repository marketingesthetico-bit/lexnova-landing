import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Botón flotante de re-captura.
 * - Aparece cuando el Hero deja de ser visible.
 * - Se oculta cuando el SecondCTA (id="form-cta") entra en viewport o
 *   cuando llegamos al Footer (para no competir con CTA visible).
 * - Smooth scroll al form-cta.
 */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;

      // Mostrar después de 80vh de scroll
      const passedHero = scrollY > viewportH * 0.8;

      // Ocultar si el form-cta es visible
      const formEl = document.getElementById("form-cta");
      let formVisible = false;
      if (formEl) {
        const rect = formEl.getBoundingClientRect();
        formVisible = rect.top < viewportH && rect.bottom > 0;
      }

      // Ocultar cerca del footer (últimos 250px)
      const nearFooter = scrollY + viewportH > docH - 250;

      setVisible(passedHero && !formVisible && !nearFooter);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById("form-cta");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#form-cta"
          onClick={scrollToForm}
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed z-40 bottom-5 right-5 sm:bottom-6 sm:right-6 inline-flex items-center gap-2.5 bg-brand text-white font-semibold pl-3.5 pr-5 py-3 rounded-full shadow-[0_18px_45px_-12px_rgba(91,164,120,0.7)] hover:bg-brand-dark hover:-translate-y-0.5 transition-all duration-200 text-[14px] sm:text-[15px] backdrop-blur"
          aria-label="Solicitar consulta gratuita"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15">
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3.5 4.5c0-.55.45-1 1-1h2.1c.4 0 .76.24.91.6l1 2.4c.14.33.06.71-.2.96l-1.18 1.18a10.5 10.5 0 005.27 5.27l1.18-1.18c.25-.26.63-.34.96-.2l2.4 1c.36.15.6.51.6.91v2.1c0 .55-.45 1-1 1A11.5 11.5 0 013.5 4.5z"
                fill="#fff"
              />
            </svg>
          </span>
          <span className="hidden sm:inline">Consulta gratuita</span>
          <span className="sm:hidden">Consulta gratis</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
