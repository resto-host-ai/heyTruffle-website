import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import AiHostStory from "@/components/home/AiHostStory";
import RealRoi from "@/components/home/RealRoi";
import OperatorStories from "@/components/home/OperatorStories";
import OperatorFaq from "@/components/home/OperatorFaq";
import WhatIsSection from "@/components/home/WhatIsSection";
import HowItWorks from "@/components/home/HowItWorks";
import TeamSection from "@/components/home/TeamSection";
import Contact from "@/components/home/Contact";
// Temporarily hidden from the home — re-enable when ready:
// (Pricing now renders inside TeamSection, mirroring the client's dev build.)
// import Features from "@/components/marketing/Features";
// import Partner from "@/components/marketing/Partner";
// import Integrations from "@/components/marketing/Integrations";
// import Testimonials from "@/components/marketing/Testimonials";

export default function Home() {
  return (
    <>
      {/* Single dark canvas for the whole Hero→OperatorStories stretch — every
          section inside is transparent, so there's exactly one place that
          owns this color instead of each section re-painting it and drifting
          out of sync at the seams. */}
      <div className="bg-ink">
        <Hero />
        <TrustedBy />
        <AiHostStory />
        <RealRoi />
        <OperatorStories />
      </div>
      <OperatorFaq />
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
