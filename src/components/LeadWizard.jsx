import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { updateLead, completeLead } from "../hooks/useLeadFlow";

const COMUNIDADES = [
  "Andalucía",
  "Aragón",
  "Asturias",
  "Islas Baleares",
  "Canarias",
  "Cantabria",
  "Castilla-La Mancha",
  "Castilla y León",
  "Cataluña",
  "Comunidad Valenciana",
  "Extremadura",
  "Galicia",
  "La Rioja",
  "Madrid",
  "Murcia",
  "Navarra",
  "País Vasco",
  "Ceuta",
  "Melilla",
];

const STEPS = [
  {
    key: "deuda",
    titulo: "¿Cuánta deuda tienes aproximadamente?",
    ayuda: "Una estimación nos basta para preparar tu consulta.",
    tipo: "botones",
    opciones: [
      "Menos de 10.000€",
      "10.000€ - 30.000€",
      "30.000€ - 60.000€",
      "Más de 60.000€",
    ],
  },
  {
    key: "acreedores",
    titulo: "¿A cuántos acreedores debes dinero?",
    ayuda: "Bancos, financieras, Hacienda, particulares…",
    tipo: "botones",
    opciones: ["2 - 3", "4 - 7", "8 - 15", "Más de 15"],
  },
  {
    key: "comunidad",
    titulo: "¿En qué comunidad autónoma resides?",
    ayuda: "Para asignarte al especialista de tu zona.",
    tipo: "select",
    opciones: COMUNIDADES,
  },
];

export default function LeadWizard({ open, leadId, onComplete, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    deuda: "",
    acreedores: "",
    comunidad: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;

  // Confirmación antes de cerrar (evita abandono accidental)
  const requestClose = () => setConfirmClose(true);
  const handleStay = () => setConfirmClose(false);
  const handleLeave = () => {
    setConfirmClose(false);
    onClose();
  };

  const saveAnswer = (key, value) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    if (leadId) updateLead(leadId, key, value).catch(() => {});
  };

  const handleButtonSelect = (value) => {
    saveAnswer(current.key, value);
    // pequeño delay para feedback visual antes de avanzar
    setTimeout(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 180);
  };

  const handleFinish = async () => {
    if (!answers.comunidad) return;
    setSubmitting(true);
    try {
      if (leadId) {
        await updateLead(leadId, "comunidad", answers.comunidad).catch(() => {});
        await completeLead(leadId).catch(() => {});
      }
    } finally {
      setSubmitting(false);
      onComplete();
    }
  };

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
          aria-labelledby="wizard-title"
        >
          <div
            className="absolute inset-0 bg-navy-dark/80 backdrop-blur-sm"
            onClick={requestClose}
          />

          <motion.div
            className="relative bg-white rounded-2xl shadow-elevated max-w-lg w-full p-6 sm:p-8"
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Cerrar */}
            <button
              type="button"
              onClick={requestClose}
              aria-label="Cerrar"
              className="absolute top-4 right-4 w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-muted transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M4 4l10 10M14 4L4 14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Cabecera + progreso */}
            <div className="mb-6">
              <p className="eyebrow mb-2">
                Casi listo · paso {step + 1} de {STEPS.length}
              </p>
              <div className="h-1.5 bg-brand-soft rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand rounded-full"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Pregunta */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <h3
                  id="wizard-title"
                  className="font-display text-2xl sm:text-[27px] text-navy leading-tight"
                >
                  {current.titulo}
                </h3>
                <p className="text-muted text-sm mt-2 mb-6">{current.ayuda}</p>

                {current.tipo === "botones" && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {current.opciones.map((op) => {
                      const selected = answers[current.key] === op;
                      return (
                        <button
                          key={op}
                          type="button"
                          onClick={() => handleButtonSelect(op)}
                          className={`text-left px-5 py-4 rounded-xl border-2 font-medium transition-all duration-150 ${
                            selected
                              ? "border-brand bg-brand-soft text-navy"
                              : "border-gray-200 hover:border-brand/50 hover:bg-brand-tint text-navy"
                          }`}
                        >
                          {op}
                        </button>
                      );
                    })}
                  </div>
                )}

                {current.tipo === "select" && (
                  <div>
                    <select
                      value={answers.comunidad}
                      onChange={(e) => saveAnswer("comunidad", e.target.value)}
                      className="form-select !text-navy !bg-white !border-gray-200"
                    >
                      <option value="" disabled>
                        Selecciona tu comunidad…
                      </option>
                      {current.opciones.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={handleFinish}
                      disabled={!answers.comunidad || submitting}
                      className="btn-brand mt-5"
                    >
                      {submitting ? "Enviando…" : "Finalizar y enviar →"}
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navegación atrás */}
            <div className="mt-6 flex items-center justify-between">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(s - 1, 0))}
                  className="text-muted text-sm font-medium hover:text-navy transition-colors inline-flex items-center gap-1.5"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M9 3L5 7l4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Atrás
                </button>
              ) : (
                <span />
              )}
              <span className="text-[12px] text-muted">
                🔒 Tus respuestas son confidenciales
              </span>
            </div>

            {/* Confirmación de cierre */}
            <AnimatePresence>
              {confirmClose && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 z-10 bg-white/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center text-center p-7 sm:p-9"
                >
                  <div className="w-14 h-14 rounded-full bg-brand-soft flex items-center justify-center mb-4">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                      <path
                        d="M13 8v6M13 18h.01"
                        stroke="#3D7A56"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="13"
                        cy="13"
                        r="11"
                        stroke="#3D7A56"
                        strokeWidth="1.6"
                      />
                    </svg>
                  </div>
                  <h4 className="font-display text-2xl text-navy mb-2">
                    ¿Seguro que quieres salir?
                  </h4>
                  <p className="text-muted text-[15px] leading-relaxed mb-6 max-w-xs">
                    Te faltan solo unas preguntas para completar tu solicitud y
                    que podamos preparar mejor tu consulta.
                  </p>
                  <div className="w-full max-w-xs space-y-2.5">
                    <button
                      type="button"
                      onClick={handleStay}
                      className="btn-brand"
                    >
                      Seguir respondiendo
                    </button>
                    <button
                      type="button"
                      onClick={handleLeave}
                      className="w-full py-3 text-muted text-[15px] font-medium hover:text-navy transition-colors"
                    >
                      Salir de todos modos
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
