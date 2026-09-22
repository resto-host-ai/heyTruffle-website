import type { Metadata } from "next";
import Link from "next/link";

const DESCRIPTION =
  "heytruffle partners with the platforms and associations restaurant groups already trust: Push Operations for workforce management, and the Michigan Restaurant & Lodging Association.";

export const metadata: Metadata = {
  title: "Partners & Associations — heytruffle",
  description: DESCRIPTION,
  alternates: { canonical: "/partners/" },
  openGraph: {
    title: "Partners & Associations — heytruffle",
    description: DESCRIPTION,
    url: "https://heytruffle.ai/partners/",
  },
};

const ENTRIES = [
  {
    tag: "Channel partner",
    name: "Push Operations",
    desc: "Workforce management platform for multi-location restaurant groups: hiring, scheduling, payroll and labor reporting. Push handles your team, heytruffle handles your phones.",
    href: "/partners/push-operations/",
    cta: "See the partnership",
  },
  {
    // Same wording rule as MRLA below: these associations reserve "partner"
    // for their own endorsed partners, so "Industry association" / "Learn
    // more" everywhere here instead of "partnership".
    tag: "Industry association",
    name: "MRLA",
    desc: "Michigan Restaurant & Lodging Association — the industry body representing restaurant and lodging operators across Michigan.",
    href: "/mrla/",
    cta: "Learn more",
  },
  {
    tag: "Industry association",
    name: "IRA",
    desc: "Illinois Restaurant Association — the industry body representing restaurant operators across Illinois.",
    href: "/ira/",
    cta: "Learn more",
  },
  {
    tag: "Industry association",
    name: "FRLA",
    desc: "Florida Restaurant & Lodging Association — the industry body representing restaurant and lodging operators across Florida.",
    href: "/frla/",
    cta: "Learn more",
  },
];

export default function PartnersPage() {
  return (
    <main className="flex-1">
      {/* ---- Hero ----
          Pure CSS, no background image: a near-black base with a subtle
          blue glow top-right (base layer) and an orange glow rising from
          the bottom, strongest at center (overlay layer, kept separate so
          its opacity/position can be tuned without touching the base). */}
      <section
        className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40"
        style={{
          background:
            "radial-gradient(ellipse at 78% 0%, rgba(38,52,83,0.75), transparent 55%), #1a1315",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 120%, rgba(175,78,0,0.75) 0%, rgba(102,48,10,0.5) 28%, transparent 65%)",
          }}
        />

        <div className="relative mx-auto max-w-[820px] px-6 text-center md:px-10">
          <p className="text-xs uppercase tracking-[0.2em] text-cream/70">
            Partners &amp; Associations
          </p>
          <h1 className="mt-6 font-serif text-4xl font-extralight! text-cream md:text-6xl">
            Who we work alongside.
          </h1>
          <p className="mx-auto mt-6 max-w-[560px] text-base leading-relaxed text-cream/70 md:text-lg">
            heytruffle partners with the platforms and associations
            restaurant groups already trust.
          </p>
        </div>
      </section>

      {/* ---- Cards ---- */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-[960px] px-6 md:px-10">
          <div className="grid gap-5 md:grid-cols-2">
            {ENTRIES.map((entry) => (
              <Link
                key={entry.name}
                href={entry.href}
                className="group flex flex-col rounded-[26px] bg-white p-9 shadow-[0_2px_10px_rgba(37,31,33,0.08)] transition-shadow hover:shadow-[0_4px_18px_rgba(37,31,33,0.12)]"
              >
                <span className="w-fit rounded-full bg-brand-orange/10 px-3 py-1.5 font-body text-[11px] font-bold uppercase tracking-[0.1em] text-brand-orange">
                  {entry.tag}
                </span>
                <h2 className="mt-5 font-serif font-light! text-3xl text-[#251f21]">
                  {entry.name}
                </h2>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#251f21]/60">
                  {entry.desc}
                </p>
                <span className="mt-6 font-body text-sm font-bold text-brand-orange">
                  {entry.cta} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
