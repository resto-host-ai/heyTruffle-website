type Feature = {
  title: string;
  description: string;
  icon: string;
};

const GRADIENT_PALETTES = [
  {
    from: "rgba(255, 140, 50, 0.8)",
    to: "rgba(70, 130, 200, 0.8)",
    base: "linear-gradient(135deg, #8B4513 0%, #2c3e50 100%)",
  },
  {
    from: "rgba(230, 80, 100, 0.8)",
    to: "rgba(100, 150, 220, 0.8)",
    base: "linear-gradient(135deg, #5a2c42 0%, #1a3a52 100%)",
  },
  {
    from: "rgba(200, 120, 60, 0.8)",
    to: "rgba(80, 160, 200, 0.8)",
    base: "linear-gradient(135deg, #6b4423 0%, #1e4d6b 100%)",
  },
  {
    from: "rgba(255, 180, 60, 0.8)",
    to: "rgba(120, 100, 200, 0.8)",
    base: "linear-gradient(135deg, #704030 0%, #3a2a5f 100%)",
  }
] as const;

const FEATURES: readonly Feature[] = [
  {
    title: "Trained for your brand voice",
    description:
      "A dedicated AI Concierge tailored to your restaurant.",
    icon: "/images/logo/settings.svg",
  },
  {
    title: "Monitored and refined weekly",
    description:
      "Real people review calls and improve performance every week.",
    icon: "/images/logo/sensors.svg",
  },
  {
    title: "Designed to free your staff",
    description:
      "Handles calls so your team can stay focused on guests.",
    icon: "/images/logo/attribution.svg",
  },
  {
    title: "Built by and for operators",
    description:
      "Designed around the way restaurants actually operate.",
    icon: "/images/logo/construction.svg",
  },
] as const;

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="relative isolate scroll-mt-24 py-20 md:py-28">
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
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  index,
}: Feature & { index: number }) {
  const palette = GRADIENT_PALETTES[index % GRADIENT_PALETTES.length];

  return (
    <article
      className="
        flex  flex-col h-auto min-h-60 justify-evenly
        rounded-[25px] gap-2
        bg-gray-50/20
        border border-white/20
        p-6 
        shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_18px_45px_rgba(0,0,0,0.22)]
        backdrop-blur-[18px]
        md:p-7
      "
    >
      <div className="relative h-16 w-16 flex justify-center items-center">

        <span
          className=" absolute
          flex h-full w-full shrink-0 
          items-center justify-center rounded-xl
          shadow-[0_8px_24px_rgba(0,0,0,0.22)] opacity-50 -z-1
        "
          style={{
            background: `
            radial-gradient(circle at 20% 30%, ${palette.from} 0%, transparent 45%),
            radial-gradient(circle at 80% 70%, ${palette.to} 0%, transparent 45%),
            ${palette.base}
          `
          }}
        >
        </span>
        <img src={icon} alt="" className="h-6 w-6 z-10" />
      </div>

      <h3
        className="
          line-clamp-2 py-2
          break-words text-balance
          font-body text-3xl font-semibold text-white
        "
      >
        {title}
      </h3>

      <p className="flex-1 font-body text-lg   leading-[1.6] text-cream/70">
        {description}
      </p>
    </article>
  );
}

