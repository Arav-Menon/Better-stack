import { Button } from "@/components/ui/button";
import { Nav } from "./landing-components/nav";
import { HeroSection } from "./landing-components/hero-section";
import { StatusDashboard } from "./landing-components/status-dashboard";
import { FeaturesSection } from "./landing-components/features-section";
import { AdvancedFeaturesSection } from "./landing-components/advance-features-section";
import { IntegrationsSection } from "./landing-components/integrations-section";
import { SecuritySection } from "./landing-components/security-section";
import { PricingSection } from "./landing-components/pricing-section";
import { Footer } from "./landing-components/footer";

export default function Landing() {
  return (
    <>
      <Nav />
      <HeroSection />
      <StatusDashboard/>
      <FeaturesSection/>
      {/* change the integration ui to new sliding ui something like tha */}
      {/* <IntegrationsSection/> */}
      <SecuritySection/>
      <PricingSection/>
      <Footer/>
    </>
  );
}
