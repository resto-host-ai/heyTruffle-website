import Link from "next/link";
import Image from "next/image";
import { BookDemoButton } from "@/components/ui/BookDemoButton";
import { demoAppUrl } from "@/lib/demoAssistant";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/heytruffle.ai/",
    icon: "/images/logo/linkedin.svg",
    alt: "LinkedIn - heytruffle"
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/heytruffle.ai",
    icon: "/images/logo/instagram.svg",
    alt:  "Instagram - heytruffle"
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@heytruffle",
    icon: "/images/logo/youtube.svg",
    alt:  "Youtube - heytruffle"
  },
];

/** Flat, in on-page order: a 2-column grid (`grid-flow-col grid-rows-4`)
 *  reads this top-to-bottom then wraps to the next column, so items 1-4 land
 *  in column one and 5-8 in column two — no need to pre-split the array. The
 *  "demo" entry renders as a button instead of a Link. */
const NAV = [
  { label: "Pricing", href: "/pricing/" },
  { label: "About", href: "/#about" },
  { label: "Case Studies", href: "/case-study" },
  { label: "Blog", href: "/blog" },
  { label: "Partners", href: "/partners/push-operations" },
  { label: "Contact", href: "/#contact" },
  { label: "Book a demo", demo: true as const },
  { label: "FAQ", href: "/faq" },
];

const linkClass =
  "font-body text-[15px] font-normal leading-[130%] text-[#251f21]/70 transition-colors hover:text-brand-orange";

const headingClass =
  "font-body text-[15px] font-semibold text-[#251f21]";

export default function Footer() {
  return (
    <footer className="bg-cream text-[#251f21]">
      <div className="mx-auto w-full px-6 py-16 lg:px-[73px] md:py-20">
        {/* Logo + primary CTAs, top row */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Link href="/" aria-label="heytruffle home" className="inline-block">
            <Image
              src="/images/heytruffle-logo.svg"
              alt="heytruffle"
              width={177}
              height={40}
              unoptimized
              className="h-7 w-auto brightness-0"
            />
          </Link>

          <div className="flex flex-col  sm:flex-row items-center gap-3">
            <a
              href={demoAppUrl()}
              target="_blank"
              className="flex w-full justify-center rounded-full bg-brand-orange px-5 py-2.5 font-body text-[14px] font-semibold leading-[110%] text-cream transition-opacity hover:opacity-90"
            >
              Build your AI
            </a>
            <BookDemoButton className="flex sm:w-full items-center rounded-full  bg-[#251f21]/10 px-5 py-2.5 font-body text-nowrap text-[14px] font-semibold leading-[110%] text-[#251f21] transition-colors hover:bg-[#251f21]/15">
              Talk to our team
            </BookDemoButton>
          </div>
        </div>

        {/* Navigate + Contact us */}
        <div className="mt-14 flex flex-col sm:flex-row justify-end gap-4 ">
          <nav aria-label="Footer navigation max-w-50">
            <p className={headingClass}>Navigate</p>
            <ul className="mt-5 grid grid-cols-1 gap-y-3 sm:max-w-60 sm:grid-flow-col sm:grid-rows-4 sm:gap-x-10">
              {NAV.map((item) =>
                item.demo ? (
                  <li key={item.label}>
                    <BookDemoButton
                      className={`${linkClass} text-left`}
                      ariaLabel="Book a demo"
                    >
                      {item.label}
                    </BookDemoButton>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="sm:justify-self-end">
            <p className={headingClass}>Contact us</p>
            <a
              href="mailto:info@heytruffle.ai"
              className={`${linkClass} mt-5 block`}
            >
              info@heytruffle.ai
            </a>
            <ul
              className="mt-4 min-w-50 flex items-center gap-2.5"
              aria-label="heytruffle social media profiles"
            >
              {socialLinks.map(({ name, href, icon, alt }) => (
                <li key={name}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    aria-label={`Follow heytruffle on ${name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full "
                  >
                    <Image
                      src={icon}
                      alt={alt}
                      width={50}
                      height={50}
                      className="brightness-0 opacity-40"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 h-px w-full bg-[#251f21]/15" />

        <div className="mt-6 flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-[14px] font-normal leading-[110%] text-[#251f21]/60">
            © 2026 heytruffle. All rights reserved.
          </p>
          <ul className="flex items-start gap-5">
            <li>
              <Link href="/privacy-policy" className={`${linkClass} text-[14px]`}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className={`${linkClass} text-[14px]`}>
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/anti-spam" className={`${linkClass} text-[14px]`}>
                Anti-Spam Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
