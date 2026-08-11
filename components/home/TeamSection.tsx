import Image from "next/image";
import { NOISE } from "@/lib/noise";
import { BookDemoButton } from "@/components/ui/BookDemoButton";

// Figma calls for 4 distinct photos; only these 2 exist so far, so each
// is used twice as a placeholder to fill the row. Swap in the other 2 real
// photos once they're supplied — no other change needed.
const PHOTOS = [
  "/images/team1.webp",
  "/images/team2.webp",
  "/images/team1.webp",
  "/images/team2.webp",
];

export default function TeamSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden bg-[#f6f3ec] pb-10 pt-10 md:pb-16 md:pt-16"
    >
      {/* grain (Figma "Ruido" effect) — blend md+ only, see iOS notes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20 md:opacity-30 md:mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
      />

      {/* Warm orange glow bleeding up from the bottom edge of the section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 md:h-72"
        style={{
          background:
            "radial-gradient(ellipse at bottom, rgba(239,114,0,0.55) 0%, rgba(239,114,0,0.22) 45%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1180px] px-6 pt-6 pb-8 text-center lg:px-[73px]">
        {/* Copy — centered, full width, ahead of the photo row (matches the
            Figma layout: no more side-by-side split). */}
        <div className="reveal reveal-up">
          <h2 className="font-serif text-[30px] font-bold! leading-[110%] text-[#251f21] md:text-[38px] lg:text-[44px]">
            You&apos;re never handed
            <br />a dashboard to manage.
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-[16px] font-normal leading-[145%] text-[#251f21] md:text-[18px]">
            Our team reviews real calls, catch what needs fixing, and
            improve your concierge every week.
          </p> 
        </div>

        {/* Photo row — breaks out of the max-w container to the full
            viewport width (same left-1/2/-translate-x-1/2/w-screen breakout
            as SuccessStats.tsx). Only the two outer tiles fade — applied per
            tile rather than one mask across the whole row, so the fade is a
            fixed fraction of each edge photo instead of a fraction of the
            row's total width (which shrinks/grows with viewport and gap). */}
        <div
          className="reveal reveal-up relative left-1/2 mt-8 w-screen -translate-x-1/2 md:mt-10"
          style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
        >
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-7">
            {PHOTOS.map((src, i) => {
              const isFirst = i === 0;
              const isLast = i === PHOTOS.length - 1;
              const edgeMask = isFirst
                ? "linear-gradient(90deg, transparent 0%, #000 55%)"
                : isLast
                  ? "linear-gradient(90deg, #000 45%, transparent 100%)"
                  : undefined;
              return (
                <div
                  key={`${src}-${i}`}
                  className="relative aspect-square w-full"
                  style={
                    edgeMask
                      ? { maskImage: edgeMask, WebkitMaskImage: edgeMask }
                      : undefined
                  }
                >
                  <Image
                    src={src}
                    alt="heytruffle team member"
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-center font-body text-[16px] font-normal leading-[110%] text-[#251f21] md:text-[18px] italic">
            Not a tool. A team.
          </p>
        </div>
      </div>

      {/* <Pricing />

      <div className="relative mx-auto w-full px-6 lg:px-[73px]">
        <div className="mt-8 grid grid-cols-1 items-center gap-10 rounded-[40px] bg-[#f6f3ec] px-10 py-12 text-center shadow-[0_24px_60px_rgba(0,0,0,0.18)] md:mt-12 md:grid-cols-2 md:px-14 md:py-16 md:text-left">
          <h3 className="text-balance font-serif text-[30px] font-bold! leading-[110%] text-brand-orange md:text-wrap md:text-[38px] lg:text-[44px]">
            Your restaurant already has an AI concierge. You just haven&apos;t heard
            it yet.
          </h3>
          <div className="flex w-full flex-col items-center md:items-start">
            <p className="font-body text-[16px] font-normal leading-[145%] text-[#251f21] md:text-[18px] md:font-bold">
              We&apos;ll build one for your restaurant, your menu, your hours
              and call you with it live. Then decide if you want a 90-day
              pilot. No contract.
            </p>
            <TryDemoButton
              className="mt-7 inline-flex h-[50px] w-full items-center justify-center gap-2.5 rounded-full border border-transparent bg-brand-orange px-8 font-body text-[16px] font-bold leading-[110%] text-cream transition-all duration-300 hover:text-[#251f21] hover:[background:linear-gradient(180deg,#eca766_0%,#cd8e53_100%)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.04)_100%)_border-box] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_18px_44px_rgba(0,0,0,0.28)] md:mt-6 md:w-auto"
            >
              Hear your AI host
            </TryDemoButton>
            <p className="mt-3 hidden font-body text-[16px] font-normal leading-[110%] text-[#251f21] md:block md:pl-2">
              Takes 30 seconds. We call your phone.
            </p>
          </div>
        </div>
      </div> */}

    </section>
  );
}
