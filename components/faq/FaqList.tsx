import Link from "next/link";
import { FAQS, type Faq } from "@/lib/data/faqs";

/** Accordion list of FAQ entries — owns its own data and rendering so it can
 *  be dropped into any page (the FAQ page itself, or a shorter cut on
 *  pricing) without that page needing to know the data shape. */
export default function FaqList({
  faqs = FAQS,
}: {
  faqs?: readonly Faq[];
} = {}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#251f21]/10 bg-white/60">
      {faqs.map((faq, i) => (
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
  );
}
