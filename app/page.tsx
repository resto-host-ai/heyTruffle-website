import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import MomentSection from "@/components/home/MomentSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import WhatIsSection from "@/components/home/WhatIsSection";
import ResultsSection from "@/components/home/ResultsSection";
import HowItWorks from "@/components/home/HowItWorks";
import CaseStudies from "@/components/case-study/CaseStudies";
import TeamSection from "@/components/home/TeamSection";
import Contact from "@/components/home/Contact";
import HostsDemo from "@/components/demo/HostsDemo";
// Temporarily hidden from the home — re-enable when ready:
// (Pricing now renders inside TeamSection, mirroring the client's dev build.)
// import Features from "@/components/marketing/Features";
// import Partner from "@/components/marketing/Partner";
// import Integrations from "@/components/marketing/Integrations";
// import Testimonials from "@/components/marketing/Testimonials";

export default function Home() {
  return (
    <>
      {/* Single dark canvas for the whole Hero→CaseStudies stretch — every
          section inside is transparent, so there's exactly one place that
          owns this color instead of each section re-painting it and drifting
          out of sync at the seams. */}
      <div className="bg-ink">
        <Hero />
        <TrustedBy />
        <MomentSection />
        <WhyChooseUs />
        {/* WhatIsSection is deprecated in the v2 redesign — kept for now
            until the full v2 layout replaces it in a separate change. */}
        {/* <WhatIsSection /> */}
        <ResultsSection />
        <HostsDemo />
        {/* <HowItWorks /> */}
        <CaseStudies transparent />
      </div>
      <TeamSection />
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
