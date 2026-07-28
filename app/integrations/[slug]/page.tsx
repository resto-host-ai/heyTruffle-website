import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { NOISE } from "@/lib/noise";
import { BookDemoButton } from "@/components/ui/BookDemoButton";
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
      <span style={{ color: accent, textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}>
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
    <main className="bg-cream">
      {/* ---- Hero — warm dark field matching the case-study heroes ---- */}
      <section className="relative overflow-hidden bg-[#251f21] pb-20 pt-32 text-cream md:pb-28 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image
            src="/images/fondo_casestudy.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#251f21]/80" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 12%, rgba(239,114,0,0.45) 0%, rgba(239,114,0,0.12) 36%, transparent 66%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
            style={{ backgroundImage: NOISE }}
          />
        </div>

        <div className="relative mx-auto max-w-[820px] px-6 text-center md:px-10">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="font-body text-[20px] font-normal leading-[110%] text-cream">
              Integration
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-cream/60" />
            <span className="font-body text-[20px] font-normal leading-[110%] text-cream">
              {category}
            </span>
          </div>

          <h1 className="mx-auto mt-8 max-w-[760px] font-serif text-[40px] font-bold! leading-[115%] text-cream md:text-[56px] lg:text-[64px]">
            {renderH1(h1, brand, accent)}
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] font-body text-[20px] font-normal leading-[140%] text-cream md:text-[26px]">
            {hook}
          </p>

          {/* Brand lockup */}
          <div className="mx-auto mt-14 flex max-w-[520px] flex-col items-center gap-4">
            <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-6 rounded-[25px] border border-cream/15 bg-cream/[0.06] px-8 py-7 backdrop-blur-sm md:gap-10">
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
            <p className="font-body text-[15px] font-normal leading-[110%] text-cream/60">
              heytruffle · plugs into {brand}
            </p>
          </div>
        </div>
      </section>

      {/* ---- Value prop ---- */}
      <section className="relative bg-cream pb-24 pt-24 text-[#251f21] md:pb-32 md:pt-28">
        <div className="mx-auto w-full px-6 lg:px-[73px]">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1.35fr_1fr]">
            <div>
              <p className="font-body text-[15px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
                What it does
              </p>
              <h2 className="mt-5 font-serif text-[32px] font-bold! leading-[115%] text-[#251f21] md:text-[44px] lg:text-[52px]">
                The phone line, finally in sync with{" "}
                <span style={{ color: accent }}>{brand}</span>.
              </h2>
              <p className="mt-6 font-body text-[20px] font-normal leading-[140%] text-[#251f21]/80 md:text-[24px]">
                {valueProp}
              </p>
            </div>

            {/* Sync surface card */}
            <aside className="rounded-[25px] border border-transparent [background:linear-gradient(#f6f3ec,#f6f3ec)_padding-box,linear-gradient(180deg,#ffffff_0%,rgba(37,31,33,0.06)_45%,rgba(37,31,33,0.28)_100%)_border-box] p-7 shadow-[0_14px_34px_rgba(0,0,0,0.06)] md:p-8">
              <p className="border-b border-[#251f21]/10 pb-3.5 font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-[#251f21]/50">
                Sync surface · {brand}
              </p>
              <ul className="flex flex-col">
                {syncSurface.map((item, i) => (
                  <li
                    key={item}
                    className={`flex items-center gap-3.5 py-3.5 font-body text-[17px] font-normal leading-[130%] text-[#251f21]/85 ${
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
                className="flex flex-col rounded-[25px] border border-transparent [background:linear-gradient(#f6f3ec,#f6f3ec)_padding-box,linear-gradient(180deg,#ffffff_0%,rgba(37,31,33,0.06)_45%,rgba(37,31,33,0.28)_100%)_border-box] p-7 shadow-[0_14px_34px_rgba(0,0,0,0.06)] md:p-8"
              >
                <span className="font-mono text-[13px] font-medium tracking-[0.14em] text-brand-purple">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-body text-[24px] font-normal! leading-[120%] text-[#251f21] md:text-[28px]">
                  {c.title}
                </h3>
                <p className="mt-3 font-body text-[17px] font-normal leading-[140%] text-[#251f21]/70">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Final CTA — mirrors the case-study closing card ---- */}
      <section className="relative overflow-hidden bg-cream pb-28 text-cream">
        <div className="mx-auto w-full px-6 lg:px-[73px]">
          <div
            className="relative flex w-full flex-col items-center overflow-hidden rounded-[40px] px-6 py-20 text-center md:rounded-[67px] md:px-10 md:py-28"
            style={{
              background: [
                "radial-gradient(75% 95% at -8% 82%, rgba(239,114,0,0.5) 0%, rgba(239,114,0,0.12) 42%, transparent 68%)",
                "linear-gradient(180deg, #1a1620 0%, #201a1e 100%)",
              ].join(", "),
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
              style={{ backgroundImage: NOISE }}
            />
            <div className="relative flex w-full flex-col items-center">
              <h2 className="mx-auto max-w-[972px] font-serif text-[36px] font-bold! leading-[110%] md:text-[52px] lg:text-[60px]">
                Put heytruffle on every{" "}
                <span style={{ color: accent }}>{brand}</span> call.
              </h2>
              <p className="mx-auto mt-5 max-w-[560px] font-body text-[20px] font-normal leading-[140%] text-cream/80 md:text-[24px]">
                {hook}
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <BookDemoButton className="inline-flex items-center justify-center rounded-full bg-cream px-9 py-5 font-body text-[20px] font-bold leading-[110%] text-[#251f21] transition-all duration-300 btn-grad btn-grad-blue hover:text-cream hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(79,84,144,0.55)]">
                  Get a Free Demo
                </BookDemoButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
