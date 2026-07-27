import Image from "next/image";
import HeroBackground from "@/components/HeroBackground";

export default function MaintenancePage() {
  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-6 py-28">
      {/* Same animated living-gradient background as the home hero */}
      <HeroBackground />

      {/* Bottom fade into the #251F21 base */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-48 bg-gradient-to-b from-transparent to-[#251f21]"
      />

      <div className="flex flex-col items-center gap-8 text-center text-cream">
        <Image
          src="/images/icono.svg"
          alt="heytruffle"
          width={105}
          height={96}
          priority
          unoptimized
          className="h-16 w-auto sm:h-[72px]"
        />

        <h1 className="font-serif text-[52px] font-bold! leading-[110%] tracking-tight text-cream sm:text-[72px] lg:text-[92px]">
          Coming soon.
        </h1>

        <p className="font-body max-w-[720px] text-xl font-normal leading-[140%] text-cream/85 sm:text-[26px]">
          heytruffle is getting things ready. For anything urgent, reach us at{" "}
          <a
            href="mailto:info@heytruffle.ai"
            className="font-semibold underline decoration-cream/40 underline-offset-4 transition-colors hover:text-cream"
          >
            info@heytruffle.ai
          </a>
          .
        </p>

        <a
          href="mailto:info@heytruffle.ai"
          className="mt-2 flex h-[64px] items-center justify-center rounded-full bg-[#1c1917]/85 px-9 font-body text-[20px] font-semibold text-cream shadow-lg backdrop-blur-md transition-colors hover:bg-[#1c1917]"
        >
          Talk to our team
        </a>
      </div>
    </section>
  );
}
