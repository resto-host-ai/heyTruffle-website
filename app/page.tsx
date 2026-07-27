import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import MomentSection from "@/components/MomentSection";
import WhatIsSection from "@/components/WhatIsSection";
import ResultsSection from "@/components/ResultsSection";
import HowItWorks from "@/components/HowItWorks";
import CaseStudies from "@/components/CaseStudies";
import TeamSection from "@/components/TeamSection";
import Contact from "@/components/Contact";
// Temporarily hidden from the home — re-enable when ready:
// import Features from "@/components/Features";
// import Partner from "@/components/Partner";
// import Integrations from "@/components/Integrations";
// import Testimonials from "@/components/Testimonials";
// import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      {/* Shared #251F21 background across both sections */}
      <div className="bg-[#251f21]">
        <MomentSection />
        <WhatIsSection />
      </div>
      <ResultsSection />
      <HowItWorks />
      <CaseStudies />
      <TeamSection />
      <Contact />
      {/* Temporarily hidden — re-enable when ready:
      <Features />
      <Partner />
      <Integrations />
      <Testimonials />
      <Pricing />
      */}
    </>
  );
}
