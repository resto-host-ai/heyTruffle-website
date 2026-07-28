import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookDemoButton } from "@/components/ui/BookDemoButton";

const META_DESCRIPTION =
  "Common questions about restaurant voice AI: features, integrations, ROI, reservations, multi-unit deployment, and how heytruffle automates phone operations 24/7.";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — heytruffle",
  description: META_DESCRIPTION,
  alternates: { canonical: "/faq/" },
};

type Faq = {
  id: string;
  question: string;
  /** Real 2-4 sentence answer — no blog copy embedded mid-sentence. */
  answer: string;
  /** Optional further-reading link, rendered as a separate "Read more". */
  readMore?: {
    label: string;
    /** Blog post slug — resolves to /blog/{slug}. */
    blogSlug: string;
  };
};

const FAQS: readonly Faq[] = [
  {
    id: "features-to-look-for",
    question: "What features should I look for in a restaurant voice assistant?",
    answer:
      "Look for 24/7 availability, real integration with the POS and reservation systems you already run, and human oversight that reviews real calls and keeps improving the AI. heytruffle also answers in English and Spanish out of the box, so language never becomes the reason a call gets missed.",
    readMore: { label: "What are AI voice hosts", blogSlug: "what-are-ai-voice-hosts" },
  },
  {
    id: "simultaneous-orders",
    question: "How does voice AI handle multiple orders simultaneously?",
    answer:
      "Because heytruffle runs on cloud infrastructure instead of a single phone line, it can answer as many calls as come in at once — there's no busy signal. Each caller gets their own instance of the AI, so a rush of orders doesn't mean anyone gets put on hold.",
    readMore: {
      label: "Stop losing customers to missed calls",
      blogSlug: "stop-losing-customers-to-missed-calls",
    },
  },
  {
    id: "save-staff-time",
    question: "How can voice AI save time for my restaurant staff?",
    answer:
      "heytruffle takes routine calls — reservations, hours, menu questions, order status — off your team's plate so they can stay on the floor instead of the phone. Only conversations that genuinely need a person get escalated, and our team reviews call transcripts weekly to keep that handoff sharp.",
    readMore: {
      label: "How AI helps restaurant staff reduce workload and improve service",
      blogSlug: "how-ai-helps-restaurant-staff-reduce-workload-and-improve-service",
    },
  },
  {
    id: "essential-integrations",
    question: "What are the essential integrations for restaurant voice AI?",
    answer:
      "The integrations that matter most are your POS (Toast, Clover, Square and others), your reservation system (Resy, OpenTable, SevenRooms) and your ordering channels (Grubhub, DoorDash, Olo and more). heytruffle connects to all of these so a call turns into a synced order or booking, not just a note for a staff member to re-enter later.",
    readMore: {
      label: "Restaurant phone answering and ordering systems",
      blogSlug: "restaurant-phone-answering-ordering-system",
    },
  },
  {
    id: "measure-roi",
    question: "How can I measure the ROI of voice AI in my restaurant?",
    answer:
      "ROI comes down to three numbers: fewer missed calls, more of those calls converting into a booked table or a placed order, and hours of staff time freed from the phone. Our case studies track this directly — Rreal Tacos, for example, handles 19K+ calls a month with roughly 520 host hours back on the floor.",
    readMore: {
      label: "How restaurants can measure the real ROI of AI voice assistants",
      blogSlug: "how-restaurants-can-measure-the-real-roi-of-ai-voice-assistants",
    },
  },
  {
    id: "dining-experience",
    question:
      "How can an automated assistant improve the customer dining experience?",
    answer:
      "A guest who calls and immediately gets a reservation confirmed, a question answered, or an order taken has a smoother experience before they ever walk in. There's no hold music, no voicemail and no calling back later — heytruffle picks up on the first ring, every time.",
    readMore: {
      label: "Customer service in restaurants: strategies for a memorable dining experience",
      blogSlug:
        "customer-service-in-restaurants-strategies-for-a-memorable-dining-experience",
    },
  },
  {
    id: "convert-reservations",
    question:
      "Can AI tools help my restaurant convert inquiries into confirmed reservations?",
    answer:
      "Yes — heytruffle checks your live availability during the call and books directly into your reservation system, so an inquiry becomes a confirmed table without a staff member following up later. It also handles waitlist and cancellation-policy questions on the same call.",
    readMore: {
      label: "AI reservations for restaurants",
      blogSlug: "ai-reservations-for-restaurants",
    },
  },
  {
    id: "multi-unit-scaling",
    question:
      "What is the best voice AI solution for scalable deployment across multi-unit chains?",
    answer:
      "Every location gets its own AI host trained on that location's specific menu, hours and policies, so the experience stays consistent whether you run 3 locations or 30. Our team monitors calls and tunes each host weekly, which scales the same way regardless of how many units you add.",
    readMore: {
      label: "heytruffle AI vs. competitors: the best AI voice assistant for restaurants",
      blogSlug:
        "heytruffle-ai-vs-competitors-the-best-ai-voice-assistant-for-restaurants",
    },
  },
  {
    id: "menu-and-togo",
    question:
      "How does voice AI adapt to different restaurant menus and to-go orders?",
    answer:
      "The AI is custom-trained on your specific menu, including sizes, modifiers and daily specials, so it takes a real order instead of a generic one. To-go orders go directly into your POS, the same as an order taken at the counter, so your kitchen sees one ticket queue instead of two.",
    readMore: {
      label: "AI voice ordering for restaurants: boosting speed and efficiency",
      blogSlug: "ai-voice-ordering-for-restaurants-boosting-speed-and-efficiency",
    },
  },
  {
    id: "order-speed-accuracy",
    question: "How can AI improve order-taking speed and accuracy?",
    answer:
      "Because the AI pulls your live menu and POS data during the call, it captures modifiers, allergies and substitutions exactly as the guest says them — no mishearing, no rushed handwriting. Orders reach the kitchen the same way every time, which is what actually drives the accuracy gain, not just the speed.",
    readMore: {
      label: "Restaurant operations powered by AI",
      blogSlug: "restaurant-operations-powered-by-ai",
    },
  },
];

