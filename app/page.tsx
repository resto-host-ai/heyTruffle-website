import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import MomentSection from "@/components/MomentSection";
import WhatIsSection from "@/components/WhatIsSection";
import ResultsSection from "@/components/ResultsSection";
import Features from "@/components/Features";
import CaseStudies from "@/components/CaseStudies";
import Partner from "@/components/Partner";
import Integrations from "@/components/Integrations";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import TeamSection from "@/components/TeamSection";
import Contact from "@/components/Contact";

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
      <Features />
      <CaseStudies />
      <Partner />
      <Integrations />
      <Testimonials />
      <Pricing />
      <TeamSection />
      <Contact />
    </>
  );
}
