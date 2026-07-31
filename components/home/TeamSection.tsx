import Image from "next/image";
import { NOISE } from "@/lib/noise";
import TryDemoButton from "@/components/demo/TryDemoButton";
import { BookDemoButton } from "@/components/ui/BookDemoButton";
import Pricing from "@/components/marketing/Pricing";

export default function TeamSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-clip pb-10 pt-10 md:pb-16 md:pt-16"
      style={{
        // Figma: linear fill — White (#f6f3ec) at 21% → #EF7200 at 100%
        backgroundImage: "linear-gradient(180deg, #f6f3ec 21%, #ef7200 100%)",
      }}
    >
      {/* grain (Figma "Ruido" effect) — blend md+ only, see iOS notes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20 md:opacity-30 md:mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
      />

      <div className="relative mx-auto w-full px-6 lg:px-[73px]">
        <div
          data-mobile-motion="rise"
          className="grid grid-cols-1 items-center gap-14 md:grid-cols-[minmax(0,6.5fr)_minmax(0,5.5fr)]"
        >
          {/* Copy */}
          <div className="reveal reveal-up">
            <h2 className="font-serif text-[30px] font-bold! leading-[110%] text-[#251f21] md:text-[38px] lg:text-[44px]">
              You&apos;re never handed
              <br />
              a tool and left alone.
            </h2>
            <p className="mt-6 max-w-xl font-body text-[16px] font-normal leading-[145%] text-[#251f21] md:text-[18px]">
              Every AI host is monitored by our team. We review real calls,
              catch what needs fixing, and improve your host every week.
            </p>
            <p className="mt-4 max-w-xl font-body text-[16px] font-normal leading-[145%] text-[#251f21] md:text-[18px]">
              That&apos;s the difference between software you maintain and a
              service that takes care of you.
            </p>
            <BookDemoButton
              className="mt-7 inline-flex h-[50px] items-center justify-center gap-2.5 rounded-full border border-transparent bg-[#1c1917] px-8 font-body text-[16px] font-bold leading-[110%] text-cream transition-all duration-300 hover:border-[#7a7d9a] btn-grad btn-grad-steel hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_18px_44px_rgba(0,0,0,0.28)]"
            >
              Talk to our team
            </BookDemoButton>
          </div>

          {/* Portraits — like the Figma: one alpha mask (linear-gradient fill)
              applied to the whole pair, fading the group's outer edges. */}
          <div className="reveal reveal-up" style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}>
            <div
              className="grid grid-cols-2 gap-5"
              style={{
                // Eased (smoothstep-like) alpha ramp — a plain 2-stop linear
                // gradient reads much harsher than Figma's mask.
                maskImage:
                  "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.16) 6%, rgba(0,0,0,0.5) 12%, rgba(0,0,0,0.84) 18%, #000 25%, #000 75%, rgba(0,0,0,0.84) 82%, rgba(0,0,0,0.5) 88%, rgba(0,0,0,0.16) 94%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.16) 6%, rgba(0,0,0,0.5) 12%, rgba(0,0,0,0.84) 18%, #000 25%, #000 75%, rgba(0,0,0,0.84) 82%, rgba(0,0,0,0.5) 88%, rgba(0,0,0,0.16) 94%, transparent 100%)",
              }}
            >
              {/* Renamed when the client's real office photos replaced the stock
                  portraits — same path with new content kept serving the old
                  files from browser caches. */}
              {["/images/team1.webp", "/images/team2.webp"].map((src) => (
                <div key={src} className="relative aspect-[478/545]">
                  <Image
                    src={src}
                    alt="heytruffle team member"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 45vw, 30vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="mt-4 text-center font-body text-[16px] font-normal leading-[110%] text-[#251f21] md:text-[18px]">
              Backed by real people.
            </p>
          </div>
        </div>

      </div>

      {/* ---- Pricing — on the gradient like the client's dev build, but as a
           sibling of the padded container: Pricing brings its own gutter, and
           nesting it doubled the padding (48px per side on phones). ---- */}
      <Pricing />

      <div className="relative mx-auto w-full px-6 lg:px-[73px]">
        {/* ---- CTA card ---- */}
        <div
          data-mobile-motion="scale"
          className="mt-8 grid grid-cols-1 items-center gap-10 rounded-[40px] bg-[#f6f3ec] px-10 py-12 text-center shadow-[0_24px_60px_rgba(0,0,0,0.18)] md:mt-12 md:grid-cols-2 md:px-14 md:py-16 md:text-left"
        >
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
      </div>
    </section>
  );
}
