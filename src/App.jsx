import { useState } from "react";
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
import StickyCTA from "./components/StickyCTA";
import { newLeadId, startLead } from "./hooks/useLeadFlow";
import { fireLeadEvent } from "./utils/gtag";

export default function App() {
  const [leadId, setLeadId] = useState(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  // 1) El usuario envía el form base (Nombre, Tel, Email).
  //    La conversión y el wizard SOLO se activan si el backend confirma
  //    que el lead se guardó. Si /api falla, no se cuenta conversión.
  //    (Para probar el flujo completo en local usa `vercel dev`, no `vite`.)
  const handleLeadStart = async (baseData) => {
    const id = newLeadId();
    try {
      await startLead({ leadId: id, ...baseData });
    } catch (e) {
      console.error("No se pudo iniciar el lead:", e);
      return { ok: false };
    }

    setLeadId(id);
    fireLeadEvent(); // conversión Google Ads en cuanto hay datos de contacto
    setWizardOpen(true);
    return { ok: true };
  };

  // 2a) El usuario completa el wizard
  const handleWizardComplete = () => {
    setWizardOpen(false);
    setSuccessOpen(true);
  };

  // 2b) El usuario cierra el wizard sin terminar.
  //     El backend enviará el lead parcial a los 60 min.
  const handleWizardClose = () => {
    setWizardOpen(false);
    setSuccessOpen(true);
  };

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
        leadId={leadId}
        onComplete={handleWizardComplete}
        onClose={handleWizardClose}
      />
      <ConversionModal open={successOpen} onClose={() => setSuccessOpen(false)} />
      <StickyCTA />
    </div>
  );
}
