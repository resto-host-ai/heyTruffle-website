import Image from "next/image";
import HostsDemo from "./HostsDemo";

const STATEMENTS = [
  "Not a software.",
  "Not self-service.",
  "Not replacing your host.",
];

export default function WhatIsSection() {
  return (
    <section className="relative overflow-hidden bg-[#251f21] pb-16 pt-8 md:pb-20 md:pt-10">
      {/* background_gradient.webp, faded at the top so it blends into the
          #251F21 base instead of showing a hard cropped edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 14%, #000 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 14%, #000 80%, transparent 100%)",
        }}
      >
        <Image
          src="/images/background_gradient.webp"
          alt=""
          fill
          loading="lazy"
          quality={100}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto flex max-w-[1280px] flex-col items-center px-6 md:px-10">
        <p className="text-xs uppercase tracking-[0.2em] text-cream/70">
          What is Hey Truffle?
        </p>

        <div className="mt-10 flex w-full max-w-[620px] flex-col gap-5">
          {STATEMENTS.map((text) => (
            <div
              key={text}
              className="flex h-[76px] items-center justify-center rounded-full border border-white/40 bg-[#f6f3ec]/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-lg"
            >
              <span className="font-serif text-2xl text-cream line-through decoration-2 md:text-3xl">
                {text}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-xl text-center text-base leading-relaxed text-cream/85 md:text-lg">
          Most voice AI hands you software to set up and maintain.
          <br />
          We run it for you, so you get the result, not the homework.
        </p>

        {/* Meet the hosts — interactive voice demo card */}
        <HostsDemo />
      </div>
    </section>
  );
}
