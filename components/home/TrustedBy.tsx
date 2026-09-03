import Image from "next/image";

/** Restaurant logos for the infinite carousel — every `logo_*` asset.
 *
 *  These were .svg files, but only nominally: each was a base64 PNG inside an
 *  <svg> shell, which cost 33% in encoding overhead and forced `unoptimized`
 *  on the <Image> (next/image will not process an SVG). Re-encoded as real
 *  WebP at the same pixel dimensions, the set went from 291 KB to 116 KB and
 *  can now be served as AVIF by the optimizer.
 *
 *  `w`/`h` are the bitmap's true intrinsic size, which is NOT what the old
 *  values described — those were the <svg> element's box (108x73 for a bitmap
 *  that is really 218x148). They only set the aspect ratio and the width
 *  next/image sizes against; the rendered size comes from .marquee-item in
 *  globals.css, which caps height at 74px. Keep them at 2x that cap: the fine
 *  strokes on KYU and Baires visibly resample below it. */
const LOGOS = [
  { src: "/images/logo_kyu.webp", alt: "KYU", w: 218, h: 148 },
  { src: "/images/logo_canita.webp", alt: "La Cañita", w: 269, h: 148 },
  { src: "/images/logo_mojitos.webp", alt: "Mojitos", w: 211, h: 148 },
  { src: "/images/logo_lima.webp", alt: "Lima", w: 321, h: 148 },
  { src: "/images/logo_rreal.webp", alt: "Rreal Tacos", w: 149, h: 148 },
  { src: "/images/logo_south.webp", alt: "South Beach", w: 151, h: 148 },
  { src: "/images/logo_grove.webp", alt: "The Grove", w: 384, h: 86 },
  { src: "/images/logo_baires.webp", alt: "Baires Grill", w: 149, h: 148 },
  { src: "/images/logo_palms.webp", alt: "Palm Tree Club", w: 384, h: 90 },
  { src: "/images/logo_esme.webp", alt: "Esme", w: 291, h: 148 },
];

// Duplicated so the -50% translate loops seamlessly.
const TRACK = [...LOGOS, ...LOGOS];

export default function TrustedBy() {
  return (
    <section id="trusted" className="pb-6 pt-16 md:pt-20">
      <div className="mx-auto w-full px-6 lg:px-[73px]">
        <h2 className="reveal reveal-up font-body text-center text-[16px] font-normal! leading-[145%] md:text-[18px] text-cream/90">
          Restaurants powered by heytruffle answer every call.{" "}
          <span className="text-[#d592f3]">Your restaurant can too.</span>
        </h2>
      </div>

      {/* Infinite carousel. The edge fade is a mask only from md — masking a
          container whose content translates every frame makes WebKit
          re-composite the whole strip per frame; phones get two cheap gradient
          overlays over the section bg instead. */}
      <div className="group relative mt-12 overflow-hidden md:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee mobile-logo-marquee flex w-max items-center gap-9 pr-9 md:gap-12 md:pr-12">
          {TRACK.map((logo, i) => (
            <div className="marquee-item" key={i}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.w}
                height={logo.h}
                aria-hidden={i >= LOGOS.length}
                loading={i < 3 ? "eager" : "lazy"}
                fetchPriority={i < 3 ? "low" : undefined}
                unoptimized
                className="h-12 w-auto shrink-0 opacity-70 transition-opacity hover:opacity-100"
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

      <p className="mt-12 text-center font-body text-[15px] font-normal leading-[110%] md:text-[16px] text-cream">
        Trusted by leading U.S. restaurants
      </p>
    </section>
  );
}
