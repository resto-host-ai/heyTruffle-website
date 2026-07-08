import Image from "next/image";

const STATEMENTS = [
  "Not a software.",
  "Not self-service.",
  "Not replacing your host.",
];

const HOSTS = [
  {
    name: "Jeff",
    src: "/images/jeff.svg",
    color: "#251f21",
    desc: ["Crisp, polished,", "late-night ready"],
  },
  {
    name: "Nacho",
    src: "/images/nacho.svg",
    color: "#ef7200",
    desc: ["Warm, energetic,", "knows the menu cold"],
  },
  {
    name: "Margarita",
    src: "/images/margarita.svg",
    color: "#c0559e",
    desc: ["Cheerful, anticipatory,", "party energy"],
  },
  {
    name: "Mary",
    src: "/images/mary.svg",
    color: "#3773d7",
    desc: ["Cheerful, anticipatory,", "party energy"],
  },
];

function PlayIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10.5" stroke={color} strokeWidth="1.3" />
      <path d="M10 8.5l5.5 3.5L10 15.5V8.5z" fill={color} />
    </svg>
  );
}

export default function WhatIsSection() {
  return (
    <section className="relative overflow-hidden bg-[#251f21] pb-16 pt-8 md:pb-20 md:pt-10">
      {/* background_gradient.webp, faded at the top so it blends into the
          #251F21 base instead of showing a hard cropped edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 14%, #000 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 14%, #000 80%, transparent 100%)",
        }}
      >
        <Image
          src="/images/background_gradient.webp"
          alt=""
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto flex max-w-[1280px] flex-col items-center px-6 md:px-10">
        <p className="text-xs uppercase tracking-[0.2em] text-cream/70">
          What is Hey Truffle?
        </p>

        <div className="mt-10 flex w-full max-w-[620px] flex-col gap-5">
          {STATEMENTS.map((text) => (
            <div
              key={text}
              className="flex h-[76px] items-center justify-center rounded-full border border-white/40 bg-[#f6f3ec]/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-lg"
            >
              <span className="font-serif text-2xl text-cream line-through decoration-2 md:text-3xl">
                {text}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-xl text-center text-base leading-relaxed text-cream/85 md:text-lg">
          Most voice AI hands you software to set up and maintain.
          <br />
          We run it for you, so you get the result, not the homework.
        </p>

        {/* Meet the hosts card */}
        <div className="mt-12 w-full rounded-[36px] bg-[#f6f3ec] px-6 py-12 shadow-2xl md:px-16 md:py-16">
          <h3 className="text-center font-serif text-4xl text-[#251f21] md:text-5xl">
            Meet the hosts
          </h3>
          <p className="mx-auto mt-5 max-w-md text-center text-base leading-relaxed text-[#251f21]/70 md:text-lg">
            Trained for the restaurant. Tuned every week. Built to feel like part
            of the team.
          </p>

          <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-16 sm:grid-cols-4">
            {HOSTS.map((host) => (
              <div key={host.name} className="flex flex-col items-center text-center">
                <Image
                  src={host.src}
                  alt={host.name}
                  width={342}
                  height={337}
                  unoptimized
                  className="h-44 w-44 object-contain md:h-52 md:w-52"
                />
                <span className="mt-3">
                  <PlayIcon color={host.color} />
                </span>
                <p
                  className="mt-3 font-serif text-xl md:text-2xl"
                  style={{ color: host.color }}
                >
                  {host.name}
                </p>
                <p className="mt-2 text-sm leading-snug text-[#251f21]/60 md:text-base">
                  {host.desc[0]}
                  <br />
                  {host.desc[1]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
