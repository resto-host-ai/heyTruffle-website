import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import MomentSection from "@/components/home/MomentSection";
import WhatIsSection from "@/components/home/WhatIsSection";
import ResultsSection from "@/components/home/ResultsSection";
import HowItWorks from "@/components/home/HowItWorks";
import CaseStudies from "@/components/case-study/CaseStudies";
import TeamSection from "@/components/home/TeamSection";
import Pricing from "@/components/marketing/Pricing";
import Contact from "@/components/home/Contact";
// Temporarily hidden from the home — re-enable when ready:
// import Features from "@/components/marketing/Features";
// import Partner from "@/components/marketing/Partner";
// import Integrations from "@/components/marketing/Integrations";
// import Testimonials from "@/components/marketing/Testimonials";

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
      <Pricing />
      <Contact />
      {/* Temporarily hidden — re-enable when ready:
      <Features />
      <Partner />
      <Integrations />
      <Testimonials />
      */}
    </>
  );
}
