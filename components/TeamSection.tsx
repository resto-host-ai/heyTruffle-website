import Image from "next/image";
import { NOISE } from "@/lib/noise";

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

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Copy */}
          <div>
            <h2 className="font-serif text-4xl leading-tight text-[#251f21] md:text-5xl">
              You&apos;re never handed
              <br />
              a tool and left alone.
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-[#251f21]/85 md:text-base">
              Every AI host is monitored by our team. We review real calls,
              catch what needs fixing, and improve your host every week.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#251f21]/85 md:text-base">
              That&apos;s the difference between software you maintain and a
              service that takes care of you.
            </p>
            <a
              href="#contact"
              className="mt-9 inline-block rounded-full bg-[#1c1917] px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-black"
            >
              Talk to our team
            </a>
          </div>

          {/* Portraits — like the Figma: one alpha mask (linear-gradient fill)
              applied to the whole pair, fading the group's outer edges. */}
          <div>
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
            <p className="mt-4 text-center text-sm text-[#251f21]/80">
              Backed by real people.
            </p>
          </div>
        </div>

        {/* ---- CTA card ---- */}
        <div className="mt-24 grid grid-cols-1 items-center gap-10 rounded-[40px] bg-[#f6f3ec] px-10 py-12 text-center shadow-[0_24px_60px_rgba(0,0,0,0.18)] md:mt-32 md:grid-cols-2 md:px-14 md:py-16 md:text-left">
          <h3 className="font-serif text-3xl leading-snug text-brand-orange md:text-4xl">
            Hear what HeyTruffle
            <br />
            would capture for
            <br />
            your restaurant.
          </h3>
          <div className="flex flex-col items-center md:items-start">
            <p className="text-base font-semibold leading-snug text-[#251f21] md:text-lg">
              Start with a 90-day pilot.
              <br />
              See it work in your own restaurant first.
            </p>
            <a
              href="#meet-the-hosts"
              className="mt-6 inline-block rounded-full bg-brand-orange px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-[#d96700]"
            >
              Hear how your restaurant sounds
            </a>
            <p className="mt-3 text-xs text-[#251f21]/70 md:pl-2">
              30 seconds. We call you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
