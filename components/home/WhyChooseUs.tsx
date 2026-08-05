import type { ReactNode } from "react";

type Feature = {
  title: string;
  description: string;
  icon: () => ReactNode;
  iconBg: string;
};

const FEATURES: readonly Feature[] = [
  {
    title: "Trained for your brand",
    description: "A custom AI Concierge for each restaurant.",
    icon: GearIcon,
    iconBg: "linear-gradient(180deg, #f0a35c 0%, #ef7200 100%)",
  },
  {
    title: "Monitored by our team",
    description: "Real people listen to real calls refining every week.",
    icon: RadioIcon,
    iconBg: "linear-gradient(180deg, #6f8fe0 0%, #3773d7 100%)",
  },
  {
    title: "Free your staff",
    description: "So your team stays on the floor.",
    icon: InfoIcon,
    iconBg: "linear-gradient(180deg, #b53fc4 0%, #7c3f9c 100%)",
  },
  {
    title: "Built by and for operators",
    description: "Designed around how a restaurant actually runs.",
    icon: ToolsIcon,
    iconBg: "linear-gradient(180deg, #f0a35c 0%, #ef7200 100%)",
  },
] as const;

export default function WhyChooseUs() {
  return (
    <section className="relative bg-[#251f21] py-20 md:py-28">
      <div className="mx-auto w-full px-6 lg:px-[73px]">
        <p className="text-center font-body text-[13px] font-bold uppercase tracking-[0.2em] text-cream/50">
          Why choose us?
        </p>
        <h2 className="mt-4 text-center font-serif text-[34px] font-bold! leading-[110%] text-cream md:text-[44px]">
          A service that takes care of you.
        </h2>
        <p className="mx-auto mt-4 max-w-[640px] text-center font-body text-[16px] leading-[145%] text-cream/70 md:text-[18px]">
          Most voice AI hands you software to configure and maintain.
          heytruffle is the opposite. We run your phones as a fully managed
          service.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, iconBg, title, description }: Feature) {
  return (
    <div className="rounded-[25px] border border-white/10 bg-white/[0.03] p-6 md:p-7">
      <span
        className="mb-5 grid h-11 w-11 place-items-center rounded-xl text-white"
        style={{ background: iconBg }}
      >
        <Icon />
      </span>
      <h3 className="font-body text-[19px] font-semibold leading-tight text-cream">
        {title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-cream/60">
        {description}
      </p>
    </div>
  );
}

function IconBase({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function GearIcon() {
  return (
    <IconBase>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </IconBase>
  );
}

function RadioIcon() {
  return (
    <IconBase>
      <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5 5a9 9 0 0 0 0 14M19 5a9 9 0 0 1 0 14" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

function InfoIcon() {
  return (
    <IconBase>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8v.01" />
    </IconBase>
  );
}

function ToolsIcon() {
  return (
    <IconBase>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94L6.34 20.7a2 2 0 0 1-2.83-2.83L10.7 10.7a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </IconBase>
  );
}
