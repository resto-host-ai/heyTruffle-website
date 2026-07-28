import Image from "next/image";
import { NOISE } from "@/lib/noise";
import TryDemoButton from "@/components/demo/TryDemoButton";
import { BookDemoButton } from "@/components/ui/BookDemoButton";
import Pricing from "@/components/marketing/Pricing";

export default function TeamSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden pb-28 pt-24 md:pb-36 md:pt-32"
      style={{
        // Figma: linear fill — White (#f6f3ec) at 21% → #EF7200 at 100%
        backgroundImage: "linear-gradient(180deg, #f6f3ec 21%, #ef7200 100%)",
      }}
    >
      {/* grain (Figma "Ruido" effect) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
      />

      <div className="relative mx-auto w-full px-6 lg:px-[73px]">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[minmax(0,6.5fr)_minmax(0,5.5fr)]">
          {/* Copy */}
          <div className="reveal reveal-up">
            <h2 className="font-serif text-[40px] font-bold! leading-[110%] text-[#251f21] md:text-[52px] lg:text-[64px]">
              You&apos;re never handed
              <br />
              a tool and left alone.
            </h2>
            <p className="mt-8 max-w-xl font-body text-[26px] font-normal leading-[140%] text-[#251f21]">
              Every AI host is monitored by our team. We review real calls,
              catch what needs fixing, and improve your host every week.
            </p>
            <p className="mt-4 max-w-xl font-body text-[26px] font-normal leading-[140%] text-[#251f21]">
              That&apos;s the difference between software you maintain and a
              service that takes care of you.
            </p>
            <BookDemoButton
              className="mt-9 inline-flex items-center justify-center gap-2.5 rounded-full border border-transparent bg-[#1c1917] px-[44px] py-[26px] font-body text-[20px] font-bold leading-[110%] text-cream transition-all duration-300 hover:border-[#7a7d9a] btn-grad btn-grad-steel hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_18px_44px_rgba(0,0,0,0.28)]"
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
              {["/images/team1.webp", "/images/team2.webp"].map((src) => (
                <div key={src} className="relative aspect-[478/545]">
                  <Image
                    src={src}
                    alt="HeyTruffle team member"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 45vw, 30vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="mt-4 text-center font-body text-[20px] font-normal leading-[110%] text-[#251f21]">
              Backed by real people.
            </p>
          </div>
        </div>

        <Pricing />

        {/* ---- CTA card ---- */}
        <div className="mt-8 grid grid-cols-1 items-center gap-10 rounded-[40px] bg-[#f6f3ec] px-10 py-12 text-center shadow-[0_24px_60px_rgba(0,0,0,0.18)] md:mt-12 md:grid-cols-2 md:px-14 md:py-16 md:text-left">
          <h3 className="text-balance font-serif text-[40px] font-bold! leading-[110%] text-brand-orange md:text-wrap md:text-[52px] lg:text-[64px]">
            Your restaurant already has an AI host.
            {" "}You just haven&apos;t heard it yet.
          </h3>
          <div className="flex w-full flex-col items-center md:items-start">
            <p className="font-body text-[26px] font-normal leading-[140%] text-[#251f21] md:font-bold">
              We&apos;ll build one for your restaurant, your menu, your hours 
              and call you with it live. Then decide if you want a 90-day
              pilot. No contract.
            </p>
            <TryDemoButton
              className="mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-transparent bg-brand-orange px-[44px] py-[22px] font-body text-[20px] font-bold leading-[110%] text-cream transition-all duration-300 hover:text-[#251f21] hover:[background:linear-gradient(180deg,#eca766_0%,#cd8e53_100%)_padding-box,linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.04)_100%)_border-box] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_18px_44px_rgba(0,0,0,0.28)] md:mt-6 md:w-auto md:py-[26px]"
            >
              Hear your AI host
            </TryDemoButton>
            <p className="mt-3 hidden font-body text-[20px] font-normal leading-[110%] text-[#251f21] md:block md:pl-2">
              Takes 30 seconds. We call your phone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
