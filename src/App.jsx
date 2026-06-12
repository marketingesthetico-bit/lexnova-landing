import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import NoEstasSolo from "./components/NoEstasSolo";
import ForYouIf from "./components/ForYouIf";
import Stats from "./components/Stats";
import HowItWorks from "./components/HowItWorks";
import WhyUs from "./components/WhyUs";
import MidwayCTA from "./components/MidwayCTA";
import Testimonios from "./components/Testimonios";
import FAQ from "./components/FAQ";
import SecondCTA from "./components/SecondCTA";
import Footer from "./components/Footer";
import ConversionModal from "./components/ConversionModal";
import LeadWizard from "./components/LeadWizard";
import ExclusionPage from "./components/ExclusionPage";
import StickyCTA from "./components/StickyCTA";
import { submitLead } from "./hooks/useLeadFlow";
import { fireLeadEvent } from "./utils/gtag";

export default function App() {
  const [leadBase, setLeadBase] = useState(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [excluded, setExcluded] = useState(null); // null | "deuda" | "zona"

  // Si el usuario pulsa "atrás" del navegador estando en la página de
  // exclusión, volvemos a la landing.
  useEffect(() => {
    const onPop = () => setExcluded(null);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // 1) Envío del form base (Nombre, Tel, Email): solo abre el wizard.
  //    NO se dispara conversión ni se envía nada todavía.
  const handleLeadStart = async (baseData) => {
    setLeadBase(baseData);
    setWizardOpen(true);
    return { ok: true };
  };

  // 2) Envío del lead completo desde el wizard (solo si NO está descalificado
  //    por zona). El backend valida y envía email solo si cualifica.
  //    La conversión de Google Ads se dispara SOLO si cualifica.
  const handleQualifiedSubmit = async (fullData) => {
    const res = await submitLead(fullData);
    if (res?.ok && res.qualified) {
      fireLeadEvent();
    }
    return res;
  };

  // 3a) Lead cualificado y enviado → modal de éxito.
  const handleComplete = () => {
    setWizardOpen(false);
    setSuccessOpen(true);
  };

  // 3b) Lead descalificado (deuda baja o fuera de Cataluña) → página de
  //     exclusión. Sin conversión ni email.
  const handleExcluded = (reason) => {
    setWizardOpen(false);
    setExcluded(reason);
    try {
      window.history.pushState({ excluded: true }, "", "/no-disponible");
    } catch {
      /* no-op */
    }
  };

  const handleBackFromExclusion = () => {
    setExcluded(null);
    try {
      window.history.pushState({}, "", "/");
    } catch {
      /* no-op */
    }
  };

  // 3c) Cierre del wizard sin terminar: no se envía nada ni cuenta conversión.
  const handleWizardClose = () => setWizardOpen(false);

  if (excluded) {
    return (
      <ExclusionPage reason={excluded} onBack={handleBackFromExclusion} />
    );
  }

  return (
    <div id="top">
      <Hero onLeadStart={handleLeadStart} />
      <TrustBar />
      <NoEstasSolo />
      <ForYouIf />
      <Stats />
      <HowItWorks />
      <WhyUs />
      <MidwayCTA />
      <Testimonios />
      <FAQ />
      <SecondCTA onLeadStart={handleLeadStart} />
      <Footer />

      <LeadWizard
        open={wizardOpen}
        base={leadBase}
        onSubmit={handleQualifiedSubmit}
        onComplete={handleComplete}
        onExcluded={handleExcluded}
        onClose={handleWizardClose}
      />
      <ConversionModal open={successOpen} onClose={() => setSuccessOpen(false)} />
      <StickyCTA />
    </div>
  );
}
