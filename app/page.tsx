import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
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
        <WhyChooseUs />
        {/* WhatIsSection is deprecated in the v2 redesign — kept for now
            until the full v2 layout replaces it in a separate change. */}
        {/* <WhatIsSection /> */}
        <ResultsSection />
        <div className="relative w-full overflow-x-clip px-6 pb-24  md:pb-40 lg:px-[73px]">
          {/* Ambient glow — HostsDemo used to sit inside WhatIsSection and
              inherit its background_gradient.webp backdrop; now that it
              renders standalone (WhatIsSection is deprecated), it needs its
              own light source instead of sitting flat on the ink canvas.
              No overflow-hidden here: both discs are pushed well outside this
              wrapper's box (negative inset) so they fade to transparent on
              their own, long before hitting an edge that would clip them —
              they bleed softly into the sections above/below instead of
              cutting off in a hard line. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-48 -right-32 h-[600px] w-[600px] rounded-full opacity-90 blur-[110px]"
            style={{
              background:
                "radial-gradient(circle, rgba(239,114,0,0.65) 0%, rgba(181,63,196,0.3) 45%, transparent 72%)",
            }}
          />
          {/* Rises from the section's bottom edge, celeste fading to nothing
              toward the top — a plain linear wash, not a blob, per the
              reference. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#3773d7] from-0% to-transparent to-40%"
          />
          <div className="relative ">
            <HostsDemo />
          </div>
        </div>
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
