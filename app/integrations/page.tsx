import type { Metadata } from "next";
import Link from "next/link";
import { INTEGRATIONS } from "@/lib/integrations";

export const metadata: Metadata = {
  title: "Integrations — heytruffle",
  description:
    "heytruffle plugs into the POS, reservation and ordering tools restaurants already run. Browse every integration and see how each one works.",
  alternates: { canonical: "/integrations/" },
};

const CATEGORY_ORDER = ["POS", "Reservations", "Delivery", "Direct Ordering"];

export default function IntegrationsPage() {
  const byCategory = CATEGORY_ORDER.map((category) => ({
    category,
    items: INTEGRATIONS.filter((i) => i.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <main className="bg-cream">
      <section className="relative bg-[#251f21] pb-20 pt-32 text-cream md:pb-24 md:pt-40">
        <div className="mx-auto max-w-[820px] px-6 text-center md:px-10">
          <p className="font-body text-[20px] font-normal leading-[110%] text-cream/80">
            Integrations
          </p>
          <h1 className="mx-auto mt-6 max-w-[720px] font-serif text-[40px] font-bold! leading-[115%] text-cream md:text-[56px] lg:text-[64px]">
            One phone line, synced with every tool you already run.
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] font-body text-[20px] font-normal leading-[140%] text-cream/80 md:text-[24px]">
            heytruffle connects to your POS, reservation book and ordering
            channels so every call, order and booking lands where your team
            already looks.
          </p>
        </div>
      </section>

      <section className="relative bg-cream pb-28 pt-20 text-[#251f21] md:pb-32">
        <div className="mx-auto w-full px-6 lg:px-[73px]">
          {byCategory.map((group) => (
            <div key={group.category} className="mb-16 last:mb-0">
              <h2 className="font-body text-[15px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
                {group.category}
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((integration) => (
                  <Link
                    key={integration.slug}
                    href={`/integrations/${integration.slug}/`}
                    className="flex flex-col rounded-[25px] border border-transparent [background:linear-gradient(#f6f3ec,#f6f3ec)_padding-box,linear-gradient(180deg,#ffffff_0%,rgba(37,31,33,0.06)_45%,rgba(37,31,33,0.28)_100%)_border-box] p-7 shadow-[0_14px_34px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1 md:p-8"
                  >
                    <span
                      className="font-body text-[13px] font-semibold uppercase tracking-[0.14em]"
                      style={{ color: integration.accent }}
                    >
                      {integration.category}
                    </span>
                    <h3 className="mt-3 font-body text-[24px] font-normal! leading-[120%] text-[#251f21]">
                      {integration.brand}
                    </h3>
                    <p className="mt-3 font-body text-[17px] font-normal leading-[140%] text-[#251f21]/70">
                      {integration.hook}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
