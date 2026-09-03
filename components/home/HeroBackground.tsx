import Image from "next/image";
import { NOISE } from "@/lib/noise";

export default function HeroBackground() {
  return (
    <div
      aria-hidden
      className="hero-bg-anim pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#0c0b0c]"
    >
      {/* Phones get one responsive raster instead of ten independently
          blurred, blended layers. On a 3x iPhone those layers allocate large
          offscreen surfaces even while static, which is enough to make WebKit
          evict tiles and repaint the page as black during a fast scroll. */}
      <Image
        src="/images/hero-living-gradient.webp"
        alt=""
        fill
        quality={75}
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-[35%_center] md:hidden"
      />

      {/* The layered living gradient remains a desktop-only enhancement. */}
      <div className="hidden md:block">
        <div className="absolute inset-0">
          <div
            className="hero-blob hero-blob-a absolute -left-[15%] top-[-25%]"
            style={{ background: "#3773D7", height: "clamp(300px, 34.5vw, 2000px)", width: "clamp(300px, 34.5vw, 2000px)" }}
          />
          <div
            className="hero-blob hero-blob-b absolute right-[-12%] top-[-5%]"
            style={{ background: "#EF7200", height: "clamp(260px, 31.5vw, 1850px)", width: "clamp(260px, 31.5vw, 1850px)" }}
          />
          <div
            className="hero-blob hero-blob-c absolute bottom-[-25%] left-[10%]"
            style={{ background: "#D592F3", height: "clamp(280px, 32.5vw, 1900px)", width: "clamp(280px, 32.5vw, 1900px)" }}
          />
          <div
            className="hero-blob hero-blob-d absolute bottom-[-5%] right-[5%]"
            style={{ background: "#3773D7", height: "clamp(220px, 25vw, 1500px)", width: "clamp(220px, 25vw, 1500px)" }}
          />
          <div
            className="hero-blob hero-blob-e absolute left-[35%] top-[20%]"
            style={{ background: "#EF7200", height: "clamp(190px, 21vw, 1260px)", width: "clamp(190px, 21vw, 1260px)" }}
          />
          <div
            className="hero-blob hero-blob-f absolute left-[0%] bottom-[0%]"
            style={{ background: "#D592F3", height: "clamp(200px, 23vw, 1380px)", width: "clamp(200px, 23vw, 1380px)" }}
          />
          <div
            className="hero-blob hero-blob-g absolute right-[15%] top-[-20%]"
            style={{ background: "#3773D7", height: "clamp(230px, 26vw, 1560px)", width: "clamp(230px, 26vw, 1560px)" }}
          />
          <div
            className="hero-blob hero-blob-h absolute right-[-5%] bottom-[-20%]"
            style={{ background: "#D592F3", height: "clamp(220px, 25vw, 1500px)", width: "clamp(220px, 25vw, 1500px)" }}
          />
          <div
            className="hero-blob hero-blob-i absolute left-[15%] top-[-10%]"
            style={{ background: "#3773D7", height: "clamp(200px, 23vw, 1380px)", width: "clamp(200px, 23vw, 1380px)" }}
          />
          <div
            className="hero-blob hero-blob-j absolute right-[30%] bottom-[-15%]"
            style={{ background: "#EF7200", height: "clamp(190px, 22vw, 1320px)", width: "clamp(190px, 22vw, 1320px)" }}
          />
        </div>
        <Image
          src="/images/hero-logo-glow.svg"
          alt=""
          width={2224}
          height={1923}
          unoptimized
          className="absolute left-2/5 top-1/2 w-[560px] max-w-none -translate-x-1/2 -translate-y-1/2 blur-xl lg:w-[420px] lg:blur-2xl xl:w-[800px] 2xl:w-[1200px]"
        />

        <div
          className="absolute inset-0 opacity-[0.2]"
          style={{ backgroundImage: NOISE, backgroundSize: "10%" }}
        />
      </div>

      {/* Dims the overall frame a touch without flattening the color —
          sits above the blobs/logo, below the grain. */}
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}
