import type { ComponentType, ReactNode } from "react";

type Feature = {
  title: string;
  description: string;
  icon: ComponentType;
  iconBg: string;
};

const FEATURES: readonly Feature[] = [
  {
    title: "Trained for your brand voice",
    description:
      "A dedicated AI Concierge tailored to your restaurant.",
    icon: GearIcon,
    iconBg: "linear-gradient(180deg, #f0a35c 0%, #ef7200 100%)",
  },
  {
    title: "Monitored and refined weekly",
    description:
      "Real people review calls and improve performance every week.",
    icon: RadioIcon,
    iconBg: "linear-gradient(180deg, #6f8fe0 0%, #3773d7 100%)",
  },
  {
    title: "Designed to free your staff",
    description:
      "Handles calls so your team can stay focused on guests.",
    icon: InfoIcon,
    iconBg: "linear-gradient(180deg, #b53fc4 0%, #7c3f9c 100%)",
  },
  {
    title: "Built by and for operators",
    description:
      "Designed around the way restaurants actually operate.",
    icon: ToolsIcon,
    iconBg: "linear-gradient(180deg, #f0a35c 0%, #ef7200 100%)",
  },
] as const;

export default function WhyChooseUs() {
  return (
    <section className="relative isolate py-20 md:py-28">
      {/* Luces CSS sin imágenes y sin cortes entre secciones */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-48 -bottom-48 z-0"
        style={{
          background: `
            radial-gradient(
              48% 62% at 7% 49%,
              rgba(224, 103, 25, 0.40) 0%,
              rgba(181, 72, 24, 0.17) 45%,
              transparent 76%
            ),
            radial-gradient(
              46% 62% at 94% 47%,
              rgba(224, 91, 12, 0.42) 0%,
              rgba(168, 58, 34, 0.17) 46%,
              transparent 76%
            ),
            radial-gradient(
              40% 55% at 77% 25%,
              rgba(135, 47, 103, 0.28) 0%,
              rgba(103, 42, 82, 0.10) 50%,
              transparent 75%
            ),
            radial-gradient(
              48% 58% at 18% 77%,
              rgba(79, 65, 102, 0.25) 0%,
              transparent 74%
            )
          `,
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 lg:px-[73px]">
        <p className="text-center font-body text-[16px] font-medium text-cream/70">
          Why choose us?
        </p>

        <h2 className="mx-auto mt-4 max-w-[900px] text-balance text-center font-serif text-[34px] font-bold leading-[1.1] text-cream md:text-[44px]">
          A service that takes care of you.
        </h2>

        <p className="mx-auto mt-4 max-w-[680px] text-balance text-center font-body text-[16px] leading-[1.45] text-cream/70 md:text-[18px]">
          Other solutions are difficult to configure and maintain. Heytruffle
          is the opposite. We run your phones as a fully managed service.
        </p>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  iconBg,
  title,
  description,
}: Feature) {
  return (
    <article
      className="
        flex h-full min-w-0 flex-col
        rounded-[25px]
        border border-white/[0.16]
        bg-[linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.035))]
        p-6
        shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_18px_45px_rgba(0,0,0,0.22)]
        backdrop-blur-[18px]
        md:p-7
      "
    >
      <span
        className="
          mb-5 grid h-11 w-11 shrink-0
          place-items-center rounded-xl text-white
          shadow-[0_8px_24px_rgba(0,0,0,0.22)]
        "
        style={{ background: iconBg }}
      >
        <Icon />
      </span>

      <h3
        className="
          line-clamp-2 min-h-[2.5em]
          break-words text-balance
          font-body text-[19px] font-semibold
          leading-[1.25] text-cream
        "
      >
        {title}
      </h3>

      <p className="mt-2 flex-1 font-body text-[14px] leading-[1.6] text-cream/70">
        {description}
      </p>
    </article>
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
      aria-hidden="true"
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

      <circle
        cx="12"
        cy="12"
        r="1.5"
        fill="currentColor"
        stroke="none"
      />
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
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94L6.34 20.7a2 2 0 0 1-2.83-2.83L10.7 10.7a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
    </IconBase>
  );
}