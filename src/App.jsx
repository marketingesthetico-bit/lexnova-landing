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
import StickyCTA from "./components/StickyCTA";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleLeadSuccess = () => setModalOpen(true);

  return (
    <div id="top">
      <Hero onLeadSuccess={handleLeadSuccess} />
      <TrustBar />
      <NoEstasSolo />
      <ForYouIf />
      <Stats />
      <HowItWorks />
      <WhyUs />
      <MidwayCTA />
      <Testimonios />
      <FAQ />
      <SecondCTA onLeadSuccess={handleLeadSuccess} />
      <Footer />
      <ConversionModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <StickyCTA />
    </div>
  );
}
