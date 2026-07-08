import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import MomentSection from "@/components/MomentSection";
import WhatIsSection from "@/components/WhatIsSection";
import ResultsSection from "@/components/ResultsSection";

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
    </>
  );
}
