import TrustedByLogo from "@/components/TrustedByLogo";

/** Restaurant logos for the infinite carousel — every `logo_*` asset. */
const LOGOS = [
  { src: "/images/logo_kyu.svg", alt: "KYU", w: 108, h: 73 },
  { src: "/images/logo_canita.svg", alt: "La Cañita", w: 133, h: 73 },
  { src: "/images/logo_mojitos.svg", alt: "Mojitos", w: 104, h: 73 },
  { src: "/images/logo_lima.svg", alt: "Lima", w: 123, h: 57 },
  { src: "/images/logo_rreal.svg", alt: "Rreal Tacos", w: 74, h: 73 },
  { src: "/images/logo_south.svg", alt: "South Beach", w: 75, h: 73 },
  { src: "/images/logo_grove.svg", alt: "The Grove", w: 189, h: 43 },
  { src: "/images/logo_baires.svg", alt: "Baires Grill", w: 74, h: 73 },
  { src: "/images/logo_palms.svg", alt: "Palm Tree Club", w: 189, h: 45 },
  { src: "/images/logo_esme.svg", alt: "Esme", w: 143, h: 73 },
];

// Duplicated so the -50% translate loops seamlessly.
const TRACK = [...LOGOS, ...LOGOS];

export default function TrustedBy() {
  return (
    <section id="trusted" className="bg-[#251f21] pb-6 pt-16 md:pt-20">
      <div className="mx-auto w-full px-6 lg:px-[73px]">
        <h2 className="reveal reveal-up font-body text-center text-[26px] font-normal! leading-[140%] text-cream/90">
          Restaurants on heytruffle answer every call.{" "}
          <span className="text-[#d592f3]">Yours can too.</span>
        </h2>
      </div>

      {/* Infinite carousel */}
      <div className="group relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="marquee flex w-max items-center gap-16 pr-16">
          {TRACK.map((logo, i) => (
            <TrustedByLogo
              key={i}
              src={logo.src}
              alt={logo.alt}
              width={logo.w}
              height={logo.h}
              hidden={i >= LOGOS.length}
            />
          ))}
        </div>
      </div>

      <p className="mt-12 text-center font-body text-[20px] font-normal leading-[110%] text-cream">
        Trusted by leading U.S. restaurants
      </p>
    </section>
  );
}