/** Plain-text answer for the FAQPage structured data. */
function answerText(faq: Faq): string {
  return faq.answer;
}

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: answerText(f) },
  })),
};

export default function FaqPage() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden bg-[#251f21] pb-16 pt-32 md:pb-20 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)",
          }}
        >
          <Image
            src="/images/background_gradient.webp"
            alt=""
            fill
            loading="eager"
            fetchPriority="low"
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-[820px] px-6 text-center md:px-10">
          <p className="text-xs uppercase tracking-[0.2em] text-cream/70">FAQ</p>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-cream md:text-6xl">
            Questions, <span className="text-[#d592f3]">answered.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[660px] text-base leading-relaxed text-cream/70 md:text-lg">
            The ten things restaurants ask before deploying voice AI: features,
            integrations, ROI, reservations, and how heytruffle handles every
            inbound call.
          </p>
        </div>
      </section>

      {/* ---- FAQ list ---- */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[820px] px-6 py-16 md:px-10 md:py-24">
          <div className="overflow-hidden rounded-3xl border border-[#251f21]/10 bg-white/60">
            {FAQS.map((faq, i) => (
              <details
                key={faq.id}
                id={faq.id}
                className="group border-b border-[#251f21]/10 last:border-b-0"
              >
                <summary className="flex cursor-pointer list-none items-center gap-5 px-6 py-5 transition-colors hover:bg-[#251f21]/[0.03] md:px-8 [&::-webkit-details-marker]:hidden">
                  <span className="w-7 shrink-0 font-mono text-[13px] font-medium text-brand-purple">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-base font-medium leading-snug text-[#251f21] md:text-lg">
                    {faq.question}
                  </span>
                  <svg
                    className="shrink-0 text-[#251f21]/40 transition-transform duration-300 group-open:rotate-180"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 pl-[3.25rem] md:px-8 md:pl-[4.5rem]">
                  <p className="text-[15px] leading-relaxed text-[#251f21]/70 md:text-base">
                    {faq.answer}
                  </p>
                  {faq.readMore && (
                    <Link
                      href={`/blog/${faq.readMore.blogSlug}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-brand-orange underline decoration-brand-orange/30 underline-offset-2 transition-colors hover:decoration-brand-orange md:text-[15px]"
                    >
                      Read more: {faq.readMore.label} →
                    </Link>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="relative overflow-hidden bg-[#251f21] py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(181,63,196,0.28) 0%, rgba(239,114,0,0.16) 50%, transparent 75%)",
          }}
        />
        <div className="relative mx-auto max-w-[720px] px-6 text-center md:px-10">
          <h2 className="font-serif text-3xl text-cream md:text-4xl">
            Still have questions?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-cream/70 md:text-base">
            See heytruffle handle a live call for your restaurant — every
            reservation booked, every order taken.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <BookDemoButton className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b53fc4] to-[#ef7200] px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Get a Free Demo
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </BookDemoButton>
            <Link
              href="/roi-calculator"
              className="rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              Calculate your ROI
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
