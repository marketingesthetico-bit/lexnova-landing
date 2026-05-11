import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useFormSubmit } from "../hooks/useFormSubmit";

const phoneRegex = /^(\+?34[\s-]?)?[6789]\d{2}[\s-]?\d{3}[\s-]?\d{3}$/;

const schema = z.object({
  nombre: z
    .string()
    .min(2, "Introduce tu nombre completo")
    .max(80, "Demasiado largo"),
  telefono: z
    .string()
    .min(1, "El teléfono es obligatorio")
    .regex(phoneRegex, "Introduce un teléfono español válido"),
  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Introduce un email válido"),
  deuda: z.string().min(1, "Selecciona un rango"),
  rgpd: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la política de privacidad" }),
  }),
});

export default function LeadForm({ onSuccess, variant = "hero" }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: "",
      telefono: "",
      email: "",
      deuda: "",
      rgpd: false,
    },
  });

  const { submit, isLoading, isError, errorMessage } = useFormSubmit({
    onSuccess: () => {
      reset();
      if (typeof onSuccess === "function") onSuccess();
    },
  });

  const onSubmit = (data) => submit(data);

  return (
    <motion.form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="relative bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-elevated"
      initial={{ opacity: 0, y: 24 }}
      animate={variant === "hero" ? { opacity: 1, y: 0 } : undefined}
      whileInView={variant !== "hero" ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.65,
        ease: "easeOut",
        delay: variant === "hero" ? 0.4 : 0,
      }}
    >
      {/* Cinta verde superior */}
      <div className="absolute top-0 left-6 right-6 h-1 bg-brand-gradient rounded-b-full" />

      <div className="mb-5 text-center sm:text-left">
        <p className="eyebrow mb-2">Consulta gratuita</p>
        <h3 className="font-display text-2xl sm:text-[26px] text-navy leading-tight">
          Cuéntanos tu situación
        </h3>
        <p className="text-muted text-sm mt-1.5">
          Te llamamos en menos de 24h. Sin compromiso, 100% confidencial.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="form-label" htmlFor={`nombre-${variant}`}>
            Nombre completo
          </label>
          <input
            id={`nombre-${variant}`}
            type="text"
            autoComplete="name"
            className="form-input"
            placeholder="Tu nombre"
            {...register("nombre")}
            aria-invalid={!!errors.nombre}
          />
          {errors.nombre && (
            <p className="form-error">{errors.nombre.message}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label" htmlFor={`telefono-${variant}`}>
              Teléfono
            </label>
            <input
              id={`telefono-${variant}`}
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              className="form-input"
              placeholder="600 000 000"
              {...register("telefono")}
              aria-invalid={!!errors.telefono}
            />
            {errors.telefono && (
              <p className="form-error">{errors.telefono.message}</p>
            )}
          </div>
          <div>
            <label className="form-label" htmlFor={`email-${variant}`}>
              Email
            </label>
            <input
              id={`email-${variant}`}
              type="email"
              autoComplete="email"
              className="form-input"
              placeholder="tu@email.com"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="form-label" htmlFor={`deuda-${variant}`}>
            Deuda aproximada
          </label>
          <select
            id={`deuda-${variant}`}
            defaultValue=""
            className="form-select"
            {...register("deuda")}
            aria-invalid={!!errors.deuda}
          >
            <option value="" disabled>
              Selecciona un rango…
            </option>
            <option value="Menos de 10.000€">Menos de 10.000€</option>
            <option value="10.000€ - 30.000€">10.000€ - 30.000€</option>
            <option value="30.000€ - 60.000€">30.000€ - 60.000€</option>
            <option value="Más de 60.000€">Más de 60.000€</option>
          </select>
          {errors.deuda && (
            <p className="form-error">{errors.deuda.message}</p>
          )}
        </div>

        <label className="flex items-start gap-3 text-muted text-[13px] leading-relaxed cursor-pointer select-none">
          <input
            type="checkbox"
            className="mt-1 accent-brand w-4 h-4 shrink-0 cursor-pointer"
            {...register("rgpd")}
            aria-invalid={!!errors.rgpd}
          />
          <span>
            He leído y acepto la{" "}
            <a
              href="#politica-privacidad"
              className="text-brand-dark underline hover:text-brand transition-colors"
            >
              Política de Privacidad
            </a>{" "}
            y el tratamiento de mis datos para responder a mi consulta.
          </span>
        </label>
        {errors.rgpd && <p className="form-error">{errors.rgpd.message}</p>}

        <button type="submit" disabled={isLoading} className="btn-brand mt-1">
          {isLoading ? "Enviando…" : "Quiero saber si puedo cancelar mis deudas →"}
        </button>

        {isError && (
          <p className="text-red-600 text-sm text-center mt-1">
            {errorMessage}
          </p>
        )}

        <div className="flex items-center justify-center gap-4 text-[12px] text-muted pt-1">
          <span className="inline-flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M3.5 6V4a3 3 0 016 0v2M2.5 6h8v5h-8z"
                stroke="#5BA478"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Datos cifrados
          </span>
          <span className="text-gray-300">·</span>
          <span>Cero spam</span>
        </div>
      </div>
    </motion.form>
  );
}
