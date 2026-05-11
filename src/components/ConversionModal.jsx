import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function ConversionModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="absolute inset-0 bg-navy-dark/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative bg-white rounded-2xl shadow-elevated max-w-md w-full p-8 sm:p-10 text-center"
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Animated checkmark */}
            <div className="flex justify-center mb-5">
              <svg
                width="84"
                height="84"
                viewBox="0 0 84 84"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle
                  cx="42"
                  cy="42"
                  r="38"
                  stroke="#5BA478"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="240"
                  className="animate-draw-circle"
                  style={{ strokeDashoffset: 240 }}
                />
                <path
                  d="M26 43.5L37.5 55L58 32"
                  stroke="#5BA478"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="60"
                  className="animate-draw-check"
                  style={{ strokeDashoffset: 60 }}
                />
              </svg>
            </div>

            <h3
              id="modal-title"
              className="font-display text-3xl sm:text-4xl text-navy mb-3"
            >
              ¡Recibido! Te llamamos pronto.
            </h3>
            <p className="text-muted text-base sm:text-[17px] leading-relaxed mb-7">
              Hemos recibido tu consulta. Un especialista se pondrá en contacto
              contigo en menos de 24 horas.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="btn-brand"
              autoFocus
            >
              Entendido
            </button>

            <p className="text-muted/80 text-xs mt-5">
              Mientras tanto, si tienes urgencia, revisa tu email — te hemos
              enviado una confirmación.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
