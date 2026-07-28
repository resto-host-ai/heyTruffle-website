import type { ComponentProps } from "react";
import Image from "next/image";
import CaseStudies from "@/components/CaseStudies";
import DemoSearchBar from "@/components/DemoSearchBar";
import { NOISE } from "@/lib/noise";

/**
 * The closing pair of sections every case study ends with: related studies
 * followed by the final CTA, sharing one full-bleed background.
 *
 * This markup was duplicated byte-for-byte across all nine case-study pages —
 * a copy-paste edit was landing in eight files or, more often, in some of
 * them. Only the `cases` list differs per page.
 */
export default function CaseStudyOutro({
  cases,
}: {
  // CaseStudies takes its whole props object as optional, hence NonNullable.
  cases: NonNullable<ComponentProps<typeof CaseStudies>>["cases"];
}) {
  return (
    <div className="relative overflow-hidden bg-[#251f21]">
      <Image
        src="/images/fondo_seccionfinal.webp"
        alt=""
        fill
        quality={90}
        sizes="100vw"
        className="scale-105 object-cover"
      />

      <div className="relative">
        {/* ── Related case studies (home carousel style) ───── */}
        <CaseStudies
          heading="Related case studies"
          subtitle={null}
          showCta={false}
          cases={cases}
          transparent
        />

        {/* ── Final CTA ────────────────────────────────────── */}
        <section className="relative pb-28 text-cream">
          <div className="mx-auto w-full px-6 lg:px-[73px]">
            <div
              className="relative flex w-full flex-col items-center overflow-hidden rounded-[40px] px-6 py-20 text-center md:rounded-[67px] md:px-10 md:py-28"
              style={{
                background: [
                  "radial-gradient(75% 95% at -8% 82%, rgba(239,114,0,0.5) 0%, rgba(239,114,0,0.12) 42%, transparent 68%)",
                  "linear-gradient(180deg, #1a1620 0%, #201a1e 100%)",
                ].join(", "),
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                style={{ backgroundImage: NOISE }}
              />

              <div className="relative flex w-full flex-col items-center">
                <h2 className="mx-auto max-w-[972px] font-serif text-[30px] font-bold! leading-[110%] md:text-[38px] lg:text-[44px]">
                  Hear what heytruffle would capture for your restaurant.
                </h2>

                <div className="mt-10 flex w-full justify-center">
                  <DemoSearchBar />
                </div>

                <a
                  href="mailto:info@heytruffle.ai"
                  className="mt-10 inline-flex items-center justify-center h-[50px] rounded-full bg-cream px-8 font-body text-[16px] font-bold leading-[110%] text-[#251f21] transition-all duration-300 btn-grad btn-grad-blue hover:text-cream hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(79,84,144,0.55)]"
                >
                  Talk to our team
                </a>
                <p className="mt-6 font-body text-[15px] font-normal leading-[110%] md:text-[16px] text-cream/80">
                  Backed by real people.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
