import Image from "next/image";

const CARDS = [
  {
    src: "/images/img1.webp",
    alt: "A party of six just walked in, no reservation.",
    pos: "left-[0%] top-0 w-[48%] z-10",
  },
  {
    src: "/images/img2.webp",
    alt: "The kitchen is calling for table 12.",
    pos: "left-[26%] top-[38%] w-[48%] z-20",
  },
  {
    src: "/images/img3.webp",
    alt: "And the phone is ringing. Again.",
    pos: "left-[51%] top-[62%] w-[50%] z-30",
  },
];

export default function MomentSection() {
  return (
    <section className="relative overflow-hidden pb-8 pt-8 md:pb-12 md:pt-10">
      {/* Color glows: cream on the left, orange on the right */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12%] top-[55%] h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-[#f6f3ec] opacity-[0.12] blur-[130px]" />
        <div className="absolute right-[-10%] top-[62%] h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-[#ef7200] opacity-[0.28] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6">
        <h2 className="text-center font-serif text-4xl text-[#ef7200] md:text-5xl lg:text-6xl">
          You know this moment.
        </h2>
        <p className="mt-3 text-center text-sm text-cream/70">Friday 7:48 pm</p>

        {/* Scattered image cards */}
        <div className="relative mx-auto mt-12 aspect-[104/98] w-full max-w-[1040px]">
          {CARDS.map((card) => (
            <div key={card.src} className={`absolute aspect-[2784/2011] ${card.pos}`}>
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="(max-width: 1040px) 50vw, 520px"
                className="object-contain"
              />
            </div>
          ))}
        </div>

        <p className="mt-14 text-center text-sm text-cream/70">
          Your host can be on the floor, or on the phone.{" "}
          <span className="font-bold text-cream">Not both.</span>
        </p>
      </div>
    </section>
  );
}
