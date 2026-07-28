import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookDemoButton } from "@/components/ui/BookDemoButton";
import { NOISE } from "@/lib/noise";
import HearItLive from "@/components/demo/HearItLive";
import CaseStudies from "@/components/case-study/CaseStudies";
import DemoSearchBar from "@/components/demo/DemoSearchBar";
import SuccessStats from "@/components/case-study/SuccessStats";
import { formatValue } from "@/lib/format";
import type { CaseStudy } from "@/content/case-studies/types";

function ChevronLeft() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

/** Splits on "\n" and inserts a real <br/> between parts (used for the rare
 *  multi-line paragraph, e.g. KYU's feature-story intro). */
function withLineBreaks(text: string) {
  const parts = text.split("\n");
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {part}
    </Fragment>
  ));
}

export default function CaseStudyPage({ cs }: { cs: CaseStudy }) {
  return (
    <main className="bg-cream">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#251f21] pb-16 pt-28 text-cream md:pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image
            src="/images/fondo_casestudy.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#251f21]/78" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 85% at 100% 45%, rgba(239,114,0,0.55) 0%, rgba(239,114,0,0.12) 34%, transparent 62%)",
            }}
          />
        </div>

        <div className="relative mx-auto flex w-full w-full flex-1 flex-col px-6 lg:px-[73px]">
          <Link
            href="/case-study"
            className="inline-flex items-center gap-2 font-body text-[15px] font-normal leading-[110%] md:text-[16px] text-cream/90 transition-opacity hover:opacity-70"
          >
            <ChevronLeft />
            Case studies <span className="text-cream/50">/</span>
            {cs.breadcrumbNoLeadingSpace ? cs.name : ` ${cs.name}`}
          </Link>

          <div className="flex flex-1 flex-col items-center justify-center py-12">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {cs.heroTags.map((tag, i) => (
                <span
                  key={tag}
                  className="flex items-center gap-6 font-body text-[15px] font-normal leading-[110%] md:text-[16px] text-cream"
                >
                  {tag}
                  {i < cs.heroTags.length - 1 && (
                    <span className="h-1.5 w-1.5 rounded-full bg-cream/60" />
                  )}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center">
              <Image
                src={cs.logo.src}
                alt={cs.logo.alt}
                width={237}
                height={236}
                className="h-[150px] w-auto md:h-[200px]"
              />
            </div>

            <h1
              className={`mx-auto mt-10 ${
                cs.heroWidth === "wide" ? "max-w-[860px]" : "max-w-[760px]"
              } text-center font-body text-[32px] font-normal! leading-[120%] md:text-[40px]`}
            >
              {cs.headline.lead}
              {cs.headline.accent && (
                <span className="text-brand-orange">{cs.headline.accent}</span>
              )}
              {cs.headline.trailing}
            </h1>

            <p className="mx-auto mt-6 max-w-[826px] text-center font-body text-[16px] font-normal leading-[145%] text-cream md:text-[18px]">
              {cs.paragraphs[0]}
            </p>
            <p className="mx-auto mt-6 max-w-[826px] text-center font-body text-[16px] font-normal leading-[145%] text-cream md:text-[18px]">
              {cs.paragraphs[1]}
            </p>
          </div>

          {cs.heroStats && (
            <div className="mx-auto grid w-full max-w-[900px] grid-cols-3 divide-x divide-cream/25">
              {cs.heroStats.map((s) => (
                <div key={s.label} className="flex flex-col items-center px-4">
                  <p className="font-body text-[44px] font-normal leading-[110%] md:text-[64px]">
                    {formatValue(s.value)}
                  </p>
                  <p className="mt-1 text-center font-body text-[15px] font-normal leading-[130%] text-cream/90 md:text-[16px]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Feature story ─────────────────────────────────── */}
      {cs.featureStory?.variant === "highlights" && (
        <section className="relative bg-cream pb-24 pt-24 md:pb-32 md:pt-32">
          <div className="mx-auto w-full px-6 lg:px-[73px]">
            <div
              className="relative overflow-hidden rounded-[36px] px-8 py-12 md:rounded-[48px] md:px-16 md:py-16"
              style={{
                background: [
                  "radial-gradient(75% 130% at 100% 50%, rgba(239,114,0,0.55) 0%, rgba(239,114,0,0.14) 34%, transparent 66%)",
                  "linear-gradient(180deg, #221c1e 0%, #1a1517 100%)",
                ].join(", "),
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                style={{ backgroundImage: NOISE }}
              />

              <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
                <div>
                  <p className="font-body text-[14px] font-normal uppercase tracking-[0.14em] leading-[140%] text-[#D592F3] md:text-[15px]">
                    {cs.featureStory.eyebrow}
                  </p>
                  <h2 className="mt-4 font-serif text-[34px] font-bold! leading-[110%] text-[#F9FAFB] md:text-[44px] lg:text-[52px]">
                    {cs.featureStory.title}
                  </h2>
                  <p className="mt-5 max-w-[560px] font-body text-[16px] font-normal leading-[145%] text-[#F9FAFB] md:text-[18px]">
                    {withLineBreaks(cs.featureStory.intro)}
                  </p>

                  <ol className="mt-10 flex flex-col gap-6">
                    {cs.featureStory.points.map((point, i) => (
                      <li key={point} className="flex items-start gap-4">
                        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-orange/50 bg-brand-orange/10 font-body text-[18px] font-normal leading-none text-brand-orange">
                          {i + 1}
                        </span>
                        <p className="font-body text-[16px] font-normal leading-[145%] text-[#F9FAFB] md:text-[18px]">
                          {point}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>

                {cs.featureStory.highlights.length === 1 ? (
                  <div
                    className="relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-[32px] border border-white/15 bg-white/[0.05] px-8 py-16 text-center backdrop-blur-xl md:py-24"
                    style={{
                      boxShadow:
                        "inset 0 1px 1px rgba(255,255,255,0.18), 0 24px 60px rgba(0,0,0,0.35)",
                    }}
                  >
                    <p
                      className="font-body text-[120px] font-normal leading-[110%] md:text-[200px]"
                      style={{
                        backgroundImage:
                          "linear-gradient(180deg, #D592F3 0%, #EF7200 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {cs.featureStory.highlights[0].value}
                    </p>
                    <p className="font-body text-[16px] font-normal leading-[145%] text-[#F6F3EC] md:text-[18px]">
                      {cs.featureStory.highlights[0].label}
                    </p>
                  </div>
                ) : (
                  <div
                    className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-[32px] border border-white/15 bg-white/[0.05] px-8 py-14 text-center backdrop-blur-xl md:py-16"
                    style={{
                      boxShadow:
                        "inset 0 1px 1px rgba(255,255,255,0.18), 0 24px 60px rgba(0,0,0,0.35)",
                    }}
                  >
                    {cs.featureStory.highlights.map((h, i) => (
                      <div key={h.label}>
                        <p
                          className={
                            i === 0
                              ? "font-body text-[120px] font-normal leading-[110%] md:text-[200px]"
                              : "font-body text-[64px] font-normal leading-[110%] text-[#F6F3EC] md:text-[100px]"
                          }
                          style={
                            i === 0
                              ? {
                                  backgroundImage:
                                    "linear-gradient(180deg, #D592F3 0%, #EF7200 100%)",
                                  WebkitBackgroundClip: "text",
                                  backgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                }
                              : undefined
                          }
                        >
                          {h.value}
                        </p>
                        <p className="font-body text-[16px] font-normal leading-[145%] text-[#F6F3EC] md:text-[18px]">
                          {h.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {cs.featureStory?.variant === "math" && (
        <section className="relative bg-cream pb-24 pt-24 md:pb-32 md:pt-32">
          <div className="mx-auto w-full px-6 lg:px-[73px]">
            <div
              className="relative overflow-hidden rounded-[36px] px-8 py-12 md:rounded-[48px] md:px-16 md:py-16"
              style={{
                background: [
                  "radial-gradient(75% 130% at 100% 40%, rgba(239,114,0,0.55) 0%, rgba(239,114,0,0.14) 34%, transparent 66%)",
                  "linear-gradient(180deg, #221c1e 0%, #1a1517 100%)",
                ].join(", "),
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                style={{ backgroundImage: NOISE }}
              />

              <div className="relative grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
                <div>
                  <p className="font-body text-[14px] font-normal uppercase tracking-[0.14em] leading-[140%] text-[#D592F3] md:text-[15px]">
                    {cs.featureStory.eyebrow}
                  </p>
                  <h2 className="mt-4 font-serif text-[34px] font-bold! leading-[110%] text-[#F9FAFB] md:text-[44px] lg:text-[52px]">
                    {cs.featureStory.title}
                  </h2>
                  <p className="mt-5 max-w-[560px] font-body text-[16px] font-normal leading-[145%] text-[#F9FAFB] md:text-[18px]">
                    {cs.featureStory.intro}
                  </p>

                  <ol className="mt-10 flex flex-col gap-6">
                    {cs.featureStory.points.map((point, i) => (
                      <li key={point} className="flex items-start gap-4">
                        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-orange/50 bg-brand-orange/10 font-body text-[18px] font-normal leading-none text-brand-orange">
                          {i + 1}
                        </span>
                        <p className="max-w-[560px] font-body text-[16px] font-normal leading-[145%] text-[#F9FAFB] md:text-[18px]">
                          {point}
                        </p>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-12 grid grid-cols-2 gap-6 sm:gap-8">
                    {cs.featureStory.supportingStats.map((s) => (
                      <div key={s.value}>
                        <p
                          className="font-body text-[56px] font-normal leading-[110%] md:text-[72px]"
                          style={{
                            backgroundImage:
                              "linear-gradient(180deg, #D592F3 0%, #EF7200 100%)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {s.value}
                        </p>
                        <p className="mt-2 max-w-[240px] font-body text-[18px] font-normal leading-[140%] text-[#F9FAFB]/90 md:text-[20px]">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-8">
                  <div
                    className="relative overflow-hidden rounded-[32px] border border-white/15 bg-white/[0.05] px-8 py-12 text-center backdrop-blur-xl md:px-10 md:py-14 lg:text-left"
                    style={{
                      boxShadow:
                        "inset 0 1px 1px rgba(255,255,255,0.18), 0 24px 60px rgba(0,0,0,0.35)",
                    }}
                  >
                    {cs.featureStory.chain.map((m) => (
                      <div key={m.label}>
                        <p className="font-body text-[52px] font-normal leading-[110%] text-[#F6F3EC] md:text-[64px]">
                          {m.value}
                        </p>
                        <p className="font-body text-[18px] font-normal leading-[140%] text-[#F6F3EC]/90 md:text-[20px]">
                          {m.label}
                        </p>
                        <p className="my-3 font-body text-[22px] font-normal leading-none text-[#F6F3EC]/70 md:text-[28px]">
                          {m.op}
                        </p>
                      </div>
                    ))}

                    <p
                      className="font-body text-[52px] font-normal leading-[110%] md:text-[64px]"
                      style={{
                        backgroundImage:
                          "linear-gradient(85deg, #3773D7 1.02%, #EF7200 38.22%, #D592F3 98.98%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {cs.featureStory.total.value}
                    </p>
                    <p className="mx-auto mt-1 max-w-[280px] font-body text-[18px] font-normal leading-[140%] text-[#F6F3EC]/90 md:text-[20px] lg:mx-0">
                      {cs.featureStory.total.label}
                    </p>
                  </div>

                  {cs.featureStory.audio && (
                    <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:flex-wrap lg:justify-end lg:text-left">
                      <HearItLive src={cs.featureStory.audio.src} />
                      <p className="max-w-[220px] font-body text-[16px] font-normal leading-[130%] text-[#F9FAFB]/70 lg:max-w-[160px]">
                        {cs.featureStory.audio.caption}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Success you can measure (la-canita only) ──────── */}
      {cs.successStats && (
        <SuccessStats
          results={cs.successStats.items}
          intro={cs.successStats.intro}
        />
      )}

      {/* ── Capabilities grid (la-canita only) ────────────── */}
      {cs.capabilities && (
        <section className="relative bg-cream pb-24 pt-24 text-[#251f21] md:pb-32 md:pt-32">
          <div className="mx-auto w-full px-6 lg:px-[73px]">
            <h2 className="mx-auto max-w-[720px] text-center font-serif text-[30px] font-bold! leading-[110%] md:text-[38px] lg:text-[44px]">
              {cs.capabilities.heading}
            </h2>

            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {cs.capabilities.items.map((c) => (
                <div
                  key={c.title}
                  className="group relative min-h-[240px] overflow-hidden rounded-[25px] shadow-[0_18px_44px_rgba(0,0,0,0.06)] md:h-[308.1px] md:min-h-0"
                >
                  <Image
                    src={c.img}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      backgroundImage: `linear-gradient(180deg, #f4f2ed 0%, ${c.accent} 66%)`,
                    }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.55] mix-blend-overlay"
                    style={{ backgroundImage: NOISE }}
                  />

                  <p className="relative whitespace-pre-line p-8 font-body text-[22px] font-normal leading-[130%] text-[#251f21] md:text-[28px] transition-opacity duration-300 group-hover:opacity-0 md:p-10 md:text-[58px]">
                    {c.title}
                  </p>

                  <div className="absolute inset-0 flex flex-col justify-between p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-10">
                    <p className="font-body text-[22px] font-normal leading-[130%] text-[#251f21] md:text-[28px]">
                      {c.flat}
                    </p>
                    <div>
                      <p className="font-body text-[40px] font-normal leading-[110%] text-cream md:text-[58px]">
                        {c.stat}
                      </p>
                      <p className="mt-2 font-body text-[18px] font-normal leading-[130%] text-cream/90 md:text-[20px]">
                        {c.statDesc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── No assumptions. Just the math/results. ─────────
          Top padding only applies when this section follows the hero
          directly (no featureStory in between) — the featureStory
          section above already carries its own pb-24/md:pb-32, so
          stacking this section's pt on top of that doubles the gap. */}
      <section
        className={`relative bg-cream pb-24 text-[#251f21] md:pb-32 ${
          cs.featureStory ? "" : "pt-16 md:pt-24"
        }`}
      >
        <div className="mx-auto w-full px-6 lg:px-[73px]">
          <h2 className="text-center font-serif text-[30px] font-bold! leading-[110%] md:text-[38px] lg:text-[44px]">
            {cs.measured.heading[0]}
            <br />
            {cs.measured.heading[1]}
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-[minmax(0,1.15fr)_repeat(4,minmax(0,1fr))] lg:items-center">
            <div className="col-span-2 lg:col-span-1">
              <p className="font-body text-[20px] font-normal! leading-[120%] md:text-[24px]">
                Measured results
              </p>
              <p className="mt-4 max-w-[420px] font-body text-[16px] font-normal leading-[145%] md:text-[18px]">
                {cs.measured.intro}
              </p>
            </div>
            {cs.measured.cards.map((m) => (
              <div
                key={m.label}
                className="flex h-[150px] flex-col justify-center rounded-[25px] border border-transparent [background:linear-gradient(#f6f3ec,#f6f3ec)_padding-box,linear-gradient(180deg,#ffffff_0%,rgba(37,31,33,0.06)_45%,rgba(37,31,33,0.28)_100%)_border-box] p-5 shadow-[0_14px_34px_rgba(0,0,0,0.06)] sm:h-[202px] md:p-8"
              >
                <p
                  className="font-body text-[40px] font-normal leading-[110%] sm:text-[56px] md:text-[72px]"
                  style={{ color: m.color }}
                >
                  {formatValue(m.value)}
                </p>
                <p className="mt-1 font-body text-[15px] font-normal leading-[130%] sm:mt-2 md:text-[16px]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          {cs.impact && (
            <div className="mt-16">
              <p className="font-body text-[20px] font-normal! leading-[120%] md:text-[24px]">
                Estimated business impact
              </p>
              <div className="mt-8 flex flex-col gap-6 xl:flex-row xl:items-stretch">
                <div className="flex flex-1 flex-col gap-4 rounded-[25px] border border-transparent [background:linear-gradient(#f1eee6,#f1eee6)_padding-box,linear-gradient(180deg,#ffffff_0%,rgba(37,31,33,0.06)_45%,rgba(37,31,33,0.28)_100%)_border-box] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] md:h-[202.34px] md:flex-row md:flex-nowrap md:items-center md:justify-between md:gap-4 md:p-12">
                  {cs.impact.factors.map((item, i, arr) => (
                    <Fragment key={item.label}>
                      <div className="flex items-center gap-4">
                        <p
                          className={
                            cs.impact!.valueWidth === "fixed"
                              ? "w-[104px] shrink-0 text-right font-body text-[48px] font-normal leading-[110%] text-[#251F21] md:w-auto min-[1280px]:max-[1899px]:text-[52px] min-[1900px]:text-[72px]"
                              : "shrink-0 whitespace-nowrap text-right font-body text-[48px] font-normal leading-[110%] text-[#251F21] min-[1280px]:max-[1899px]:text-[52px] min-[1900px]:text-[72px]"
                          }
                        >
                          {item.value}
                        </p>
                        <p className="max-w-[150px] font-body text-[18px] font-normal leading-[120%] md:max-w-[120px]">
                          {item.label}
                        </p>
                      </div>
                      {i < arr.length - 1 && (
                        <span className="self-center font-body text-[28px] font-normal leading-none text-[#251f21]/50 md:self-auto md:text-[36px]">
                          ×
                        </span>
                      )}
                    </Fragment>
                  ))}
                </div>

                <div className="hidden items-center justify-center xl:flex">
                  <span className="font-body text-[40px] font-normal leading-none">
                    =
                  </span>
                </div>

                <div
                  className="relative flex flex-col items-start gap-3 overflow-hidden rounded-[25px] p-7 text-cream shadow-[0_18px_44px_rgba(0,0,0,0.25)] md:h-[202.34px] md:flex-row md:items-center md:gap-5 md:p-10 min-[1280px]:max-[1899px]:w-[38%] min-[1900px]:w-[34%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, #12162c 0%, #21306a 55%, #3454b0 100%)",
                  }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                    style={{ backgroundImage: NOISE }}
                  />
                  <p className="relative font-body text-[52px] font-normal leading-[110%] min-[1280px]:max-[1899px]:text-[52px] min-[1900px]:text-[72px]">
                    {cs.impact.total}
                  </p>
                  <p className="relative font-body text-[18px] font-normal leading-[130%] text-cream/90 md:max-w-[180px]">
                    {cs.impact.caption}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Shared background across the closing sections ─── */}
      <div className="relative overflow-hidden bg-[#251f21]">
        <Image
          src="/images/fondo_seccionfinal.webp"
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className="scale-105 object-cover"
        />

        <div className="relative">
          {/* ── In their own words (rreal-tacos only) ────────── */}
          {cs.testimonial && (
            <section className="relative overflow-hidden py-24 text-cream md:py-32">
              <div className="mx-auto w-full px-6 lg:px-[73px]">
                <h2 className="text-center font-serif text-[30px] font-bold! leading-[110%] md:text-[38px] lg:text-[44px]">
                  In their own words.
                </h2>
                <p className="mx-auto mt-5 max-w-[974px] text-center font-body text-[16px] font-normal leading-[145%] text-cream md:text-[18px]">
                  The impact of heytruffle goes beyond answered calls.
                </p>

                <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
                  <div className="relative min-h-[420px] overflow-hidden rounded-[25px] md:min-h-[600px]">
                    <Image
                      src={cs.testimonial.photo}
                      alt={cs.testimonial.person}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(246,243,236,0) 45%, rgba(246,243,236,0.85) 78%, #f6f3ec 100%)",
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                      <p className="font-body text-[20px] font-bold leading-[125%] text-[#251f21] md:text-[24px]">
                        {cs.testimonial.person}
                      </p>
                      <p className="mt-1 font-body text-[16px] font-normal leading-[145%] text-[#251f21] md:text-[18px]">
                        {cs.testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="font-serif text-[30px] font-bold! leading-[110%] md:text-[38px] lg:text-[44px]">
                      &ldquo;{cs.testimonial.quoteLead}
                      <span className="text-[#d592f3]">
                        {cs.testimonial.accentWord}
                      </span>
                      {cs.testimonial.quoteTrailing}
                    </p>
                    <p className="mt-6 font-body text-[16px] font-normal italic leading-[145%] text-cream md:text-[18px]">
                      {cs.testimonial.body}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── Related case studies (home carousel style) ───── */}
          <CaseStudies
            heading="Related case studies"
            subtitle={null}
            showCta={false}
            cases={cs.related}
            transparent
          />

          {/* ── Final CTA ────────────────────────────────────── */}
          <section className="relative pb-28 text-cream">
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
                  <h2 className="mx-auto max-w-[972px] font-serif text-[30px] font-bold! leading-[110%] md:text-[38px] lg:text-[44px]">
                    Hear what heytruffle would capture for your restaurant.
                  </h2>

                  <div className="mt-10 flex w-full justify-center">
                    <DemoSearchBar />
                  </div>

                  <BookDemoButton
                    className="mt-10 inline-flex items-center justify-center rounded-full bg-cream px-9 py-5 font-body text-[20px] font-bold leading-[110%] text-[#251f21] transition-all duration-300 btn-grad btn-grad-blue hover:text-cream hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(79,84,144,0.55)]"
                  >
                    Talk to our team
                  </BookDemoButton>
                  <p className="mt-6 font-body text-[15px] font-normal leading-[110%] md:text-[16px] text-cream/80">
                    Backed by real people.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
