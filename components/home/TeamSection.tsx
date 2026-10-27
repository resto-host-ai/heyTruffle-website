import Image from "next/image";
import { BookDemoButton } from "@/components/ui/BookDemoButton";

const PHOTOS = [
  {
    src: "/images/heytruffle-team-1.jpg",
    alt: "heytruffle engineer reviewing a restaurant's live reservation setup",
  },
  {
    src: "/images/heytruffle-team-2.jpg",
    alt: "heytruffle teammates reviewing a call together in the office",
  },
  {
    src: "/images/heytruffle-team-3.jpg",
    alt: "heytruffle engineer monitoring AI host performance",
  },
  {
    src: "/images/heytruffle-team-4.jpg",
    alt: "heytruffle teammates collaborating on a restaurant account",
  },
  {
    src: "/images/heytruffle-team-5.jpeg",
    alt: "The full heytruffle team gathered in front of the office sign",
  },
  {
    src: "/images/heytruffle-team-6.jpeg",
    alt: "heytruffle engineer working across a laptop and monitor",
  },
];

export default function TeamSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white from-40% to-[#fdeedd] pb-16 pt-6 md:pb-[calc(200*var(--fx))] md:pt-[calc(40*var(--fx))]"
    >
      {/* Shares the FAQ's white canvas above it (no seam between the two),
          warming to peach toward the contact section, as in the Figma. */}
      <div className="relative mx-auto w-full max-w-[1180px] px-6 pt-6 pb-8 text-center lg:px-[73px]">
        {/* Copy — centered, full width, ahead of the photo row (matches the
            Figma layout: no more side-by-side split). */}
        <div className="reveal reveal-up">
          <h2 className="font-serif text-[30px] font-normal! leading-[110%] text-[#251f21] md:text-[calc(64*var(--fx))]">
            You&apos;re never handed a
            <br />
            dashboard to manage
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-[16px] font-normal leading-[145%] text-[#251f21] md:mt-[calc(28*var(--fx))] md:max-w-[calc(640*var(--fx))] md:text-[calc(24*var(--fx))]">
            Our team reviews real calls, catch what needs fixing, and
            improve your concierge every week.
          </p> 
        </div>

        {/* Photo row — infinite marquee, same mechanism as TrustedBy's logo
            ticker (.marquee class in globals.css: translateX(0 → -50%),
            paused on hover, slowed under prefers-reduced-motion instead of
            stopped). The track is PHOTOS doubled so the -50% loop is
            seamless regardless of how many photos are in the array — every
            photo still plays once per lap, it just keeps relooping. Breaks
            out to the full viewport width (same left-1/2/-translate-x-1/2/
            w-screen breakout as SuccessStats.tsx). */}
        <div
          className="reveal reveal-up relative left-1/2 mt-8 w-screen -translate-x-1/2 md:mt-[calc(56*var(--fx))]"
          style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
        >
          <div className="group relative overflow-hidden md:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="marquee flex w-max items-center gap-5 md:gap-[calc(34*var(--fx))]">
              {[...PHOTOS, ...PHOTOS].map(({ src, alt }, i) => (
                <div
                  key={i}
                  aria-hidden={i >= PHOTOS.length}
                  className={`relative aspect-square w-[45vw] shrink-0 overflow-hidden rounded-[14px] sm:w-[280px] md:w-[calc(405*var(--fx))] md:rounded-[calc(16*var(--fx))] ${
                    i >= 3 ? "hidden md:block" : ""
                  }`}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 45vw, 405px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            {/* Phone-only edge fades — matches TrustedBy: a masked container
                whose content translates every frame is WebKit's most
                expensive per-frame recomposite, so phones get plain gradient
                overlays instead of the md+ mask-image. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#fbf8f3] to-transparent md:hidden"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#fbf8f3] to-transparent md:hidden"
            />
          </div>
          <p className="mt-8 text-center font-body text-[16px] font-normal italic leading-[110%] text-[#251f21] md:mt-[calc(48*var(--fx))] md:text-[calc(24*var(--fx))]">
            Not a tool. A team
          </p>
        </div>
      </div>

      {/* <Pricing />

      <div className="relative mx-auto w-full px-6 lg:px-[73px]">
        <div className="mt-8 grid grid-cols-1 items-center gap-10 rounded-card bg-[#f6f3ec] px-10 py-12 text-center shadow-[0_24px_60px_rgba(0,0,0,0.18)] md:mt-12 md:grid-cols-2 md:px-14 md:py-16 md:text-left">
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
