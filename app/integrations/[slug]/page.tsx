import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NOISE } from "@/lib/noise";
import { BookDemoButton } from "@/components/BookDemoButton";
import { INTEGRATIONS, getIntegration } from "@/lib/integrations";

export function generateStaticParams() {
  return INTEGRATIONS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const integration = getIntegration(slug);
  if (!integration) return { title: "Integration — heytruffle" };
  return {
    title: integration.meta.title,
    description: integration.meta.description,
    alternates: { canonical: `/integrations/${slug}/` },
    openGraph: {
      title: integration.meta.title,
      description: integration.meta.description,
      type: "article",
    },
  };
}

/** Split the H1 so the brand name renders in the accent colour + serif.
 *  A soft shadow lifts it off the warm hero gradient. */
function renderH1(h1: string, brand: string, accent: string) {
  const idx = h1.toLowerCase().indexOf(brand.toLowerCase());
  if (idx < 0) return h1;
  return (
    <>
      {h1.slice(0, idx)}
      <span
        className="font-serif"
        style={{ color: accent, textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
      >
        {h1.slice(idx, idx + brand.length)}
      </span>
      {h1.slice(idx + brand.length)}
    </>
  );
}

export default async function IntegrationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const integration = getIntegration(slug);
  if (!integration) notFound();

  const { brand, accent, category, h1, valueProp, hook, syncSurface, capabilities } =
    integration;

  return (
    <main className="flex-1">
      {/* ---- Hero — deliberately cool & dark so the warm brand marks pop ---- */}
      <section className="relative overflow-hidden bg-[#171316] pb-20 pt-32 md:pb-28 md:pt-40">
        {/* cool indigo→violet glow, top-centered */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(72% 78% at 50% 14%, rgba(61,74,140,0.55) 0%, rgba(120,58,150,0.30) 38%, rgba(23,19,22,0) 72%)",
          }}
        />
        {/* second, tighter cyan-blue core for depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-120px] h-[520px] w-[720px] -translate-x-1/2 rounded-full opacity-70 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(58,92,156,0.5) 0%, rgba(147,62,114,0.22) 50%, transparent 75%)",
          }}
        />
        {/* film grain, matching the home's dark sections */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
          style={{ backgroundImage: NOISE }}
        />
        {/* fade the bottom edge into the cream section below */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#171316]"
        />

        <div className="relative mx-auto max-w-[820px] px-6 text-center md:px-10">
          <p className="text-xs uppercase tracking-[0.2em] text-cream/70">
            Integration · {category}
          </p>
          <h1 className="mt-6 font-serif text-4xl leading-tight text-cream md:text-6xl">
            {renderH1(h1, brand, accent)}
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-base leading-relaxed text-cream/70 md:text-lg">
            {hook}
          </p>

          {/* Brand lockup */}
          <div className="mx-auto mt-14 flex max-w-[520px] flex-col items-center gap-4">
            <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-6 rounded-[22px] border border-cream/15 bg-cream/[0.06] px-8 py-7 backdrop-blur-sm md:gap-10">
              <div className="flex justify-end">
                <Image
                  src="/images/heytruffle-logo.svg"
                  alt="heytruffle"
                  width={150}
                  height={34}
                  unoptimized
                  className="h-7 w-auto"
                />
              </div>
              <span
                aria-hidden
                className="bg-gradient-to-r from-[#b53fc4] to-[#ef7200] bg-clip-text font-serif text-2xl font-bold leading-none text-transparent"
              >
                ×
              </span>
              <div className="flex justify-start">
                {integration.logoFile.endsWith(".svg") ? (
                  /* SVG wordmarks are monochrome — render them white to
                     match the cream heytruffle wordmark opposite. */
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`/images/integrations/${integration.logoFile}`}
                    alt={`${brand} logo`}
                    className="h-7 w-auto brightness-0 invert"
                  />
                ) : (
                  /* Full-colour raster logos sit on a white badge so their
                     native colours stay legible on the dark hero. */
                  <span className="flex items-center justify-center rounded-xl bg-white px-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/integrations/${integration.logoFile}`}
                      alt={`${brand} logo`}
                      className="h-12 w-auto"
                    />
                  </span>
                )}
              </div>
            </div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-cream/45">
              heytruffle · plugs into {brand}
            </p>
          </div>
        </div>
      </section>

      {/* ---- Value prop ---- */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1.35fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                What it does
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight text-[#251f21] md:text-4xl">
                The phone line, finally in sync with{" "}
                <span style={{ color: accent }}>{brand}</span>.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#251f21]/75 md:text-lg">
                {valueProp}
              </p>
            </div>

            {/* Sync surface card */}
            <aside className="rounded-3xl border border-[#251f21]/10 bg-white/70 p-6 md:p-7">
              <p className="border-b border-[#251f21]/10 pb-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#251f21]/50">
                Sync surface · {brand}
              </p>
              <ul className="flex flex-col">
                {syncSurface.map((item, i) => (
                  <li
                    key={item}
                    className={`flex items-center gap-3.5 py-3.5 text-[15px] text-[#251f21]/85 ${
                      i < syncSurface.length - 1
                        ? "border-b border-[#251f21]/10"
                        : ""
                    }`}
                  >
                    <span
                      aria-hidden
                      className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-[#b53fc4] to-[#ef7200]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          {/* Capability cards */}
          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
            {capabilities.map((c, i) => (
              <article
                key={c.title}
                className="flex flex-col rounded-3xl border border-[#251f21]/10 bg-white/70 p-6 md:p-7"
              >
                <span className="font-mono text-xs font-medium tracking-[0.14em] text-brand-purple">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3.5 text-lg font-medium text-[#251f21]">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-[#251f21]/70">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="relative overflow-hidden bg-[#251f21] py-24 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
          style={{ backgroundImage: NOISE }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/4 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-70 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(167,0,185,0.28) 0%, rgba(233,93,123,0.16) 35%, rgba(239,114,0,0.1) 65%, transparent 80%)",
          }}
        />

        <div className="relative mx-auto max-w-[820px] px-6 text-center md:px-10">
          <h2 className="mx-auto max-w-[640px] font-serif text-4xl leading-tight text-cream md:text-5xl">
            Put heytruffle on every{" "}
            <span style={{ color: accent }}>{brand}</span> call.
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-base leading-relaxed text-cream/70 md:text-lg">
            {hook}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <BookDemoButton className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b53fc4] to-[#ef7200] px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
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
            <Link
              href="/roi-calculator"
              className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              Calculate your ROI
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
