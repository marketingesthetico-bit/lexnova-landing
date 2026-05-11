import { useState } from "react";
import emailjs from "@emailjs/browser";
import { fireLeadEvent } from "../utils/gtag";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_lexnova";
const TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_lexnova";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

export function useFormSubmit({ onSuccess } = {}) {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (data) => {
    setStatus("loading");
    setErrorMessage("");

    const templateParams = {
      from_name: data.nombre,
      from_phone: data.telefono,
      from_email: data.email,
      // Aliases comunes por si el template usa otras variables
      name: data.nombre,
      phone: data.telefono,
      email: data.email,
      to_email: "lexnovanewchance@gmail.com",
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
        publicKey: PUBLIC_KEY,
      });

      fireLeadEvent();
      setStatus("success");
      if (typeof onSuccess === "function") onSuccess();
      return { ok: true };
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMessage(
        "No hemos podido enviar tu consulta. Inténtalo de nuevo o llámanos directamente.",
      );
      return { ok: false, error: err };
    }
  };

  const reset = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return {
    submit,
    status,
    errorMessage,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    reset,
  };
}
