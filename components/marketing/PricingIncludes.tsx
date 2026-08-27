type Item = { title: string; desc: string; icon: React.ReactNode };

function TargetIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.2" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20c0-3.6 2.5-6 5.5-6s5.5 2.4 5.5 6" />
      <circle cx="17.5" cy="9.5" r="2.2" />
      <path d="M15.2 13.3c2.3.2 4.3 2.2 4.3 5.4" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 4.6L3.5 16.7a1.8 1.8 0 0 0 2.5 2.5l5.8-5.8a4 4 0 0 0 4.6-5.4l-2.6 2.6-2-2 2.6-2.6z" />
    </svg>
  );
}

const ITEMS: readonly Item[] = [
  {
    title: "Trained for your brand",
    desc: "Every AI Concierge is built for one restaurant: your menu, your tone, your policies, in English and Spanish.",
    icon: <TargetIcon />,
  },
  {
    title: "Monitored by humans",
    desc: "Our team reviews real calls, catches edge cases, and makes sure the right calls reach your staff.",
    icon: <PeopleIcon />,
  },
  {
    title: "Tuned every week",
    desc: "Your AI Concierge improves week after week. That is the difference between software you maintain and a service that takes care of the result.",
    icon: <WrenchIcon />,
  },
];

export default function PricingIncludes() {
  return (
    <section className="pt-16">
      <div className="mx-auto max-w-[1180px] px-6 lg:px-[73px]">
        <div className="mx-auto max-w-[600px] text-center">
          <p className="font-body text-[12px] font-semibold uppercase tracking-[0.12em] text-[#251f21]/50">
            What every plan includes
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#251f21] md:text-4xl">
            Not a tool<span className="text-brand-orange">.</span>
            <br />
            A team<span className="text-brand-orange">.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="rounded-[24px] bg-white p-7 shadow-[0_2px_10px_rgba(37,31,33,0.08)]"
            >
              <span className="flex h-10 w-10 items-center justify-center text-brand-orange">
                {item.icon}
              </span>
              <h3 className="mt-4 font-body text-[19px] font-semibold text-[#251f21]">
                {item.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#251f21]/65">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
