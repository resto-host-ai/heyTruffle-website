import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — heytruffle",
  description: "The page you're looking for isn't here.",
};

export default function NotFound() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#251f21] px-6 py-32 text-center">
      {/* Same warm gradient backdrop as the home hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-gradiants2.webp"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#251f21]" />
      </div>

      <div className="relative flex flex-col items-center text-cream">
        <Image
          src="/images/icono.svg"
          alt="heytruffle"
          width={105}
          height={96}
          priority
          unoptimized
          className="h-14 w-auto sm:h-16"
        />

        <p className="mt-10 text-xs uppercase tracking-[0.3em] text-cream/70">
          Error 404
        </p>
        <h1 className="mt-5 font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          This call didn&rsquo;t connect.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
          The page you&rsquo;re looking for went to voicemail. But every real
          call to your restaurant? We answer that one.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b53fc4] to-[#ef7200] px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Back to home
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
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
          >
            Read the blog
          </Link>
        </div>
      </div>
    </main>
  );
}
