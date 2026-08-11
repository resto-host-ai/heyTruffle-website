import Image from "next/image";
import { NOISE } from "@/lib/noise";

export default function HeroBackground() {
  return (
    <div
      aria-hidden
      className="hero-bg-anim pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#251F21]"
    >
      {/* Sizes use clamp(min, Nvw, max). The first clamp pass fixed the
          phone→desktop breakpoint cliff, but its "max" was tuned to plateau
          at ~1280px wide — so 1024–1440 (near that reference width) still
          hit close to max and looked oversaturated/washed, while 2560+
          (way past it) sat capped at that same absolute px size, which is
          tiny relative to a wide monitor and reads as mostly bare dark ink.
          Same bug as the breakpoint version, just moved further out. Fix:
          lower the vw% (less overlap at "normal" desktop widths) and raise
          the max ceiling well past any real screen (so it keeps scaling
          instead of plateauing) — the result is roughly the same relative
          coverage from phone to 4K instead of a size that's only right
          near 1280px. */}
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

      {/* STEP 3 — logo layer, sitting on top of the blobs. Kept at its full
          size across breakpoints per feedback — don't shrink it to fix
          contrast, fix contrast elsewhere (scrim removed, grain lowered
          below). */}
      <Image
        src="/images/hero-logo-glow.svg"
        alt=""
        width={2224}
        height={1923}
        unoptimized
        className="absolute left-2/5 top-1/2 w-[460px] max-w-none -translate-x-1/2 -translate-y-1/2 blur-xl sm:w-[500px] md:w-[560px] lg:w-[420px] lg:blur-2xl xl:w-[800px] 2xl:w-[1200px]"
      />

      {/* STEP 4 — "GRADIENT HERO" grain layer, on top of everything else
          (blobs + logo). Plain opacity (no mix-blend) keeps it cheap on
          mobile compositors — kept low so the grain reads without
          flattening the blob colors underneath into gray. */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: NOISE, backgroundSize: "10%" }}
      />
    </div>
  );
}
