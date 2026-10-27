import Image from "next/image";

/** Client logos for the infinite carousel. White on transparent, no padding,
 *  exported at 2x with the visual weight already balanced between them: a
 *  solid mark is drawn smaller and a thin-line one bigger so they all read at
 *  the same intensity. `w`/`h` are the display size (half the file's pixels),
 *  from the set's manifest — render them as-is; do NOT give the logos a common
 *  height in CSS, that undoes the balancing. */
const LOGOS = [
  { src: "/images/clients/aplos@2x.png", alt: "Aplós", w: 90, h: 46 },
  { src: "/images/clients/baires-grill@2x.png", alt: "Baires Grill", w: 63, h: 49 },
  { src: "/images/clients/bastion@2x.png", alt: "Bastion", w: 126, h: 40 },
  { src: "/images/clients/beacon-70@2x.png", alt: "Beacon 70", w: 112, h: 37 },
  { src: "/images/clients/carmel-valley-ranch@2x.png", alt: "Carmel Valley Ranch", w: 154, h: 56 },
  { src: "/images/clients/casa-pirul@2x.png", alt: "Casa Pirul", w: 73, h: 58 },
  { src: "/images/clients/chelsea-corner@2x.png", alt: "Chelsea Corner", w: 68, h: 68 },
  { src: "/images/clients/city-line-bar@2x.png", alt: "City Line Bar and Grill", w: 52, h: 41 },
  { src: "/images/clients/club-de-la-milanesa@2x.png", alt: "El Club de la Milanesa", w: 70, h: 44 },
  { src: "/images/clients/corazon-by-baires@2x.png", alt: "Corazón by Baires", w: 128, h: 43 },
  { src: "/images/clients/don-quixotes@2x.png", alt: "Don Quixote's", w: 90, h: 29 },
  { src: "/images/clients/flossmoor-social@2x.png", alt: "Flossmoor Social", w: 68, h: 68 },
  { src: "/images/clients/fridas@2x.png", alt: "Frida's", w: 59, h: 47 },
  { src: "/images/clients/happeas@2x.png", alt: "Happea's", w: 68, h: 68 },
  { src: "/images/clients/kyochon@2x.png", alt: "Kyochon", w: 107, h: 38 },
  { src: "/images/clients/kyu@2x.png", alt: "KYU", w: 87, h: 54 },
  { src: "/images/clients/la-canita@2x.png", alt: "La Cañita", w: 85, h: 38 },
  { src: "/images/clients/la-presa@2x.png", alt: "La Presa", w: 98, h: 48 },
  { src: "/images/clients/mangos@2x.png", alt: "Mango's", w: 97, h: 32 },
  { src: "/images/clients/maracaibo@2x.png", alt: "Maracaibo", w: 39, h: 43 },
  { src: "/images/clients/milo-butterfingers@2x.png", alt: "Milo Butterfingers", w: 70, h: 42 },
  { src: "/images/clients/nacho-daddy@2x.png", alt: "Nacho Daddy", w: 54, h: 26 },
  { src: "/images/clients/orilla@2x.png", alt: "Orilla", w: 126, h: 51 },
  { src: "/images/clients/papis-grill@2x.png", alt: "Papi's Grill", w: 82, h: 36 },
  { src: "/images/clients/roof-at-esme@2x.png", alt: "Roof at Esmé", w: 103, h: 36 },
  { src: "/images/clients/rreal-tacos@2x.png", alt: "Rreal Tacos", w: 61, h: 61 },
  { src: "/images/clients/salvaje@2x.png", alt: "Salvaje", w: 124, h: 62 },
  { src: "/images/clients/the-fish-house@2x.png", alt: "The Fish House", w: 104, h: 68 },
  { src: "/images/clients/think-hospitality@2x.png", alt: "Think Hospitality", w: 68, h: 68 },
  { src: "/images/clients/zocalo@2x.png", alt: "Zócalo", w: 74, h: 66 },
  { src: "/images/clients/zona-caribbean@2x.png", alt: "Zona Caribbean", w: 113, h: 33 },
];

/* One factor for every logo, so their relative sizes (the balancing) stay
   intact. The files are 2x the manifest size, so up to 2 stays sharp. */
const LOGO_SCALE = 1.2;

// Duplicated so the -50% translate loops seamlessly.
const TRACK = [...LOGOS, ...LOGOS];

export default function TrustedBy() {
  return (
    <section id="trusted" className="pb-6 pt-16 md:pt-[calc(80*var(--fx))]">
      <div className="mx-auto w-full px-6 lg:px-[73px]">
        <h2 className="reveal reveal-up font-body text-center text-[16px] font-normal! leading-[145%] md:text-[calc(18*var(--fx))] text-cream/90">
          Restaurants powered by heytruffle answer every call.{" "}
          <span className="text-[#d592f3]">Your restaurant can too.</span>
        </h2>
      </div>

      {/* Infinite carousel. The edge fade is a mask only from md — masking a
          container whose content translates every frame makes WebKit
          re-composite the whole strip per frame; phones get two cheap gradient
          overlays over the section bg instead. */}
      <div className="group relative mt-12 overflow-hidden md:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {/* Cells (.marquee-item) padded 60px a side, logos centred in them and
            on the row — no gap, the cell padding is the spacing. 31 logos make a long
            track, so the loop runs slower to keep the old scroll speed. */}
        <div className="marquee mobile-logo-marquee flex w-max items-center [--marquee-duration-mobile:185s] [--marquee-duration:145s]">
          {TRACK.map((logo, i) => (
            <div className="marquee-item" key={i}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={Math.round(logo.w * LOGO_SCALE)}
                height={Math.round(logo.h * LOGO_SCALE)}
                aria-hidden={i >= LOGOS.length}
                loading={i < 3 ? "eager" : "lazy"}
                fetchPriority={i < 3 ? "low" : undefined}
                unoptimized
              />
            </div>
          ))}
        </div>
        {/* Phone-only edge fades (see the mask note above) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-ink to-transparent md:hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-ink to-transparent md:hidden"
        />
      </div>

      <p className="mt-12 text-center font-body text-[15px] font-normal leading-[110%] md:text-[calc(16*var(--fx))] text-cream">
        Trusted by +100 U.S brands
      </p>
    </section>
  );
}
