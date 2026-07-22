import type { ReactNode } from "react";

const FEATURES = [
  {
    id: "reservation",
    title: "Reservation system compatibility",
    description:
      "Seamlessly integrates with your existing reservation system, ensuring a smooth booking process for your customers without disruptions.",
    icon: ReservationIcon,
    tint: "rgba(239,114,0,0.14)",
  },
  {
    id: "multilingual",
    title: "Multilingual support",
    description:
      "Cater to a diverse customer base with AI-powered multilingual capabilities, ensuring seamless communication in English, Spanish and more.",
    icon: GlobeIcon,
    tint: "rgba(213,146,243,0.16)",
  },
  {
    id: "togo",
    title: "To-go order compatibility",
    description:
      "Handles takeout and delivery orders efficiently, sending real-time SMS links for seamless ordering and reducing call-handling time for your staff.",
    icon: TakeoutIcon,
    tint: "rgba(192,85,158,0.16)",
  },
  {
    id: "host",
    title: "Customized host profile for your brand",
    description:
      "Customize its tone, responses and personality so it takes reservations and orders just like your best staff member would.",
    icon: HostIcon,
    tint: "rgba(239,114,0,0.14)",
  },
] as const;

export default function Features() {
  return (
    <section id="features" className="scroll-mt-24 bg-[#251f21] py-24 md:py-32">
      <div className="mx-auto w-full px-6 lg:px-[73px]">
        <div className="mx-auto mb-14 max-w-[680px] text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-cream/60">
            What we deliver
          </p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-cream md:text-5xl">
            Product features and{" "}
            <span className="text-[#d592f3]">functionality.</span>
          </h2>
          <p className="font-body mx-auto mt-5 max-w-md text-base leading-relaxed text-cream/70 md:text-lg">
            Comprehensive solutions tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.id}
              className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-white/20 md:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-16 h-48 w-72 blur-3xl"
                style={{ background: `radial-gradient(circle, ${f.tint}, transparent 60%)` }}
              />
              <div className="relative">
                <span className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#b53fc4] to-[#ef7200] text-white shadow-[0_10px_24px_-10px_rgba(181,63,196,0.6)]">
                  <f.icon />
                </span>
                <h3 className="text-xl font-medium leading-tight tracking-tight text-cream md:text-2xl">
                  {f.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-cream/70">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
      className="h-6 w-6"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function ReservationIcon() {
  return (
    <IconBase>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4M9 14h2M9 17h6" />
    </IconBase>
  );
}

function GlobeIcon() {
  return (
    <IconBase>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </IconBase>
  );
}

function TakeoutIcon() {
  return (
    <IconBase>
      <path d="M5 8h14l-1.5 11a2 2 0 0 1-2 1.8h-7A2 2 0 0 1 6.5 19L5 8Z" />
      <path d="M3 8h18M9 11v5M15 11v5M8 4l1 4M16 4l-1 4" />
    </IconBase>
  );
}

function HostIcon() {
  return (
    <IconBase>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21a7 7 0 0 1 14 0" />
      <path d="M16.5 4.5l1 1.5M19 3l1 1.5" />
    </IconBase>
  );
}
