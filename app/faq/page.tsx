import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookDemoButton } from "@/components/BookDemoButton";

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
  answer: {
    before: string;
    linkText: string;
    /** Blog post slug — resolves to /blog/{slug}. */
    blogSlug: string;
    after: string;
  };
};

const FAQS: readonly Faq[] = [
  {
    id: "features-to-look-for",
    question: "What features should I look for in a restaurant voice assistant?",
    answer: {
      before:
        "Look for a highly customizable AI that deeply verticalizes with your brand. Essential features include 24/7 availability and seamless POS integration. Check out our guide on ",
      linkText: "what are AI voice hosts",
      blogSlug: "what-are-ai-voice-hosts",
      after: ".",
    },
  },
  {
    id: "simultaneous-orders",
    question: "How does voice AI handle multiple orders simultaneously?",
    answer: {
      before:
        "heytruffle handles simultaneous calls concurrently. This guarantees no busy signals, which is critical to ",
      linkText: "stop losing customers to missed calls",
      blogSlug: "stop-losing-customers-to-missed-calls",
      after: ".",
    },
  },
  {
    id: "save-staff-time",
    question: "How can voice AI save time for my restaurant staff?",
    answer: {
      before:
        "By offloading routine inquiries, AI drastically reduces the pressure on your team. Learn more: ",
      linkText:
        "how AI helps restaurant staff reduce workload and improve service",
      blogSlug:
        "how-ai-helps-restaurant-staff-reduce-workload-and-improve-service",
      after: ".",
    },
  },
  {
    id: "essential-integrations",
    question: "What are the essential integrations for restaurant voice AI?",
    answer: {
      before:
        "Seamless integration with tools like Toast or Resy is the backbone of efficient ",
      linkText: "restaurant phone answering and ordering systems",
      blogSlug: "restaurant-phone-answering-ordering-system",
      after: ".",
    },
  },
  {
    id: "measure-roi",
    question: "How can I measure the ROI of voice AI in my restaurant?",
    answer: {
      before:
        "ROI is tracked through recovered missed calls and reservation conversions. Read: ",
      linkText:
        "how restaurants can measure the real ROI of AI voice assistants",
      blogSlug:
        "how-restaurants-can-measure-the-real-roi-of-ai-voice-assistants",
      after: ".",
    },
  },
  {
    id: "dining-experience",
    question:
      "How can an automated assistant improve the customer dining experience?",
    answer: {
      before:
        "It removes friction before the guest arrives. Explore strategies in ",
      linkText:
        "customer service in restaurants: strategies for a memorable dining experience",
      blogSlug:
        "customer-service-in-restaurants-strategies-for-a-memorable-dining-experience",
      after: ".",
    },
  },
  {
    id: "convert-reservations",
    question:
      "Can AI tools help my restaurant convert inquiries into confirmed reservations?",
    answer: {
      before: "Yes, the AI checks availability instantly. See how in our post: ",
      linkText: "AI reservations for restaurants",
      blogSlug: "ai-reservations-for-restaurants",
      after: ".",
    },
  },
  {
    id: "multi-unit-scaling",
    question:
      "What is the best voice AI solution for scalable deployment across multi-unit chains?",
    answer: {
      before: "Consistency is key for chains. See our analysis in ",
      linkText:
        "heytruffle AI vs. competitors: the best AI voice assistant for restaurants",
      blogSlug:
        "heytruffle-ai-vs-competitors-the-best-ai-voice-assistant-for-restaurants",
      after: ".",
    },
  },
  {
    id: "menu-and-togo",
    question:
      "How does voice AI adapt to different restaurant menus and to-go orders?",
    answer: {
      before:
        "The AI is custom-trained on your menu. For to-go orders, it uses links as explained in ",
      linkText:
        "AI voice ordering for restaurants: boosting speed and efficiency",
      blogSlug:
        "ai-voice-ordering-for-restaurants-boosting-speed-and-efficiency",
      after: ".",
    },
  },
  {
    id: "order-speed-accuracy",
    question: "How can AI improve order-taking speed and accuracy?",
    answer: {
      before:
        "AI captures every detail perfectly, leading to higher accuracy as detailed in ",
      linkText: "restaurant operations powered by AI",
      blogSlug: "restaurant-operations-powered-by-ai",
      after: ".",
    },
  },
];

/** Plain-text answer for the FAQPage structured data. */
function answerText(faq: Faq): string {
  return `${faq.answer.before}${faq.answer.linkText}${faq.answer.after}`;
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
            priority
            quality={100}
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
                <p className="px-6 pb-6 pl-[3.25rem] text-[15px] leading-relaxed text-[#251f21]/70 md:px-8 md:pl-[4.5rem] md:text-base">
                  {faq.answer.before}
                  <Link
                    href={`/blog/${faq.answer.blogSlug}`}
                    className="font-medium text-brand-orange underline decoration-brand-orange/30 underline-offset-2 transition-colors hover:decoration-brand-orange"
                  >
                    {faq.answer.linkText}
                  </Link>
                  {faq.answer.after}
                </p>
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
