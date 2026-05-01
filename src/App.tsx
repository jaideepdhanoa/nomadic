import { AnnouncementBanner } from "./components/AnnouncementBanner";
import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/Hero";
import { ProofTiles } from "./components/ProofTiles";
import { PersonaRouter } from "./components/PersonaRouter";
import { LogoStrip } from "./components/LogoStrip";
import { TestimonialCard } from "./components/TestimonialCard";
import { WhyOrchestratingAgent } from "./components/WhyOrchestratingAgent";
import { CapabilitiesGrid } from "./components/CapabilitiesGrid";
import { ConnectPaths } from "./components/ConnectPaths";
import { FinalCTA } from "./components/FinalCTA";
import { SiteFooter } from "./components/SiteFooter";

export default function App(): JSX.Element {
  return (
    <div className="app home-page">
      <AnnouncementBanner />
      <SiteHeader />
      <main>
        <Hero />
        <ProofTiles />
        <PersonaRouter />
        <LogoStrip />
        <TestimonialCard />
        <WhyOrchestratingAgent />
        <CapabilitiesGrid />
        <ConnectPaths />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
