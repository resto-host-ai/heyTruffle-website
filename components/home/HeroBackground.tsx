import Image from "next/image";
import { NOISE } from "@/lib/noise";
import HeroBlobs from "@/components/home/HeroBlobs";

export default function HeroBackground() {
  return (
    /* Stops a few px short of the hero's bottom edge. The drifting layer is
       scaled past its box, and clipped right at that edge — which often lands
       on a fractional device pixel — it bled a bright 1px seam under the host
       player. Ending inside the fade-to-ink leaves only ink at the edge. */
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 bottom-2 -z-10 overflow-hidden"
    >
    <div className="hero-bg-anim absolute inset-0 overflow-hidden bg-[#0c0b0c] [container-type:size]">

      <HeroBlobs /> 
      <Image
        src="/images/hero-logo-glow.svg"
        alt=""
        width={2224}
        height={1923}
        unoptimized
        className="absolute left-[38%] top-[68%] md:top-[58%] w-[max(75cqw,80cqh)] md:w-[max(90cqw,160cqh)] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-50 blur-xl"
      />
      <Image
        src="/images/GRADIENT%20HERO.svg"
        alt=""
        fill
        unoptimized
        className="object-cover opacity-20"
      />


      

{/*       

      <div className="hidden md:block">
        <div className="absolute inset-0">
          
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

      <div className="absolute inset-0 bg-black/25" /> */}
    </div>
    </div>
  );
}
