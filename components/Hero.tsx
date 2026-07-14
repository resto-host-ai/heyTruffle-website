import Image from "next/image";
import { BookDemoButton } from "@/components/BookDemoButton";
import { MacbookDashboard } from "@/components/macbook-dashboard";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden py-28 sm:py-24">
      {/* Static gradient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/images/hero-gradiants2.webp"
          alt=""
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Bottom fade into the #251F21 of the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-48 bg-gradient-to-b from-transparent to-[#251f21]"
      />

      {/* Content */}
      <div className="flex w-full max-w-[1120px] flex-col items-center gap-7 px-6 text-center text-cream">
        {/* Icon */}
        <Image
          src="/images/icono.svg"
          alt="heytruffle"
          width={105}
          height={96}
          priority
          unoptimized
          className="h-16 w-auto sm:h-[72px]"
        />

        {/* Headline */}
        <h1 className="max-w-4xl font-serif text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Never miss <span className="text-[#d592f3]">a call</span> again.
        </h1>

        {/* Subhead */}
        <p className="text-2xl font-medium tracking-tight text-cream/85 sm:text-3xl">
          Your restaurant&apos;s AI host.
        </p>

        {/* Description */}
        <p className="max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">
          heytruffle is the most customizable, tailor-made voice AI solution for
          restaurant chains in the U.S. We deeply verticalize with each client,
          adapting to your brand and operations — pairing industry-leading
          personalization with hands-on delivery and exceptional support.
        </p>

        {/* CTAs */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <BookDemoButton className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b53fc4] to-[#ef7200] px-7 py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90">
            Get a Free Demo
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </BookDemoButton>
          <a
            href="#meet-the-hosts"
            className="flex items-center gap-2 rounded-full bg-[#1c1917]/85 px-7 py-3.5 text-base font-semibold text-cream shadow-lg backdrop-blur-md transition-colors hover:bg-[#1c1917]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            Listen to a host
          </a>
        </div>

        {/* Live-style analytics dashboard — a light card that reads clearly
            over the dark hero gradient */}
        <div className="mt-12 w-full">
          <MacbookDashboard />
        </div>
      </div>
    </section>
  );
}
