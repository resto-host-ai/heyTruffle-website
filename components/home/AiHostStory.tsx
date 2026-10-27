import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import StoryScroller, { type StoryStep } from "@/components/home/StoryScroller";

/**
 * AiHostStory — "what the AI host handles", three use cases (Figma
 * "Landing 2", right after the trusted-by logos): reservations, orders and
 * catering. Each block pairs copy + integration logos on the left with a
 * mock live call on the right that shows what got written to the POS.
 *
 * On desktop it's a scroll story (StoryScroller): the copy scrolls by while
 * one sticky container on the right switches between the three call cards.
 * Each card plays out its call — the caller speaks, the host types and
 * answers, the result lands line by line, the call closes with its outcome —
 * holds 10s, then replays. Timings follow the Claude Design "AI Host Scroll
 * Story" prototype.
 */

type ChatLine = { who: "caller" | "host"; text: string };

type Story = {
  id: "reservations" | "orders" | "catering";
  tab: string;
  n: string;
  eyebrow: string;
  title: [string, string];
  desc: string;
  bullets: string[];
  /** w/h: the SVG's viewBox. cropW: where its artwork actually ends, for the
   *  files that carry empty space on the right. cap: the share of the logo's
   *  height its lettering takes (measured per file), so every brand name can
   *  be drawn at the same letter height. */
  logos: { src: string; alt: string; w: number; h: number; cropW?: number; cap: number }[];
  host: { name: string; role: string };
  chat: ChatLine[];
  /** How the call ends — the green pill at the bottom of the card */
  done: string;
  result:
    | { kind: "chips"; label: string; chips: { text: string; accent?: boolean }[] }
    | {
        kind: "ticket";
        label: string;
        items: { text: string; note?: string; price: string }[];
        total: { text: string; price: string };
      }
    | { kind: "fields"; label: string; fields: { k: string; v: string; accent?: boolean }[] };
};

const STORIES: Story[] = [
  {
    id: "reservations",
    tab: "Reservations",
    n: "01",
    eyebrow: "Reservations",
    title: ["Tables filled,", "every night."],
    desc: "New bookings, changes and confirmations, synced straight to your reservation book at any time, any moment.",
    bullets: [
      "Books, modifies and cancels in Resy, OpenTable, SevenRooms or any POS",
      "Party-size, waitlist and deposit rules your hosts already follow",
      "Bilingual EN/ES on every call or any language needed",
      "Special requests escalated to your team",
    ],
    logos: [
      { src: "/images/integrations/resy.svg", alt: "Resy", w: 77, h: 34, cap: 0.45 },
      { src: "/images/integrations/sevenrooms.svg", alt: "SevenRooms", w: 109, h: 30, cap: 0.33 },
      { src: "/images/integrations/opentable.svg", alt: "OpenTable", w: 428, h: 95, cap: 0.43 },
    ],
    host: { name: "Margarita", role: "AI host" },
    chat: [
      { who: "caller", text: "Hi — do you have anything for six people Friday around eight?" },
      { who: "host", text: "We have 8:15 on the patio or 8:45 inside. Which would you prefer?" },
      { who: "caller", text: "Patio works. One of us is gluten-free." },
    ],
    done: "Confirmed",
    result: {
      kind: "chips",
      label: "Send to POS",
      chips: [
        { text: "Party of 6" },
        { text: "Fri · 8:15 pm" },
        { text: "Patio" },
        { text: "Note: gluten-free", accent: true },
      ],
    },
  },
  {
    id: "orders",
    tab: "Orders",
    n: "02",
    eyebrow: "Orders",
    title: ["Pickup and delivery,", "zero friction."],
    desc: "Pickup and delivery orders taken, charged, and sent straight to your POS. Full menu knowledge, modifiers, allergies, combos and more",
    bullets: [
      "Modifiers, allergies and combos handled the way your kitchen expects",
      "Pickup time and payment link confirmed and sent on the call",
      "Fired into your POS at real time.",
    ],
    logos: [
      { src: "/images/integrations/doordash.svg", alt: "DoorDash", w: 476, h: 57, cap: 0.48 },
      { src: "/images/integrations/grubhub.svg", alt: "Grubhub", w: 371, h: 78, cap: 0.78 },
      { src: "/images/integrations/uber-eats.svg", alt: "Uber Eats", w: 134, h: 24, cap: 0.67 },
    ],
    host: { name: "Jeff", role: "AI host · pickup line" },
    chat: [
      { who: "caller", text: "Two al pastor tacos, no onion, and a large horchata." },
      { who: "host", text: "Got it. Want to add the elote for $4? It goes with the pastor." },
      { who: "caller", text: "Sure, add one." },
    ],
    done: "Paid · sent to POS",
    result: {
      kind: "ticket",
      label: "Send to POS · Ticket #4471",
      items: [
        { text: "2 × Tacos al pastor", note: "no onion", price: "$13.00" },
        { text: "1 × Horchata (L)", price: "$5.00" },
        { text: "1 × Elote", note: "upsell", price: "$4.00" },
      ],
      total: { text: "Pickup 7:40 pm", price: "$22.00" },
    },
  },
  {
    id: "catering",
    tab: "Catering & events",
    n: "03",
    eyebrow: "Catering & private events",
    title: ["Big parties,", "booked solid"],
    desc: "Catering, private events, large party reservations inquiries get qualified on the spot then land with your events manager the same day",
    bullets: [
      "Qualifies headcount, date, budget, service style and more.",
      "Routed to your events manager in the format you prefer.",
      "Sends the follows up automatically to the customers.",
    ],
    logos: [
      { src: "/images/integrations/toast.svg", alt: "Toast", w: 67, h: 17, cap: 0.7 },
      { src: "/images/integrations/square.svg", alt: "Square", w: 130, h: 28, cropW: 82, cap: 0.53 },
      { src: "/images/integrations/clover.svg", alt: "Clover", w: 1045, h: 256, cap: 0.6 },
      { src: "/images/integrations/olo.svg", alt: "Olo", w: 70, h: 28, cropW: 40, cap: 0.6 },
    ],
    host: { name: "Nacho", role: "AI host · events line" },
    chat: [
      { who: "caller", text: "We're planning a company dinner for about forty people in December." },
      { who: "host", text: "Lovely. Is that a seated dinner or passed bites and do you have a date in mind?" },
      { who: "caller", text: "Seated, December 12th. Budget is around four thousand." },
    ],
    done: "Lead captured · manager notified",
    result: {
      kind: "fields",
      label: "Qualified lead · Sent to events manager",
      fields: [
        { k: "Headcount", v: "40 guests" },
        { k: "Date", v: "Dec 12" },
        { k: "Budget", v: "~$4,000" },
        { k: "Service", v: "Seated dinner", accent: true },
      ],
    },
  },
];

/** Inline CSS animation (keyframes live in globals.css under "AiHostStory"). */
const anim = (name: string, ms: number, delay = 0): React.CSSProperties => ({
  animation: `${name} ${ms}ms ${delay}ms both`,
});

// The call's beat, in ms from the moment the block scrolls into view.
const T = {
  msgs: [90, 1320, 1900],
  typing: 320,
  // After the call, everything below lands one piece at a time at the same
  // pace as the messages: each item gets its own beat (gap) and the same
  // entrance length as a message (dur), instead of the whole block sharing
  // a single half-second.
  gap: 580,
  dur: 480,
};

/** Start time of the n-th piece after the last message (0 = the divider). */
const beat = (n: number) => T.msgs[T.msgs.length - 1] + T.gap * (n + 1);

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <circle cx="8" cy="8" r="8" fill="#2F7D58" />
      <path
        d="M4.7 8.3 6.9 10.5 11.4 6"
        stroke="#F6F3EC"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CallCard({ story }: { story: Story }) {
  const { host, chat, result, done } = story;
  // Beats: 0 divider, 1 label, 2.. each item, then (ticket) divider + total,
  // then the outcome pill.
  const item = (i: number) => anim("story-msg-in", T.dur, beat(2 + i));
  const count =
    result.kind === "chips" ? result.chips.length : result.kind === "ticket" ? result.items.length : result.fields.length;
  const doneBeat = result.kind === "ticket" ? 2 + count + 2 : 2 + count;
  return (
    <div
      className="flex flex-col rounded-card bg-cream px-[18px] pb-3.5 pt-[18px] font-body text-ink shadow-[0_18px_44px_rgba(0,0,0,0.13)] md:min-h-[calc(560*var(--fx))] md:p-[calc(28*var(--fx))]"
      style={anim("story-card-in", 600, 240)}
    >
      <div className="flex flex-1 flex-col" style={anim("story-fade-up", 400)}>
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="h-[22px] w-[22px] bg-brand-orange md:h-[calc(22*var(--fx))] md:w-[calc(22*var(--fx))] [mask:url(/images/icono.svg)_center/contain_no-repeat]"
            />
            <div>
              <p className="text-[15px] font-semibold leading-[1.25] md:text-[calc(15*var(--fx))]">{host.name}</p>
              <p className="text-[12px] leading-[1.3] text-[#6F6668] md:text-[calc(13*var(--fx))]">{host.role}</p>
            </div>
          </div>
          <span className="flex items-center gap-[7px] rounded-full bg-brand-orange/12 px-[11px] py-1.5 text-[10.5px] font-semibold tracking-[0.08em] md:px-[calc(11*var(--fx))] md:py-[calc(6*var(--fx))] md:text-[calc(11*var(--fx))] text-[#C95F00]">
            <span
              className="h-[7px] w-[7px] rounded-full bg-brand-orange"
              style={{ animation: "story-live-pulse 1.8s ease-in-out infinite" }}
            />
            LIVE
          </span>
        </div>

        {/* Call — caller, host typing, host reply, caller */}
        <div className="flex flex-1 flex-col gap-2.5 pt-5 md:pt-[calc(40*var(--fx))]">
          {chat.map((line, i) => (
            <Fragment key={i}>
              {/* The host "types" before its first reply */}
              {i === 1 && (
                <div
                  aria-hidden
                  className="story-typing flex w-fit gap-[5px] self-end overflow-hidden rounded-[18px] bg-ink px-[18px] [box-sizing:content-box]"
                  style={anim("story-typing", 1300, T.typing)}
                >
                  {[0, 140, 280].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-cream"
                      style={{ animation: `story-dot 1s ${d}ms infinite` }}
                    />
                  ))}
                </div>
              )}
              <p
                className={`px-[15px] py-3 text-[14.5px] leading-[1.42] md:px-[calc(16*var(--fx))] md:py-[calc(12*var(--fx))] md:text-[calc(15*var(--fx))] ${
                  line.who === "host"
                    ? "max-w-[88%] self-end rounded-[18px_18px_6px_18px] bg-ink text-cream"
                    : "max-w-[86%] self-start rounded-[18px_18px_18px_6px] bg-[#EDE9E0]"
                }`}
                style={anim("story-msg-in", 480, T.msgs[i])}
              >
                &ldquo;{line.text}&rdquo;
              </p>
            </Fragment>
          ))}
        </div>

        {/* What landed in the POS */}
        <div className="pt-5 md:pt-[calc(32*var(--fx))]">
          <div
            className="h-px origin-left bg-[#DCD6CC]"
            style={anim("story-rail", T.dur, beat(0))}
          />
          <p
            className="pb-3 pt-4 text-[10.5px] uppercase tracking-[0.1em] text-[#6F6668] md:pb-[calc(12*var(--fx))] md:pt-[calc(16*var(--fx))] md:text-[calc(11*var(--fx))]"
            style={anim("story-msg-in", T.dur, beat(1))}
          >
            {result.label}
          </p>

          {result.kind === "chips" && (
            <div className="flex flex-wrap gap-2.5 pb-3.5">
              {result.chips.map((c, i) => (
                <span
                  key={c.text}
                  className={`rounded-[10px] px-[13px] py-[9px] text-[13.5px] md:px-[calc(13*var(--fx))] md:py-[calc(9*var(--fx))] md:text-[calc(14*var(--fx))] ${
                    c.accent ? "bg-brand-orange/12 font-medium text-[#C95F00]" : "bg-white"
                  }`}
                  style={item(i)}
                >
                  {c.text}
                </span>
              ))}
            </div>
          )}

          {result.kind === "ticket" && (
            <>
              <div className="grid gap-2 pb-2">
                {result.items.map((it, i) => (
                  <div
                    key={it.text}
                    className="flex items-baseline justify-between gap-3 text-[14px] md:text-[calc(14*var(--fx))]"
                    style={item(i)}
                  >
                    <span className="min-w-0 flex-auto">
                      {it.text}
                      {it.note && (
                        <>
                          {" · "}
                          <span className="text-brand-orange">{it.note}</span>
                        </>
                      )}
                    </span>
                    <span className="shrink-0 whitespace-nowrap">{it.price}</span>
                  </div>
                ))}
              </div>
              <div
                className="h-px origin-left bg-[#DCD6CC]"
                style={anim("story-rail", T.dur, beat(2 + result.items.length))}
              />
              <div
                className="flex items-baseline justify-between gap-3 pb-4 pt-3 text-[15.5px] font-semibold md:text-[calc(16*var(--fx))]"
                style={anim("story-msg-in", T.dur, beat(3 + result.items.length))}
              >
                <span className="whitespace-nowrap">{result.total.text}</span>
                <span className="whitespace-nowrap">{result.total.price}</span>
              </div>
            </>
          )}

          {result.kind === "fields" && (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(108px,1fr))] gap-2.5 pb-3.5">
              {result.fields.map((f, i) => (
                <div
                  key={f.k}
                  className={`rounded-[10px] px-[13px] py-2.5 md:px-[calc(13*var(--fx))] md:py-[calc(10*var(--fx))] ${
                    f.accent ? "bg-brand-orange/12 text-[#C95F00]" : "bg-white"
                  }`}
                  style={item(i)}
                >
                  <p className={`text-[13px] md:text-[calc(12*var(--fx))] ${f.accent ? "" : "text-[#6F6668]"}`}>{f.k}</p>
                  <p className={`text-[14.5px] md:text-[calc(14*var(--fx))] ${f.accent ? "font-medium" : ""}`}>{f.v}</p>
                </div>
              ))}
            </div>
          )}

          {/* The call's outcome */}
          <div
            className="mb-1 flex items-center gap-[9px] rounded-xl bg-[rgba(47,125,88,0.14)] px-3.5 py-[11px] text-[13.5px] font-semibold leading-[1.3] text-[#1E5C40] md:px-[calc(14*var(--fx))] md:py-[calc(11*var(--fx))] md:text-[calc(14*var(--fx))]"
            style={anim("story-msg-in", T.dur, beat(doneBeat))}
          >
            <CheckIcon />
            <span>{done}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryCopy({ s }: { s: Story }) {
  return (
    <div>
      <p
        className="text-[14px] uppercase tracking-[0.18em] md:text-[calc(15*var(--fx))]"
        style={anim("story-fade-up", 460)}
      >
        <span className="mr-3 text-brand-orange">{s.n}</span>
        <span className="text-cream/70">{s.eyebrow}</span>
      </p>
      <h2
        className="mt-4 font-serif text-[34px] font-normal! leading-[1.08] md:text-[calc(48*var(--fx))]"
        style={anim("story-fade-up", 520, 80)}
      >
        {s.title[0]} <br className="hidden md:inline" />
        {s.title[1]}
      </h2>
      <p
        className="mt-5 max-w-[600px] text-[17px] leading-[1.35] text-cream/90 md:text-[calc(22*var(--fx))]"
        style={anim("story-fade-up", 520, 170)}
      >
        {s.desc}
      </p>

      {/* Bullets — desktop only, as in the mobile frame */}
      <ul className="hidden text-cream/80 md:mt-[calc(32*var(--fx))] md:block md:space-y-[calc(10*var(--fx))] md:text-[calc(18*var(--fx))]">
        {s.bullets.map((b) => (
          <li key={b} className="flex items-baseline gap-3">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 translate-y-[-3px] rounded-full bg-brand-orange" />
            {b}
          </li>
        ))}
      </ul>

      {/* --cap-t is the letter height every brand name is drawn at:
          each logo's height is cap-t / its own lettering share, so a
          wordmark that fills its box (Grubhub) and one sitting beside a
          big icon (SevenRooms) read as the same size. */}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 [--cap-t:8px] md:mt-[calc(96*var(--fx))] md:gap-x-[calc(36*var(--fx))] md:[--cap-t:calc(12*var(--fx))]">
        {s.logos.map((l) => (
          <span
            key={l.alt}
            className="flex shrink-0 overflow-hidden"
            style={{
              aspectRatio: `${l.cropW ?? l.w} / ${l.h}`,
              height: `calc(var(--cap-t) / ${l.cap})`,
            }}
          >
            <Image
              src={l.src}
              alt={l.alt}
              width={l.w}
              height={l.h}
              className="h-full w-auto max-w-none brightness-0 invert"
            />
          </span>
        ))}
      </div>

      <Link
        href="/integrations"
        className="hidden items-center gap-2 text-brand-orange underline underline-offset-4 md:mt-[calc(24*var(--fx))] md:inline-flex md:text-[calc(17*var(--fx))]"
      >
        Check our integrations <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

export default function AiHostStory() {
  const steps: StoryStep[] = STORIES.map((s) => ({
    id: s.id,
    tab: s.tab,
    copy: <StoryCopy s={s} />,
    card: <CallCard story={s} />,
  }));
  return (
    <section className="relative z-10 w-full overflow-clip px-5 py-16 font-body text-cream md:py-[calc(60*var(--fx))] lg:px-[73px]">
      {/* Ambient light, as in the Figma: plum behind the copy on the left,
          deep blue toward the right, a warm orange low on the left. Plain
          radial gradients (no blur filter) so they cost nothing to paint;
          overflow-clip keeps them inside the section without breaking the
          sticky stage. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,#000_8%,#000_80%,transparent)]">
        <div className="absolute -left-[25%] top-[18%] h-[55%] w-[75%] bg-[radial-gradient(closest-side,rgba(239,114,0,0.22),transparent)]" />
        <div className="absolute -left-[20%] top-[48%] h-[60%] w-[70%] bg-[radial-gradient(closest-side,rgba(148,62,114,0.42),transparent)]" />
        <div className="absolute -right-[25%] top-[40%] h-[65%] w-[75%] bg-[radial-gradient(closest-side,rgba(55,90,190,0.32),transparent)]" />
      </div>
      <div className="mx-auto md:max-w-[calc(1330*var(--fx))]">
        <StoryScroller steps={steps} />
      </div>
    </section>
  );
}
